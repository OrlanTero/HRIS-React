<?php

namespace Application\models;

use Application\abstracts\MortuaryAbstract;

class Mortuary extends MortuaryAbstract
{
    protected $CONNECTION;

    public $beneficiaries;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, MortuaryAbstract::class);
        $this->init();
    }

    private function init(): void
    {
        global $APPLICATION;

        $this->beneficiaries = $APPLICATION->FUNCTIONS->BENEFICIARY_CONTROL->filterRecords(['mortuary_id' => $this->mortuary_id], false);
    }
}