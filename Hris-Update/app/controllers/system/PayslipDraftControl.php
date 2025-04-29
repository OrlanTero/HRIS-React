<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\LoanPayment;
use Application\models\PayrollComputation;
use Application\models\Payslip;
use Application\models\PayslipDraft;

class PayslipDraftControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = PayslipDraft::class;
    protected $TABLE_NAME = "payslip_drafts";
    protected $TABLE_PRIMARY_ID = "payslip_draft_id";
    protected $SEARCH_LOOKUP = [];

    protected $CATEGORY = \ActivityLogCategories::PAYROLL;
    protected $TABLE_CATEGORY = \TableNames::PAYROLL;
}