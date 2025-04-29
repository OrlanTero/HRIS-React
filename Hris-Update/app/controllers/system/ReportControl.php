<?php

namespace Application\controllers\system;

use Application\models\AttendanceGroup;
use Application\models\PayrollAnalyzer;
use Application\models\Payslip;
use ReportTypes;

class ReportControl
{
    public $type;
    public function __construct($type)
    {
        $this->type = $type;
    }

    public function getReport($data)
    {
        switch ($this->type) {
            case ReportTypes::PAYSLIP_PER_CLIENT->value:
                return $this->getPlaySlipPerClient($data);
            case ReportTypes::LOAN_PAYMENTS->value:
                return $this->getLoanPayments($data);
            case ReportTypes::PAYSLIP_AZ->value:
                return $this->getPayslipAZ($data);
            case ReportTypes::MORTUARY->value:
                return $this->getMortuary($data);
            case ReportTypes::PAYSLIP_PER_CLIENT_INDIVIDUALLY->value:
                return $this->getPlaySlipPerClientIndividually($data);
            case ReportTypes::TOTAL_BANK->value:
                return $this->getTotalBank($data);
            case ReportTypes::PETTY_CASH_EXPENSES->value:
                return $this->getPetty($data);
            case ReportTypes::ACCOUNT_CREDITED->value:
                return $this->getAccountCredited($data);
        }
    }

    private function getAccountCredited($data)
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
        $bankAccountControl = $APPLICATION->FUNCTIONS->BANK_ACCOUNT_CONTROL;
        $employeeControl = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;

        $records = $control->filterRecords(["period" => $data['period'], "year" => $data['year']], true);

        $records = array_map(function ($record) use ($bankAccountControl, $employeeControl) {
            $bankAccount = $bankAccountControl->filterRecords(["employee_id" => $record->employee_id], true);
            $employee = $employeeControl->get($record->employee_id, true);
            return [
                "id" => $record->payslip_id,
                "name" => $employee->name,
                "employee_id" => $employee->employee_id,
                "employee" => $employee->name,
                "bank_account_id" => count($bankAccount) > 0 ? $bankAccount[0]->bank_account_id : null,
                "bank_account_number" => count($bankAccount) > 0 ? $bankAccount[0]->account_number : null,
                "bank_id" => count($bankAccount) > 0 ? $bankAccount[0]->bank->bank_id : null,
                "bank" => count($bankAccount) > 0 ? $bankAccount[0]->bank->name . " - " . $bankAccount[0]->bank->branch : null,
                "amount" => $record->netpay
            ];
        }, $records);

        $records = array_reduce($records, function ($carry, $item) {
            if ($item['bank_id'] !== null) {
                $carry[$item['bank_id']][] = $item;
            }
            return $carry;
        }, []);

