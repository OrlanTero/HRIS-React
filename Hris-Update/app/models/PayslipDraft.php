<?php

namespace Application\models;

use Application\abstracts\PayslipDraftAbstract;

class PayslipDraft extends PayslipDraftAbstract
{

    public function __construct($data = [])
    {
        $this->applyData($data, PayslipDraftAbstract::class);
        $this->init();
    }

    private function init(): void
    {

    }
}