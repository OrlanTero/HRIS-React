<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\LoanAdvance;

class LoanAdvanceControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = LoanAdvance::class;
    protected $TABLE_NAME = "loans";
    protected $TABLE_PRIMARY_ID = "loan_id";
    protected $SEARCH_LOOKUP = [
        "employee_id",
        "amount",
        "balance",
        "description",
        [
            "table" => "employees",
            "primary" => "employee_id",
            "into" => ["firstname", "lastname", "middlename"]
        ]
    ];

    protected $CATEGORY = \ActivityLogCategories::LOAN_MANAGER;
    protected $TABLE_CATEGORY = \TableNames::LOAN_MANAGER;


    public function getDashboardData()
    {
        global $APPLICATION, $CONNECTION;
    }


    public function add($data, $statements)
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->LOAN_STATEMENT_CONTROL;

        $insert = $this->addRecordWithLog($data);

        if ($insert->code === 200) {
            foreach ($statements as $statement) {
                $statement['loan_id'] = $insert->body['id'];
                $statement['employee_id'] = $data['employee_id'];
                $statement['balance'] = $statement['amount'];

                $control->addRecordWithLog($statement);
            }
        }

        return $insert;
    }
}