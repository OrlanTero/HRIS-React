<?php

namespace Application\models;



use Application\abstracts\DisbursementAbstract;


class Disbursement extends DisbursementAbstract
{
    protected $CONNECTION;

    public $requisition;



    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, DisbursementAbstract::class);
        $this->init();
    }

    private function init(): void
    {
        global $APPLICATION;

        $this->requisition = $APPLICATION->FUNCTIONS->REQUISITION_CONTROL->get($this->requisition_id, true);

        $this->paid_to = $this->requisition->paid_to;

        $this->type = $this->requisition->type;
    }
}