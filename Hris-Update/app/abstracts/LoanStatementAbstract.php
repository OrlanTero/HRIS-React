<?php

namespace Application\abstracts;

abstract class LoanStatementAbstract extends ModelDefaultFunctions
{
    public $statement_id;

    public $employee_id;

    public $loan_id;

    public $start_date;

    public $end_date;

    public $amount;

    public $balance;

    public $num;

    public $label;

    public $status;

    public $date_created;

    public $db_status;

    public $archive_id;

}