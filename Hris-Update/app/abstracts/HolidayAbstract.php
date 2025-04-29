<?php

namespace Application\abstracts;

abstract class HolidayAbstract extends ModelDefaultFunctions
{
    public $holiday_id;

    public $holiday_date;

    public $holiday;

    public $national_local = "";

    public $date_created;

    public $db_status;

    public $archive_id;


}