<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Employment;

class EmploymentControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = Employment::class;
    protected $TABLE_NAME = "employments";
    protected $TABLE_PRIMARY_ID = "employment_id";
    protected $SEARCH_LOOKUP = [
        [
            "table" => "employees",
            "primary" => "employee_id",
            "into" => ["firstname", "lastname", "middlename"]
        ],
        "position",
        "department",
        "e_type",
        "status"
    ];

    protected $CATEGORY = \ActivityLogCategories::EMPLOYMENT;
    protected $TABLE_CATEGORY = \TableNames::EMPLOYMENT;


}