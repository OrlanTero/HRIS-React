<?php

use Application\controllers\app\EmailControl;
use Application\controllers\app\Response;
use Application\controllers\system\ReportControl;
use Application\controllers\system\UserAuthenticationControl;
use Application\controllers\system\UserProfileControl;
use Application\core\Authentication;
use Application\models\LoanAnalyzer;
use Application\models\PayrollAnalyzer;
use Application\models\PayslipDraft;

class PostControl
{
    public function GetEmployee()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;

        $id = $_POST["id"];

        return $control->get($id, true);
    }
    public function GetRequisition()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->REQUISITION_CONTROL;

        $id = $_POST["id"];

        return $control->get($id, true);
    }
    public function GetClient()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->CLIENT_CONTROL;

        $id = $_POST["id"];

        return $control->get($id, true);
    }

    public function GetBank()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->BANK_CONTROL;

        $id = $_POST["id"];

        return $control->get($id, true);
    }

    public function GetHoliday()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->HOLIDAY_CONTROL;

        $id = $_POST["id"];

        return $control->get($id, true);
    }

    public function GetEmployment()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->EMPLOYMENT_CONTROL;

        $id = $_POST["id"];

        return $control->get($id, true);
    }

    public function GetOverAllLoanBalanceOfEmployee()
    {
        $control = new LoanAnalyzer();

        $id = $_POST["id"];

        return $control->GetOverAllLoanBalanceOfEmployee($id);
    }

    public function GetAvailablePeriodAttendance()
    {
        global $APPLICATION, $CONNECTION;

        $control = $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL;

        $client_id = $_POST["client"];

        $query = "SELECT DISTINCT(a.period) as temp, a.*  FROM `attendance_groups` as a WHERE a.year IN (SELECT DISTINCT(a.year) FROM `attendance_groups` WHERE a.client_id = '" . $client_id . "')";
        //

        $results = $CONNECTION->Query($query, true);
        //
        return $control->NewArrayInstance($results, true);

        //        return $control->get($id, true);
    }

    public function GetVatValues()
    {
        global $VAT_VALUES, $NONVAT_VALUES;

        $vatOrNot = $_POST["vat_or_not"];

        return json_encode(filter_var($vatOrNot, FILTER_VALIDATE_BOOLEAN) === true ? $VAT_VALUES : $NONVAT_VALUES);
    }

    public function GetColumnsTable()
    {
        global $APPLICATION;

        $header = $_POST["tableHeader"];
        $body = $_POST["tableBody"];

        global ${$header}, ${$body};

        return [
            "header" => array_map(function ($a) {
                return strtolower($a) === "no" ? "ID" : $a;
            }, ${$header}),
            "body" => array_map(function ($a) {
                return is_array($a) ? $a['primary'] : (strtolower($a) === "no" ? "id" : $a);
            }, ${$body}),
        ];
    }

    public function GetLoans()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->LOAN_CONTROL;

        $ids = json_decode($_POST["ids"], true);

        return array_map(function ($id) use ($control) {
            return $control->get($id, true);
        }, $ids);
    }

    public function GetReports()
    {
        global $APPLICATION;

        $type = $_POST['type'];
        $data = json_decode($_POST["data"], true);

        $reportControl = new ReportControl($type);

        return $reportControl->getReport($data);
    }

    public function SavePayslips()
    {
        global $APPLICATION;

        $data = json_decode($_POST["data"], true);
        $type = isset($_POST["type"]) ? $_POST["type"] : null;

        $control = $APPLICATION->FUNCTIONS->PAYSLIP_DRAFT_CONTROL;
        $payslipControl = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
        $mortuaryPayment = $APPLICATION->FUNCTIONS->MORTUARY_PAYMENT_CONTROL;

        try {
            $responses = [];

            foreach ($data as $payslip) {
                $responses[] = $payslipControl->savePayslip($payslip);
            }

            return new Response(200, "Success", ["responses" => $responses]);
        } catch (Exception $exception) {
            return new Response(400, "Failed!");
        }
    }

    public function run($request)
    {
        return $this->$request();
    }

    public function SetAuthentication()
    {
        $control = new UserAuthenticationControl();

        $type = $_POST['type'];
        $data = json_decode($_POST['data'], true);

        return $control->SetAuthentication($type, $data);
    }

    public function TryAuthenticate()
    {
        $authControl = new Authentication();

        $type = $_POST['type'];
        $data = json_decode($_POST['data'], true);

        return $authControl->LoginWithAuth($type, $data);
    }

    public function ConfirmAuthenticationVerification()
    {
        global $SESSION;

        $control = new EmailControl();
        $userControl = new UserProfileControl();

        $verification = $_POST['verification'];

        $verify = $control->confirmVerificationToUser("MAIN_PROFILE", $verification);

        if ($verify) {
            $user = $userControl->getProfile();

            $SESSION->apply($user, true);
            $SESSION->start();
        }

        return new Response($verify ? 200 : 204, $verify ? "Successfully Login" : "Failed to Verify!");
    }

    public function SearchAdvanceLoan()
    {
        global $KLEIN;

        $KLEIN->service()->render("public/views/components/containers/loan_manager/search.phtml");

        return "";
    }

    public function RestoreArchive()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->ARCHIVE_CONTROL;

        $ids = json_decode($_POST["ids"], true);

        $responses = [];
        $success = 0;
        $failed = 0;

        foreach ($ids as $id) {
            $archive = $control->get($id, true);

            if ($archive) {
                // Get the corresponding table's control based on category_id
                $tableCategory = null;
                foreach (\TableNames::cases() as $case) {
                    if ($case->value === $archive->category_id) {
                        $tableCategory = $case;
                        break;
                    }
                }

                if ($tableCategory) {
                    // Find the appropriate controller for this table
                    $controller = null;
                    switch ($tableCategory) {
                        case \TableNames::EMPLOYEES:
                            $controller = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;
                            break;
                        case \TableNames::EMPLOYMENT:
                            $controller = $APPLICATION->FUNCTIONS->EMPLOYMENT_CONTROL;
                            break;
                        case \TableNames::MORTUARY:
                            $controller = $APPLICATION->FUNCTIONS->MORTUARY_CONTROL;
                            break;
                        case \TableNames::BANKS:
                            $controller = $APPLICATION->FUNCTIONS->BANK_CONTROL;
                            break;
                        case \TableNames::CLIENTS:
                            $controller = $APPLICATION->FUNCTIONS->CLIENT_CONTROL;
                            break;
                        case \TableNames::HOLIDAYS:
                            $controller = $APPLICATION->FUNCTIONS->HOLIDAY_CONTROL;
                            break;
                        case \TableNames::PAYROLL:
                            $controller = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
                            break;
                        case \TableNames::REQUISITION:
                            $controller = $APPLICATION->FUNCTIONS->REQUISITION_CONTROL;
                            break;
                        case \TableNames::LOAN_MANAGER:
                            $controller = $APPLICATION->FUNCTIONS->LOAN_CONTROL;
                            break;
                        case \TableNames::PETTY_CASH:
                            $controller = $APPLICATION->FUNCTIONS->PETTYCASH_CONTROL;
                            break;
                        // Try to match any other table categories
                        default:
                            $controllerMap = [
                                \TableNames::ATTENDANCE->value => 'ATTENDANCE_CONTROL',
                                \TableNames::ADJUSTMENTS->value => 'ADJUSTMENT_CONTROL',
                                \TableNames::DATA_MANAGEMENT->value => 'DATA_MANAGEMENT_CONTROL',
                                \TableNames::ARCHIVES->value => 'ARCHIVE_CONTROL',
                                \TableNames::DATABASE_BACKUPS->value => 'DATABASE_BACKUP_CONTROL',
                                \TableNames::AUTHENTICATION->value => 'USER_AUTHENTICATION_CONTROL',
                                \TableNames::PROFILE->value => 'USER_PROFILE_CONTROL',
                            ];

                            if (
                                isset($controllerMap[$tableCategory->value]) &&
                                isset($APPLICATION->FUNCTIONS->{$controllerMap[$tableCategory->value]})
                            ) {
                                $controller = $APPLICATION->FUNCTIONS->{$controllerMap[$tableCategory->value]};
                            }
                            break;
                    }

                    if ($controller) {
                        // Update the record to set archive_id to null (restore it)
                        $response = $controller->editRecord($archive->target_id, ['archive_id' => null]);

                        if ($response->code === 200) {
                            // Delete the archive record after successful restoration
                            $control->removeRecord($id);
                            $success++;
                        } else {
                            $failed++;
                        }

                        $responses[] = $response;
                    } else {
                        $failed++;
                    }
                } else {
                    $failed++;
                }
            } else {
                $failed++;
            }
        }

        return [
            'success' => $success > 0,
            'message' => $success . " records restored successfully, " . $failed . " failed"
        ];
    }

    public function DeleteArchive()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->ARCHIVE_CONTROL;

        $ids = json_decode($_POST["ids"], true);

        $responses = [];
        $success = 0;
        $failed = 0;

        foreach ($ids as $id) {
            $archive = $control->get($id, true);

            if ($archive) {
                // Get the corresponding table's control based on category_id
                $tableCategory = null;
                foreach (\TableNames::cases() as $case) {
                    if ($case->value === $archive->category_id) {
                        $tableCategory = $case;
                        break;
                    }
                }

                if ($tableCategory) {
                    // Find the appropriate controller for this table
                    $controller = null;
                    switch ($tableCategory) {
                        case \TableNames::EMPLOYEES:
                            $controller = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;
                            break;
                        case \TableNames::EMPLOYMENT:
                            $controller = $APPLICATION->FUNCTIONS->EMPLOYMENT_CONTROL;
                            break;
                        case \TableNames::MORTUARY:
                            $controller = $APPLICATION->FUNCTIONS->MORTUARY_CONTROL;
                            break;
                        case \TableNames::BANKS:
                            $controller = $APPLICATION->FUNCTIONS->BANK_CONTROL;
                            break;
                        case \TableNames::CLIENTS:
                            $controller = $APPLICATION->FUNCTIONS->CLIENT_CONTROL;
                            break;
                        case \TableNames::HOLIDAYS:
                            $controller = $APPLICATION->FUNCTIONS->HOLIDAY_CONTROL;
                            break;
                        case \TableNames::PAYROLL:
                            $controller = $APPLICATION->FUNCTIONS->PAYSLIP_CONTROL;
                            break;
                        case \TableNames::REQUISITION:
                            $controller = $APPLICATION->FUNCTIONS->REQUISITION_CONTROL;
                            break;
                        case \TableNames::LOAN_MANAGER:
                            $controller = $APPLICATION->FUNCTIONS->LOAN_CONTROL;
                            break;
                        case \TableNames::PETTY_CASH:
                            $controller = $APPLICATION->FUNCTIONS->PETTYCASH_CONTROL;
                            break;
                        // Try to match any other table categories
                        default:
                            $controllerMap = [
                                \TableNames::ATTENDANCE->value => 'ATTENDANCE_CONTROL',
                                \TableNames::ADJUSTMENTS->value => 'ADJUSTMENT_CONTROL',
                                \TableNames::DATA_MANAGEMENT->value => 'DATA_MANAGEMENT_CONTROL',
                                \TableNames::ARCHIVES->value => 'ARCHIVE_CONTROL',
                                \TableNames::DATABASE_BACKUPS->value => 'DATABASE_BACKUP_CONTROL',
                                \TableNames::AUTHENTICATION->value => 'USER_AUTHENTICATION_CONTROL',
                                \TableNames::PROFILE->value => 'USER_PROFILE_CONTROL',
                            ];

                            if (
                                isset($controllerMap[$tableCategory->value]) &&
                                isset($APPLICATION->FUNCTIONS->{$controllerMap[$tableCategory->value]})
                            ) {
                                $controller = $APPLICATION->FUNCTIONS->{$controllerMap[$tableCategory->value]};
                            }
                            break;
                    }

                    if ($controller) {
                        // Permanently delete the actual record
                        $response = $controller->removeRecord($archive->target_id);

                        if ($response->code === 200) {
                            // Delete the archive record after successful deletion
                            $control->removeRecord($id);
                            $success++;
                        } else {
                            $failed++;
                        }

                        $responses[] = $response;
                    } else {
                        $failed++;
                    }
                } else {
                    $failed++;
                }
            } else {
                $failed++;
            }
        }

        return [
            'success' => $success > 0,
            'message' => $success . " records deleted permanently, " . $failed . " failed"
        ];
    }
}