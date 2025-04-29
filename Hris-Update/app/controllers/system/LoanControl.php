<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Loan;

class LoanControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = Loan::class;
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

        $control = $APPLICATION->FUNCTIONS->LOAN_PAYMENT_CONTROL;
        $loanAdvanceControl = $APPLICATION->FUNCTIONS->LOAN_ADVANCE_CONTROL;

        $todayLoan = $this->getAllToday('date_created', false);
        $todayPayment = $CONNECTION->Query("SELECT DISTINCT(a.employee_id) as temp, a.* FROM loan_payments as a WHERE a.date_created >= now() - INTERVAL 1 DAY", true);
        $thisWeekLoan = $this->getAllThisWeek('date_created', false);
        $thisYearLoan = $this->getAllThisYear('date_created', false);
        $thisWeekPayment = $control->getAllThisWeek('date_created', false);
        $thisYearPayment = $control->getAllThisYear('date_created', false);

        $advanceLoans = $loanAdvanceControl->filterRecords(['advance' => 1], true);
        $employeesWithCurrentPeriodStatements = array_filter($advanceLoans, function ($loan) {
            return $loan->getCurrentPeriodStatements() !== null;
        });

        $periodStatements = array_reduce($employeesWithCurrentPeriodStatements, function ($carry, $loan) {
            $currentStatement = $loan->getCurrentPeriodStatements();
            return $carry + ($currentStatement ? $currentStatement->balance : 0);
        }, 0);


        return [
            "loans" => [
                "today" => empty($todayLoan) ? 0 : count($todayLoan),
                "total" => array_reduce(array_column($todayLoan, 'amount'), function ($carry, $item) {
                    $carry += $item;
                    return $carry; }),
                "total_week" => count($thisWeekLoan),
                "total_year" => count($thisYearLoan),
            ],
            "payments" => [
                "today" => empty($todayPayment) ? 0 : count($todayPayment),
                "total" => empty($todayPayment) ? 0 : array_reduce(array_column($todayPayment, 'amount'), function ($carry, $item) {
                    $carry += $item;
                    return $carry; }),
                "total_week" => count($thisWeekPayment),
                "total_year" => count($thisYearPayment),
            ],
            "advance_loans" => [
                "employee_period_statements" => count($employeesWithCurrentPeriodStatements),
                "employee_paid_statements" => 0,
                "period_statements" => $periodStatements,
                "paid_statements" => 0,
            ]
        ];
    }



}