        return $records;

    }

    private function getPlaySlipPerClient($data)
    {
        global $APPLICATION, $PER_CLIENT_TABLE_HEADER_TEXT, $PER_CLIENT_TABLE_BODY_KEY;

        $control = $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL;
        $clientControl = $APPLICATION->FUNCTIONS->CLIENT_CONTROL;

        $finalData = [];

        $records = $control->filterRecords(["period" => $data['period'], "year" => $data['year']], true);

        $records = array_map(function ($record) use ($clientControl) {
            $ANALYZER = new PayrollAnalyzer($record->attendance_group_id);

            $ANALYZER->init();

            $result = $ANALYZER->computeAll();

            $netpays = array_reduce($result, function ($carry, $item) {
                return $carry + $item->netpay;
            });

            $client = $clientControl->get($record->client_id, true);

            return [
                "client" => $client,
                "client_id" => $record->client_id,
                "netpays" => $netpays
            ];
        }, $records);

        foreach ($records as $record) {
            $exists = array_filter($finalData, function ($item) use ($record) {
                return $item['client_id'] == $record['client_id'];
            });

            if ($exists) {
                $finalData = array_map(function ($item) use ($record) {
                    if ($item['client_id'] == $record['client_id']) {
                        $item['total'] += $record['netpays'];
                    }

                    return $item;
                }, $finalData);
            } else {
                $finalData[] = [
                    "client_id" => $record['client_id'],
                    "client" => $record['client']->name,
                    "branch" => $record['client']->branch,
                    "total" => $record['netpays'],
                    "period" => $data['period'],
                    "year" => $data['year'],
                ];
            }
        }

        return CreateTable($PER_CLIENT_TABLE_HEADER_TEXT, $PER_CLIENT_TABLE_BODY_KEY, $finalData, "client_id", false, false);
    }

    private function getLoanPayments($data)
    {
        global $CONNECTION, $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;

        if (isset($data['period']) && isset($data['year']) && isset($data['type'])) {
            $query = "SELECT * FROM loan_payments WHERE period = '{$data['period']}' AND year = '{$data['year']}' AND FIND_IN_SET(" . $data['type'] . ", loan_types)";
        } else if (isset($data['period']) && isset($data['year'])) {
            $query = "SELECT * FROM loan_payments WHERE period = '{$data['period']}' AND year = '{$data['year']}'";
        } else if (isset($data['year'])) {
            $query = "SELECT * FROM loan_payments WHERE year = '{$data['year']}'";
        } else if (isset($data['type'])) {
            $query = "SELECT * FROM loan_payments WHERE FIND_IN_SET(" . $data['type'] . ", loan_types)";
        } else if (isset($data['period'])) {
            $query = "SELECT * FROM loan_payments WHERE period = '{$data['period']}'";
        }

        $records = $CONNECTION->QUERY($query, true);

        return array_map(function ($record) use ($control) {
            $employee = $control->get($record['employee_id'], true);

            return [
                "id" => "",
                "employee" => $employee->name,
                "amount" => $record['amount'],
            ];
        }, $records);
    }

    private function getPayslipAZ($data)
    {
        global $CONNECTION, $APPLICATION;


        $id = $data['employee_id'];

        if ($id == 'all') {
            $query = "SELECT * FROM attendance_groups WHERE period = '{$data['period']}' AND year = '{$data['year']}' ";
        } else {
            $query = "SELECT a.* FROM attendance_groups as a WHERE a.period = '{$data['period']}' AND a.year = '{$data['year']}' AND a.client_id IN (SELECT b.client_id FROM deployed_employees as b WHERE b.employment_id IN (SELECT c.employment_id FROM employments as c WHERE c.employee_id = '" . $id . "')) ";
        }

        $records = $CONNECTION->Query($query, true);

        $records = array_map(function ($r) use ($APPLICATION) {
            return $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL->newInstanceOfModel($r);
        }, $records);

        if ($id == "all") {
            $records = array_map(function ($item) use ($id) {
                /**
                 * @type AttendanceGroup $item
                 *
                 */
                $analyzer = new PayrollAnalyzer($item->attendance_group_id);

                $analyzer->init();

                return $analyzer->computeAll();
            }, $records);

            $backup = [];

            foreach ($records as $record) {
                foreach ($record as $item) {
                    $item->saveAsDraft();

                    $backup[] = $item;
                }
            }

            $records = $backup;
        } else {

            $records = array_map(function ($item) use ($id) {
                /**
                 * @type AttendanceGroup $item
                 *
                 */
                $analyzer = new PayrollAnalyzer($item->attendance_group_id);

                $analyzer->init();

                $computation = $analyzer->computeAttendanceOf($id);

                $computation->saveAsDraft();

                return $computation;
            }, $records);
        }

        return $records;
    }

    private function getMortuary($data)
    {
        global $CONNECTION, $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;
        $beneficiaryControl = $APPLICATION->FUNCTIONS->BENEFICIARY_CONTROL;
        $mortuaryPaymentControl = $APPLICATION->FUNCTIONS->MORTUARY_PAYMENT_CONTROL;
        $employeeControl = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;

        $beneficiaries = $beneficiaryControl->getAllBeneficiary($data['period'], $data['year']);

        return array_map(function ($record) use ($mortuaryPaymentControl, $employeeControl, $beneficiaryControl) {
            $collections = $mortuaryPaymentControl->filterRecords(['beneficiary_id' => $record['beneficiary_id']], true);
            $beneficiary = $beneficiaryControl->get($record['beneficiary_id'], true);

            return [
                "beneficiary" => $record['name'] . " - ( " . $beneficiary->employee->name . " )",
                "collections" => array_map(function ($r) use ($employeeControl) {
                    $employee = $employeeControl->get($r->employee_id, true);
                    return [
                        "id" => "",
                        "employee" => $employee->name,
                        "amount" => $r->amount,
                        "date" => $r->date_created
                    ];
                }, $collections),
                "amount" => array_sum(array_map(function ($r) {
                    return $r->amount;
                }, $collections))
            ];
        }, $beneficiaries);
    }

    private function getPlaySlipPerClientIndividually($data)
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL;

        $records = $control->filterRecords(["period" => $data['period'], "year" => $data['year'], "client_id" => $data['client']], true);


        if (count($records) > 0) {
            $analyzer = new PayrollAnalyzer($records[0]->attendance_group_id);

            $analyzer->init();

            $computation = $analyzer->computeAll();

            return array_map(function ($r) {
                $r->saveAsDraft();
                return $r;
            }, $computation);
        }

        return [];

    }

    private function getPetty($data)
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->PETTY_CASH_REPORT_CONTROL;

        $records = $control->getAllRecords(true);

        return array_map(function ($item) use ($control) {
            return [
                "id" => "",
                "date" => $item->date_modify,
                "voucher" => $item->voucher,
                "type" => $item->type,
                "remarks" => $item->remarks,
                "in" => $item->cash_in,
                "out" => $item->cash_out,
            ];
        }, $records);
    }

    private function getTotalBank($data)
    {
        global $APPLICATION;

        $data = json_decode($data, true);

        $control = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
        $bankAccountControl = $APPLICATION->FUNCTIONS->BANK_ACCOUNT_CONTROL;
        $employeeControl = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;

        $records = $control->filterRecords(["period" => $data['period'], "year" => $data['year']], true);

        $records = array_map(function ($record) use ($bankAccountControl, $employeeControl) {
            $bankAccount = $bankAccountControl->filterRecords(["employee_id" => $record->employee_id], true);
            $employee = $employeeControl->get($record->employee_id, true);

            return [
                "id" => "",
                "employee" => $employee->name,
                "bank" => $bankAccount[0]->bank->name . ' - ' . $bankAccount[0]->bank->branch,
                "bank_account_number" => $bankAccount[0]->account_number,
                "amount" => $record->netpay,
                "bank_id" => $bankAccount[0]->bank->bank_id
            ];
        }, $records);

        // Group records by bank and sum amounts
        $bankTotals = [];

        foreach ($records as $record) {
            $bankId = $record['bank_id'];
            if (!isset($bankTotals[$bankId])) {
                $bankTotals[$bankId] = [
                    'bank' => $record['bank'],
                    'amount' => 0
                ];
            }
            $bankTotals[$bankId]['amount'] += $record['amount'];
        }

        return array_values($bankTotals);
    }
}