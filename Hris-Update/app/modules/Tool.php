<?php

use Application\controllers\app\Response;
use Application\models\AttendanceGroup;
use Application\models\ClientHoliday;
use Carbon\Carbon;

function UseIcon($name, $folder = '', $extension = '')
{
    $folder = empty($folder) ? 'phosphor' : $folder;
    $extension = empty($extension) ? "svg" : $extension;
    $PATH = './public/assets/media/icons/' . $folder . '/';
    $ICON = $PATH . $name . "." . $extension;

    if (file_exists($ICON)) {
        return file_get_contents($ICON);
    }

    return null;
}

function UseMiniIcon($name, $x, $y, $width, $height, $folder = 'mini-icons', $extension = 'png'): string
{
    $PATH = '/public/assets/media/' . $folder . '/';
    $I = $PATH . $name . "." . $extension;

    $styles = array(
        "width" => $width . "px",
        "height" => $height . "px",
        "background-position" => $x . 'px' . ' ' . $y . 'px',
        "background-size" => "auto",
        "background-repeat" => "no-repeat",
        "display" => "inline-block",
        "background-image" => 'url("' . $I . '")'
    );

    $style = implode(";", array_map(static function ($key, $value) {
        return $key . ":" . $value;
    }, array_keys($styles), array_values($styles)));

    return "<i data-visualcompletion='css-img' style='" . $style . "'></i>";
}

function UseSVG($name, $folder = 'icons/phosphor', $extension = 'svg')
{
    $folder = empty($folder) ? 'phosphor' : $folder;
    $extension = empty($extension) ? "svg" : $extension;
    $PATH = './public/assets/media/' . $folder . '/';
    $SVG = $PATH . $name . "." . $extension;

    if (file_exists($SVG)) {
        return file_get_contents($SVG);
    }

    return null;
}

function UseImage($image, $asImage = false, $alt = "", $classNames = "", $styles = ""): string
{
    $path = '/public/assets/media/';
    $src = $path . $image;
    $img = '<img src="' . $src . '" alt="' . $alt . '" class="' . $classNames . '"  style="' . $styles . '"/>';

    return $asImage ? $img : $src;
}

function CreateCheckbox($name = "", $checked = false)
{
    $output = '
    <div class="custom-checkbox-parent">
        <div class="checkbox-content">
            <div class="circle"></div>
            <label class="custom-checkbox">
                <input type="checkbox" name="' . $name . '" class="table-checkbox" ' . ($checked ? 'checked' : '') . '>
                <span class="checkmark"></span>
            </label>
        </div>
    </div>
    ';

    return $output;
}

/**
 * @throws ReflectionException
 */
function NewInstanceOfModelClass($model, $record)
{
    return (new ReflectionClass($model))->newInstance($record);
}

/**
 * @throws ReflectionException
 */
function GetClassMemberByID($data, $id)
{
    $controller = NewInstanceOfModelClass($data['controller'], false);

    $model = $controller->get($id, true);

    if (!$model) {
        return "";
    }

    if (!is_array($data['value'])) {
        return $model->{$data['value']};
    }

    return $model->{$data['value'][0]}->{$data['value'][1]};
}

function GetEnumValueOf($enum, $value)
{
    if (is_numeric($value)) {
        return str_replace("_", " ", $enum[$value - 1]);
    }
    return str_replace("_", " ", $value);
}

