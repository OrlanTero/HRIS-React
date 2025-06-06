<?php

namespace Application\abstracts;

abstract class AttendanceAbstract extends ModelDefaultFunctions
{
    public $attendance_id;

    public $attendance_group_id;

    public $employee_id;

    public $type;

    public $day;

    public $hours;
    public $db_status;

    public $archive_id;


    public $date_created;
}