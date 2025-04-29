<?php

namespace Application\abstracts;

abstract class SystemTypeAbstract extends ModelDefaultFunctions
{
    public $type_id;

    public $type;

    public $category;
    public $affects_in;
    public $affects_value;

    public $db_status;
    public $archive_id;

}