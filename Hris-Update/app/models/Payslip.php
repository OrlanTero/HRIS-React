<?php

namespace Application\models;

use Application\abstracts\PayslipAbstract;

class Payslip extends PayslipAbstract
{
    protected $CONNECTION;

    public function __construct($data = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($data, PayslipAbstract::class);
        $this->init();
    }

    private function init(): void
    {

    }
}