<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\LoanStatement;

class LoanStatementControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = LoanStatement::class;
    protected $TABLE_NAME = "loan_statements";
    protected $TABLE_PRIMARY_ID = "statement_id";
    protected $SEARCH_LOOKUP = [];

    protected $CATEGORY = \ActivityLogCategories::LOAN_MANAGER;
    protected $TABLE_CATEGORY = \TableNames::LOAN_MANAGER;
}