function CreateEmployeeAttendanceTable($attendance_group, $employee, $employment)
{
    global $ATTENDANCE_TYPES, $APPLICATION;

    $holidayControl = $APPLICATION->FUNCTIONS->CLIENT_HOLIDAY_CONTROL;
    $holiday1Control = $APPLICATION->FUNCTIONS->HOLIDAY_CONTROL;
    $attendanceControl = $APPLICATION->FUNCTIONS->ATTENDANCE_CONTROL;

    $holidays = $holidayControl->filterRecords(['client_id' => $attendance_group->client_id], true);
    $national_holidays = array_map(function ($record) {
        return new ClientHoliday([
            "client_holiday_id" => -1,
            "holiday_id" => $record->holiday_id,
        ]);
    }, $holiday1Control->filterRecords(['national_local' => "National Holiday"], true));
    $holidays = array_merge($holidays, $national_holidays);

    $days = CountDaysInPeriod($attendance_group->period);
    $month = GetMonthFromPeriod($attendance_group->period);

    $attendances = $attendance_group->getAttendanceOf($employee->employee_id);

    $output = '
        <div class="attendance-table-container" data-employment-id="' . $employment['employment_id'] . '" data-employee-id="' . $employee->employee_id . '" data-attendance-id="' . $attendance_group->attendance_group_id . '">
            <div class="top">
                <div class="left">
                   <h4>' . $employee->name . '</h4>
                </div>
            </div>
            <div class="bot">
                <div class="custom-attendance-table">
                    <table>
                        <thead class="header">
                            <tr>
                                <th>A Type</th>';

    for ($i = $days[0][0]; $i <= $days[0][1]; $i++) {
        $date = ParsePeriodIntoDate($month, $i, $attendance_group->year);
        $output .= '<th class="tooltip sched-item day-item-th " data-day="' . $i . '">
                        <div class="tooltiptext"><span>' . date('l', strtotime($date)) . '</span></div>
                        <span>' . $i . '</span>
                    </th>';
    }

    $output .= '<th>Total</th></tr></thead><tbody class="body">';

    foreach ($ATTENDANCE_TYPES as $index => $ATTENDANCE_TYPE) {
        $output .= '<tr class="type-item attendance" data-type="' . $index . '">';
        $output .= '<td data-type="' . $index . '"> <span class="text">' . $ATTENDANCE_TYPE . '</span> </td>';

        for ($i = $days[0][0]; $i <= $days[0][1]; $i++) {
            $value = $attendance_group->getValueOfAttendanceIn($attendances, $i, $index);
            $date = ParsePeriodIntoDate($month, $i, $attendance_group->year);
            $day = date('l', strtotime($date));

            $isRestday = strtolower($employment['rest_day_1']) == strtolower($day) || strtolower($employment['rest_day_2']) == strtolower($day);
            $isHoliday = $attendanceControl->ISHolidayOnlyDate(GetMonthFromPeriod($attendance_group->period), $i, $attendance_group->year, $holidays);

            if ($isRestday && $index != 5 && $index != 3 && $value) {
                $attendanceControl->Unset($value->attendance_id);
                $attendanceControl->MakeThisRestDay((array) $value);
            }

            $output .= '<td class="sched-item day-item-td tooltip as-table" data-day="' . $i . '"  data-type="' . $index . '" data-id="' . ($value ? $value->attendance_id : null) . '">
                            <span class="tooltiptext">
                                <span>' . $ATTENDANCE_TYPE . ' day ' . $i . '  ' . (($isHoliday != null) ? '( ' . $isHoliday->holiday->holiday . ' )' : "") . ($isRestday ? '( REST DAY )' : "") . '</span>
                            </span>
                            <div class="text">' . ($value ? $value->hours : null) . '</div>
                        </td>';
        }

        $output .= '<td class="day-total"><div class="text">0</div></td></tr>';
    }

    $output .= '<tr class="type-item"><td><span class="text">Total</span></td>';

    for ($i = $days[0][0]; $i <= $days[0][1]; $i++) {
        $output .= '<td class="sched-item day-item-td tooltip as-table tooltip-top all-total" data-day="' . $i . '"  data-type="' . $i . '">
                        <span class="tooltiptext">
                            <span>Total day ' . $i . '</span>
                        </span>
                        <div class="text"></div>
                    </td>';
    }

    $output .= '<td class="day-main-total the-most-total"><div class="text">0</div></td></tr>';

    $output .= '        </tbody>
                </table>
            </div>
        </div>
    </div>';

    return $output;
}
function CreateTable($headerItems, $bodyItems, $data, $idName, $button = -1, $noCheckbox = false, $small = false, $scrollable = true, $fixed = true, $mappedColor = [], $autoSize = false, $hideColumns = [])
{
    $tableClasses = [
        'custom-grid-table',
        $autoSize ? 'auto-height' : '',
        $small ? 'small-size' : '',
        $fixed ? 'fixed-width' : '',
        $scrollable ? '' : 'no-scroll'
    ];

    $output = '<div class="' . trim(implode(' ', $tableClasses)) . '">
                <table class="' . ($noCheckbox ? 'no-check-box' : 'has-check-box') . '">';

    $output .= '<thead class="grid-table-header"><tr>';

    if (!$noCheckbox) {
        $output .= '<th>' . CreateCheckbox() . '</th>';
    }

    foreach ($headerItems as $hi => $item) {
        if (!in_array($hi, $hideColumns)) {
            $color = FindColorInTable($hi, $mappedColor);
            $val = is_array($bodyItems[$hi]) ? ($bodyItems[$hi]["value"] ?? "") : $bodyItems[$hi];
            $style = $color ? 'style="' . (isset($color['align']) ? 'text-align: ' . $color['align'] : '') . '"' : '';
            $output .= "<th {$style} data-t=\"" . (is_array($val) ? '' : htmlspecialchars((string) $val)) . "\">{$item}</th>";
        }
    }

    $output .= '</tr></thead><tbody class="grid-table-body">';

    foreach ($data as $count => $item) {
        $item = (array) $item;
        $output .= '<tr class="body-item" data-id="' . $item[$idName] . '">';

        if (!$noCheckbox) {
            $output .= '<td>' . CreateCheckbox() . '</td>';
        }

        foreach ($bodyItems as $i => $key) {
            if (!in_array($i, $hideColumns)) {
                $content = getContent($key, $item, $count + 1);
                $color = FindColorInTable($i, $mappedColor);
                $style = $color ? 'style="background-color: ' . $color['color'] . ';' . (isset($color['align']) ? 'text-align: ' . $color['align'] : '') . '"' : '';

                if ($i === $button - 1) {
                    $output .= '<td><div class="icon-button align-left"><div class="text"><span>' . $content . '</span></div></div></td>';
                } else {
                    $output .= "<td {$style}>" . (is_array($content) ? '' : htmlspecialchars((string) $content)) . "</td>";
                }
            }
        }

        $output .= '</tr>';
    }

    $output .= '</tbody></table></div>';

    return $output;
}

