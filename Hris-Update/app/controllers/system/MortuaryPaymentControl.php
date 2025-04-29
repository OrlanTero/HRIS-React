<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Mortuary;
use Application\models\MortuaryPayment;

class MortuaryPaymentControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = MortuaryPayment::class;
    protected $TABLE_NAME = "mortuary_payments";
    protected $TABLE_PRIMARY_ID = "payment_id";
    protected $SEARCH_LOOKUP = [""];
    protected $CATEGORY = \ActivityLogCategories::MORTUARY;
    protected $TABLE_CATEGORY = \TableNames::MORTUARY;

}