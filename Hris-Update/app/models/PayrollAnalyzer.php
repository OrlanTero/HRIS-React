<?php

namespace Application\models;

use AttendanceTypes;
use EmploymentPositionTypes;
use MonthPeriod;
use ServiceDeductionTypes;

class PayrollAnalyzer
{
    private $group_id;
    private $group;
    private $attendances;

    public function __construct($group_id)
    {
        $this->group_id = $group_id;
    }

    public function init()
    {
        global $APPLICATION;
        $control = $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL;
        $this->group = $control->get($this->group_id, true);
        $this->attendances = $this->group->getAttedanceOfEachEmployee();
    }

    public function computeAttendanceOf($id)
    {
        return $this->compute($this->group->getAttendanceOfEmployee($id));
    }

    public function compute($AI)
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->SERVICE_DEDUCTION_CONTROL;
        $beneficiaryControl = $APPLICATION->FUNCTIONS->BENEFICIARY_CONTROL;

        $client = $this->group->client;
        $employee = $AI['employee'];
        $employment = $AI['employment'];
        $attendance = $AI['attendance'];
        $ndw = $AI['ndw'];

        $cashAdvances = $employee->getCashAdvances();
        $loanStatements = $employee->getFirstLoanStatements();

        $seperateLoans = array_reduce($loanStatements, function ($carry, $statement) {
            if (!isset($carry[$statement->loan_id])) {
                $carry[$statement->loan_id] = $statement;
            }
            return $carry;
        }, []);

        $descriptions = implode(",", array_map(function ($statement) use ($APPLICATION) {
            $control = $APPLICATION->FUNCTIONS->LOAN_CONTROL;
            return $control->get($statement->loan_id, false)['description'];
        }, $seperateLoans));

        $totalLoanBalance = !empty($loanStatements) ? array_sum(array_column($loanStatements, 'balance')) : 0;
        $adjustments = $employee->getAdjustments();
        $beneficiaries = $beneficiaryControl->getAllBeneficiary($this->group->period, $this->group->year);

        $cashAdvanceBalance = $this->calculateTotalBalance($cashAdvances);
        $totalAdjustments = $this->calculateTotalAdjustments($adjustments);

        $rates = $this->getRates($client, $employment);
        $hours = $this->calculateHours($attendance);
        $payValues = $this->calculatePayValues($hours, $rates);

        $GP = $this->calculateGrossPay($payValues, $rates, $totalAdjustments);

        $deductions = $this->calculateDeductions($control, $GP, $this->group->period, $beneficiaries, $cashAdvanceBalance, $totalLoanBalance, $rates);

        $COMPUTATION = $this->createPayrollComputation($this->group, $employee, $hours, $payValues, $rates, $deductions, $GP, $ndw, $cashAdvanceBalance, $totalAdjustments, $totalLoanBalance, $beneficiaries);

        $COMPUTATION->setLoanPurpose($descriptions);

