<?php

namespace Application\controllers\system;

use Application\abstracts\ControlDefaultFunctions;
use Application\models\Archive;

class ArchiveControl extends ControlDefaultFunctions
{
    protected $MODEL_CLASS = Archive::class;
    protected $TABLE_NAME = "archives";
    protected $TABLE_PRIMARY_ID = "archive_id";
    protected $SEARCH_LOOKUP = [];

    protected $TABLE_CATEGORY = \TableNames::ARCHIVES;

    public function insert($category_id, $target_id, $user_id = "MAIN_PROFILE")
    {
        global $CONNECTION;

        $data = [
            "category_id" => $category_id,
            "target_id" => (int) $target_id,
            "user_id" => $user_id,
        ];

        return $this->addRecord($data);
    }

}