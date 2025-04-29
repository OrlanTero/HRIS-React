<?php

namespace Application\models;

use Application\abstracts\MortuaryPaymentAbstract;

class MortuaryPayment extends MortuaryPaymentAbstract
{
    protected $CONNECTION;

    public $beneficiary;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, MortuaryPaymentAbstract::class);
        $this->init();
    }

    private function init(): void
    {
        global $APPLICATION;

        $this->beneficiary = $APPLICATION->FUNCTIONS->BENEFICIARY_CONTROL->get($this->beneficiary_id, true);
    }
}