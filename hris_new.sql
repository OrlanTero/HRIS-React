-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2025 at 06:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hris_new`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity_logs`
--

CREATE TABLE `activity_logs` (
  `log_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adjustment`
--

CREATE TABLE `adjustment` (
  `adjustment_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `employee_id` int(11) NOT NULL,
  `posted` int(11) DEFAULT 2,
  `paid` int(11) DEFAULT 2,
  `amount` int(255) NOT NULL,
  `type_id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `adjustment`
--

INSERT INTO `adjustment` (`adjustment_id`, `date_created`, `employee_id`, `posted`, `paid`, `amount`, `type_id`, `date`, `status`, `archive_id`, `db_status`) VALUES
(1, '2025-04-27 13:46:05', 1, 2, 2, 10, 1, '2025-04-27', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `archives`
--

CREATE TABLE `archives` (
  `archive_id` int(11) NOT NULL,
  `category_id` varchar(255) NOT NULL,
  `target_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `attendance`
--

CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL,
  `attendance_group_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `hours` float NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance`
--

INSERT INTO `attendance` (`attendance_id`, `attendance_group_id`, `employee_id`, `type`, `day`, `hours`, `date_created`, `archive_id`, `db_status`) VALUES
(1, 1, 1, 3, 3, 8, '2025-04-27 13:20:19', NULL, 1),
(2, 1, 1, 5, 8, 2, '2025-04-27 13:20:19', NULL, 1),
(3, 1, 1, 3, 10, 1, '2025-04-27 13:20:19', NULL, 1),
(4, 1, 1, 2, 7, 8, '2025-04-27 13:20:19', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `attendance_groups`
--

CREATE TABLE `attendance_groups` (
  `attendance_group_id` int(11) NOT NULL,
  `period` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `client_id` int(11) NOT NULL,
  `active` int(11) DEFAULT 2,
  `finished` int(11) DEFAULT 2,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `attendance_groups`
--

INSERT INTO `attendance_groups` (`attendance_group_id`, `period`, `year`, `client_id`, `active`, `finished`, `date_created`, `archive_id`) VALUES
(1, 'April 1 to 15', '2025', 1, 2, 2, '2025-04-27 12:52:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `banks`
--

CREATE TABLE `banks` (
  `bank_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `banks`
--

INSERT INTO `banks` (`bank_id`, `name`, `branch`, `date_created`, `archive_id`) VALUES
(1, 'Awa', '123', '2025-04-27 11:10:07', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `bank_accounts`
--

CREATE TABLE `bank_accounts` (
  `bank_account_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `account_number` varchar(100) NOT NULL,
  `active` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bank_accounts`
--

INSERT INTO `bank_accounts` (`bank_account_id`, `employee_id`, `bank_id`, `account_number`, `active`, `date_created`, `archive_id`, `db_status`) VALUES
(1, 1, 1, 'ABC', 1, '2025-04-27 11:13:53', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `beneficiaries`
--

CREATE TABLE `beneficiaries` (
  `beneficiary_id` int(11) NOT NULL,
  `mortuary_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beneficiaries`
--

INSERT INTO `beneficiaries` (`beneficiary_id`, `mortuary_id`, `employee_id`, `type`, `name`, `date_created`, `archive_id`) VALUES
(1, 1, 1, 'DEATH', 'Jhon Orlan ', '2025-04-27 12:28:03', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `branch` varchar(200) NOT NULL,
  `region` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `person` varchar(255) NOT NULL,
  `w_pagibig` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `vat` varchar(255) NOT NULL DEFAULT '0',
  `swfee_1` varchar(255) NOT NULL DEFAULT '0',
  `swfee_2` varchar(255) NOT NULL DEFAULT '',
  `swfee_3` varchar(255) NOT NULL DEFAULT '0',
  `agency_1` varchar(255) NOT NULL DEFAULT '0',
  `agency_2` varchar(255) NOT NULL DEFAULT '0',
  `agency_3` varchar(255) NOT NULL DEFAULT '0',
  `regular` varchar(255) NOT NULL DEFAULT '0',
  `overtime` varchar(255) NOT NULL DEFAULT '0',
  `month` varchar(255) NOT NULL DEFAULT '0',
  `regular_1` varchar(255) NOT NULL DEFAULT '0',
  `overtime_1` varchar(255) NOT NULL DEFAULT '0',
  `month_1` varchar(255) NOT NULL DEFAULT '0',
  `regular_2` varchar(255) NOT NULL DEFAULT '0',
  `overtime_2` varchar(255) NOT NULL DEFAULT '0',
  `nightdiff` varchar(255) NOT NULL DEFAULT '0',
  `sea` varchar(255) NOT NULL DEFAULT '0',
  `cola` varchar(255) NOT NULL DEFAULT '0',
  `leave_1` varchar(255) NOT NULL DEFAULT '0',
  `uniform` varchar(255) NOT NULL DEFAULT '0',
  `allowance` varchar(255) NOT NULL DEFAULT '0',
  `head_guard_allowance` varchar(255) NOT NULL DEFAULT '0',
  `ctpa` varchar(255) NOT NULL DEFAULT '0',
  `legal_holiday` varchar(255) NOT NULL DEFAULT '0',
  `special_holiday` varchar(255) NOT NULL DEFAULT '0',
  `restday` varchar(255) NOT NULL DEFAULT '0',
  `restday_ot` varchar(2555) NOT NULL DEFAULT '0',
  `legal_holiday_ot` varchar(255) NOT NULL DEFAULT '0',
  `special_holiday_ot` varchar(255) NOT NULL DEFAULT '0',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`client_id`, `name`, `branch`, `region`, `mobile`, `telephone`, `email`, `person`, `w_pagibig`, `address`, `vat`, `swfee_1`, `swfee_2`, `swfee_3`, `agency_1`, `agency_2`, `agency_3`, `regular`, `overtime`, `month`, `regular_1`, `overtime_1`, `month_1`, `regular_2`, `overtime_2`, `nightdiff`, `sea`, `cola`, `leave_1`, `uniform`, `allowance`, `head_guard_allowance`, `ctpa`, `legal_holiday`, `special_holiday`, `restday`, `restday_ot`, `legal_holiday_ot`, `special_holiday_ot`, `date_created`, `archive_id`, `db_status`, `created_at`, `updated_at`) VALUES
(1, 'Client 1', 'Metro Manila', 'AABD', '', '', 'awdaw', 'Charito Perdiz', '', '16 7 Birmingham', '', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '2025-04-27 11:24:23', NULL, 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client_holidays`
--

CREATE TABLE `client_holidays` (
  `client_holiday_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `holiday_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `db_status` int(11) NOT NULL DEFAULT 1,
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `client_holidays`
--

INSERT INTO `client_holidays` (`client_holiday_id`, `client_id`, `holiday_id`, `date_created`, `db_status`, `archive_id`) VALUES
(1, 1, 1, '2025-04-27 11:32:47', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `database_backups`
--

CREATE TABLE `database_backups` (
  `backup_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `deployed_employees`
--

CREATE TABLE `deployed_employees` (
  `deployed_employee_id` int(11) NOT NULL,
  `employment_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deployed_employees`
--

INSERT INTO `deployed_employees` (`deployed_employee_id`, `employment_id`, `client_id`, `date_from`, `date_to`, `date_created`, `archive_id`) VALUES
(1, 1, 1, '2025-04-27', NULL, '2025-04-27 12:00:04', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `disbursement`
--

CREATE TABLE `disbursement` (
  `disbursement_id` int(11) NOT NULL,
  `requisition_id` int(11) NOT NULL,
  `voucher` int(11) NOT NULL,
  `date` date NOT NULL,
  `posted` int(11) NOT NULL DEFAULT 2,
  `cancelled` int(11) NOT NULL DEFAULT 2,
  `payments` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `request` varchar(255) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `cheque_number` varchar(255) NOT NULL,
  `cheque_date` date DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disbursement`
--

INSERT INTO `disbursement` (`disbursement_id`, `requisition_id`, `voucher`, `date`, `posted`, `cancelled`, `payments`, `amount`, `request`, `bank_id`, `cheque_number`, `cheque_date`, `date_created`, `archive_id`) VALUES
(1, 3, 0, '2025-04-27', 2, 1, 'Cash', 2300, 'awdawdaw', 0, '', NULL, '2025-04-27 15:17:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `email_verifications`
--

CREATE TABLE `email_verifications` (
  `verification_id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `verification` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL,
  `employee_no` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `civil_status` varchar(100) NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `contact_number` varchar(255) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `emergency_contact` varchar(255) NOT NULL,
  `sss` text NOT NULL,
  `phil` text NOT NULL,
  `pagibig` text NOT NULL,
  `tin` text NOT NULL,
  `ctc` text NOT NULL,
  `rfid` text NOT NULL,
  `gsis` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_id`, `employee_no`, `firstname`, `lastname`, `middlename`, `gender`, `birthdate`, `civil_status`, `telephone`, `contact_number`, `mobile`, `email`, `address`, `emergency_contact`, `sss`, `phil`, `pagibig`, `tin`, `ctc`, `rfid`, `gsis`, `date_created`, `archive_id`, `db_status`) VALUES
(1, '714338', 'Charito', 'Perdiz', 'Gene', 'Male', '0000-00-00', 'Single', 'A', '', '23', 'jhonorlantero@gmail.com', '16 7 Birmingham', '', '123', '1234', 'awda', '4567', 'awda', '', 'awa', '2025-04-27 10:44:55', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `employments`
--

CREATE TABLE `employments` (
  `employment_id` int(11) NOT NULL,
  `date_hired` date NOT NULL,
  `date_end` date DEFAULT NULL,
  `employee_id` int(11) NOT NULL,
  `position` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `e_type` varchar(200) NOT NULL,
  `status` varchar(11) NOT NULL,
  `active` int(11) NOT NULL DEFAULT 2,
  `rest_day_1` varchar(200) NOT NULL,
  `rest_day_2` varchar(200) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employments`
--

INSERT INTO `employments` (`employment_id`, `date_hired`, `date_end`, `employee_id`, `position`, `department`, `e_type`, `status`, `active`, `rest_day_1`, `rest_day_2`, `date_created`, `archive_id`, `created_at`, `updated_at`) VALUES
(1, '2025-04-27', NULL, 1, 'Head Guard', 'Field', 'Field', 'Contractual', 0, 'Thursday', 'Thursday', '2025-04-27 11:52:00', NULL, '2025-04-27 11:52:00', '2025-04-27 11:52:00');

-- --------------------------------------------------------

--
-- Table structure for table `holidays`
--

CREATE TABLE `holidays` (
  `holiday_id` int(11) NOT NULL,
  `holiday_date` date NOT NULL,
  `holiday` varchar(200) NOT NULL,
  `national_local` varchar(255) NOT NULL DEFAULT 'National Holiday',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `holidays`
--

INSERT INTO `holidays` (`holiday_id`, `holiday_date`, `holiday`, `national_local`, `date_created`, `archive_id`) VALUES
(1, '2025-04-27', 'Holiday', 'Local Holiday', '2025-04-27 11:32:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loans`
--

CREATE TABLE `loans` (
  `loan_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `amount` float NOT NULL,
  `balance` float NOT NULL,
  `target_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `loan_type` varchar(255) NOT NULL,
  `payment_type` varchar(255) NOT NULL,
  `principal` float NOT NULL,
  `interest_rate` float NOT NULL,
  `interest_value` float NOT NULL,
  `payable_by` int(11) NOT NULL,
  `advance` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loan_payments`
--

CREATE TABLE `loan_payments` (
  `payment_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `loans` varchar(255) NOT NULL,
  `loan_id` int(11) NOT NULL,
  `note` text NOT NULL,
  `to_pay` float NOT NULL,
  `amount` float NOT NULL,
  `year` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  `loan_types` varchar(255) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `loan_statements`
--

CREATE TABLE `loan_statements` (
  `statement_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `loan_id` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `amount` float NOT NULL,
  `balance` float NOT NULL,
  `num` int(11) NOT NULL,
  `label` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mortuaries`
--

CREATE TABLE `mortuaries` (
  `mortuary_id` int(11) NOT NULL,
  `period` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mortuaries`
--

INSERT INTO `mortuaries` (`mortuary_id`, `period`, `year`, `date_created`, `archive_id`) VALUES
(1, 'May 16 to 31', '2025', '2025-04-27 12:24:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mortuary_payments`
--

CREATE TABLE `mortuary_payments` (
  `payment_id` int(11) NOT NULL,
  `beneficiary_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `amount` float NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mortuary_payments`
--

INSERT INTO `mortuary_payments` (`payment_id`, `beneficiary_id`, `employee_id`, `amount`, `status`, `date_created`, `archive_id`) VALUES
(1, 1, 1, 10, 0, '2025-04-27 12:28:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payslips`
--

CREATE TABLE `payslips` (
  `payslip_id` int(11) NOT NULL,
  `ndw` varchar(255) NOT NULL,
  `nhw` varchar(255) NOT NULL,
  `rest_day` float NOT NULL,
  `basic_pay` varchar(255) NOT NULL,
  `nsd` varchar(255) NOT NULL,
  `nsd_basic_pay` varchar(255) NOT NULL,
  `nhw_sh` varchar(255) NOT NULL,
  `sh_basic_pay` varchar(255) NOT NULL,
  `nhw_shot` varchar(255) NOT NULL,
  `shot_basic_pay` varchar(255) NOT NULL,
  `sss` varchar(255) NOT NULL,
  `phil` varchar(255) NOT NULL,
  `insurance` varchar(255) NOT NULL,
  `gross_pay` varchar(255) NOT NULL,
  `part1` varchar(255) NOT NULL,
  `death` varchar(255) NOT NULL,
  `pagibig` varchar(255) NOT NULL,
  `part2` varchar(255) NOT NULL,
  `netpay` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `year` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  `regular_hours` float NOT NULL,
  `total_hours` float NOT NULL,
  `ot_hours` float NOT NULL,
  `night_diff_hours` float NOT NULL,
  `special_holiday_hours` float NOT NULL,
  `special_holiday_ot_hours` float NOT NULL,
  `legal_holiday_hours` float NOT NULL,
  `legal_holiday_ot_hours` float NOT NULL,
  `nhw_lh` float NOT NULL,
  `nhw_lhot` float NOT NULL,
  `lh_basic_pay` float NOT NULL,
  `lhot_basic_pay` float NOT NULL,
  `nhw_ot` float NOT NULL,
  `others` float NOT NULL,
  `payslip_rates_id` int(11) NOT NULL,
  `cash_advances` float NOT NULL,
  `loan_statement` float NOT NULL,
  `adjustments` float NOT NULL,
  `beneficiaries` varchar(255) NOT NULL,
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payslip_drafts`
--

CREATE TABLE `payslip_drafts` (
  `payslip_draft_id` int(11) NOT NULL,
  `ndw` varchar(255) NOT NULL,
  `nhw` varchar(255) NOT NULL,
  `rest_day` float NOT NULL,
  `basic_pay` varchar(255) NOT NULL,
  `nsd` varchar(255) NOT NULL,
  `nsd_basic_pay` varchar(255) NOT NULL,
  `nhw_sh` varchar(255) NOT NULL,
  `sh_basic_pay` varchar(255) NOT NULL,
  `nhw_shot` varchar(255) NOT NULL,
  `shot_basic_pay` varchar(255) NOT NULL,
  `sss` varchar(255) NOT NULL,
  `phil` varchar(255) NOT NULL,
  `insurance` varchar(255) NOT NULL,
  `gross_pay` varchar(255) NOT NULL,
  `part1` varchar(255) NOT NULL,
  `death` varchar(255) NOT NULL,
  `pagibig` varchar(255) NOT NULL,
  `part2` varchar(255) NOT NULL,
  `netpay` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `employee_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `year` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  `regular_hours` float NOT NULL,
  `total_hours` float NOT NULL,
  `ot_hours` float NOT NULL,
  `night_diff_hours` float NOT NULL,
  `special_holiday_hours` float NOT NULL,
  `special_holiday_ot_hours` float NOT NULL,
  `legal_holiday_hours` float NOT NULL,
  `legal_holiday_ot_hours` float NOT NULL,
  `nhw_lh` float NOT NULL,
  `nhw_lhot` float NOT NULL,
  `lh_basic_pay` float NOT NULL,
  `lhot_basic_pay` float NOT NULL,
  `nhw_ot` float NOT NULL,
  `others` float NOT NULL,
  `payslip_rates_id` int(11) NOT NULL,
  `cash_advances` float NOT NULL,
  `loan_statement` float NOT NULL,
  `adjustments` float NOT NULL,
  `beneficiaries` varchar(255) NOT NULL,
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payslip_drafts`
--

INSERT INTO `payslip_drafts` (`payslip_draft_id`, `ndw`, `nhw`, `rest_day`, `basic_pay`, `nsd`, `nsd_basic_pay`, `nhw_sh`, `sh_basic_pay`, `nhw_shot`, `shot_basic_pay`, `sss`, `phil`, `insurance`, `gross_pay`, `part1`, `death`, `pagibig`, `part2`, `netpay`, `date_created`, `employee_id`, `client_id`, `year`, `period`, `regular_hours`, `total_hours`, `ot_hours`, `night_diff_hours`, `special_holiday_hours`, `special_holiday_ot_hours`, `legal_holiday_hours`, `legal_holiday_ot_hours`, `nhw_lh`, `nhw_lhot`, `lh_basic_pay`, `lhot_basic_pay`, `nhw_ot`, `others`, `payslip_rates_id`, `cash_advances`, `loan_statement`, `adjustments`, `beneficiaries`, `archive_id`) VALUES
(1, '0', '0', 0, '0', '0', '0', '0', '0', '0', '0', '0', '0', '20', '0', '20', '0', '0', '0', '-20', '2025-04-28 04:01:36', 1, 1, '2025', 'April 1 to 15', 0, 0, 0, 2, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, '', NULL),
(2, '0', '0', 0, '0', '0', '0', '0', '0', '0', '0', '0', '0', '20', '0', '20', '0', '0', '0', '-20', '2025-04-28 04:02:28', 1, 1, '2025', 'April 1 to 15', 0, 0, 0, 2, 0, 0, 9, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `payslip_rates`
--

CREATE TABLE `payslip_rates` (
  `rate_id` int(11) NOT NULL,
  `client_id` varchar(255) NOT NULL,
  `regular` varchar(255) NOT NULL,
  `overtime` varchar(255) NOT NULL,
  `night_diff` varchar(255) NOT NULL,
  `special_holiday` varchar(255) NOT NULL,
  `special_holiday_ot` varchar(255) NOT NULL,
  `uniform` varchar(255) NOT NULL,
  `rest_day` varchar(255) NOT NULL,
  `sea` varchar(255) NOT NULL,
  `cola` varchar(255) NOT NULL,
  `leave_rate` varchar(255) NOT NULL,
  `allowance` varchar(255) NOT NULL,
  `head_guard_allowance` varchar(255) NOT NULL,
  `ctpa` varchar(255) NOT NULL,
  `legal_holiday` varchar(255) NOT NULL,
  `legal_holiday_ot` varchar(255) NOT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payslip_rates`
--

INSERT INTO `payslip_rates` (`rate_id`, `client_id`, `regular`, `overtime`, `night_diff`, `special_holiday`, `special_holiday_ot`, `uniform`, `rest_day`, `sea`, `cola`, `leave_rate`, `allowance`, `head_guard_allowance`, `ctpa`, `legal_holiday`, `legal_holiday_ot`, `db_status`, `date_created`, `archive_id`) VALUES
(1, '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 1, '2025-04-28 04:01:36', NULL),
(2, '1', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 1, '2025-04-28 04:02:28', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pettycash`
--

CREATE TABLE `pettycash` (
  `pettycash_id` int(11) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `requested_by` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `posted` int(11) DEFAULT 2,
  `amount` int(255) NOT NULL,
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pettycash`
--

INSERT INTO `pettycash` (`pettycash_id`, `date`, `requested_by`, `remarks`, `posted`, `amount`, `archive_id`, `db_status`, `date_created`) VALUES
(1, '2025-04-25 16:00:00', '1', 'a', 2, 123, NULL, 1, '2025-04-27 14:03:34');

-- --------------------------------------------------------

--
-- Table structure for table `petty_cash_reports`
--

CREATE TABLE `petty_cash_reports` (
  `petty_cash_report_id` int(11) NOT NULL,
  `voucher` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `remarks` text NOT NULL,
  `date_modify` date NOT NULL DEFAULT current_timestamp(),
  `cash_in` float NOT NULL,
  `cash_out` float NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requisition`
--

CREATE TABLE `requisition` (
  `requisition_id` int(11) NOT NULL,
  `req_id` int(11) NOT NULL,
  `req_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `remarks` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `paid_to` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'DRAFT',
  `amount` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `requisition`
--

INSERT INTO `requisition` (`requisition_id`, `req_id`, `req_date`, `remarks`, `paid_to`, `type`, `status`, `amount`, `date`, `archive_id`, `db_status`) VALUES
(3, 0, '2025-04-27 15:17:20', '', '', 'cash', 'approved', 2300, '2025-04-27', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `requisition_info`
--

CREATE TABLE `requisition_info` (
  `requisition_info_id` int(11) NOT NULL,
  `requisition_id` int(11) NOT NULL,
  `vat_non_vat` varchar(255) NOT NULL,
  `particulars` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `basic_unit` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `unit_price` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `requisition_type` int(11) DEFAULT NULL,
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Dumping data for table `requisition_info`
--

INSERT INTO `requisition_info` (`requisition_info_id`, `requisition_id`, `vat_non_vat`, `particulars`, `type`, `basic_unit`, `unit`, `quantity`, `unit_price`, `amount`, `requisition_type`, `archive_id`, `db_status`) VALUES
(1, 3, '', 'AWdaw', '', '', 'pcs', '23', '100', '2300', 0, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `service_deductions`
--

CREATE TABLE `service_deductions` (
  `service_deduction_id` int(11) NOT NULL,
  `price_from` varchar(255) NOT NULL,
  `min_range` float NOT NULL,
  `max_range` float NOT NULL,
  `price_to` varchar(255) NOT NULL,
  `msc` varchar(255) NOT NULL,
  `er` varchar(255) NOT NULL,
  `ee` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` varchar(100) NOT NULL,
  `type` varchar(255) NOT NULL,
  `archive_id` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `system_types`
--

CREATE TABLE `system_types` (
  `type_id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `affects_in` int(11) NOT NULL,
  `affects_value` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL,
  `db_status` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `system_types`
--

INSERT INTO `system_types` (`type_id`, `type`, `category`, `affects_in`, `affects_value`, `date_created`, `archive_id`, `db_status`) VALUES
(1, 'Cash Advance', 'loan_type', 1, 1, '2025-04-27 16:56:56', NULL, 1),
(2, 'Salary Loan', 'loan_type', 0, 0, '2025-04-27 16:56:56', NULL, 1),
(3, 'Emergency Loan', 'loan_type', 0, 0, '2025-04-27 16:56:56', NULL, 1),
(4, 'Calamity Loan', 'loan_type', 0, 0, '2025-04-27 16:56:56', NULL, 1),
(5, 'Multi-Purpose Loan', 'loan_type', 0, 0, '2025-04-27 16:56:56', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `signin_with` varchar(50) DEFAULT NULL,
  `user_type` int(11) DEFAULT NULL,
  `date_created` timestamp NULL DEFAULT current_timestamp(),
  `displayName` varchar(255) DEFAULT NULL,
  `facebook` varchar(255) DEFAULT NULL,
  `db_status` int(11) DEFAULT 1,
  `archive_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `firstname`, `lastname`, `email`, `phone`, `image`, `signin_with`, `user_type`, `date_created`, `displayName`, `facebook`, `db_status`, `archive_id`) VALUES
(1, 'Admin', 'User', 'admin@example.com', '1234567890', '', 'USERNAME_PASSWORD', 1, '2025-04-27 07:39:50', 'Admin User', '', 1, NULL),
(2, 'Admin', 'User', 'admin@example.com', '1234567890', '', 'USERNAME_PASSWORD', 1, '2025-04-27 07:40:33', 'Admin User', '', 1, NULL),
(4, 'Admin', 'User', 'admin@example.com', '1234567890', NULL, NULL, 1, '2025-04-27 07:43:22', 'Admin User', NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_authentication`
--

CREATE TABLE `user_authentication` (
  `id` int(11) NOT NULL,
  `auth_type` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `active` int(11) DEFAULT 1,
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_authentication`
--

INSERT INTO `user_authentication` (`id`, `auth_type`, `username`, `password`, `pin`, `email_address`, `active`, `archive_id`) VALUES
(1, 'USERNAME_PASSWORD', 'admin', 'password123', '', '', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `tell_no` varchar(255) NOT NULL,
  `tin` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company_logo` varchar(255) NOT NULL,
  `main_logo` varchar(255) NOT NULL,
  `year` varchar(255) NOT NULL DEFAULT '2024',
  `period` varchar(255) NOT NULL DEFAULT 'January 1 to 15',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `archive_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `name`, `description`, `owner`, `address`, `tell_no`, `tin`, `email`, `company_logo`, `main_logo`, `year`, `period`, `date_created`, `archive_id`) VALUES
('1', 'HRIS System', 'Human Resource Information System', 'Admin', '', '', '', 'admin@example.com', '', '', '2024', 'January 1 to 15', '2025-04-27 07:43:22', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_logs`
--
ALTER TABLE `activity_logs`
  ADD PRIMARY KEY (`log_id`);

--
-- Indexes for table `adjustment`
--
ALTER TABLE `adjustment`
  ADD PRIMARY KEY (`adjustment_id`);

--
-- Indexes for table `archives`
--
ALTER TABLE `archives`
  ADD PRIMARY KEY (`archive_id`);

--
-- Indexes for table `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`attendance_id`);

--
-- Indexes for table `attendance_groups`
--
ALTER TABLE `attendance_groups`
  ADD PRIMARY KEY (`attendance_group_id`);

--
-- Indexes for table `banks`
--
ALTER TABLE `banks`
  ADD PRIMARY KEY (`bank_id`);

--
-- Indexes for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  ADD PRIMARY KEY (`bank_account_id`);

--
-- Indexes for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  ADD PRIMARY KEY (`beneficiary_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`client_id`);

--
-- Indexes for table `client_holidays`
--
ALTER TABLE `client_holidays`
  ADD PRIMARY KEY (`client_holiday_id`);

--
-- Indexes for table `database_backups`
--
ALTER TABLE `database_backups`
  ADD PRIMARY KEY (`backup_id`);

--
-- Indexes for table `deployed_employees`
--
ALTER TABLE `deployed_employees`
  ADD PRIMARY KEY (`deployed_employee_id`),
  ADD KEY `employee_id` (`employment_id`),
  ADD KEY `client_id` (`client_id`);

--
-- Indexes for table `disbursement`
--
ALTER TABLE `disbursement`
  ADD PRIMARY KEY (`disbursement_id`);

--
-- Indexes for table `email_verifications`
--
ALTER TABLE `email_verifications`
  ADD PRIMARY KEY (`verification_id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_id`);

--
-- Indexes for table `employments`
--
ALTER TABLE `employments`
  ADD PRIMARY KEY (`employment_id`),
  ADD KEY `employee_id` (`employee_id`);

--
-- Indexes for table `holidays`
--
ALTER TABLE `holidays`
  ADD PRIMARY KEY (`holiday_id`);

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`loan_id`);

--
-- Indexes for table `loan_payments`
--
ALTER TABLE `loan_payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `loan_statements`
--
ALTER TABLE `loan_statements`
  ADD PRIMARY KEY (`statement_id`);

--
-- Indexes for table `mortuaries`
--
ALTER TABLE `mortuaries`
  ADD PRIMARY KEY (`mortuary_id`);

--
-- Indexes for table `mortuary_payments`
--
ALTER TABLE `mortuary_payments`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `payslips`
--
ALTER TABLE `payslips`
  ADD PRIMARY KEY (`payslip_id`);

--
-- Indexes for table `payslip_drafts`
--
ALTER TABLE `payslip_drafts`
  ADD PRIMARY KEY (`payslip_draft_id`);

--
-- Indexes for table `payslip_rates`
--
ALTER TABLE `payslip_rates`
  ADD PRIMARY KEY (`rate_id`);

--
-- Indexes for table `pettycash`
--
ALTER TABLE `pettycash`
  ADD PRIMARY KEY (`pettycash_id`);

--
-- Indexes for table `petty_cash_reports`
--
ALTER TABLE `petty_cash_reports`
  ADD PRIMARY KEY (`petty_cash_report_id`);

--
-- Indexes for table `requisition`
--
ALTER TABLE `requisition`
  ADD PRIMARY KEY (`requisition_id`);

--
-- Indexes for table `requisition_info`
--
ALTER TABLE `requisition_info`
  ADD PRIMARY KEY (`requisition_info_id`);

--
-- Indexes for table `service_deductions`
--
ALTER TABLE `service_deductions`
  ADD PRIMARY KEY (`service_deduction_id`);

--
-- Indexes for table `system_types`
--
ALTER TABLE `system_types`
  ADD PRIMARY KEY (`type_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `user_authentication`
--
ALTER TABLE `user_authentication`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_logs`
--
ALTER TABLE `activity_logs`
  MODIFY `log_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adjustment`
--
ALTER TABLE `adjustment`
  MODIFY `adjustment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `archives`
--
ALTER TABLE `archives`
  MODIFY `archive_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `attendance`
--
ALTER TABLE `attendance`
  MODIFY `attendance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `attendance_groups`
--
ALTER TABLE `attendance_groups`
  MODIFY `attendance_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `banks`
--
ALTER TABLE `banks`
  MODIFY `bank_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bank_accounts`
--
ALTER TABLE `bank_accounts`
  MODIFY `bank_account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  MODIFY `beneficiary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clients`
--
ALTER TABLE `clients`
  MODIFY `client_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `client_holidays`
--
ALTER TABLE `client_holidays`
  MODIFY `client_holiday_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `database_backups`
--
ALTER TABLE `database_backups`
  MODIFY `backup_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `deployed_employees`
--
ALTER TABLE `deployed_employees`
  MODIFY `deployed_employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `disbursement`
--
ALTER TABLE `disbursement`
  MODIFY `disbursement_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `email_verifications`
--
ALTER TABLE `email_verifications`
  MODIFY `verification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `employee_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `employments`
--
ALTER TABLE `employments`
  MODIFY `employment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `holidays`
--
ALTER TABLE `holidays`
  MODIFY `holiday_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `loan_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loan_payments`
--
ALTER TABLE `loan_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `loan_statements`
--
ALTER TABLE `loan_statements`
  MODIFY `statement_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mortuaries`
--
ALTER TABLE `mortuaries`
  MODIFY `mortuary_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mortuary_payments`
--
ALTER TABLE `mortuary_payments`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payslips`
--
ALTER TABLE `payslips`
  MODIFY `payslip_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payslip_drafts`
--
ALTER TABLE `payslip_drafts`
  MODIFY `payslip_draft_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payslip_rates`
--
ALTER TABLE `payslip_rates`
  MODIFY `rate_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pettycash`
--
ALTER TABLE `pettycash`
  MODIFY `pettycash_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `petty_cash_reports`
--
ALTER TABLE `petty_cash_reports`
  MODIFY `petty_cash_report_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requisition`
--
ALTER TABLE `requisition`
  MODIFY `requisition_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `requisition_info`
--
ALTER TABLE `requisition_info`
  MODIFY `requisition_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `service_deductions`
--
ALTER TABLE `service_deductions`
  MODIFY `service_deduction_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `system_types`
--
ALTER TABLE `system_types`
  MODIFY `type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_authentication`
--
ALTER TABLE `user_authentication`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `beneficiaries`
--
ALTER TABLE `beneficiaries`
  ADD CONSTRAINT `beneficiaries_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`);

--
-- Constraints for table `deployed_employees`
--
ALTER TABLE `deployed_employees`
  ADD CONSTRAINT `deployed_employees_ibfk_1` FOREIGN KEY (`employment_id`) REFERENCES `employments` (`employment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `deployed_employees_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`) ON DELETE CASCADE;

--
-- Constraints for table `employments`
--
ALTER TABLE `employments`
  ADD CONSTRAINT `employments_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