function getContent($key, $item, $count)
{
    if (!is_array($key)) {
        return strtolower($key) === 'no' ? $count : $item[$key];
    }

    if (isset($key['enum'])) {
        return GetEnumValueOf($key['enum'], $item[$key['value']]);
    }

    if (isset($key['primary'])) {
        return GetClassMemberByID($key, $item[$key['primary']]);
    }

    return $item[$key['property']]->{$key['target']};
}

function CreateTableAsOptions($options = [])
{
    // Default options
    $defaults = [
        'headerItems' => [],
        'bodyItems' => [],
        'data' => [],
        'idName' => '',
        'button' => -1,
        'noCheckbox' => false,
        'small' => false,
        'scrollable' => true,
        'fixed' => true,
        'mappedColor' => [],
        'autoSize' => false,
        'hideColumns' => [],
        'toggleColumns' => [],
        'toggleValue' => false,
    ];

    // Merge provided options with defaults
    $options = array_merge($defaults, $options);

    // Extract variables for easier access
    extract($options);

    $tableClasses = [
        'custom-grid-table',
        $autoSize ? 'auto-height' : '',
        $small ? 'small-size' : '',
        $fixed ? 'fixed-width' : '',
        $scrollable ? '' : 'no-scroll',
        $noCheckbox ? 'no-check-box' : 'has-check-box'
    ];

    $output = '<div class="' . implode(' ', array_filter($tableClasses)) . '"><table data-is-toggle="' . (count($toggleColumns) > 0 ? "true" : "false") . '" data-toggle-value="' . ($toggleValue ? "true" : "false") . '">';

    // Generate header
    $output .= '<thead class="grid-table-header"><tr>';
    if (!$noCheckbox) {
        $output .= '<th>' . CreateCheckbox() . '</th>';
    }

    foreach ($headerItems as $hi => $item) {
        if (!in_array($hi, $hideColumns)) {
            $isToggle = in_array($hi, $toggleColumns);
            $color = FindColorInTable($hi, $mappedColor);
            $val = is_array($bodyItems[$hi]) ? ($bodyItems[$hi]["value"] ?? "") : $bodyItems[$hi];
            $style = $color ? 'style="' . (isset($color['align']) ? 'text-align: ' . $color['align'] : '') . '"' : '';
            $output .= "<th {$style}  data-t=\"" . (is_array($val) ? "" : htmlspecialchars($val)) . "\" data-toggle=\"" . ($isToggle == 1 ? "true" : "false") . "\" data-toggle-value=\"" . ($isToggle == 1 ? "true" : "false") . "\" >{$item}</th>";
        }
    }
    $output .= '</tr></thead>';

    // Generate body
    $output .= '<tbody class="grid-table-body">';
    foreach ($data as $count => $item) {

        $item = (array) $item;
        $output .= '<tr class="body-item" data-id="' . htmlspecialchars($item[$idName]) . '">';

        if (!$noCheckbox) {
            $output .= '<td>' . CreateCheckbox() . '</td>';
        }

        $bitem = array_fill(0, count($bodyItems), $item);
        $contents = array_map(function ($key, $val) use ($count) {
            if (!is_array($key)) {
                return strtolower($key) === 'no' ? $count + 1 : $val[$key];
            }
            if (isset($key['enum'])) {
                return GetEnumValueOf($key['enum'], $val[$key['value']]);
            }
            if (isset($key['primary'])) {
                return GetClassMemberByID($key, $val[$key['primary']]);
            }
            return $val[$key['property']]->{$key['target']};
        }, $bodyItems, $bitem);

        foreach ($contents as $i => $content) {
            if (!in_array($i, $hideColumns)) {
                $isToggle = in_array($i, $toggleColumns);
                if ($i === $button - 1) {
                    $output .= generateButtonCell($content);
                } else {
                    $output .= generateContentCell($content, $i, $mappedColor, $isToggle, $toggleValue);
                }
            }
        }

        $output .= '</tr>';
    }

    $output .= '</tbody></table></div>';

    return $output;
}

