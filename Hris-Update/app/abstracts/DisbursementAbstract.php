<?php

namespace Application\abstracts;

abstract class DisbursementAbstract extends ModelDefaultFunctions
{
    public $disbursement_id;

    public $requisition_id;
    public $voucher;

    public $date;
    public $paid_to;

    public $type;

    public $posted;

    public $cancelled;

    public $payments;

    public $amount;

    public $remarks;

    public $request;

    public $db_status;

    public $cheque_number;

    public $cheque_date;

    public $bank_id;

    public $date_created;

    public $archive_id;


}