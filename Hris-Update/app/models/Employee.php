<?php

namespace Application\models;

use Application\abstracts\EmployeeAbstract;

class Employee extends EmployeeAbstract
{
    protected $CONNECTION;

    public $name;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, EmployeeAbstract::class);
        $this->init();
    }

    private function init(): void
    {

        $this->name = $this->lastname . ", " . $this->firstname . " " . $this->middlename[0];

    }

    public function getCashAdvances()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->LOAN_CONTROL;

        $loans = $control->filterRecords(["status" => 1, "advance" => '0', "employee_id" => $this->employee_id], true);

        return array_filter($loans, function ($record) {
            return $record->type->affects_in == \SystemTypeAffects::PAYROLL->value && $record->type->affects_value == \SystemTypeAffectValue::DEDUCT->value;
        });
    }

    public function getLoanStatements()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->LOAN_ADVANCE_CONTROL;

        $loans = $control->filterRecords(["status" => 1, "advance" => '1', "employee_id" => $this->employee_id], true);

        $currentPeriodStatements = [];

        foreach ($loans as $loan) {
            $currentStatement = $loan->getCurrentPeriodStatements();
            if ($currentStatement !== null) {
                $currentPeriodStatements[] = $currentStatement;
            }
        }

        return $currentPeriodStatements;
    }

    public function getFirstLoanStatements()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->LOAN_ADVANCE_CONTROL;

        $loans = $control->filterRecords(["status" => 1, "advance" => '1', "employee_id" => $this->employee_id], true);

        $currentPeriodStatements = [];

        foreach ($loans as $loan) {
            $currentStatement = $loan->getFirstStatement();
            if ($currentStatement !== null) {
                $currentPeriodStatements[] = $currentStatement;
            }
        }

        return $currentPeriodStatements;
    }

    public function getAdjustments()
    {
        global $APPLICATION;

        $adjustmentControl = $APPLICATION->FUNCTIONS->ADJUSTMENT_CONTROL;

        return $adjustmentControl->filterRecords(['employee_id' => $this->employee_id], true);
    }

    public function getBanks()
    {
        global $APPLICATION;

        return $APPLICATION->FUNCTIONS->BANK_ACCOUNT_CONTROL->filterRecords(["employee_id" => $this->employee_id], true);
    }

    public function getBeneficiary($period, $year)
    {
        global $CONNECTION;

        $id = $this->employee_id;

        $query = "SELECT a.* FROM `beneficiaries` as a WHERE a.employee_id = '" . $id . "' AND a.mortuary_id IN (SELECT b.mortuary_id FROM mortuaries as b WHERE b.period = '" . $period . "' AND b.year = '" . $year . "')";

        return $CONNECTION->Query($query);
    }

    public function getAllBeneficiary($period, $year)
    {
        global $CONNECTION;

        $id = $this->employee_id;

        $query = "SELECT a.* FROM `beneficiaries` as a WHERE a.employee_id = '" . $id . "' AND a.mortuary_id IN (SELECT b.mortuary_id FROM mortuaries as b WHERE b.period = '" . $period . "' AND b.year = '" . $year . "')";

        return $CONNECTION->Query($query, true);
    }
}