function generateButtonCell($content)
{
    return '
    <td>
        <div class="icon-button align-left">
            <div class="text">
                <span>' . (is_array($content) ? '' : htmlspecialchars((string) $content)) . '</span>
            </div>
        </div>
    </td>
    ';
}

function generateContentCell($content, $index, $mappedColor, $isToggle, $toggleValue)
{
    $color = FindColorInTable($index, $mappedColor);
    $style = '';
    if ($color) {
        $style = 'style="background-color: ' . htmlspecialchars($color['color']) . ';' .
            (isset($color['align']) ? 'text-align: ' . htmlspecialchars($color['align']) : '') . '"';
    }
    return "<td {$style} data-toggle=\"" . ($isToggle == 1 ? "true" : "false") . "\" " . ($isToggle == 1 ? "data-toggle-value=\"" . ($toggleValue ? "true" : "false") . "\"" : "") . ">" . (is_array($content) ? '' : htmlspecialchars((string) $content)) . '</td>';
}

function FindColorInTable($index, $mappedColor = [])
{
    foreach ($mappedColor as $color) {
        if ($color['column'] === $index) {
            return $color;
        }
    }

    return null;
}


function CreateComboBox($name, $placeholder, $items, $firstval = false, $initial = null, $disabled = false): string
{
    $value = $initial ? (!is_array($initial) ? $initial : $initial['text']) : ($firstval ? $items[0] : "");
    $defValue = $initial ? (!is_array($initial) ? $initial : $initial['value']) : '';
    $output = '<div class="custom-combo-box ' . $name . '">';
    $output .= '
    <div class="main-content">
    <input type="text" value="' . $value . '" name="' . $name . '"  placeholder="' . $placeholder . '" autocomplete="off" data-value="' . $defValue . '"  ' . ($disabled ? " disabled " : "") . '  >
        <div class="icon">
        <svg width="16px" height="16px" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg">
            <path d="M128,180a3.98881,3.98881,0,0,1-2.82861-1.17139l-80-80.00024a4.00009,4.00009,0,0,1,5.65722-5.65674L128,170.34326l77.17139-77.17163a4.00009,4.00009,0,0,1,5.65722,5.65674l-80,80.00024A3.98881,3.98881,0,0,1,128,180Z"/>
        </svg>      
        </div>
    </div>
    <div class="floating-container">';

    if (!empty($items)) {

        foreach ($items as $item) {
            if (isset($item["value"])) {
                $output .= '
                            <div class="item" value="' . $item["value"] . '"><span>' . $item["text"] . '</span></div>
                        ';
            } else {
                $output .= '
                            <div class="item"><span>' . $item . '</span></div>
                        ';
            }
        }
    }

    $output .= '</div>';
    $output .= '</div>';

    return $output;
}

function UploadImageFromPath($fromPath, $filename, $topath)
{
    $extension = pathinfo($fromPath, PATHINFO_EXTENSION);
    $path = $topath . $filename . '.' . $extension;
    $msg = "Successfully Uploaded!";

    if (!file_exists($topath) && !mkdir($topath, 0777, true) && !is_dir($topath)) {
        $msg = 'Directory "%s" was not created';
    }

    $imageData = file_get_contents($fromPath);
    $upload = file_put_contents($path, $imageData);

    return new Response($upload ? 200 : 203, $msg, ["filename" => $filename, "path" => $path]);
}

