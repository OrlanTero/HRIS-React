<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Payslip;
use Application\controllers\app\Response;

class PayslipControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = Payslip::class;
    protected $TABLE_NAME = "payslips";
    protected $TABLE_PRIMARY_ID = "payslip_id";
    protected $SEARCH_LOOKUP = [];

    protected $CATEGORY = \ActivityLogCategories::PAYROLL;
    protected $TABLE_CATEGORY = \TableNames::PAYROLL;

    public function alreadyCollectedPayslip($employee_id, $client_id, $year, $period)
    {
        return $this->alreadyExists([
            "employee_id" => $employee_id,
            "client_id" => $client_id,
            "year" => $year,
            "period" => $period
        ]);
    }

    public function savePayslip($payslip)
    {
        global $APPLICATION;
        $control = $APPLICATION->FUNCTIONS->PAYSLIP_DRAFT_CONTROL;
        $payslipControl = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
        $mortuaryPayment = $APPLICATION->FUNCTIONS->MORTUARY_PAYMENT_CONTROL;

        /**
         * @type PayslipDraft $draft
         *
         */
        $draft = $control->get($payslip['payslip_draft_id'], true);

        unset($draft->payslip_draft_id, $draft->db_status);

        if ($payslipControl->alreadyCollectedPayslip($draft->employee_id, $draft->client_id, $draft->year, $draft->period)->code == 200) {
            return new Response(500, "Already collected payslip");
        }

        $add = $payslipControl->addRecord((array) $draft);

        if ($add->code == 200) {
            $beneficiaries = $draft->beneficiaries;

            $this->savePayslipBeneficiaries($draft->employee_id, $beneficiaries);

            $this->savePayslipLoanPayments($draft->employee_id, $draft->loan_statement);
        }

        return $add;
    }

    public function savePayslipBeneficiaries($employee_id, $beneficiaries)
    {
        global $APPLICATION;

        $mortuaryPayment = $APPLICATION->FUNCTIONS->MORTUARY_PAYMENT_CONTROL;

        if (!empty($beneficiaries)) {
            $beneficiaries = explode(",", $beneficiaries);

            foreach ($beneficiaries as $beneficiary) {
                $mortuaryPayment->addRecord([
                    "employee_id" => $employee_id,
                    "beneficiary_id" => $beneficiary,
                    "amount" => 50
                ]);
            }
        }
    }

    public function savePayslipLoanPayments($employee_id, $loan_statement)
    {
        global $APPLICATION;

        $loanPayment = $APPLICATION->FUNCTIONS->LOAN_PAYMENT_CONTROL;
        $employee = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;

        $employee = $employee->get($employee_id, true);

        $loans = $employee->getLoanStatements();
        $totalBalance = array_reduce($loans, function ($sum, $loan) {
            return $sum + $loan->balance;
        }, 0);

        $loanPayment->addRecord([
            "employee_id" => $employee_id,
            "loans" => join(",", array_map(function ($loan) {
                return $loan->loan_id;
            }, $loan_statement)),
            "to_pay" => $totalBalance,
            "amount" => $loan_statement
        ]);
    }
}