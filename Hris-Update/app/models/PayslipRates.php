<?php

namespace Application\models;

use Application\abstracts\PayslipRatesAbstract;
use Application\abstracts\SystemTypeAbstract;
use Application\controllers\app\Response;

class PayslipRates extends PayslipRatesAbstract
{
    protected $CONNECTION;

    public function __construct($userData = [])
    {
        global $CONNECTION;

        $this->CONNECTION = $CONNECTION;
        $this->applyData($userData, PayslipRatesAbstract::class);
        $this->init();
    }

    private function init(): void
    {

    }

    public function byClient(Client $client, Employment $employment)
    {
        $this->client_id = $client->client_id;

        $this->regular = $client->regular_2;

        $this->ot = $client->overtime_2;

        $this->night_diff = $client->nightdiff;

        $this->special_holiday = $client->special_holiday;

        $this->special_holiday_ot = $client->special_holiday_ot;

        $this->uniform = $client->uniform;

        $this->rest_day = $client->restday;

        $this->sea = $client->sea;

        $this->cola = $client->cola;

        $this->leave_rate = $client->leave_1;

        $this->allowance = $client->allowance;

        $this->head_guard_allowance = $employment->position == \EmploymentPositionTypes::HEAD_GUARD->value ? $client->head_guard_allowance : 0;

        $this->ctpa = $client->ctpa;

        $this->legal_holiday = $client->legal_holiday;

        $this->legal_holiday_ot = $client->legal_holiday_ot;
    }

    public function save()
    {
        global $APPLICATION;

        $control = $APPLICATION->FUNCTIONS->PAYSLIP_RATES_CONTROL;

        $data = $this->getData();

        $exists = $control->alreadyExists($data);

        if ($exists->code == 200) {
            return $exists;
        }

        return $control->addRecord($data);
    }

    public function e($a)
    {
        return (empty($a) || $a == 0 || $a == "0") ? "0" : $a;
    }
    private function getData()
    {
        return [
            'client_id' => $this->e($this->client_id),
            'regular' => $this->e($this->regular),
            'overtime' => $this->e($this->ot),
            'night_diff' => $this->e($this->night_diff),
            'special_holiday' => $this->e($this->special_holiday),
            'special_holiday_ot' => $this->e($this->special_holiday_ot),
            'uniform' => $this->e($this->uniform),
            'rest_day' => $this->e($this->rest_day),
            'sea' => $this->e($this->sea),
            'cola' => $this->e($this->cola),
            'leave_rate' => $this->e($this->leave_rate),
            'allowance' => $this->e($this->allowance),
            'head_guard_allowance' => $this->e($this->head_guard_allowance),
            'ctpa' => $this->e($this->ctpa),
            'legal_holiday' => $this->e($this->legal_holiday),
            'legal_holiday_ot' => $this->e($this->legal_holiday_ot),
        ];
    }
}