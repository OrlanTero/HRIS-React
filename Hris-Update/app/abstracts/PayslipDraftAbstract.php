<?php

namespace Application\abstracts;

abstract class PayslipDraftAbstract extends ModelDefaultFunctions
{

    public $payslip_draft_id;

    public $employee_id;

    public $client_id;

    public $payslip_rates_id;

    public $year;

    public $period;


    public $ndw;

    public $nhw;

    public $rest_day;

    public $basic_pay;

    public $nsd;

    public $nsd_basic_pay;

    public $nhw_sh;

    public $sh_basic_pay;

    public $nhw_shot;

    public $shot_basic_pay;

    public $sss;

    public $phil;

    public $insurance;

    public $gross_pay;

    public $part1;

    public $death;

    public $pagibig;

    public $part2;

    public $netpay;

    public $regular_hours;

    public $total_hours;

    public $ot_hours;

    public $night_diff_hours;

    public $special_holiday_ot_hours;

    public $special_holiday_hours;

    public $legal_holiday_hours;

    public $legal_holiday_ot_hours;

    public $nhw_lh;

    public $nhw_lhot;

    public $lh_basic_pay;

    public $lhot_basic_pay;

    public $nhw_ot;

    public $others;

    public $beneficiaries;


    public $date_created;

    public $db_status;

    public $archive_id;



}