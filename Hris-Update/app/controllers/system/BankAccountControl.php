<?php

use Application\abstracts\ControlDefaultFunctions;
use Application\models\BankAccount;

class BankAccountControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = BankAccount::class;
    protected $TABLE_NAME = "bank_accounts";
    protected $TABLE_PRIMARY_ID = "bank_account_id";
    protected $SEARCH_LOOKUP = [];

    protected $CATEGORY = \ActivityLogCategories::BANK_ACCOUNT;

    protected $TABLE_CATEGORY = \TableNames::BANK_ACCOUNT;

}