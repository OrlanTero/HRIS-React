<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\controllers\app\Response;
use Application\models\Attendance;
use Application\models\AttendanceGroup;
use Application\models\ClientHoliday;
use PHPMailer\PHPMailer\Exception;

class AttendanceControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = Attendance::class;
    protected $TABLE_NAME = "attendance";
    protected $TABLE_PRIMARY_ID = "attendance_id";
    protected $SEARCH_LOOKUP = [];

    protected $CATEGORY = \ActivityLogCategories::ATTENDANCE;

    protected $TABLE_CATEGORY = \TableNames::ATTENDANCE;

    public function add($data)
    {
        global $ACTIVITY_CONTROL, $APPLICATION;

        /**
         * @type AttendanceGroup $attendanceGroup
         * @type ClientHoliday $holidays
         */
        $employmentControl = $APPLICATION->FUNCTIONS->EMPLOYMENT_CONTROL;
        $holidayControl = $APPLICATION->FUNCTIONS->CLIENT_HOLIDAY_CONTROL;
        $holiday1Control = $APPLICATION->FUNCTIONS->HOLIDAY_CONTROL;
        $attControl = $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL;
        $attendanceGroup = $attControl->get($data[0]['attendance_group_id'], true);

        $holidays = $holidayControl->filterRecords(['client_id' => $attendanceGroup->client_id], true);
        $national_holidays = array_map(function ($record) {
            return new ClientHoliday([
                "client_holiday_id" => -1,
                "holiday_id" => $record->holiday_id
            ]);
        }, $holiday1Control->filterRecords(['national_local' => "National Holiday"], true));
        $holidays = array_merge($holidays, $national_holidays);

        $holidays = array_map(function ($holiday) {
            return date("Y-m-d", strtotime($holiday->holiday->holiday_date));
        }, $holidays);

        try {
            foreach ($data as $attendance) {
                $employment = $employmentControl->get($attendance['employment_id'], false);
                $status = $attendance['status'];
                $id = $attendance['id'];

                unset($attendance['status'], $attendance['id'], $attendance['employment_id']);

                $month = GetMonthFromPeriod($attendanceGroup->period);
                $day = $attendance['day'];
                $year = $attendanceGroup->year;
                $hours = $attendance['hours'];

                $date = ParsePeriodIntoDate($month, $day, $year);
                $actual_day = date('l', strtotime($date));

                $is_holiday = in_array($date, $holidays);
                $is_restday = strtolower($employment['rest_day_1']) == strtolower($actual_day) || strtolower($employment['rest_day_2']) == strtolower($actual_day);

                if ($is_holiday || $is_restday) {
                    if ($is_holiday) {
                        // switch to legal holiday
                        $attendance['type'] = $attendance['type'] == 0 ? 3 : ($attendance['type'] == 1 ? 6 : 3);

                        $exists = $this->alreadyExists([
                            "attendance_group_id" => $attendance['attendance_group_id'],
                            "employee_id" => $attendance['employee_id'],
                            "type" => $attendance['type'],
                            "day" => $attendance['day']
                        ]);

                        if ($status === 333) {
                            $this->removeRecord($id);
                        }

                        if ($exists->code == 200) {
                            $this->editRecord($exists->body['id'], [
                                "attendance_group_id" => $attendance['attendance_group_id'],
                                "employee_id" => $attendance['employee_id'],
                                "type" => $attendance['type'],
                                "day" => $attendance['day'],
                                "hours" => $hours
                            ]);
                        } else {
                            $this->addRecord($attendance);
                        }
                    }

                    if ($is_restday) {
                        $attendance['type'] = 5;

                        if ($status === 333) {
                            $this->removeRecord($id);
                        }

                        $this->MakeThisRestDay($attendance);
                    }
                } else {
                    // add
                    if ($status === 222) {
                        $this->addRecord($attendance);

                        // update
                    } else if ($status === 333) {
                        $this->editRecord($id, $attendance);
                    }
                }

            }

            $ACTIVITY_CONTROL->insert($this->CATEGORY, \ActivityLogActionTypes::MODIFY, 200);

            return new Response(200, "Successfully Saved");
        } catch (\Exception $e) {
            $ACTIVITY_CONTROL->insert($this->CATEGORY, \ActivityLogActionTypes::MODIFY, 204);

            return new Response(204, "Failed to Save!");
        }
    }

    public function Unset($id)
    {
        $this->removeRecord($id);
    }
    public function MakeThisRestDay($attendance)
    {
        $attendance['type'] = 5;

        $exists = $this->alreadyExists([
            "attendance_group_id" => $attendance['attendance_group_id'],
            "employee_id" => $attendance['employee_id'],
            "type" => $attendance['type'],
            "day" => $attendance['day']
        ]);

        if ($exists->code == 200) {
            $this->editRecord($exists->body['id'], [
                "attendance_group_id" => $attendance['attendance_group_id'],
                "employee_id" => $attendance['employee_id'],
                "type" => $attendance['type'],
                "day" => $attendance['day'],
                "hours" => 8
            ]);
        } else {
            $this->addRecord($attendance);
        }
    }

    public function ISHoliday($attendance)
    {
        global $APPLICATION;

        if ($attendance == null)
            return null;

        $holidayControl = $APPLICATION->FUNCTIONS->CLIENT_HOLIDAY_CONTROL;
        $holiday1Control = $APPLICATION->FUNCTIONS->HOLIDAY_CONTROL;
        $attControl = $APPLICATION->FUNCTIONS->ATTENDANCE_GROUP_CONTROL;

        $attendanceGroup = $attControl->get($attendance->attendance_group_id, false);

        $holidays = $holidayControl->filterRecords(['client_id' => $attendanceGroup['client_id']], true);
        $national_holidays = array_map(function ($record) {
            return new ClientHoliday([
                "client_holiday_id" => -1,
                "holiday_id" => $record->holiday_id,
            ]);
        }, $holiday1Control->filterRecords(['national_local' => "National Holiday"], true));
        $holidays = array_merge($holidays, $national_holidays);

        $month = GetMonthFromPeriod($attendanceGroup['period']);
        $day = $attendance->day;
        $year = $attendanceGroup['year'];

        $date = ParsePeriodIntoDate($month, $day, $year);

        foreach ($holidays as $holiday) {
            if (strcmp($holiday->holiday->holiday_date, $date) == 0) {
                return $holiday;
            }
        }

        return null;
    }
    public function ISHolidayOnlyDate($month, $day, $year, $holidays)
    {
        $date = ParsePeriodIntoDate($month, $day, $year);

        foreach ($holidays as $holiday) {
            if (strcmp(date("Y-m-d", strtotime($holiday->holiday->holiday_date)), date("Y-m-d", strtotime($date))) == 0) {
                return $holiday;
            }
        }

        return null;
    }
}