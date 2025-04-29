<?php

namespace Application\abstracts;

abstract class LoanAbstract extends ModelDefaultFunctions
{
    public $loan_id;

    public $employee_id;

    public $amount;

    public $balance;

    public $target_date;

    public $loan_type;

    public $payment_type;

    public $principal;

    public $interest_rate;

    public $interest_value;

    public $payable_by;

    public $description;

    public $advance;

    public $status;

    public $date_created;

    public $db_status;

    public $archive_id;


}