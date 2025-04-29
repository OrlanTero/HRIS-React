<?php

namespace Application\models;



use Application\abstracts\RequisitionAbstract;

class Requisition extends RequisitionAbstract
{
    protected $CONNECTION;

    public $requisition_info;

    public $expenses;
    public $less;

    public $total_expenses;
    public $total_less;

    public $balance;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, RequisitionAbstract::class);
        $this->init();
    }

    private function init(): void
    {
    global $APPLICATION;

    $this->requisition_info = $APPLICATION->FUNCTIONS->REQUISITION_INFO_CONTROL->filterRecords(["requisition_id"=>$this->requisition_id],true);
    $this->expenses = array_filter($this->requisition_info, function ($r) { return $r->requisition_type == 0; });
    $this->less =  array_filter($this->requisition_info, function ($r) { return $r->requisition_type == 1; });

    $this->total_expenses = array_sum(array_column((array)$this->expenses, "amount"));
    $this->total_less = array_sum(array_column((array)$this->less, "amount"));

    $this->balance = $this->total_expenses - $this->total_less;
    $this->amount = $this->computeAmount($this->requisition_info);

    }

    private function computeAmount($requisition_info) {
        $total = 0;

        foreach ($requisition_info as $requisition) {
            $total += $requisition->amount;
        }

        return $total;
    }
}