        return $COMPUTATION;
    }

    private function calculateTotalBalance($records)
    {
        return array_sum(array_column($records, 'balance'));
    }

    private function calculateTotalAdjustments($adjustments)
    {
        return array_sum(array_column($adjustments, 'amount'));
    }

    private function getRates($client, $employment)
    {
        return [
            'REGULAR' => $client->regular_2 ?? 0,
            'REGULAR_OT' => $client->overtime_2 ?? 0,
            'SPECIAL_HOLIDAY' => $client->special_holiday ?? 0,
            'SPECIAL_HOLIDAY_OT' => $client->special_holiday_ot ?? 0,
            'LEGAL_HOLIDAY' => $client->legal_holiday ?? 0,
            'LEGAL_HOLIDAY_OT' => $client->legal_holiday_ot ?? 0,
            'NIGHT_DIFF' => $client->nightdiff ?? 0,
            'REST_DAY' => $client->restday ?? 0,
            'UNIFORM' => $client->uniform ?? 0,
            'SEA' => $client->sea ?? 0,
            'ALLOWANCE' => $client->allowance ?? 0,
            'HEAD_GUARD_ALLOWANCE' => $employment && $employment->position == EmploymentPositionTypes::HEAD_GUARD->value ? $client->head_guard_allowance : 0,
            'CTPA' => $client->ctpa ?? 0,
            'COLA' => $client->cola ?? 0,
            'LEAVE' => $client->leave_1 ?? 0,
        ];
    }

    private function calculateHours($attendance)
    {
        $hours = [];
        $types = [
            AttendanceTypes::REGULAR,
            AttendanceTypes::OT,
            AttendanceTypes::REST_DAY,
            AttendanceTypes::LEGAL_HOLIDAY,
            AttendanceTypes::LEGAL_HOLIDAY_OT,
            AttendanceTypes::NIGHT_DIFF,
            AttendanceTypes::SPECIAL_HOLIDAY,
            AttendanceTypes::SPECIAL_HOLIDAY_OT,
        ];

        foreach ($types as $type) {
            $hours[$type->value] = $this->computeTotalOf($attendance, $type->value);
        }

        return $hours;
    }

    private function calculatePayValues($hours, $rates)
    {
        return [
            // 'OTR' => $hours[AttendanceTypes::OT->value] * $rates['REGULAR_OT'],
            'BP' => ($hours[AttendanceTypes::REGULAR->value] * $rates['REGULAR']) + ($hours[AttendanceTypes::OT->value] * $rates['REGULAR_OT']),
            'RR' => $hours[AttendanceTypes::REST_DAY->value] * $rates['REST_DAY'],
            'NSDBP' => $rates['NIGHT_DIFF'] * $hours[AttendanceTypes::NIGHT_DIFF->value],
            'NHWSHBP' => $rates['SPECIAL_HOLIDAY'] * $hours[AttendanceTypes::SPECIAL_HOLIDAY->value],
            'SHOTBP' => $rates['SPECIAL_HOLIDAY_OT'] * $hours[AttendanceTypes::SPECIAL_HOLIDAY_OT->value],
            'NHWLHBP' => $rates['LEGAL_HOLIDAY'] * $hours[AttendanceTypes::LEGAL_HOLIDAY->value],
            'LHOTBP' => $rates['LEGAL_HOLIDAY_OT'] * $hours[AttendanceTypes::LEGAL_HOLIDAY_OT->value],
        ];
    }

    private function calculateGrossPay($payValues, $rates, $totalAdjustments)
    {
        return array_sum($payValues) + $rates['ALLOWANCE'] + $rates['HEAD_GUARD_ALLOWANCE'] + $totalAdjustments;
        // return array_sum($payValues) ;
    }

    private function calculateDeductions($control, $GP, $period, $beneficiaries, $cashAdvanceBalance, $totalLoanBalance, $rates)
    {
        $SSS_DEDUCTION_OBJ = $control->getDeductionOf($GP, ServiceDeductionTypes::SSS->value);
        $PHIL_DEDUCTION_OBJ = $control->getDeductionOf($GP, ServiceDeductionTypes::PHILHEALTH->value);
        $PAGIBIG_DEDUCTION_OBJ = $control->getDeductionOf($GP, ServiceDeductionTypes::PAGIBIG->value);

        $_SSS = $SSS_DEDUCTION_OBJ ? $SSS_DEDUCTION_OBJ->ee : 0;
        $_PHIL = GetMonthPeriod($period)->value == MonthPeriod::ONETO15->value ? 0 : ($PHIL_DEDUCTION_OBJ ? $PHIL_DEDUCTION_OBJ->ee : 0);
        $_PAGIBIG = GetMonthPeriod($period)->value == MonthPeriod::ONETO15->value ? 0 : ($PAGIBIG_DEDUCTION_OBJ ? $PAGIBIG_DEDUCTION_OBJ->ee : 0);

        $_UNIFORM_DEDUCTION = max($rates['UNIFORM'], 0);
        $_INSURANCE = 20;
        $_DEATH_CONTRI = 50;
        $_DEATH = count($beneficiaries) * $_DEATH_CONTRI;

        $_PART1 = (float) $_SSS + (float) $_PHIL + (float) $_INSURANCE;
        $_PART2 = (float) $_DEATH + (float) $_PAGIBIG;
        $_PART3 = (float) $_UNIFORM_DEDUCTION + (float) $rates['SEA'] + (float) $rates['CTPA'] + (float) $rates['COLA'] + (float) $totalLoanBalance + (float) $cashAdvanceBalance;

        return [
            'SSS' => $_SSS,
            'PHIL' => $_PHIL,
            'PAGIBIG' => $_PAGIBIG,
            'INSURANCE' => $_INSURANCE,
            'OTHERS' => $_PART3,
            'PART1' => $_PART1,
            'PART2' => $_PART2,
            'DEATH' => $_DEATH,
        ];
    }

    private function createPayrollComputation($group, $employee, $hours, $payValues, $rates, $deductions, $GP, $ndw, $cashAdvanceBalance, $totalAdjustments, $totalLoanBalance, $beneficiaries)
    {
        $COMPUTATION = new PayrollComputation($group, $employee);
        $RATES = new PayslipRates();

        $COMPUTATION->cash_advances = $cashAdvanceBalance;
        $COMPUTATION->setAdjustments($totalAdjustments);
        $COMPUTATION->setLoanStatement($totalLoanBalance);

        $this->setComputationHours($COMPUTATION, $hours);
        $this->setComputationRates($COMPUTATION, $payValues, $rates, $ndw, $GP);
        $this->setComputationDeductions($COMPUTATION, $deductions);

        $COMPUTATION->setNetpay($GP - ($deductions['PART1'] + $deductions['PART2'] + $deductions['OTHERS']));
        $COMPUTATION->setYear($group->year);
        $COMPUTATION->setPeriod($group->period);

        if (property_exists($employee, 'employment') && $employee->employment instanceof Employment) {
            $RATES->byClient($group->client, $employee->employment);
        } else {
            // Handle the case where $employee->employment is null or not an instance of Employment
            error_log("Employee employment is null or not an instance of Employment for employee ID: " . $employee->employee_id);
        }
        $COMPUTATION->setPayslipRates($RATES);

        $COMPUTATION->setBeneficiaries(implode(",", array_column($beneficiaries, 'name')));
        $COMPUTATION->setBeneficariesObjects($beneficiaries);

        return $COMPUTATION;
    }

    private function setComputationHours($COMPUTATION, $hours)
    {
        $COMPUTATION->setRegularHours($hours[AttendanceTypes::REGULAR->value]);
        $COMPUTATION->setOTHours($hours[AttendanceTypes::OT->value]);
        $COMPUTATION->setNightDiffHours($hours[AttendanceTypes::NIGHT_DIFF->value]);
        $COMPUTATION->setSpecialHolidayHours($hours[AttendanceTypes::SPECIAL_HOLIDAY->value]);
        $COMPUTATION->setSpecialHolidayOtHours($hours[AttendanceTypes::SPECIAL_HOLIDAY_OT->value]);
        $COMPUTATION->setLegalHolidayHours($hours[AttendanceTypes::LEGAL_HOLIDAY->value]);
        $COMPUTATION->setLegalHolidayOtHours($hours[AttendanceTypes::LEGAL_HOLIDAY_OT->value]);
        $COMPUTATION->setTotalHours($hours[AttendanceTypes::REGULAR->value] + $hours[AttendanceTypes::OT->value]);
    }

    private function setComputationRates($COMPUTATION, $payValues, $rates, $ndw, $GP)
    {
        $COMPUTATION->setRestDay($payValues['RR']);
        $COMPUTATION->setNdw($ndw);
        $COMPUTATION->setNhw($rates['REGULAR'] != 0 ? $payValues['BP'] / $rates['REGULAR'] : 0);
        $COMPUTATION->setBasicPay($payValues['BP']);
        $COMPUTATION->setNsd($rates['NIGHT_DIFF'] != 0 ? $payValues['NSDBP'] / $rates['NIGHT_DIFF'] : 0);
        $COMPUTATION->setNsdBasicPay($payValues['NSDBP']);
        $COMPUTATION->setNhwLh($rates['LEGAL_HOLIDAY'] != 0 ? $payValues['NHWLHBP'] / $rates['LEGAL_HOLIDAY'] : 0);
        $COMPUTATION->setLhBasicPay($payValues['NHWLHBP']);
        $COMPUTATION->setNhwLhot($rates['LEGAL_HOLIDAY_OT'] != 0 ? $payValues['LHOTBP'] / $rates['LEGAL_HOLIDAY_OT'] : 0);
        $COMPUTATION->setLhotBasicPay($payValues['LHOTBP']);
        $COMPUTATION->setNhwSh($rates['SPECIAL_HOLIDAY'] != 0 ? $payValues['NHWSHBP'] / $rates['SPECIAL_HOLIDAY'] : 0);
        $COMPUTATION->setShBasicPay($payValues['NHWSHBP']);
        $COMPUTATION->setNhwShot($rates['SPECIAL_HOLIDAY_OT'] != 0 ? $payValues['SHOTBP'] / $rates['SPECIAL_HOLIDAY_OT'] : 0);
        $COMPUTATION->setShotBasicPay($payValues['SHOTBP']);
        $COMPUTATION->setGrossPay($GP);
    }

    private function setComputationDeductions($COMPUTATION, $deductions)
    {
        $COMPUTATION->setSss($deductions['SSS']);
        $COMPUTATION->setPhil($deductions['PHIL']);
        $COMPUTATION->setInsurance($deductions['INSURANCE']);
        $COMPUTATION->setPart1($deductions['PART1']);
        $COMPUTATION->setDeath($deductions['DEATH']);
        $COMPUTATION->setPagibig($deductions['PAGIBIG']);
        $COMPUTATION->setPart2($deductions['PART2']);
        $COMPUTATION->setOthers($deductions['OTHERS']);
    }

    public function computeTotalOf($attendances, $type)
    {
        return array_reduce($attendances, function ($total, $attendance) use ($type) {
            $col = array_column(AttendanceTypes::cases(), "value");
            return $total + ($col[(int) $attendance->type] == $type ? $attendance->hours : 0);
        }, 0);
    }

    public function computeAll()
    {
        return array_map([$this, 'compute'], $this->attendances);
    }
}