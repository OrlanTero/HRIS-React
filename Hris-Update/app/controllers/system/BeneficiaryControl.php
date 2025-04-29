<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Beneficiary;

class BeneficiaryControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = Beneficiary::class;
    protected $TABLE_NAME = "beneficiaries";
    protected $TABLE_PRIMARY_ID = "beneficiary_id";
    protected $SEARCH_LOOKUP = [];
    protected $CATEGORY = \ActivityLogCategories::BENEFICIARY;

    protected $TABLE_CATEGORY = \TableNames::BENEFICIARY;

    public function getAllBeneficiary($period, $year)
    {
        global $APPLICATION;

        $all = [];

        $mortuaryControl = $APPLICATION->FUNCTIONS->MORTUARY_CONTROL;

        $mortuaries = $mortuaryControl->filterRecords(["period" => $period, "year" => $year], true);

        foreach ($mortuaries as $mortuary) {
            foreach ($mortuary->beneficiaries as $beneficiary) {
                $all[] = $beneficiary;
            }
        }

        return $all;
    }

    public function getAllBeneficiaryByEmployee($period, $year, $employee_id) {
        global $APPLICATION;

        $all = [];

        $mortuaryControl = $APPLICATION->FUNCTIONS->MORTUARY_CONTROL;

        $mortuaries = $mortuaryControl->filterRecords(["period" => $period, "year" => $year], true);

        foreach ($mortuaries as $mortuary) {
            foreach ($mortuary->beneficiaries as $beneficiary) {
                if ($beneficiary->employee_id == $employee_id) {
                    $all[] = $beneficiary;
                }
            }
        }

        return $all;
    }

}