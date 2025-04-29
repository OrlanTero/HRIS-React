<?php

namespace Application\abstracts;

abstract class AdjustmentAbstract extends ModelDefaultFunctions
{
    public $adjustment_id;

    public $date_created;

    public $employee_id;

    public $posted;

    public $paid;

    public $db_status;

    public $archive_id;

    public $amount;
}