function UploadImageFromBase64($base64Data, $topath, $filename, $extension = 'jpg')
{

    $path = $topath . $filename . '.' . $extension;
    $msg = "Successfully Uploaded!";

    if (!file_exists($topath) && !mkdir($topath, 0777, true) && !is_dir($topath)) {
        $msg = 'Directory "%s" was not created';
    }

    $data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $base64Data));

    $upload = file_put_contents($path, $data);

    return new Response($upload ? 200 : 203, $msg, ["filename" => $filename, "path" => $path]);
}

function UploadImageFromFile($file, $_filename, $topath)
{
    $extension = pathinfo($file["name"], PATHINFO_EXTENSION);
    $filename = $_filename . '.' . $extension;
    $target_file = $topath . $filename;
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
    $msg = "";
    $uploadOk = -1;

    $check = getimagesize($file["tmp_name"]);

    if ($check !== false) {
        $msg = "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        $msg = "File is not an image.";
        $uploadOk = 0;
    }

    if (file_exists($target_file)) {
        $msg = "Sorry, file already exists.";
        $uploadOk = 0;
    }

    if (!file_exists($topath) && !mkdir($topath, 0777, true) && !is_dir($topath)) {
        $msg = 'Directory "%s" was not created';
    }

    if (
        ($imageFileType !== "jpg") && $imageFileType !== "png" && $imageFileType !== "jpeg"
        && $imageFileType !== "gif"
    ) {
        $msg = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
        $uploadOk = 0;
    }

    if ($uploadOk == 0) {
        $msg = "Sorry, your file was not uploaded.";
    } else if (move_uploaded_file($file["tmp_name"], $target_file)) {
        $msg = "Successfully uploaded!";
    }

    return new Response($uploadOk ? 200 : 203, $msg, ["filename" => $filename, "path" => $target_file]);
}

function UploadFileFromFile($FILE, $TOPATH, $FILENAME = false)
{
    $extension = pathinfo($FILE["name"], PATHINFO_EXTENSION);
    $fileTmpPath = $FILE['tmp_name'];
    $fileName = $FILENAME && $FILENAME != 'false' ? $FILENAME . '.' . $extension : $FILE['name'];
    $dest_path = $TOPATH . $fileName;
    $i = 1;

    while (file_exists($dest_path)) {
        $fn = pathinfo($fileName, PATHINFO_FILENAME);
        $nfn = $fn . '(' . $i . ').' . $extension;
        $dest_path = $TOPATH . $nfn;
        $i++;
    }

    $upload = move_uploaded_file($fileTmpPath, $dest_path);
    $message = 'File is successfully uploaded.';
    $message1 = 'There was some error moving the file to upload directory. Please make sure the upload directory is writable by web server.';
    return new Response($upload ? 200 : 204, $upload ? $message : $message1, ["path" => $dest_path, "basename" => pathinfo($dest_path, PATHINFO_BASENAME)]);
}

function ObjectToItemList($objectArr = [])
{
    $output = '';

    if (empty($objectArr)) {
        $output .= '
            <div id="empty">
            <h3>There\'s nothing to show</h3>
</div>
        ';
    } else {
        foreach ($objectArr as $item) {
            $status = ['danger', 'success', 'warning'][$item->status_id];
            $output .= '
        <div class="info-item ' . $status . '" >
            <div class="item-left">
                <p>' . $item->title . '</p>
                <span>' . $item->message . '</span>
            </div>
            <div class="item-right"></div>
        </div>
        ';
        }
    }

    return $output;
}

function GetTimeAgo($time_ago)
{
    $date = Carbon::createFromFormat('Y-m-d H:i:s', $time_ago, "Asia/Singapore");
    $date->setTimezone('UTC');
    return $date->shortAbsoluteDiffForHumans();
}

