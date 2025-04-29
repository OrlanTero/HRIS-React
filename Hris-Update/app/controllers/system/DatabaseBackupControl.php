<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Bank;
use Application\models\DatabaseBackup;

class DatabaseBackupControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = DatabaseBackup::class;
    protected $TABLE_NAME = "database_backups";
    protected $TABLE_PRIMARY_ID = "backup_id";
    protected $SEARCH_LOOKUP = ["title", "description", "file", "date_created"];

    protected $CATEGORY = \ActivityLogCategories::DATA_MANAGEMENT;

    protected $TABLE_CATEGORY = \TableNames::DATABASE_BACKUPS;


    public function add($record)
    {
        global $CONNECTION;

        $file = $CONNECTION->BackupDatabase();

        $record['file'] = $file;

        ob_end_clean();

        return $this->addRecordWithLog($record);
    }
}