<?php

namespace Application\models;

use Application\abstracts\LoanStatementAbstract;

class LoanStatement extends LoanStatementAbstract
{
    protected $CONNECTION;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, LoanStatementAbstract::class);
        $this->init();
    }

    private function init(): void
    {


    }
}