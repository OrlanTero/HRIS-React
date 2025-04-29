<?php

namespace Application\abstracts;

abstract class LoanAdvanceAbstract extends ModelDefaultFunctions
{
    public $loan_id;

    public $employee_id;

    public $amount;

    public $balance;

    public $target_date;

    public $loan_type;

    public $description;

    public $interest_rate;

    public $payment_type;

    public $principal;

    public $payable_by;

    public $status;

    public $advance;

    public $date_created;

    public $db_status;

    public $archive_id;

}