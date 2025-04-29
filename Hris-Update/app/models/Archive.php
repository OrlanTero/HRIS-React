<?php

namespace Application\models;

use Application\abstracts\ArchiveAbstract;

class Archive extends ArchiveAbstract
{
    protected $CONNECTION;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, ArchiveAbstract::class);
        $this->init();
    }

    private function init(): void
    {

    }
}