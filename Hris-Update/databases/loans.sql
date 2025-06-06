-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 14, 2024 at 08:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
  `date_created` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `loans`
--

INSERT INTO `loans` (`loan_id`, `employee_id`, `description`, `amount`, `balance`, `target_date`, `loan_type`, `payment_type`, `principal`, `interest_rate`, `interest_value`, `payable_by`, `advance`, `status`, `date_created`) VALUES
(1, 39, 'ca', 3150, 3150, '2024-10-14 03:06:57', '34', 'CASH', 0, 0, 0, 0, 0, 1, '2024-08-15 01:42:29'),
(2, 2, 'awdwa', 2000, 1700, '2024-10-14 03:06:59', '12', 'CASH', 0, 0, 0, 0, 0, 1, '2024-09-13 03:51:55'),
(3, 31, 'awdwad', 2222, 0, '2024-10-14 03:07:01', '23', 'CASH', 0, 0, 0, 0, 0, 1, '2024-10-09 03:44:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loans`
--
ALTER TABLE `loans`
  ADD PRIMARY KEY (`loan_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `loans`
--
ALTER TABLE `loans`
  MODIFY `loan_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