function GetPeriodsOfAYear($year)
{
    $periods = [];
    $months = array(
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July ',
        'August',
        'September',
        'October',
        'November',
        'December',
    );

    for ($i = 1; $i < 13; $i++) {
        $days = cal_days_in_month(CAL_GREGORIAN, $i, $year);
        $month = $months[$i - 1];

        $periods[] = $month . " 1 to " . 15;
        $periods[] = $month . " 16 to " . $days;

        if ($i === 12) {
            $periods[] = "13th Month 1 to " . 15;
            $periods[] = "13th Month 16 to " . $days;
        }
    }


    return $periods;
}

function CountDaysInPeriod($period)
{
    preg_match_all('!\d+!', $period, $matches);

    return $matches;
}

function GetYearsFrom($year)
{
    $currentYear = (int) date("Y");
    $years = [];

    for ($i = $year; $i <= $currentYear; $i++) {
        $years[] = $i;
    }

    return array_reverse($years);
}


function CreateMenuBarHeader($id_name, $headers)
{
    $output = '
        <div class="menu-tab-control" data-name="' . $id_name . '">
            <div class="menu-header">';
    $i = 0;

    foreach ($headers as $header) {
        $output .= '
            <div class="header-item" data-id="' . $i . '">
                <span>' . $header . '</span>
            </div>
        ';

        $i++;
    }

    $output .= '</div>
            <div class="menu-body">';

    $output .= '</div>
        </div>
    ';

    return $output;
}

function CaseToCombo($cases)
{
    return ObjectToCombo("text", "value", array_map(function ($case) {
        return ["text" => $case->name, "value" => $case->value];
    }, $cases));
}

function EnumToArray($enum)
{
    return array_map(function ($value) {
        return ["text" => $value, "value" => $value];
    }, Enum::values($enum));
}

function EnumToCombo($enum)
{
    return ObjectToCombo("text", "value", EnumToArray($enum));
}

function ObjectToCombo($keyText, $keyValue, $objects)
{
    return array_map(function ($obj) use ($keyText, $keyValue) {
        return [
            "text" => $obj[$keyText],
            "value" => $obj[$keyValue],
        ];
    }, $objects);
}

function ArrayToCombo($ARR)
{
    return array_map(function ($value, $val) {
        return [
            "text" => $value,
            "value" => $val
        ];
    }, $ARR, range(1, count($ARR)));
}

function EightDigitRandom()
{
    return random_int(10000000, 99999999);
}

function GUIDV4()
{
    if (function_exists('com_create_guid') === true) {
        return trim(com_create_guid(), '{}');
    }

    return sprintf('%04X%04X-%04X-%04X-%04X-%04X%04X%04X', mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(16384, 20479), mt_rand(32768, 49151), mt_rand(0, 65535), mt_rand(0, 65535), mt_rand(0, 65535));
}

function GetMonthFromPeriod($period)
{
    return strtolower(strtok($period, " "));
}

function ParsePeriodIntoDate($month, $day, $year)
{
    $date = $month . ' ' . $day . " " . $year;
    return date('Y-m-d', strtotime($date));
}

function GetMonthPeriod($period)
{
    $period = substr(strstr($period, " "), 1);

    return $period == "1 to 15" ? MonthPeriod::ONETO15 : MonthPeriod::SIXTEENTO30;
}

function NumberToWords($number)
{
    $words = array(
        0 => '',
        1 => 'one',
        2 => 'two',
        3 => 'three',
        4 => 'four',
        5 => 'five',
        6 => 'six',
        7 => 'seven',
        8 => 'eight',
        9 => 'nine',
        10 => 'ten',
        11 => 'eleven',
        12 => 'twelve',
        13 => 'thirteen',
        14 => 'fourteen',
        15 => 'fifteen',
        16 => 'sixteen',
        17 => 'seventeen',
        18 => 'eighteen',
        19 => 'nineteen',
        20 => 'twenty',
        30 => 'thirty',
        40 => 'forty',
        50 => 'fifty',
        60 => 'sixty',
        70 => 'seventy',
        80 => 'eighty',
        90 => 'ninety'
    );

    if ($number < 20) {
        return $words[$number];
    }

    if ($number < 100) {
        return $words[10 * floor($number / 10)] .
            ' ' . $words[$number % 10];
    }

    if ($number < 1000) {
        return $words[floor($number / 100)] . ' hundred '
            . NumberToWords($number % 100);
    }

    if ($number < 1000000) {
        return NumberToWords(floor($number / 1000)) .
            ' thousand ' . NumberToWords($number % 1000);
    }

    return NumberToWords(floor($number / 1000000)) .
        ' million ' . NumberToWords($number % 1000000);
}