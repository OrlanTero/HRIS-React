<?php

namespace Application\models;

use Application\abstracts\LoanAbstract;

class Loan extends LoanAbstract
{
    protected $CONNECTION;

    public $type;


    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, LoanAbstract::class);
        $this->init();
    }

    private function init(): void
    {

        global $APPLICATION;

        $this->type = $APPLICATION->FUNCTIONS->SYSTEM_TYPES_CONTROL->get($this->loan_type, true);
    }

    public function isAdvance(): bool
    {
        return $this->advance === 1;
    }

    public function getEmployee() {
        global $APPLICATION;

        return $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL->get($this->employee_id, true);
    }
}