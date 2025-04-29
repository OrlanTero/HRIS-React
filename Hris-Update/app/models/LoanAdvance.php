<?php

namespace Application\models;

use Application\abstracts\LoanAdvanceAbstract;

class LoanAdvance extends LoanAdvanceAbstract
{
    protected $CONNECTION;

    public $type;

    public $statements;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, LoanAdvanceAbstract::class);
        $this->init();
    }

    private function init(): void
    {

        global $APPLICATION;


        $control = $APPLICATION->FUNCTIONS->LOAN_STATEMENT_CONTROL;

        $this->type = $APPLICATION->FUNCTIONS->SYSTEM_TYPES_CONTROL->get($this->loan_type, true);

        $this->statements = $control->filterRecords(['loan_id' => $this->loan_id], true);
    }

    public function getFirstStatement()
    {
        if (count($this->statements)) {
            return $this->statements[0];
        }

        return null;
    }


    public function getCurrentPeriodStatements()
    {
        $currentDate = new \DateTime();
        $currentDay = (int) $currentDate->format('d');
        $currentMonth = (int) $currentDate->format('m');
        $currentYear = (int) $currentDate->format('Y');

        $periodStart = $currentDay <= 15 ? 1 : 16;
        $periodEnd = $currentDay <= 15 ? 15 : (int) $currentDate->format('t'); // Last day of the month

        foreach ($this->statements as $statement) {
            $statementDate = new \DateTime($statement->start_date);
            $statementDay = (int) $statementDate->format('d');
            $statementMonth = (int) $statementDate->format('m');
            $statementYear = (int) $statementDate->format('Y');

            if (
                $statementYear === $currentYear &&
                $statementMonth === $currentMonth &&
                $statementDay >= $periodStart &&
                $statementDay <= $periodEnd
            ) {
                return $statement;
            }
        }

        return null; // Return null if no matching statement is found
    }

    public function getAllPeriodStatements()
    {

    }

    public function getNextStatementDate()
    {
        $currentDate = new \DateTime();
        $currentDay = (int) $currentDate->format('d');

        // If current day is 1-15, next statement is on the 16th
        // If current day is 16-end of month, next statement is on the 1st of next month
        if ($currentDay <= 15) {
            // Set to 16th of current month
            return $currentDate->format('Y-m-16');
        } else {
            // Move to first day of next month
            $currentDate->modify('first day of next month');
            return $currentDate->format('Y-m-d');
        }
    }



    public function getEmployee()
    {
        global $APPLICATION;

        return $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL->get($this->employee_id, true);
    }
}