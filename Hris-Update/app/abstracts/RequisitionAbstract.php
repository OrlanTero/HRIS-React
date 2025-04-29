<?php

namespace Application\abstracts;

abstract class RequisitionAbstract extends ModelDefaultFunctions
{
    public $requisition_id;

    public $req_id;

    public $date;

    public $remarks;

    public $type;

    public $status;

    public $paid_to;

    public $amount;

    public $req_date;

    public $db_status;
    public $archive_id;


}