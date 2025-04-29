<?php

namespace Application\models;

use Application\abstracts\AdjustmentAbstract;
use Application\abstracts\PayrollComputationAbstract;

class PayrollComputation extends PayrollComputationAbstract
{
    public $group;

    public $name;

    public $employee;

    public $payslip_rates;

    public $total_hours;

    public $beneficiaries;

    public $beneficaries_objects;

    public $adjustments;

    public $payslip_draft_id;

    public $loan_statement;

    public $loan_purpose = "";

    public function __construct($group, $employee)
    {
        $this->group = $group;
        $this->employee = $employee;
        $this->name = $employee->name;

        $this->employee_id = $employee->employee_id;
        $this->client_id = $this->group->client->client_id;
    }

    public function saveAsDraft()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->PAYSLIP_DRAFT_CONTROL;
        //
        $existed = $control->alreadyExists([
            'employee_id' => $this->employee_id,
            'client_id' => $this->client_id,
            'year' => $this->year,
            'period' => $this->period,
        ]);

        $rateSave = $this->payslip_rates->save();

        if ($rateSave->code == 200) {
            $this->setPayslipRatesId($rateSave->body['id']);
        }

        $this->beneficiaries = implode(",", array_map(function ($record) {
            return $record['beneficiary_id'];
        }, $this->beneficaries_objects));

        $copy = $this;

        unset($copy->payslip_rates, $copy->group, $copy->employee, $copy->name, $copy->payslip_id, $copy->date_created, $copy->days_worked, $copy->db_status);

        unset($copy->beneficaries_objects, $copy->payslip_draft_id, $copy->loan_statement, $copy->loan_purpose);


        if ($existed->code == 200) {

            $edit = $control->editRecord($existed->body['id'], (Array) $copy);
            //
            $this->payslip_draft_id = $existed->body['id'];
            //
            return $edit;
        } else {
            $add = $control->addRecord((Array) $copy);

            $this->payslip_draft_id = $add->body['id'];

            return $add;
        }
    }

    public function save()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
        //
        $existed = $control->alreadyExists([
            'employee_id' => $this->employee_id,
            'client_id' => $this->client_id,
            'year' => $this->year,
            'period' => $this->period,
        ]);

        $rateSave = $this->payslip_rates->save();

        if ($rateSave->code == 200) {
            $this->setPayslipRatesId($rateSave->body['id']);
        }

        $copy = $this;

        unset($copy->payslip_rates, $copy->group, $copy->employee, $this->name, $this->payslip_id, $this->date_created, $this->days_worked, $this->db_status);

        unset($copy->beneficiaries, $copy->adjustments);

        if ($existed->code == 200) {
            return $control->editRecord($existed->body['id'], (Array) $copy);
        } else {
            return $control->addRecord((Array) $copy);
        }
    }

    public function setPayslipRates(PayslipRates $RATES)
    {
        $this->payslip_rates = $RATES;
    }

    /**
     * @return mixed
     */
    public function getBeneficiaries()
    {
        return $this->beneficiaries;
    }

    /**
     * @param mixed $beneficiaries
     */
    public function setBeneficiaries($beneficiaries): void
    {
        $this->beneficiaries = $beneficiaries;
    }



    /**
     * @return mixed
     */
    public function getTotalHours()
    {
        return $this->total_hours;
    }

    /**
     * @param mixed $total_hours
     */
    public function setTotalHours($total_hours): void
    {
        $this->total_hours = $total_hours;
    }

    /**
     * @return mixed
     */
    public function getAdjustments()
    {
        return $this->adjustments;
    }

    /**
     * @param mixed $adjustments
     */
    public function setAdjustments($adjustments): void
    {
        $this->adjustments = $adjustments;
    }

    /**
     * @return mixed
     */
    public function getBeneficariesObjects()
    {
        return $this->beneficaries_objects;
    }

    /**
     * @param mixed $beneficaries_objects
     */
    public function setBeneficariesObjects($beneficaries_objects): void
    {
        $this->beneficaries_objects = $beneficaries_objects;
    }

    public function setLoanStatement($loan_statement)
    {
        $this->loan_statement = $loan_statement;
    }

    public function getLoanStatement()
    {
        return $this->loan_statement;
    }

    public function setLoanPurpose($loan_purpose)
    {
        $this->loan_purpose = $loan_purpose;
    }

    public function getLoanPurpose()
    {
        return $this->loan_purpose;
    }
}