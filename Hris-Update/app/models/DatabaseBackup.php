<?php

namespace Application\models;

use Application\abstracts\DatabaseBackupAbstract;

class DatabaseBackup extends DatabaseBackupAbstract
{
    protected $CONNECTION;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, DatabaseBackupAbstract::class);
        $this->init();
    }

    private function init(): void
    {

    }
}