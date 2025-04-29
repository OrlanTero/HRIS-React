<?php

namespace Application\abstracts;

abstract class DatabaseBackupAbstract extends ModelDefaultFunctions
{
    public $backup_id;

    public $title;

    public $description;

    public $file;

    public $date_created;

    public $archive_id;

}