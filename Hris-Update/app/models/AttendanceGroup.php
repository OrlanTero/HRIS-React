<?php

namespace Application\models;

use Application\abstracts\AttendanceGroupAbstract;

class AttendanceGroup extends AttendanceGroupAbstract
{
    protected $CONNECTION;

    /**
     * @type Client
     */
    public $client;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, AttendanceGroupAbstract::class);
        $this->init();
    }

    private function init(): void
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->CLIENT_CONTROL;

        $this->client = $control->get($this->client_id, true);
    }

    public function getAttendanceOf($employee_id) {
        global $APPLICATION;

        return $APPLICATION->FUNCTIONS->ATTENDANCE_CONTROL->filterRecords(['attendance_group_id' => $this->attendance_group_id, 'employee_id' => $employee_id], true);
    }

    public function getNumberOfDaysWorkOf($employee_id) {
        global $CONNECTION;

        $query = "SELECT DISTINCT (day) FROM attendance WHERE attendance_group_id = '" . $this->attendance_group_id . "' AND employee_id = '" . $employee_id . "'";

        return count($CONNECTION->Query($query, true));
    }

    public function getAttendances() {
        global $APPLICATION;

        return $APPLICATION->FUNCTIONS->ATTENDANCE_CONTROL->filterRecords(['attendance_group_id' => $this->attendance_group_id], true);
    }

    public function getAttendanceOfEmployee($employee_id, $employment_id = -1)
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->EMPLOYEE_CONTROL;
        $employmentControl = $APPLICATION->FUNCTIONS->EMPLOYMENT_CONTROL;;

        $employment = $employmentControl->getOnlyRecord(["employee_id" => $employee_id], true);

        $employee = $control->get($employee_id, true);

        return [
            "employee" => $employee,
            "employment" => $employment,
            "attendance" => $this->getAttendanceOf($employee_id),
            "ndw" => $this->getNumberOfDaysWorkOf($employee_id)
        ];
    }

    public function getAttedanceOfEachEmployee() {
        return array_map(function ($data) {
            return $this->getAttendanceOfEmployee($data[0], $data[1]);
        }, array_map(function ($dep) {
            return [$dep->employment['employee_id'], $dep->employment['employment_id']];
        }, $this->client->deployed_employees));
    }

    public function getValueOfAttendanceIn($attendances, $day, $type) {
        foreach ($attendances as $attendance) {
            if ($attendance->day == $day && $attendance->type == $type) {
                return $attendance;
            }
        }
    }
}