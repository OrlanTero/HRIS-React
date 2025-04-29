

CREATE TABLE `activity_logs` (
  `log_id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255) NOT NULL,
  `action` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `message` varchar(255) NOT NULL,
  `id` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO activity_logs VALUES("1","11","4","1","MAIN_PROFILE","","1","2024-07-11 20:22:42");
INSERT INTO activity_logs VALUES("2","25","4","1","MAIN_PROFILE","","1","2024-07-11 20:54:58");
INSERT INTO activity_logs VALUES("3","25","3","1","MAIN_PROFILE","","1","2024-07-11 20:55:14");
INSERT INTO activity_logs VALUES("4","20","4","1","MAIN_PROFILE","","7","2024-07-12 14:46:38");
INSERT INTO activity_logs VALUES("5","1","5","1","MAIN_PROFILE","","","2024-07-12 14:48:26");
INSERT INTO activity_logs VALUES("6","1","5","1","MAIN_PROFILE","","","2024-07-12 14:48:26");
INSERT INTO activity_logs VALUES("7","1","5","1","MAIN_PROFILE","","","2024-07-12 14:48:26");
INSERT INTO activity_logs VALUES("8","1","5","1","MAIN_PROFILE","","","2024-07-12 14:48:26");
INSERT INTO activity_logs VALUES("9","20","4","1","MAIN_PROFILE","","8","2024-07-12 14:51:09");
INSERT INTO activity_logs VALUES("10","1","5","1","MAIN_PROFILE","","","2024-07-12 14:51:50");
INSERT INTO activity_logs VALUES("11","1","5","1","MAIN_PROFILE","","","2024-07-12 14:52:22");
INSERT INTO activity_logs VALUES("12","20","2","1","MAIN_PROFILE","","8","2024-07-12 14:52:33");
INSERT INTO activity_logs VALUES("13","20","2","1","MAIN_PROFILE","","7","2024-07-12 14:52:38");
INSERT INTO activity_logs VALUES("14","20","4","1","MAIN_PROFILE","","9","2024-07-12 14:54:05");
INSERT INTO activity_logs VALUES("15","1","5","1","MAIN_PROFILE","","","2024-07-12 14:55:17");
INSERT INTO activity_logs VALUES("16","5","3","1","MAIN_PROFILE","","136","2024-07-12 15:06:17");
INSERT INTO activity_logs VALUES("17","5","3","1","MAIN_PROFILE","","136","2024-07-12 15:09:49");
INSERT INTO activity_logs VALUES("18","23","4","1","MAIN_PROFILE","","1","2024-07-12 15:21:48");
INSERT INTO activity_logs VALUES("19","9","3","1","MAIN_PROFILE","","4","2024-07-12 15:21:51");
INSERT INTO activity_logs VALUES("20","20","2","1","MAIN_PROFILE","","9","2024-07-12 15:23:03");
INSERT INTO activity_logs VALUES("21","9","3","1","MAIN_PROFILE","","4","2024-07-12 15:23:41");
INSERT INTO activity_logs VALUES("22","20","4","1","MAIN_PROFILE","","10","2024-07-12 15:24:06");
INSERT INTO activity_logs VALUES("23","1","5","1","MAIN_PROFILE","","","2024-07-12 15:24:28");
INSERT INTO activity_logs VALUES("24","23","4","1","MAIN_PROFILE","","2","2024-07-12 15:28:36");
INSERT INTO activity_logs VALUES("25","9","3","1","MAIN_PROFILE","","1","2024-07-12 15:28:39");
INSERT INTO activity_logs VALUES("26","23","4","1","MAIN_PROFILE","","3","2024-07-12 15:29:13");
INSERT INTO activity_logs VALUES("27","9","3","1","MAIN_PROFILE","","2","2024-07-12 15:29:15");
INSERT INTO activity_logs VALUES("28","1","5","1","MAIN_PROFILE","","","2024-07-12 16:35:19");
INSERT INTO activity_logs VALUES("29","1","5","1","MAIN_PROFILE","","","2024-07-12 16:35:30");
INSERT INTO activity_logs VALUES("30","25","4","1","MAIN_PROFILE","","2","2024-07-16 09:35:52");
INSERT INTO activity_logs VALUES("31","11","4","1","MAIN_PROFILE","","2","2024-07-29 17:33:32");
INSERT INTO activity_logs VALUES("32","23","4","1","MAIN_PROFILE","","4","2024-07-29 17:33:46");
INSERT INTO activity_logs VALUES("33","9","3","1","MAIN_PROFILE","","1","2024-07-29 17:33:48");
INSERT INTO activity_logs VALUES("34","20","2","1","MAIN_PROFILE","","2","2024-08-15 08:52:13");
INSERT INTO activity_logs VALUES("35","20","4","1","MAIN_PROFILE","","11","2024-08-15 08:53:07");
INSERT INTO activity_logs VALUES("36","1","5","1","MAIN_PROFILE","","","2024-08-15 08:54:21");
INSERT INTO activity_logs VALUES("37","24","2","1","MAIN_PROFILE","","133132","2024-08-15 08:55:17");
INSERT INTO activity_logs VALUES("38","24","4","1","MAIN_PROFILE","","620","2024-08-15 08:58:57");
INSERT INTO activity_logs VALUES("39","1","5","1","MAIN_PROFILE","","","2024-08-15 09:02:10");
INSERT INTO activity_logs VALUES("40","1","5","1","MAIN_PROFILE","","","2024-08-15 09:02:10");
INSERT INTO activity_logs VALUES("41","1","5","1","MAIN_PROFILE","","","2024-08-15 09:05:01");
INSERT INTO activity_logs VALUES("42","20","4","1","MAIN_PROFILE","","12","2024-08-15 09:23:32");
INSERT INTO activity_logs VALUES("43","24","4","1","MAIN_PROFILE","","621","2024-08-15 09:26:39");
INSERT INTO activity_logs VALUES("44","1","5","1","MAIN_PROFILE","","","2024-08-15 09:31:42");
INSERT INTO activity_logs VALUES("45","1","5","1","MAIN_PROFILE","","","2024-08-15 09:31:42");
INSERT INTO activity_logs VALUES("46","1","5","1","MAIN_PROFILE","","","2024-08-15 09:31:42");
INSERT INTO activity_logs VALUES("47","1","5","1","MAIN_PROFILE","","","2024-08-15 09:31:42");
INSERT INTO activity_logs VALUES("48","1","5","1","MAIN_PROFILE","","","2024-08-15 09:34:15");
INSERT INTO activity_logs VALUES("49","16","4","1","MAIN_PROFILE","","1","2024-08-15 09:42:29");
INSERT INTO activity_logs VALUES("50","1","5","1","MAIN_PROFILE","","","2024-08-21 11:14:01");
INSERT INTO activity_logs VALUES("51","16","4","1","MAIN_PROFILE","","2","2024-09-13 11:51:55");
INSERT INTO activity_logs VALUES("52","1","5","1","MAIN_PROFILE","","","2024-09-13 13:50:49");
INSERT INTO activity_logs VALUES("53","1","5","1","MAIN_PROFILE","","","2024-09-13 13:55:48");
INSERT INTO activity_logs VALUES("54","16","4","1","MAIN_PROFILE","CAMPOS, KEVIN F Loan Payment received: 100","1","2024-09-13 14:43:49");
INSERT INTO activity_logs VALUES("55","17","4","1","MAIN_PROFILE","","109","2024-09-28 11:23:02");
INSERT INTO activity_logs VALUES("56","17","3","1","MAIN_PROFILE","","23","2024-09-28 11:44:00");
INSERT INTO activity_logs VALUES("57","17","3","1","MAIN_PROFILE","","34","2024-09-28 11:45:00");
INSERT INTO activity_logs VALUES("58","17","3","1","MAIN_PROFILE","","35","2024-09-28 11:45:05");
INSERT INTO activity_logs VALUES("59","17","3","1","MAIN_PROFILE","","40","2024-09-28 11:45:11");
INSERT INTO activity_logs VALUES("60","17","3","1","MAIN_PROFILE","","41","2024-09-28 11:45:17");
INSERT INTO activity_logs VALUES("61","17","3","1","MAIN_PROFILE","","43","2024-09-28 11:45:24");
INSERT INTO activity_logs VALUES("62","17","4","1","MAIN_PROFILE","","1","2024-09-29 10:44:25");
INSERT INTO activity_logs VALUES("63","17","4","1","MAIN_PROFILE","","2","2024-09-29 10:57:59");
INSERT INTO activity_logs VALUES("64","17","4","1","MAIN_PROFILE","","3","2024-09-29 11:02:21");
INSERT INTO activity_logs VALUES("65","17","4","1","MAIN_PROFILE","","4","2024-09-29 11:02:56");
INSERT INTO activity_logs VALUES("66","17","4","1","MAIN_PROFILE","","5","2024-09-29 11:04:16");
INSERT INTO activity_logs VALUES("67","17","4","1","MAIN_PROFILE","","6","2024-09-29 11:04:48");
INSERT INTO activity_logs VALUES("68","17","4","1","MAIN_PROFILE","","7","2024-09-29 11:05:08");



CREATE TABLE `adjustment` (
  `adjustment_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `employee_id` int(11) NOT NULL,
  `posted` int(11) DEFAULT 2,
  `paid` int(11) DEFAULT 2,
  `amount` int(255) NOT NULL,
  PRIMARY KEY (`adjustment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `attendance` (
  `attendance_id` int(11) NOT NULL AUTO_INCREMENT,
  `attendance_group_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `hours` float NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`attendance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=532 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO attendance VALUES("1","2","31","0","16","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("2","2","31","0","17","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("3","2","31","0","18","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("4","2","31","0","19","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("5","2","31","0","20","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("6","2","31","0","21","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("7","2","31","0","22","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("8","2","31","0","23","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("10","2","31","0","25","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("11","2","31","0","26","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("12","2","31","0","27","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("13","2","31","0","28","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("14","2","31","0","29","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("15","2","31","0","30","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("16","2","31","0","31","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("17","2","31","1","16","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("18","2","31","1","17","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("19","2","31","1","18","8","2024-06-07 02:15:42");
INSERT INTO attendance VALUES("20","2","31","1","19","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("21","2","31","1","20","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("22","2","31","1","21","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("23","2","31","1","22","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("24","2","31","1","23","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("25","2","31","1","24","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("26","2","31","1","25","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("27","2","31","1","26","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("28","2","31","1","27","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("29","2","31","1","28","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("30","2","31","1","29","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("31","2","31","1","30","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("32","2","31","1","31","4","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("33","4","31","0","4","8","2024-06-07 02:19:51");
INSERT INTO attendance VALUES("34","4","31","0","5","8","2024-06-07 02:19:51");
INSERT INTO attendance VALUES("35","4","31","0","6","8","2024-06-07 02:19:51");
INSERT INTO attendance VALUES("36","4","31","0","8","8","2024-06-07 02:19:51");
INSERT INTO attendance VALUES("37","2","45","0","16","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("38","2","45","0","18","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("39","2","45","0","19","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("40","2","45","0","21","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("41","2","45","0","22","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("42","2","45","0","23","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("43","2","45","0","24","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("44","2","45","0","25","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("45","2","45","0","26","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("46","2","45","0","27","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("47","2","45","0","29","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("48","2","45","0","30","8","2024-06-07 02:26:06");
INSERT INTO attendance VALUES("49","5","39","0","1","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("50","5","39","0","2","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("51","5","39","0","3","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("52","5","39","0","4","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("53","5","39","0","5","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("54","5","39","0","6","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("55","5","39","0","7","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("56","5","39","0","8","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("57","5","39","0","9","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("58","5","39","0","10","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("59","5","39","0","11","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("60","5","39","0","12","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("61","5","39","0","13","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("62","5","39","0","14","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("63","5","39","0","15","8","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("64","5","39","1","1","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("65","5","39","1","2","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("66","5","39","1","3","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("67","5","39","1","4","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("68","5","39","1","5","5","2024-08-21 11:14:01");
INSERT INTO attendance VALUES("69","5","39","1","6","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("70","5","39","1","7","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("71","5","39","1","8","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("72","5","39","1","9","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("73","5","39","1","10","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("74","5","39","1","11","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("75","5","39","1","12","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("76","5","39","1","13","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("77","5","39","1","14","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("78","5","39","1","15","4","2024-06-07 07:15:49");
INSERT INTO attendance VALUES("79","5","254","0","1","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("80","5","254","0","2","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("81","5","254","0","3","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("82","5","254","0","4","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("83","5","254","0","5","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("84","5","254","0","6","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("85","5","254","0","7","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("86","5","254","0","8","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("87","5","254","0","9","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("88","5","254","0","10","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("89","5","254","0","11","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("90","5","254","0","12","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("91","5","254","0","13","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("92","5","254","0","14","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("93","5","254","1","1","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("94","5","254","1","2","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("95","5","254","1","3","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("96","5","254","1","4","8","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("97","5","254","1","5","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("98","5","254","1","6","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("99","5","254","1","7","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("100","5","254","1","8","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("101","5","254","1","9","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("102","5","254","1","10","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("103","5","254","1","11","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("104","5","254","1","12","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("105","5","254","1","13","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("106","5","254","1","14","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("107","5","254","1","15","4","2024-06-07 07:15:50");
INSERT INTO attendance VALUES("108","5","254","2","2","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("109","5","254","2","15","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("110","5","254","3","1","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("111","5","254","3","2","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("112","5","254","3","3","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("113","5","254","3","9","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("114","5","254","5","5","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("115","5","254","5","6","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("116","5","254","5","7","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("117","5","254","7","10","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("118","5","254","7","11","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("119","5","254","7","12","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("120","5","254","7","13","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("121","5","42","0","2","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("122","5","42","0","3","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("123","5","42","0","4","8","2024-06-07 07:18:39");
INSERT INTO attendance VALUES("124","5","254","2","3","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("125","5","254","2","4","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("126","5","254","2","5","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("127","5","254","2","6","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("128","5","254","2","7","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("129","5","254","2","8","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("130","5","254","2","9","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("131","5","254","2","10","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("132","5","254","2","11","8","2024-06-07 07:19:19");
INSERT INTO attendance VALUES("133","5","254","4","1","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("134","5","254","4","2","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("135","5","254","4","3","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("136","5","254","4","4","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("137","5","254","4","5","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("138","5","254","4","6","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("139","5","254","4","7","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("140","5","254","4","8","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("141","5","254","4","9","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("142","5","254","4","10","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("143","5","254","4","11","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("144","5","254","4","12","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("145","5","254","4","13","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("146","5","254","4","14","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("147","5","254","4","15","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("148","5","254","6","2","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("149","5","254","6","3","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("150","5","254","6","4","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("151","5","254","6","5","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("152","5","254","6","6","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("153","5","254","6","7","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("154","5","254","6","8","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("155","5","254","6","9","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("156","5","254","6","10","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("157","5","254","6","11","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("158","5","254","6","12","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("159","5","254","6","13","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("160","5","254","6","14","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("161","5","254","7","2","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("162","5","254","7","3","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("163","5","254","7","4","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("164","5","254","7","5","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("165","5","254","7","6","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("166","5","254","7","7","8","2024-06-07 07:20:00");
INSERT INTO attendance VALUES("167","2","31","2","16","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("168","2","31","2","17","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("169","2","31","2","18","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("170","2","31","2","19","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("171","2","31","2","20","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("172","2","31","2","21","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("173","2","31","2","22","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("174","2","31","2","23","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("175","2","31","2","24","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("176","2","31","2","25","8","2024-06-08 19:10:00");
INSERT INTO attendance VALUES("177","2","31","5","21","8","2024-06-09 10:05:34");
INSERT INTO attendance VALUES("178","4","35","0","1","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("179","4","35","0","2","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("180","4","35","0","3","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("181","4","35","0","4","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("182","4","35","0","5","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("183","4","35","0","6","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("184","4","35","0","7","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("185","4","35","0","8","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("186","4","35","0","9","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("187","4","35","0","10","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("189","4","35","0","13","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("190","4","35","0","14","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("191","4","35","0","15","8","2024-06-20 16:07:14");
INSERT INTO attendance VALUES("192","4","34","0","1","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("193","4","34","0","2","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("194","4","34","0","3","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("195","4","34","0","4","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("196","4","34","0","5","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("197","4","34","0","6","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("198","4","34","0","7","0","2024-06-21 14:17:17");
INSERT INTO attendance VALUES("199","4","34","0","8","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("200","4","34","0","9","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("201","4","34","0","10","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("202","4","34","0","11","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("203","4","34","0","12","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("204","4","34","0","13","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("205","4","34","0","14","0","2024-06-21 14:17:17");
INSERT INTO attendance VALUES("206","4","34","0","15","8","2024-06-21 14:13:14");
INSERT INTO attendance VALUES("207","4","35","0","11","8","2024-06-21 14:17:17");
INSERT INTO attendance VALUES("208","4","34","5","7","8","2024-06-21 14:17:17");
INSERT INTO attendance VALUES("209","4","34","5","14","8","2024-06-21 14:17:17");
INSERT INTO attendance VALUES("210","6","194","1","7","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("211","6","194","1","8","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("212","6","194","1","9","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("213","6","194","1","10","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("214","6","194","1","11","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("215","6","194","1","4","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("216","6","194","1","5","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("217","6","194","1","6","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("218","6","194","0","1","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("219","6","194","0","2","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("220","6","194","0","3","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("221","6","194","0","4","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("222","6","194","0","5","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("223","6","194","0","6","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("224","6","194","0","7","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("225","6","194","0","8","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("226","6","194","0","9","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("227","6","194","0","10","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("228","6","194","0","11","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("229","6","194","0","12","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("230","6","194","0","13","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("231","6","194","0","14","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("232","6","194","0","15","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("233","6","194","1","1","4","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("234","6","194","1","2","4","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("235","6","194","1","3","0","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("236","6","194","2","1","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("237","6","194","2","5","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("238","6","194","2","10","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("239","6","194","2","13","8","2024-06-21 15:47:18");
INSERT INTO attendance VALUES("240","4","331","0","1","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("241","4","331","0","2","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("243","4","331","0","4","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("244","4","331","0","5","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("245","4","331","0","6","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("246","4","331","0","7","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("247","4","331","0","8","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("248","4","331","0","9","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("249","4","331","0","10","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("250","4","331","0","11","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("251","4","331","0","12","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("252","4","331","0","13","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("253","4","331","0","14","8","2024-06-22 14:31:23");
INSERT INTO attendance VALUES("260","2","31","2","26","5","2024-06-29 07:34:24");
INSERT INTO attendance VALUES("270","2","31","3","24","9","2024-06-29 08:51:18");
INSERT INTO attendance VALUES("271","7","187","0","1","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("272","7","187","0","2","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("273","7","187","0","3","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("274","7","187","0","4","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("275","7","187","0","5","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("276","7","187","0","6","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("277","7","187","0","7","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("278","7","187","0","8","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("279","7","187","0","9","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("280","7","187","0","10","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("281","7","187","0","11","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("282","7","187","0","12","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("283","7","187","0","13","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("284","7","187","0","14","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("285","7","187","0","15","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("286","7","269","0","1","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("287","7","269","0","2","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("288","7","269","0","3","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("289","7","269","0","4","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("290","7","269","0","5","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("291","7","269","0","6","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("292","7","269","0","7","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("293","7","269","0","8","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("294","7","269","0","9","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("295","7","269","0","10","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("296","7","269","0","11","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("297","7","269","0","12","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("298","7","269","0","13","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("299","7","269","0","14","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("300","7","269","0","15","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("301","7","353","0","1","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("302","7","353","0","2","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("303","7","353","0","3","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("304","7","353","0","4","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("305","7","353","0","5","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("306","7","353","0","6","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("307","7","353","0","7","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("308","7","353","0","8","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("309","7","353","0","9","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("310","7","353","0","10","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("311","7","353","0","11","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("312","7","353","0","12","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("313","7","353","0","13","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("314","7","353","0","14","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("315","7","353","0","15","3","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("316","7","490","0","1","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("317","7","490","0","2","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("318","7","490","0","3","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("319","7","490","0","4","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("320","7","490","0","5","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("321","7","490","0","6","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("322","7","490","0","7","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("323","7","490","0","8","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("324","7","490","0","9","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("325","7","490","0","10","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("326","7","490","0","11","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("327","7","490","0","12","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("328","7","490","0","13","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("329","7","490","0","14","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("330","7","490","0","15","8","2024-07-12 14:48:26");
INSERT INTO attendance VALUES("331","8","51","0","1","8","2024-07-12 14:51:50");
INSERT INTO attendance VALUES("332","8","51","0","2","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("333","8","51","0","3","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("334","8","51","0","4","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("335","8","51","0","5","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("336","8","51","0","6","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("337","8","51","0","7","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("338","8","51","0","8","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("339","8","51","0","9","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("340","8","51","0","10","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("341","8","51","0","11","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("342","8","51","0","12","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("343","8","51","0","13","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("344","8","51","0","14","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("345","8","51","0","15","8","2024-07-12 14:52:22");
INSERT INTO attendance VALUES("346","9","139","0","1","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("347","9","139","0","2","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("348","9","139","0","3","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("349","9","139","0","4","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("350","9","139","0","5","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("351","9","139","0","6","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("352","9","139","0","7","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("353","9","139","0","8","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("354","9","139","0","9","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("355","9","139","0","10","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("356","9","139","0","11","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("357","9","139","0","12","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("358","9","139","0","13","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("359","9","139","0","14","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("360","9","139","0","15","8","2024-07-12 14:55:17");
INSERT INTO attendance VALUES("361","10","139","0","1","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("362","10","139","0","2","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("363","10","139","0","3","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("364","10","139","0","4","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("365","10","139","0","5","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("366","10","139","0","6","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("367","10","139","0","7","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("368","10","139","0","8","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("369","10","139","0","9","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("370","10","139","0","10","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("371","10","139","0","11","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("372","10","139","0","12","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("373","10","139","0","13","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("374","10","139","0","14","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("375","10","139","0","15","8","2024-07-12 15:24:28");
INSERT INTO attendance VALUES("376","4","35","3","12","8","2024-07-12 16:35:30");
INSERT INTO attendance VALUES("377","11","113","1","16","5","2024-08-15 08:54:21");
INSERT INTO attendance VALUES("378","11","301","0","16","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("379","11","301","0","17","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("380","11","301","0","18","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("381","11","301","0","19","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("382","11","301","0","22","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("383","11","301","0","23","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("384","11","301","0","24","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("385","11","301","0","29","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("386","11","301","0","30","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("387","11","301","0","31","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("388","11","301","1","16","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("389","11","301","1","17","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("390","11","301","1","18","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("391","11","301","1","22","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("392","11","301","1","23","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("393","11","301","1","24","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("394","11","301","1","29","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("395","11","301","1","30","4","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("396","11","301","1","31","5","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("397","11","198","0","16","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("398","11","198","0","17","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("399","11","198","0","18","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("400","11","198","0","19","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("401","11","198","0","22","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("402","11","198","0","23","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("403","11","198","0","24","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("404","11","198","0","29","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("405","11","198","0","30","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("406","11","198","0","31","8","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("407","11","198","1","16","5","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("408","11","198","1","17","2","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("409","11","198","1","18","2","2024-08-15 09:02:10");
INSERT INTO attendance VALUES("410","11","301","0","25","8","2024-08-15 09:05:01");
INSERT INTO attendance VALUES("411","12","39","0","16","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("412","12","39","0","17","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("413","12","39","0","18","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("414","12","39","0","19","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("415","12","39","0","20","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("416","12","39","0","21","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("417","12","39","0","23","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("418","12","39","0","24","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("419","12","39","0","25","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("420","12","39","0","26","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("421","12","39","0","27","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("422","12","39","0","29","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("423","12","39","0","30","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("424","12","39","0","31","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("425","12","39","1","16","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("426","12","39","1","17","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("427","12","39","1","18","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("428","12","39","1","19","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("429","12","39","1","20","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("430","12","39","1","21","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("431","12","39","1","22","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("432","12","39","1","23","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("433","12","39","1","24","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("434","12","39","1","25","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("435","12","39","1","26","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("436","12","39","1","27","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("437","12","39","1","29","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("438","12","39","1","30","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("439","12","39","1","31","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("440","12","39","2","16","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("441","12","39","2","17","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("442","12","39","2","18","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("443","12","39","2","19","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("444","12","39","2","20","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("445","12","39","2","21","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("446","12","39","2","22","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("447","12","39","2","23","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("448","12","39","5","22","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("449","12","254","0","16","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("450","12","254","0","18","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("451","12","254","0","19","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("452","12","254","0","20","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("453","12","254","0","21","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("454","12","254","0","22","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("455","12","254","0","23","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("456","12","254","0","25","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("457","12","254","0","26","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("458","12","254","0","27","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("459","12","254","0","28","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("460","12","254","0","29","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("461","12","254","0","30","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("462","12","254","0","31","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("463","12","254","1","16","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("464","12","254","1","18","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("465","12","254","1","19","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("466","12","254","1","20","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("467","12","254","1","21","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("468","12","254","1","22","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("469","12","254","1","23","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("470","12","254","1","26","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("471","12","254","1","27","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("472","12","254","1","28","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("473","12","254","1","29","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("474","12","254","1","30","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("475","12","254","1","31","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("476","12","254","5","24","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("477","12","42","0","16","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("478","12","42","0","17","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("479","12","42","0","18","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("480","12","42","0","19","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("481","12","42","0","22","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("482","12","42","0","23","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("483","12","42","0","24","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("484","12","42","0","27","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("485","12","42","0","28","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("486","12","42","0","29","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("487","12","42","0","30","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("488","12","42","0","31","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("489","12","42","1","16","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("490","12","42","1","17","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("491","12","42","1","18","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("492","12","42","1","19","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("493","12","42","1","22","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("494","12","42","1","23","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("495","12","42","1","27","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("496","12","42","1","28","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("497","12","42","1","29","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("498","12","42","1","30","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("499","12","42","1","31","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("500","12","42","2","28","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("501","12","107","0","16","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("502","12","107","0","17","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("503","12","107","0","18","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("504","12","107","0","19","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("505","12","107","0","20","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("506","12","107","0","22","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("507","12","107","0","23","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("508","12","107","0","24","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("509","12","107","0","25","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("510","12","107","0","26","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("511","12","107","0","27","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("512","12","107","0","29","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("513","12","107","0","30","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("514","12","107","0","31","8","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("515","12","107","1","16","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("516","12","107","1","17","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("517","12","107","1","18","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("518","12","107","1","19","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("519","12","107","1","22","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("520","12","107","1","23","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("521","12","107","1","24","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("522","12","107","1","25","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("523","12","107","1","26","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("524","12","107","1","29","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("525","12","107","1","30","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("526","12","107","1","31","4","2024-08-15 09:31:42");
INSERT INTO attendance VALUES("527","12","39","2","24","8","2024-08-15 09:34:15");
INSERT INTO attendance VALUES("528","12","39","2","25","8","2024-08-15 09:34:15");
INSERT INTO attendance VALUES("529","12","39","2","26","8","2024-08-15 09:34:15");
INSERT INTO attendance VALUES("530","12","39","2","27","8","2024-08-15 09:34:15");
INSERT INTO attendance VALUES("531","4","35","1","8","8.5","2024-09-13 13:55:48");



CREATE TABLE `attendance_groups` (
  `attendance_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `period` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `client_id` int(11) NOT NULL,
  `active` int(11) DEFAULT 2,
  `finished` int(11) DEFAULT 2,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`attendance_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO attendance_groups VALUES("4","June 1 to 15","2024","2","1","2","2024-06-06 20:28:57");
INSERT INTO attendance_groups VALUES("5","June 1 to 15","2024","3","2","2","2024-06-07 07:14:57");
INSERT INTO attendance_groups VALUES("10","January 1 to 15","2024","4","2","2","2024-07-12 15:24:06");
INSERT INTO attendance_groups VALUES("11","July  16 to 31","2024","71","2","2","2024-08-15 08:53:07");
INSERT INTO attendance_groups VALUES("12","July  16 to 31","2024","3","2","2","2024-08-15 09:23:32");



CREATE TABLE `bank_accounts` (
  `bank_account_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `bank_id` int(11) NOT NULL,
  `account_number` varchar(100) NOT NULL,
  `active` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`bank_account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=423 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO bank_accounts VALUES("1","1","1","1789-1030-26","0","2024-04-23 11:50:46");
INSERT INTO bank_accounts VALUES("2","1","1","1789-1030-26","0","2024-05-01 14:28:15");
INSERT INTO bank_accounts VALUES("3","3","6","154-391-000-139","0","2024-05-01 14:28:48");
INSERT INTO bank_accounts VALUES("4","4","6","625-390-003-062","0","2024-05-01 14:29:15");
INSERT INTO bank_accounts VALUES("5","5","2","6763676172409","0","2024-05-01 14:30:39");
INSERT INTO bank_accounts VALUES("6","6","2","2063206341247","0","2024-05-01 14:31:05");
INSERT INTO bank_accounts VALUES("7","7","4","4403440053018","0","2024-05-01 14:32:28");
INSERT INTO bank_accounts VALUES("8","8","2","5153515268368","0","2024-05-01 14:33:08");
INSERT INTO bank_accounts VALUES("9","9","2","1333133457780","0","2024-05-01 14:33:30");
INSERT INTO bank_accounts VALUES("10","10","1","4709-0616-45","0","2024-05-01 14:34:58");
INSERT INTO bank_accounts VALUES("11","11","1","0679-1971-85","0","2024-05-01 16:54:09");
INSERT INTO bank_accounts VALUES("12","12","2","0783078161613","0","2024-05-01 16:54:39");
INSERT INTO bank_accounts VALUES("13","13","4","1023102641850","0","2024-05-01 16:55:12");
INSERT INTO bank_accounts VALUES("14","14","4","1023102679831","0","2024-05-01 16:56:03");
INSERT INTO bank_accounts VALUES("15","15","2","0783078329964","0","2024-05-01 16:56:25");
INSERT INTO bank_accounts VALUES("16","16","2","0783078109328","0","2024-05-01 16:56:49");
INSERT INTO bank_accounts VALUES("17","17","2","0783078221551","0","2024-05-01 16:57:14");
INSERT INTO bank_accounts VALUES("18","8","4","5153515268368","0","2024-05-01 16:57:32");
INSERT INTO bank_accounts VALUES("19","62","1","1259-5488-76","0","2024-05-07 16:13:37");
INSERT INTO bank_accounts VALUES("20","67","1","9709-03452-6","0","2024-05-07 16:14:32");
INSERT INTO bank_accounts VALUES("21","70","1","1259-5511-41","0","2024-05-07 16:16:05");
INSERT INTO bank_accounts VALUES("22","71","1","2309-1066-55","0","2024-05-07 16:16:51");
INSERT INTO bank_accounts VALUES("23","81","1","0679-2975-54","0","2024-05-07 16:18:24");
INSERT INTO bank_accounts VALUES("24","82","1","8769-02030-7","0","2024-05-07 16:19:40");
INSERT INTO bank_accounts VALUES("25","390","1","8599-1486-21","0","2024-05-07 16:20:27");
INSERT INTO bank_accounts VALUES("26","90","1","8089-14757-4","0","2024-05-07 16:21:19");
INSERT INTO bank_accounts VALUES("27","91","1","8829-2026-12","0","2024-05-07 16:22:07");
INSERT INTO bank_accounts VALUES("28","92","1","8749-3074-56","0","2024-05-07 16:23:10");
INSERT INTO bank_accounts VALUES("29","93","1","0679-1644-73","0","2024-05-07 16:23:59");
INSERT INTO bank_accounts VALUES("30","98","1","9929-2647-73","0","2024-05-07 16:24:37");
INSERT INTO bank_accounts VALUES("31","105","1","2309-2075-11","0","2024-05-07 16:25:16");
INSERT INTO bank_accounts VALUES("32","107","1","4639-2519-05","0","2024-05-07 16:26:02");
INSERT INTO bank_accounts VALUES("33","391","1","0949-0692-06","0","2024-05-07 16:26:42");
INSERT INTO bank_accounts VALUES("34","108","1","8829-2081-73","0","2024-05-07 16:27:34");
INSERT INTO bank_accounts VALUES("35","111","1","1259-5495-89","0","2024-05-07 16:28:29");
INSERT INTO bank_accounts VALUES("36","392","1","0739-1945-63","0","2024-05-07 16:29:13");
INSERT INTO bank_accounts VALUES("37","114","1","8599-3560-54","0","2024-05-07 16:29:52");
INSERT INTO bank_accounts VALUES("38","120","1","9709-1950-58","0","2024-05-07 16:30:31");
INSERT INTO bank_accounts VALUES("39","129","1","2209-1546-79","0","2024-05-07 16:31:20");
INSERT INTO bank_accounts VALUES("40","135","1","4639-1738-31","0","2024-05-07 16:32:00");
INSERT INTO bank_accounts VALUES("41","137","1","4689-2578-23","0","2024-05-07 16:32:38");
INSERT INTO bank_accounts VALUES("42","393","1","0726-1273-83","0","2024-05-07 16:33:30");
INSERT INTO bank_accounts VALUES("43","151","1","8599-1921-59","0","2024-05-07 16:34:17");
INSERT INTO bank_accounts VALUES("44","394","1","8599-3264-06","0","2024-05-07 16:35:40");
INSERT INTO bank_accounts VALUES("45","156","1","0659-3031-32","0","2024-05-07 16:36:43");
INSERT INTO bank_accounts VALUES("46","157","1","8769-3410-65","0","2024-05-07 16:37:29");
INSERT INTO bank_accounts VALUES("47","395","1","4589-1405-89","0","2024-05-07 16:38:35");
INSERT INTO bank_accounts VALUES("48","161","1","4719-1679-48","0","2024-05-07 16:40:12");
INSERT INTO bank_accounts VALUES("49","396","1","2789-1737-85","0","2024-05-07 16:40:59");
INSERT INTO bank_accounts VALUES("50","397","1","1259-1748-52","0","2024-05-07 16:41:38");
INSERT INTO bank_accounts VALUES("51","171","1","8279-3450-54","0","2024-05-07 16:42:26");
INSERT INTO bank_accounts VALUES("52","186","1","1789-1728-93","0","2024-05-07 16:43:05");
INSERT INTO bank_accounts VALUES("53","398","1","8819-01204-1","0","2024-05-07 16:44:25");
INSERT INTO bank_accounts VALUES("54","399","1","9709-00475-9","0","2024-05-07 16:45:08");
INSERT INTO bank_accounts VALUES("55","192","1","0759-2962-81","0","2024-05-07 16:45:54");
INSERT INTO bank_accounts VALUES("56","400","1","8796-1089-48","0","2024-05-07 16:47:19");
INSERT INTO bank_accounts VALUES("57","198","1","0729-2600-66","0","2024-05-07 16:48:02");
INSERT INTO bank_accounts VALUES("58","202","1","4719-2303-99","0","2024-05-07 16:49:03");
INSERT INTO bank_accounts VALUES("59","209","1","0729-3026-99","0","2024-05-07 16:49:49");
INSERT INTO bank_accounts VALUES("60","212","1","2789-08662-4","0","2024-05-07 16:50:37");
INSERT INTO bank_accounts VALUES("61","214","1","0679-26755-8","0","2024-05-07 16:52:16");
INSERT INTO bank_accounts VALUES("62","216","1","0659-2763-13","0","2024-05-07 16:53:08");
INSERT INTO bank_accounts VALUES("63","219","1","2009-0320-05","0","2024-05-07 16:53:58");
INSERT INTO bank_accounts VALUES("64","229","1","0759-4432-92","0","2024-05-07 16:54:45");
INSERT INTO bank_accounts VALUES("65","401","1","0519-2065-36","0","2024-05-07 16:55:43");
INSERT INTO bank_accounts VALUES("66","402","1","8749-3368-68","0","2024-05-07 16:57:12");
INSERT INTO bank_accounts VALUES("67","403","1","0726-1110-53","0","2024-05-07 16:58:08");
INSERT INTO bank_accounts VALUES("68","404","1","0759-4882-96","0","2024-05-07 16:58:52");
INSERT INTO bank_accounts VALUES("69","405","1","9929-1018-52","0","2024-05-07 16:59:33");
INSERT INTO bank_accounts VALUES("70","246","1","0719-3033-66","0","2024-05-07 17:00:17");
INSERT INTO bank_accounts VALUES("71","406","1","0706-25861-9","0","2024-05-07 17:00:58");
INSERT INTO bank_accounts VALUES("72","407","1","8819-2229-84","0","2024-05-07 17:01:37");
INSERT INTO bank_accounts VALUES("73","408","1","0759-4554-95","0","2024-05-07 17:02:14");
INSERT INTO bank_accounts VALUES("74","40","1","4739-06641-2","0","2024-05-07 17:02:53");
INSERT INTO bank_accounts VALUES("75","409","1","1259-4616-65","0","2024-05-07 17:03:58");
INSERT INTO bank_accounts VALUES("76","410","1","2309-0149-63","0","2024-05-07 17:05:09");
INSERT INTO bank_accounts VALUES("77","264","1","0726-0922-29","0","2024-05-07 17:05:49");
INSERT INTO bank_accounts VALUES("78","270","1","0789-1302-56","0","2024-05-07 17:06:34");
INSERT INTO bank_accounts VALUES("79","271","1","0609-0545-65","0","2024-05-07 17:07:20");
INSERT INTO bank_accounts VALUES("80","411","1","9689-1882-46","0","2024-05-07 17:08:00");
INSERT INTO bank_accounts VALUES("81","284","1","8599-0580-53","0","2024-05-07 17:08:41");
INSERT INTO bank_accounts VALUES("82","286","1","4289-1586-56","0","2024-05-07 17:09:21");
INSERT INTO bank_accounts VALUES("83","288","1","1789-1382-96","0","2024-05-07 17:10:29");
INSERT INTO bank_accounts VALUES("84","289","1","0769-1367-11","0","2024-05-07 17:11:10");
INSERT INTO bank_accounts VALUES("85","412","1","4709-1925-02","0","2024-05-07 17:11:51");
INSERT INTO bank_accounts VALUES("86","413","1","8799-2610-79","0","2024-05-07 17:12:44");
INSERT INTO bank_accounts VALUES("87","53","1","0729-3119-31","0","2024-05-07 17:13:37");
INSERT INTO bank_accounts VALUES("88","297","1","0129-0687-75","0","2024-05-07 17:14:14");
INSERT INTO bank_accounts VALUES("89","301","1","4589-1538-77","0","2024-05-07 17:14:47");
INSERT INTO bank_accounts VALUES("90","414","1","0739-0424-96","0","2024-05-07 17:15:44");
INSERT INTO bank_accounts VALUES("91","415","1","1849-1687-85","0","2024-05-07 17:16:31");
INSERT INTO bank_accounts VALUES("92","305","1","0529-0697-74","0","2024-05-07 17:17:17");
INSERT INTO bank_accounts VALUES("93","306","1","9689-1270-26","0","2024-05-07 17:17:45");
INSERT INTO bank_accounts VALUES("94","318","1","8749-3369-06","0","2024-05-07 17:18:28");
INSERT INTO bank_accounts VALUES("95","416","1","9929-13888-8","0","2024-05-07 17:19:12");
INSERT INTO bank_accounts VALUES("96","330","1","0609-07188-5","0","2024-05-07 17:21:21");
INSERT INTO bank_accounts VALUES("97","37","1","2789-08733-7","0","2024-05-07 17:22:06");
INSERT INTO bank_accounts VALUES("98","335","1","0719-2826-87","0","2024-05-07 17:22:54");
INSERT INTO bank_accounts VALUES("99","339","1","4589-15089-4","0","2024-05-07 17:23:40");
INSERT INTO bank_accounts VALUES("100","417","1","4719-2318-08","0","2024-05-07 17:24:27");
INSERT INTO bank_accounts VALUES("101","418","1","8789-1235-44","0","2024-05-07 17:25:16");
INSERT INTO bank_accounts VALUES("102","419","1","1259-5100-54","0","2024-05-07 17:26:09");
INSERT INTO bank_accounts VALUES("103","420","1","9709-2258-01","0","2024-05-07 17:26:47");
INSERT INTO bank_accounts VALUES("104","421","1","2009-1508-35","0","2024-05-07 17:27:41");
INSERT INTO bank_accounts VALUES("105","350","1","2009-0268-62","0","2024-05-07 17:29:11");
INSERT INTO bank_accounts VALUES("106","19","1","0759-3419-45","0","2024-05-07 17:29:51");
INSERT INTO bank_accounts VALUES("107","422","1","1259-3201-23","0","2024-05-07 17:30:40");
INSERT INTO bank_accounts VALUES("108","423","1","9709-0457-22","0","2024-05-07 17:31:08");
INSERT INTO bank_accounts VALUES("109","424","1","0789-3658-22","0","2024-05-07 17:31:50");
INSERT INTO bank_accounts VALUES("110","354","1","4709-0621-53","0","2024-05-07 17:32:46");
INSERT INTO bank_accounts VALUES("111","426","1","4589-2358-81","0","2024-05-07 17:33:27");
INSERT INTO bank_accounts VALUES("112","355","1","0719-3333-89","0","2024-05-07 17:34:05");
INSERT INTO bank_accounts VALUES("113","357","1","4689-3267-28","0","2024-05-07 17:34:44");
INSERT INTO bank_accounts VALUES("114","365","1","0649-1314-22","0","2024-05-07 17:35:25");
INSERT INTO bank_accounts VALUES("115","366","1","9709-2557-78","0","2024-05-07 17:36:10");
INSERT INTO bank_accounts VALUES("116","427","1","8089-2498-49","0","2024-05-07 17:36:54");
INSERT INTO bank_accounts VALUES("117","373","1","0659-3920-11","0","2024-05-07 17:38:12");
INSERT INTO bank_accounts VALUES("118","429","1","0649-0792-18","0","2024-05-07 17:38:57");
INSERT INTO bank_accounts VALUES("119","430","1","8399-3849-96","0","2024-05-07 17:39:34");
INSERT INTO bank_accounts VALUES("120","382","1","4589-1092-23","0","2024-05-07 17:40:29");
INSERT INTO bank_accounts VALUES("121","431","1","9929-1268-39","0","2024-05-07 17:41:15");
INSERT INTO bank_accounts VALUES("122","387","1","0759-5037-16","0","2024-05-07 17:42:05");
INSERT INTO bank_accounts VALUES("123","388","1","8769-04234-3","0","2024-05-07 17:42:51");
INSERT INTO bank_accounts VALUES("124","389","1","1049-3081-63","0","2024-05-07 17:43:54");
INSERT INTO bank_accounts VALUES("125","56","6","607-390-004-913","0","2024-05-08 09:51:01");
INSERT INTO bank_accounts VALUES("126","61","6","077-391-013-057","0","2024-05-08 09:54:12");
INSERT INTO bank_accounts VALUES("127","64","6","188-391-009-048","0","2024-05-08 09:55:17");
INSERT INTO bank_accounts VALUES("128","80","6","239-390-001-284","0","2024-05-08 09:57:05");
INSERT INTO bank_accounts VALUES("129","3","6","154-391-000-139","0","2024-05-08 09:57:52");
INSERT INTO bank_accounts VALUES("130","48","6","154-391-001-847","0","2024-05-08 09:58:48");
INSERT INTO bank_accounts VALUES("131","95","6","625-390-003-039","0","2024-05-08 09:59:46");
INSERT INTO bank_accounts VALUES("132","96","6","635-391-000-385","0","2024-05-08 10:00:24");
INSERT INTO bank_accounts VALUES("133","100","6","107-391-010-739","0","2024-05-08 10:01:33");
INSERT INTO bank_accounts VALUES("134","102","6","607-390-005-587","0","2024-05-08 10:02:35");
INSERT INTO bank_accounts VALUES("135","106","6","607-390-005-587","0","2024-05-08 10:03:24");
INSERT INTO bank_accounts VALUES("136","463","6","625-390-002-241","0","2024-05-08 10:05:26");
INSERT INTO bank_accounts VALUES("137","41","6","218-391-002-772","0","2024-05-08 10:06:23");
INSERT INTO bank_accounts VALUES("138","112","6","231-390-007-932","0","2024-05-08 10:06:58");
INSERT INTO bank_accounts VALUES("139","123","6","621-390-000-468","0","2024-05-08 10:08:40");
INSERT INTO bank_accounts VALUES("140","124","6","218-390-004-463","0","2024-05-08 10:09:46");
INSERT INTO bank_accounts VALUES("141","432","6","607-390-005-474","0","2024-05-08 10:10:18");
INSERT INTO bank_accounts VALUES("142","433","6","607-390-004-899","0","2024-05-08 10:12:08");
INSERT INTO bank_accounts VALUES("143","47","6","607-391-004-980","0","2024-05-08 10:13:41");
INSERT INTO bank_accounts VALUES("144","146","6","607-390-004-594","0","2024-05-08 10:14:12");
INSERT INTO bank_accounts VALUES("145","434","6","334-390-002-831","0","2024-05-08 10:14:57");
INSERT INTO bank_accounts VALUES("146","464","6","635-390-000-680","0","2024-05-08 10:18:32");
INSERT INTO bank_accounts VALUES("147","435","6","176-391-007-802","0","2024-05-08 10:20:56");
INSERT INTO bank_accounts VALUES("148","149","6","625-390-002-296","0","2024-05-08 10:21:47");
INSERT INTO bank_accounts VALUES("149","158","6","050-400-010-002","0","2024-05-08 10:23:01");
INSERT INTO bank_accounts VALUES("150","437","6","334-390-000-549","0","2024-05-08 10:24:59");
INSERT INTO bank_accounts VALUES("151","178","6","088-391-010-905","0","2024-05-08 10:25:38");
INSERT INTO bank_accounts VALUES("152","181","6","023-391-004-677","0","2024-05-08 10:26:51");
INSERT INTO bank_accounts VALUES("153","189","6","607-390-004-731","0","2024-05-08 10:27:32");
INSERT INTO bank_accounts VALUES("154","439","6","607-390-004-561","0","2024-05-08 10:28:07");
INSERT INTO bank_accounts VALUES("155","199","6","172-110-004-109","0","2024-05-08 10:29:07");
INSERT INTO bank_accounts VALUES("156","206","6","028-391-004-987","0","2024-05-08 10:29:51");
INSERT INTO bank_accounts VALUES("157","213","6","336-391-000-476","0","2024-05-08 10:31:09");
INSERT INTO bank_accounts VALUES("158","448","6","068-391-007-083","0","2024-05-08 10:33:29");
INSERT INTO bank_accounts VALUES("159","449","6","066-390-003-083","0","2024-05-08 10:34:45");
INSERT INTO bank_accounts VALUES("160","450","6","336-391-002-156","0","2024-05-08 10:36:17");
INSERT INTO bank_accounts VALUES("161","230","6","069-391-009-287","0","2024-05-08 10:46:30");
INSERT INTO bank_accounts VALUES("162","451","6","127-391-017-689","0","2024-05-08 10:48:19");
INSERT INTO bank_accounts VALUES("163","240","6","127-190-005-210","0","2024-05-08 10:50:16");
INSERT INTO bank_accounts VALUES("164","242","6","028-391-000-314","0","2024-05-08 10:51:42");
INSERT INTO bank_accounts VALUES("165","247","6","607-390-004-210","0","2024-05-08 10:52:54");
INSERT INTO bank_accounts VALUES("166","253","6","607-390-001-763","0","2024-05-08 10:54:13");
INSERT INTO bank_accounts VALUES("167","452","6","176-390-001-720","0","2024-05-08 10:55:01");
INSERT INTO bank_accounts VALUES("168","258","6","236-391-002-075","0","2024-05-08 10:55:43");
INSERT INTO bank_accounts VALUES("169","454","6","068-390-000-247","0","2024-05-08 10:57:17");
INSERT INTO bank_accounts VALUES("170","281","6","239-390-002-006","0","2024-05-08 10:57:49");
INSERT INTO bank_accounts VALUES("171","283","6","077-390-000-332","0","2024-05-08 10:58:48");
INSERT INTO bank_accounts VALUES("172","455","6","191-390-002-153","0","2024-05-08 10:59:41");
INSERT INTO bank_accounts VALUES("173","456","6","127-390-004-589","0","2024-05-08 11:00:31");
INSERT INTO bank_accounts VALUES("174","294","6","154-391-000-060","0","2024-05-08 11:01:00");
INSERT INTO bank_accounts VALUES("175","457","6","066-390-003-107","0","2024-05-08 11:01:48");
INSERT INTO bank_accounts VALUES("176","458","6","625-390-003-028","0","2024-05-08 11:02:38");
INSERT INTO bank_accounts VALUES("177","304","6","625-390-003-051","0","2024-05-08 11:03:11");
INSERT INTO bank_accounts VALUES("178","308","6","607-391-003-181","0","2024-05-08 11:04:20");
INSERT INTO bank_accounts VALUES("179","459","6","231-390-008-197","0","2024-05-08 11:04:49");
INSERT INTO bank_accounts VALUES("180","312","6","028-391-006-407","0","2024-05-08 11:05:24");
INSERT INTO bank_accounts VALUES("181","317","6","625-390-003-277","0","2024-05-08 11:05:55");
INSERT INTO bank_accounts VALUES("182","322","6","607-390-003-181","0","2024-05-08 11:07:31");
INSERT INTO bank_accounts VALUES("183","460","6","625-390-002-252","0","2024-05-08 11:08:00");
INSERT INTO bank_accounts VALUES("184","461","6","127-390-004-964","0","2024-05-08 11:08:31");
INSERT INTO bank_accounts VALUES("185","326","6","607-391-003-034","0","2024-05-08 11:08:58");
INSERT INTO bank_accounts VALUES("186","462","6","066-390-000-741","0","2024-05-08 11:12:52");
INSERT INTO bank_accounts VALUES("187","337","6","607-390-004-764","0","2024-05-08 11:14:35");
INSERT INTO bank_accounts VALUES("188","38","6","088-390-000-180","0","2024-05-08 11:15:09");
INSERT INTO bank_accounts VALUES("189","346","6","077-390-004-610","0","2024-05-08 11:15:50");
INSERT INTO bank_accounts VALUES("190","440","6","028-391-004-874","0","2024-05-08 11:16:46");
INSERT INTO bank_accounts VALUES("191","356","6","625-390-003-017","0","2024-05-08 11:17:23");
INSERT INTO bank_accounts VALUES("192","441","6","625-391-000-016","0","2024-05-08 11:17:58");
INSERT INTO bank_accounts VALUES("193","443","6","334-390-004-442","0","2024-05-08 11:21:55");
INSERT INTO bank_accounts VALUES("194","46","6","607-391-003-067","0","2024-05-08 11:22:47");
INSERT INTO bank_accounts VALUES("195","444","6","127-391-016-277","0","2024-05-08 11:23:28");
INSERT INTO bank_accounts VALUES("196","374","6","607-391-003-283","0","2024-05-08 11:24:53");
INSERT INTO bank_accounts VALUES("197","445","6","635-390-000-942","0","2024-05-08 11:25:33");
INSERT INTO bank_accounts VALUES("198","375","6","088-391-010-938","0","2024-05-08 11:26:04");
INSERT INTO bank_accounts VALUES("199","446","6","136-391-002-642","0","2024-05-08 11:26:33");
INSERT INTO bank_accounts VALUES("200","447","6","625-391-000-550","0","2024-05-08 11:27:09");
INSERT INTO bank_accounts VALUES("201","384","6","607-390-004-991","0","2024-05-08 11:28:01");
INSERT INTO bank_accounts VALUES("202","27","4","296-3-29655190-3","0","2024-05-08 11:37:44");
INSERT INTO bank_accounts VALUES("203","26","4","373-3-373-30166-4","0","2024-05-08 11:38:20");
INSERT INTO bank_accounts VALUES("204","465","4","133-3-133-546-244","0","2024-05-08 11:39:56");
INSERT INTO bank_accounts VALUES("205","72","4","572-3-572-05949-0","0","2024-05-08 11:40:47");
INSERT INTO bank_accounts VALUES("206","466","4","377-3-922-099457","0","2024-05-08 11:41:49");
INSERT INTO bank_accounts VALUES("207","77","4","572-3-572-05943-0","0","2024-05-08 11:42:26");
INSERT INTO bank_accounts VALUES("208","84","4","296-3-296-40921-0","0","2024-05-08 11:49:08");
INSERT INTO bank_accounts VALUES("209","467","4","466-3-466-07563-0","0","2024-05-08 11:51:24");
INSERT INTO bank_accounts VALUES("210","94","4","296-3-296-40371-8","0","2024-05-08 11:52:04");
INSERT INTO bank_accounts VALUES("211","468","4","275-3-275-42411-1","0","2024-05-08 11:53:59");
INSERT INTO bank_accounts VALUES("212","116","4","424-3-424-18530-3","0","2024-05-08 11:56:47");
INSERT INTO bank_accounts VALUES("213","21","4","676-3-676-18551-9","0","2024-05-08 11:57:33");
INSERT INTO bank_accounts VALUES("214","119","4","377-3-377-00966-6","0","2024-05-08 12:00:20");
INSERT INTO bank_accounts VALUES("215","131","4","297-3-297-25065-6","0","2024-05-08 12:02:08");
INSERT INTO bank_accounts VALUES("216","469","4","789-3-921-945117","0","2024-05-08 12:03:10");
INSERT INTO bank_accounts VALUES("217","138","4","676-3-676-18550-0","0","2024-05-08 12:03:44");
INSERT INTO bank_accounts VALUES("218","142","4","133-3-133-44500-6","0","2024-05-08 12:04:11");
INSERT INTO bank_accounts VALUES("219","143","4","262-3-262-55081-9","0","2024-05-08 12:53:04");
INSERT INTO bank_accounts VALUES("220","148","4","297-3-297-47149-0","0","2024-05-08 12:53:50");
INSERT INTO bank_accounts VALUES("221","153","4","994-385-302056-8","0","2024-05-08 12:55:48");
INSERT INTO bank_accounts VALUES("222","162","4","424-3-424-19108-7","0","2024-05-08 12:56:24");
INSERT INTO bank_accounts VALUES("223","165","4","575-3-575-15910-0","0","2024-05-08 12:57:56");
INSERT INTO bank_accounts VALUES("224","173","4","676-3-676-18539-0","0","2024-05-08 12:58:51");
INSERT INTO bank_accounts VALUES("225","23","4","373-3-373-28892-7","0","2024-05-08 12:59:20");
INSERT INTO bank_accounts VALUES("226","184","4","676-3-676-17248-4","0","2024-05-08 12:59:46");
INSERT INTO bank_accounts VALUES("227","194","4","542-3-542-23973-6","0","2024-05-08 13:00:30");
INSERT INTO bank_accounts VALUES("228","200","4","377-3-377-01311-6","0","2024-05-08 13:01:16");
INSERT INTO bank_accounts VALUES("229","225","4","424-3-424-18494-3","0","2024-05-08 13:08:27");
INSERT INTO bank_accounts VALUES("230","245","4","676-3-676-18538-1","0","2024-05-08 13:22:48");
INSERT INTO bank_accounts VALUES("231","250","4","119-3-119-87244-9","0","2024-05-08 13:23:45");
INSERT INTO bank_accounts VALUES("232","470","4","572-3-572-05941-4","0","2024-05-08 13:24:51");
INSERT INTO bank_accounts VALUES("233","259","4","440-3-440-09369-9","0","2024-05-08 13:25:55");
INSERT INTO bank_accounts VALUES("234","266","4","296-3-296-40359-9","0","2024-05-08 13:27:32");
INSERT INTO bank_accounts VALUES("235","471","4","572-3-572-05942-2","0","2024-05-08 13:30:23");
INSERT INTO bank_accounts VALUES("236","472","4","374-3-374-34097-3","0","2024-05-08 13:33:26");
INSERT INTO bank_accounts VALUES("237","277","4","424-3-424-19301-2","0","2024-05-08 13:34:11");
INSERT INTO bank_accounts VALUES("238","13","4","102-3-102-64185-0","0","2024-05-08 13:35:10");
INSERT INTO bank_accounts VALUES("239","299","4","374-3-374-00551-1","0","2024-05-08 13:35:40");
INSERT INTO bank_accounts VALUES("240","333","4","440-3-440-08066-0","0","2024-05-08 13:36:59");
INSERT INTO bank_accounts VALUES("241","59","6","239-391-002-380","0","2024-05-08 13:37:51");
INSERT INTO bank_accounts VALUES("242","115","6","607-390-005-644","0","2024-05-08 13:38:43");
INSERT INTO bank_accounts VALUES("243","147","6","233-390-000-603","0","2024-05-08 13:39:17");
INSERT INTO bank_accounts VALUES("244","436","6","197-390-010-296","0","2024-05-08 13:40:10");
INSERT INTO bank_accounts VALUES("245","438","6","236-391-002-927","0","2024-05-08 13:40:49");
INSERT INTO bank_accounts VALUES("246","215","6","625-390-001-054","0","2024-05-08 13:43:14");
INSERT INTO bank_accounts VALUES("247","360","6","191-391-017-852","0","2024-05-08 13:44:02");
INSERT INTO bank_accounts VALUES("248","442","6","218-390-004-644","0","2024-05-08 13:44:34");
INSERT INTO bank_accounts VALUES("249","368","6","607-390-000-088","0","2024-05-08 13:46:38");
INSERT INTO bank_accounts VALUES("250","243","6","176-390-003-159","0","2024-05-08 13:49:41");
INSERT INTO bank_accounts VALUES("251","453","6","066-390-003-742","0","2024-05-08 13:50:09");
INSERT INTO bank_accounts VALUES("252","300","6","069-390-000-411","0","2024-05-08 13:50:55");
INSERT INTO bank_accounts VALUES("253","327","6","236-390-002-359","0","2024-05-08 13:52:01");
INSERT INTO bank_accounts VALUES("254","344","4","052-3-052-64455-1","0","2024-05-08 13:54:36");
INSERT INTO bank_accounts VALUES("255","473","4","102-3-102-702833","0","2024-05-08 13:56:02");
INSERT INTO bank_accounts VALUES("256","380","4","676-3-676-185-420","0","2024-05-08 13:57:16");
INSERT INTO bank_accounts VALUES("257","474","4","371-3-371-950894","0","2024-05-08 13:58:50");
INSERT INTO bank_accounts VALUES("258","57","4","305-3-305-703002","0","2024-05-08 13:59:34");
INSERT INTO bank_accounts VALUES("259","60","4","515-3-515-26835-0","0","2024-05-08 14:00:11");
INSERT INTO bank_accounts VALUES("260","65","4","371-3-371-38858-4","0","2024-05-08 14:00:58");
INSERT INTO bank_accounts VALUES("261","475","4","3723372550431","0","2024-05-08 14:02:13");
INSERT INTO bank_accounts VALUES("262","76","4","371-3-371-38860-6","0","2024-05-08 14:03:02");
INSERT INTO bank_accounts VALUES("263","24","4","522-352-235-2803","0","2024-05-08 14:04:21");
INSERT INTO bank_accounts VALUES("264","85","4","106-3-106-47602-1","0","2024-05-08 14:05:07");
INSERT INTO bank_accounts VALUES("265","88","4","296-3-296-54249-1","0","2024-05-08 14:05:45");
INSERT INTO bank_accounts VALUES("266","476","4","1653853736121","0","2024-05-08 14:07:05");
INSERT INTO bank_accounts VALUES("267","117","4","297-3-297-47051-6","0","2024-05-08 14:07:49");
INSERT INTO bank_accounts VALUES("268","118","4","425-3-425-25752-9","0","2024-05-08 14:08:17");
INSERT INTO bank_accounts VALUES("269","127","4","425-3-425-28169-1","0","2024-05-08 14:09:16");
INSERT INTO bank_accounts VALUES("270","132","4","380-3-380-13867-1","0","2024-05-08 14:09:53");
INSERT INTO bank_accounts VALUES("271","136","4","440-3-440-154-434","0","2024-05-08 14:10:41");
INSERT INTO bank_accounts VALUES("272","139","4","536-3-536-071572","0","2024-05-08 14:11:36");
INSERT INTO bank_accounts VALUES("273","144","4","264-3-264-83002-9","0","2024-05-08 14:13:00");
INSERT INTO bank_accounts VALUES("274","150","4","575-3-575-15759-0","0","2024-05-08 14:13:37");
INSERT INTO bank_accounts VALUES("275","152","4","052-3-052-64293-1","0","2024-05-08 14:14:35");
INSERT INTO bank_accounts VALUES("276","477","4","5233523531027","0","2024-05-08 14:16:08");
INSERT INTO bank_accounts VALUES("277","478","4","069-3069728023","0","2024-05-08 14:17:42");
INSERT INTO bank_accounts VALUES("278","180","4","102-3-102-70339-2","0","2024-05-08 14:18:16");
INSERT INTO bank_accounts VALUES("279","182","4","102-3-102-67904-1","0","2024-05-08 14:18:57");
INSERT INTO bank_accounts VALUES("280","187","4","518-3-518-31754-8","0","2024-05-08 14:19:33");
INSERT INTO bank_accounts VALUES("281","479","4","069-3-069-67456-0","0","2024-05-08 14:20:52");
INSERT INTO bank_accounts VALUES("282","480","4","676-3-676-941-097","0","2024-05-08 14:22:11");
INSERT INTO bank_accounts VALUES("283","481","4","681438","0","2024-05-08 14:23:29");
INSERT INTO bank_accounts VALUES("284","204","4","1563156937518","0","2024-05-08 14:27:08");
INSERT INTO bank_accounts VALUES("285","482","4","695-3-695-09185-1","0","2024-05-08 14:28:57");
INSERT INTO bank_accounts VALUES("286","205","4","515-3-515-26848-1","0","2024-05-08 14:30:02");
INSERT INTO bank_accounts VALUES("287","210","4","522-3-522-355-020","0","2024-05-08 14:30:42");
INSERT INTO bank_accounts VALUES("288","211","4","522-3-522-34994-2","0","2024-05-08 14:32:06");
INSERT INTO bank_accounts VALUES("289","221","4","296-3-296-40389-0","0","2024-05-08 14:35:29");
INSERT INTO bank_accounts VALUES("290","222","4","372-3-372-24394-6","0","2024-05-08 14:36:18");
INSERT INTO bank_accounts VALUES("291","483","4","206-3-206-30033-8","0","2024-05-08 14:37:53");
INSERT INTO bank_accounts VALUES("292","224","4","069-3-069-65011-3","0","2024-05-08 14:38:37");
INSERT INTO bank_accounts VALUES("293","231","4","296-3-296-42154-6","0","2024-05-08 14:39:13");
INSERT INTO bank_accounts VALUES("294","239","4","441-3-441-28241-0","0","2024-05-08 14:40:00");
INSERT INTO bank_accounts VALUES("295","252","4","3-078-30606-9","0","2024-05-08 14:40:41");
INSERT INTO bank_accounts VALUES("296","257","4","296-3-296-41885-5","0","2024-05-08 14:41:14");
INSERT INTO bank_accounts VALUES("297","262","4","297-3-297-47269-1","0","2024-05-08 14:42:00");
INSERT INTO bank_accounts VALUES("298","267","4","372-3-372-14915-0","0","2024-05-08 14:43:38");
INSERT INTO bank_accounts VALUES("299","269","4","628-3-628-19016-0","0","2024-05-08 14:44:16");
INSERT INTO bank_accounts VALUES("300","272","4","425-3-425-25751-0","0","2024-05-08 14:44:45");
INSERT INTO bank_accounts VALUES("301","274","4","466-3-466-27030-0","0","2024-05-08 14:45:24");
INSERT INTO bank_accounts VALUES("302","276","4","4303430339584","0","2024-05-08 14:46:51");
INSERT INTO bank_accounts VALUES("303","285","4","069-3-069-52070-8","0","2024-05-08 14:47:45");
INSERT INTO bank_accounts VALUES("304","290","4","572-3-572-09086-9","0","2024-05-08 14:48:29");
INSERT INTO bank_accounts VALUES("305","292","4","449-3-449-31096-0","0","2024-05-08 14:49:37");
INSERT INTO bank_accounts VALUES("306","296","4","399-3-399-527768","0","2024-05-08 14:50:22");
INSERT INTO bank_accounts VALUES("307","298","4","372-3-372-249-669","0","2024-05-08 14:50:50");
INSERT INTO bank_accounts VALUES("308","313","4","045-3-045-58018-1","0","2024-05-08 14:51:32");
INSERT INTO bank_accounts VALUES("309","314","4","5163516243610","0","2024-05-08 14:52:30");
INSERT INTO bank_accounts VALUES("310","315","4","372-3-372-18237-8","0","2024-05-08 14:53:09");
INSERT INTO bank_accounts VALUES("311","316","4","536-3-536-071556","0","2024-05-08 14:53:37");
INSERT INTO bank_accounts VALUES("312","484","4","021-3-903-006-189","0","2024-05-08 14:54:48");
INSERT INTO bank_accounts VALUES("313","485","4","676-3-676-94664-1","0","2024-05-08 14:55:50");
INSERT INTO bank_accounts VALUES("314","486","4","695-3-695-09095-2","0","2024-05-08 14:56:53");
INSERT INTO bank_accounts VALUES("315","487","4","188-3-188-63153-4","0","2024-05-08 14:58:20");
INSERT INTO bank_accounts VALUES("316","488","4","515-3-515-26837-6","0","2024-05-08 15:01:04");
INSERT INTO bank_accounts VALUES("317","341","4","133-3-133-53819-5","0","2024-05-08 15:01:47");
INSERT INTO bank_accounts VALUES("318","489","4","425-3-425-55963-0","0","2024-05-08 15:05:59");
INSERT INTO bank_accounts VALUES("319","22","4","372-3-372-14912-5","0","2024-05-08 15:13:28");
INSERT INTO bank_accounts VALUES("320","343","4","165-3-920-76119-5","0","2024-05-08 15:16:50");
INSERT INTO bank_accounts VALUES("321","348","4","206-3-206-54075-4","0","2024-05-08 15:18:04");
INSERT INTO bank_accounts VALUES("322","491","4","572-3-572-09239-0","0","2024-05-08 15:43:03");
INSERT INTO bank_accounts VALUES("323","353","4","3-904-07703-9","0","2024-05-08 15:43:37");
INSERT INTO bank_accounts VALUES("324","358","4","206-3-206-28432-4","0","2024-05-08 15:44:15");
INSERT INTO bank_accounts VALUES("325","362","4","069-3-069-68816-1","0","2024-05-08 15:45:45");
INSERT INTO bank_accounts VALUES("326","363","4","466-3-466-53929-6","0","2024-05-08 15:46:18");
INSERT INTO bank_accounts VALUES("327","364","4","069-3-069-70763-8","0","2024-05-08 15:46:49");
INSERT INTO bank_accounts VALUES("328","367","4","372-3-372-249-650","0","2024-05-08 15:47:32");
INSERT INTO bank_accounts VALUES("329","492","4","297-3-297-94127-6","0","2024-05-08 15:48:36");
INSERT INTO bank_accounts VALUES("330","25","4","102-3-102-67544-5","0","2024-05-08 15:49:33");
INSERT INTO bank_accounts VALUES("331","370","4","296-3-296-54307-2","0","2024-05-08 15:50:02");
INSERT INTO bank_accounts VALUES("332","493","4","430-3-430-310-810","0","2024-05-08 15:50:53");
INSERT INTO bank_accounts VALUES("333","377","4","102-3-102-67905-0","0","2024-05-08 15:51:34");
INSERT INTO bank_accounts VALUES("334","494","4","102-3-102-64810-3","0","2024-05-08 15:52:35");
INSERT INTO bank_accounts VALUES("335","385","4","325-3-325-60890-1","0","2024-05-08 15:53:03");
INSERT INTO bank_accounts VALUES("336","73","3","3-149-24354-3","0","2024-05-08 15:54:10");
INSERT INTO bank_accounts VALUES("337","39","3","3-149-14520-7","0","2024-05-08 15:54:55");
INSERT INTO bank_accounts VALUES("338","122","3","3-149-12918-0","0","2024-05-08 15:56:13");
INSERT INTO bank_accounts VALUES("339","126","3","3-149-14929-6","0","2024-05-08 15:56:45");
INSERT INTO bank_accounts VALUES("340","166","3","3-149-12927-9","0","2024-05-08 15:57:15");
INSERT INTO bank_accounts VALUES("341","169","3","3-149-14525-8","0","2024-05-08 15:58:17");
INSERT INTO bank_accounts VALUES("342","170","3","1493149312073","0","2024-05-08 15:58:52");
INSERT INTO bank_accounts VALUES("343","174","3","3-149-13655-0","0","2024-05-08 15:59:50");
INSERT INTO bank_accounts VALUES("344","496","3","3-149-14526-6","0","2024-05-08 16:03:54");
INSERT INTO bank_accounts VALUES("345","179","3","3-149-15106-1","0","2024-05-08 16:04:28");
INSERT INTO bank_accounts VALUES("346","497","3","3-149-14935-0","0","2024-05-08 16:06:34");
INSERT INTO bank_accounts VALUES("347","203","3","3-149-13087-0","0","2024-05-08 16:07:24");
INSERT INTO bank_accounts VALUES("348","232","3","3-149-14530-4","0","2024-05-08 16:07:55");
INSERT INTO bank_accounts VALUES("349","233","3","3-149-14531-2","0","2024-05-08 16:08:18");
INSERT INTO bank_accounts VALUES("350","498","3","3-149-22015-2","0","2024-05-08 16:09:27");
INSERT INTO bank_accounts VALUES("351","499","3","3-149-17667-6","0","2024-05-08 16:10:29");
INSERT INTO bank_accounts VALUES("352","29","3","3-149-13940-1","0","2024-05-08 16:11:03");
INSERT INTO bank_accounts VALUES("353","320","3","3-149-14300-0","0","2024-05-08 16:11:37");
INSERT INTO bank_accounts VALUES("354","500","3","3-149-16110-5","0","2024-05-08 16:13:15");
INSERT INTO bank_accounts VALUES("355","328","3","3-149-12934-1","0","2024-05-08 16:14:55");
INSERT INTO bank_accounts VALUES("356","501","3","3-149-12934-1","0","2024-05-08 16:16:53");
INSERT INTO bank_accounts VALUES("357","51","2","3-078-18058-8","0","2024-05-08 16:17:56");
INSERT INTO bank_accounts VALUES("358","75","2","3-078-30089-3","0","2024-05-08 16:18:55");
INSERT INTO bank_accounts VALUES("359","79","2","3-078-29417-6","0","2024-05-08 16:19:46");
INSERT INTO bank_accounts VALUES("360","54","2","3-078-30031-1","0","2024-05-08 16:20:20");
INSERT INTO bank_accounts VALUES("361","502","2","3-078-33242-6","0","2024-05-08 16:21:23");
INSERT INTO bank_accounts VALUES("362","503","2","3-078-39854-0","0","2024-05-08 16:22:08");
INSERT INTO bank_accounts VALUES("363","504","2","3-078-31374-0","0","2024-05-08 16:23:38");
INSERT INTO bank_accounts VALUES("364","505","2","3-078-332566","0","2024-05-08 16:25:31");
INSERT INTO bank_accounts VALUES("365","35","2","3-078-32613-2","0","2024-05-08 16:26:19");
INSERT INTO bank_accounts VALUES("366","44","2","3-078-39112-0","0","2024-05-08 16:26:46");
INSERT INTO bank_accounts VALUES("367","109","2","3-078-32539-0","0","2024-05-08 16:27:17");
INSERT INTO bank_accounts VALUES("368","121","2","3-078-35060-2","0","2024-05-08 16:28:54");
INSERT INTO bank_accounts VALUES("369","506","2","078-3-078-93070-6","0","2024-05-08 16:30:07");
INSERT INTO bank_accounts VALUES("370","34","2","3-078-34578-1","0","2024-05-08 16:30:41");
INSERT INTO bank_accounts VALUES("371","134","2","3-078-39062-0","0","2024-05-08 16:31:10");
INSERT INTO bank_accounts VALUES("372","507","2","078-3-078-93065-0","0","2024-05-08 16:32:08");
INSERT INTO bank_accounts VALUES("373","145","2","3-078-17709-9","0","2024-05-08 16:32:36");
INSERT INTO bank_accounts VALUES("374","154","2","3-078-32616-7","0","2024-05-08 16:33:37");
INSERT INTO bank_accounts VALUES("375","42","2","3-078-35886-7","0","2024-05-08 16:34:17");
INSERT INTO bank_accounts VALUES("376","168","2","3-078-30999-8","0","2024-05-08 16:34:49");
INSERT INTO bank_accounts VALUES("377","508","2","3-078-38021-8","0","2024-05-08 16:35:47");
INSERT INTO bank_accounts VALUES("378","30","2","078-3078932288","0","2024-05-08 16:37:41");
INSERT INTO bank_accounts VALUES("379","185","2","3-078-34567-6","0","2024-05-08 16:38:15");
INSERT INTO bank_accounts VALUES("380","36","2","3-078-33601-4","0","2024-05-08 16:38:46");
INSERT INTO bank_accounts VALUES("381","43","2","3-078-31245-0","0","2024-05-08 16:39:15");
INSERT INTO bank_accounts VALUES("382","195","2","3-078-09880-6","0","2024-05-08 16:39:40");
INSERT INTO bank_accounts VALUES("383","509","2","3-078-19685-9","0","2024-05-08 16:40:44");
INSERT INTO bank_accounts VALUES("384","510","2","078-3-078-92860-4","0","2024-05-08 16:41:53");
INSERT INTO bank_accounts VALUES("385","207","2","3-078-31376-6","0","2024-05-08 16:42:25");
INSERT INTO bank_accounts VALUES("386","220","2","3-078-32541-1","0","2024-05-08 16:42:53");
INSERT INTO bank_accounts VALUES("387","511","2","3-078-38014-5","0","2024-05-08 16:43:49");
INSERT INTO bank_accounts VALUES("388","227","2","3-078-18227-0","0","2024-05-08 16:44:18");
INSERT INTO bank_accounts VALUES("389","50","2","0783078929830","0","2024-05-08 16:44:46");
INSERT INTO bank_accounts VALUES("390","512","2","3-078-38813-8","0","2024-05-08 16:45:49");
INSERT INTO bank_accounts VALUES("391","241","2","3-078-32705-8","0","2024-05-08 16:46:17");
INSERT INTO bank_accounts VALUES("392","248","2","3-078-22836-0","0","2024-05-08 16:46:54");
INSERT INTO bank_accounts VALUES("393","265","2","3-078-35680-5","0","2024-05-08 16:47:36");
INSERT INTO bank_accounts VALUES("394","273","2","3-078-34748-2","0","2024-05-08 16:48:43");
INSERT INTO bank_accounts VALUES("395","513","2","3-078-39576-2","0","2024-05-08 16:49:51");
INSERT INTO bank_accounts VALUES("396","293","2","3-078-34076-3","0","2024-05-08 16:50:24");
INSERT INTO bank_accounts VALUES("397","303","2","3-078-32123-8","0","2024-05-08 16:50:53");
INSERT INTO bank_accounts VALUES("398","514","2","3-078-35109-9","0","2024-05-08 16:51:45");
INSERT INTO bank_accounts VALUES("399","45","2","3-078-34800-4","0","2024-05-08 16:58:53");
INSERT INTO bank_accounts VALUES("400","28","2","3-078-16508-2","0","2024-05-08 16:59:45");
INSERT INTO bank_accounts VALUES("401","311","2","3-078-34751-2","0","2024-05-08 17:02:21");
INSERT INTO bank_accounts VALUES("402","515","2","3-078-29643-8","0","2024-05-08 17:04:41");
INSERT INTO bank_accounts VALUES("403","0","2","3-078-29643-8","0","2024-05-08 17:04:41");
INSERT INTO bank_accounts VALUES("404","323","2","3078-37495-1","0","2024-05-08 17:05:16");
INSERT INTO bank_accounts VALUES("405","324","2","3-078-33545-0","0","2024-05-08 17:05:53");
INSERT INTO bank_accounts VALUES("406","329","2","3-078-18783-3","0","2024-05-08 17:06:52");
INSERT INTO bank_accounts VALUES("407","516","2","3-078-39132-5","0","2024-05-08 17:08:47");
INSERT INTO bank_accounts VALUES("408","334","2","3-078-38586-4","0","2024-05-08 17:10:06");
INSERT INTO bank_accounts VALUES("409","33","2","078-3-078-92607-5","0","2024-05-08 17:10:39");
INSERT INTO bank_accounts VALUES("410","517","2","078-3078-93099-4","0","2024-05-08 17:12:46");
INSERT INTO bank_accounts VALUES("411","347","2","3-078-34972-8","0","2024-05-08 17:16:09");
INSERT INTO bank_accounts VALUES("412","20","2","3-078-34563-3","0","2024-05-08 17:18:36");
INSERT INTO bank_accounts VALUES("413","518","2","3-078-17174-0","0","2024-05-08 17:20:12");
INSERT INTO bank_accounts VALUES("414","519","2","3-078-39142-2","0","2024-05-08 17:21:39");
INSERT INTO bank_accounts VALUES("415","372","2","3-078-38357-8","0","2024-05-08 17:22:17");
INSERT INTO bank_accounts VALUES("416","520","2","3-078-30844-4","0","2024-05-08 17:23:17");
INSERT INTO bank_accounts VALUES("417","521","2","3-078-29435-4","0","2024-05-08 17:24:16");
INSERT INTO bank_accounts VALUES("418","49","2","3-078-32237-4","0","2024-05-08 17:24:48");
INSERT INTO bank_accounts VALUES("419","63","8","068-391-008-043","0","2024-05-10 09:11:24");
INSERT INTO bank_accounts VALUES("420","86","1","8829-2240-71","0","2024-05-10 09:14:32");
INSERT INTO bank_accounts VALUES("421","531","7","627-110-013-692","0","2024-05-10 09:24:18");
INSERT INTO bank_accounts VALUES("422","554","6","607-390-005-587","0","2024-05-10 12:05:49");



CREATE TABLE `banks` (
  `bank_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`bank_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO banks VALUES("1","BPI ISLAND","MEYCA","2024-04-23 11:50:01");
INSERT INTO banks VALUES("2","MBTC MEYCAUAYAN","MEYCAUAYAN ","2024-05-01 09:23:00");
INSERT INTO banks VALUES("3","MBTC  MARILAO","MARILAO","2024-05-01 09:23:10");
INSERT INTO banks VALUES("4","MBTC MEYC1","MEYC1","2024-05-01 09:23:32");
INSERT INTO banks VALUES("5","BPI FAMILY BANK","MEYCAUAYA","2024-05-01 09:23:46");
INSERT INTO banks VALUES("6","PSBANK ONLINE","MARILAO ","2024-05-01 09:24:05");
INSERT INTO banks VALUES("7","PSBANK ","DEPOSIT SLIP","2024-05-01 09:24:16");
INSERT INTO banks VALUES("8","NON-ATM","CDM OFFICE ","2024-05-01 09:24:41");



CREATE TABLE `beneficiaries` (
  `beneficiary_id` int(11) NOT NULL AUTO_INCREMENT,
  `mortuary_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `type` varchar(200) NOT NULL,
  `name` varchar(200) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`beneficiary_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `beneficiaries_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `client_holidays` (
  `client_holiday_id` int(11) NOT NULL AUTO_INCREMENT,
  `client_id` int(11) NOT NULL,
  `holiday_id` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `db_status` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`client_holiday_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;




CREATE TABLE `clients` (
  `client_id` int(11) NOT NULL AUTO_INCREMENT,
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
  `legal_holiday_ot` varchar(255) NOT NULL DEFAULT '0',
  `special_holiday_ot` varchar(255) NOT NULL DEFAULT '0',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=210 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO clients VALUES("1","MBTC","MEYCAUAYAN (078)","REGION3","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.5","78.125","6.25","0","0","0","0","0","150","0","125","81.25","0","162.5","105.625","2024-06-21 12:44:13");
INSERT INTO clients VALUES("2","MBTC ","MARILAO (149)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 08:54:19");
INSERT INTO clients VALUES("3","MBTC ","BOCAUE (380)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-21 13:56:36");
INSERT INTO clients VALUES("4","MBTC ","CARMEN (523)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2024-05-01 14:14:44");
INSERT INTO clients VALUES("5","MBTC","BAYAMBANG (628)","REGION3","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2024-05-01 14:15:17");
INSERT INTO clients VALUES("6","MBTC ","BALAGTAS (188)","REGION3","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 08:57:21");
INSERT INTO clients VALUES("7","MBTC ","DRT BALIUAG (399)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 08:59:06");
INSERT INTO clients VALUES("8","MBTC ","BALIUAG MAIN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:00:58");
INSERT INTO clients VALUES("9","MBTC ","GUIGUINTO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:02:10");
INSERT INTO clients VALUES("10","MBTC ","HAGONOY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:03:22");
INSERT INTO clients VALUES("11","MBTC ","PASEO MALOLOS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:04:27");
INSERT INTO clients VALUES("12","MBTC ","PLARIDEL ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:08:11");
INSERT INTO clients VALUES("13","MBTC ","SAN MIGUEL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:12:32");
INSERT INTO clients VALUES("14","MBTC ","STA. MARIA ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","","125","81.25","81.25","162.50","105.63","2024-06-04 09:14:16");
INSERT INTO clients VALUES("15","MBTC ","IBA MEYCAUAYAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:15:29");
INSERT INTO clients VALUES("16","MBTC","BAGBAGUIN STA. MARIA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:16:49");
INSERT INTO clients VALUES("17","MBTC","SAN FERNANDO MC ARTHUR ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:35:33");
INSERT INTO clients VALUES("18","MBTC","MALOLOS HIWAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:18:32");
INSERT INTO clients VALUES("19","MBTC","PULILAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:20:53");
INSERT INTO clients VALUES("20","MBTC","SAN ILDEFONSO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:22:09");
INSERT INTO clients VALUES("21","MBTC","CABANAS MALOLOS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:23:23");
INSERT INTO clients VALUES("22","MBTC","MARQUEE MALL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:37:25");
INSERT INTO clients VALUES("23","MBTC","NORZAGARAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:24:50");
INSERT INTO clients VALUES("24","MBTC","MALOLOS CMSU","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:26:01");
INSERT INTO clients VALUES("25","MBTC","MUZON","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:27:02");
INSERT INTO clients VALUES("26","MBTC","GUIGUINTO RIS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:28:01");
INSERT INTO clients VALUES("27","MBTC","SAN FERNANDO CMSU","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:31:12");
INSERT INTO clients VALUES("28","MBTC","TARLAC CMSU","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:36:23");
INSERT INTO clients VALUES("29","MBTC","SINDALAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:38:36");
INSERT INTO clients VALUES("30","MBTC","APALIT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:39:56");
INSERT INTO clients VALUES("31","MBTC","LUBAO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:40:50");
INSERT INTO clients VALUES("32","MBTC","SAN FERNANDO MAIN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:42:30");
INSERT INTO clients VALUES("33","MBTC","DOLORES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:44:37");
INSERT INTO clients VALUES("34","MBTC","GUAGUA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:48:28");
INSERT INTO clients VALUES("35","MBTC","DOLORES MC ARTHUR ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:47:13");
INSERT INTO clients VALUES("36","MBTC","JASA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:45:55");
INSERT INTO clients VALUES("37","MBTC","ANGELES BALIBAGO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:49:33");
INSERT INTO clients VALUES("38","MBTC","ANGELES MC ARTHUR ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:51:18");
INSERT INTO clients VALUES("39","MBTC","ANGELES MAIN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","","0","0","0","0","","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:52:35");
INSERT INTO clients VALUES("40","MBTC","STO. DOMINGO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:53:21");
INSERT INTO clients VALUES("41","MBTC","STO. ROSARIO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:55:29");
INSERT INTO clients VALUES("42","MBTC","CAMILING","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:57:09");
INSERT INTO clients VALUES("43","MBTC","CONCEPCION","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:58:10");
INSERT INTO clients VALUES("44","MBTC","DAU","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 09:58:59");
INSERT INTO clients VALUES("45","MBTC","CAPAS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:00:04");
INSERT INTO clients VALUES("46","MBTC","TARLAC MAIN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:01:09");
INSERT INTO clients VALUES("47","MBTC","TARLAC HIWAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:02:03");
INSERT INTO clients VALUES("48","MBTC","TARLAC (TAÑEDO)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:02:45");
INSERT INTO clients VALUES("49","MBTC","PANIQUI","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:03:54");
INSERT INTO clients VALUES("50","MBTC","CLARK","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:05:15");
INSERT INTO clients VALUES("51","MBTC","MEXICO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:07:35");
INSERT INTO clients VALUES("52","COLINA DORADO","MEYCAUAYAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:08:57");
INSERT INTO clients VALUES("53","BPI ","DAU ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:16:37");
INSERT INTO clients VALUES("54","BPI","GUIGUINTO BUS. CTR.","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:17:51");
INSERT INTO clients VALUES("55","BPI","CAMALIG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:18:40");
INSERT INTO clients VALUES("56","BPI","MEYCAUAYAN (BPIFB CALVARIO)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:19:49");
INSERT INTO clients VALUES("57","BPI","NEPO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:21:15");
INSERT INTO clients VALUES("58","BPI","DOLORES ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:21:58");
INSERT INTO clients VALUES("59","BPI ","MC ARTHUR HIWAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:22:44");
INSERT INTO clients VALUES("60","BPI","SUBIC SBMA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:23:42");
INSERT INTO clients VALUES("61","BPI ","SUBIC TOWN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:24:29");
INSERT INTO clients VALUES("63","BPI","STA. CLARA ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:25:21");
INSERT INTO clients VALUES("64","BPI ","KULIAT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:26:00");
INSERT INTO clients VALUES("65","BPI","BALAGTAS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:26:55");
INSERT INTO clients VALUES("66","BPI","BALIUAG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:27:41");
INSERT INTO clients VALUES("67","BPI","JP RIZAL BALIUAG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:29:10");
INSERT INTO clients VALUES("68","BPI ","BALIUAG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:29:52");
INSERT INTO clients VALUES("69","BPI","BOCAUE","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:30:41");
INSERT INTO clients VALUES("70","BPI","GUIGUINTO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:31:26");
INSERT INTO clients VALUES("71","BPI","MALOLOS HIWAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:32:13");
INSERT INTO clients VALUES("72","BPI","MALOLOS POBLACION","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:33:19");
INSERT INTO clients VALUES("73","BPI","MARILAO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:34:23");
INSERT INTO clients VALUES("74","BPI","MEYCAUAYAN (BANGA)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:34:58");
INSERT INTO clients VALUES("75","BPI","PLARIDEL ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:35:28");
INSERT INTO clients VALUES("76","BPI","SAN MIGUEL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:36:07");
INSERT INTO clients VALUES("77","BPI","STA. MARIA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:37:07");
INSERT INTO clients VALUES("78","BPI","BALIBAGO ANGELES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:37:59");
INSERT INTO clients VALUES("79","BPI","FRIENDSHIP","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:38:34");
INSERT INTO clients VALUES("80","BPI","HIWAY ANGELES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:39:04");
INSERT INTO clients VALUES("81","BPI","ANGELES MAIN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:39:45");
INSERT INTO clients VALUES("82","BPI","MARQUEE MALL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:40:43");
INSERT INTO clients VALUES("83","BPI","STO. ROSARIO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:41:24");
INSERT INTO clients VALUES("84","BPI","APALIT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:42:08");
INSERT INTO clients VALUES("85","BPI","CLARKFIELD ANGELES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:43:01");
INSERT INTO clients VALUES("86","BPI","CLARKFIELD BALIBAGO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:43:43");
INSERT INTO clients VALUES("87","BPI","GUAGUA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:44:27");
INSERT INTO clients VALUES("88","BPI ","J. ABAD","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:45:08");
INSERT INTO clients VALUES("89","BPI","CONSUNJI","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:46:02");
INSERT INTO clients VALUES("90","BPI","OG ROAD (MAIN)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:46:52");
INSERT INTO clients VALUES("91","BPI","SINDALAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:47:23");
INSERT INTO clients VALUES("92","BPI ","SM CITY PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-13 16:31:17");
INSERT INTO clients VALUES("93","BPI ","BALANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:48:52");
INSERT INTO clients VALUES("94","BPI","HARBOR POINT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:49:38");
INSERT INTO clients VALUES("95","BPI","IBA ZAMBALES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:50:36");
INSERT INTO clients VALUES("96","BPI","BALANGA JP RIZAL ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:51:07");
INSERT INTO clients VALUES("97","BPI","LIMAY ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:51:46");
INSERT INTO clients VALUES("98","BPI ","OLONGAPO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:52:26");
INSERT INTO clients VALUES("99","BPI","OLONGAPO ROTONDA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:53:13");
INSERT INTO clients VALUES("100","BPI ","ROVING PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:54:01");
INSERT INTO clients VALUES("101","BPI ","CONSUNJI AREA OFFICE ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:54:47");
INSERT INTO clients VALUES("102","BPI","LUBAO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 10:56:07");
INSERT INTO clients VALUES("103","BPI","BERTHAPIL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2024-05-01 10:27:10");
INSERT INTO clients VALUES("105","DIRECT BANKO","PORAC","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:00:46");
INSERT INTO clients VALUES("106","DIRECT BANKO","MAGALANG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:01:33");
INSERT INTO clients VALUES("107","DIRECT BANKO","CONSUNJI","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:02:10");
INSERT INTO clients VALUES("108","DIRECT BANKO","CALUMPIT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:02:44");
INSERT INTO clients VALUES("109","DIRECT BANKO","HAGONOY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:03:33");
INSERT INTO clients VALUES("110","DIRECT BANKO","SAN MIGUEL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:04:16");
INSERT INTO clients VALUES("112","DIRECT BANKO","MUZON","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:04:49");
INSERT INTO clients VALUES("113","DIRECT BANKO","SAN MARCELINO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:05:29");
INSERT INTO clients VALUES("114","DIRECT BANKO","MALOLOS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:06:07");
INSERT INTO clients VALUES("115","DIRECT BANKO","MARILAO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:06:51");
INSERT INTO clients VALUES("116","DIRECT BANKO","ANGELES ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:07:32");
INSERT INTO clients VALUES("117","DIRECT BANKO","GUAGUA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:08:16");
INSERT INTO clients VALUES("118","BPI","ANGELES (BPIFB MIRANDA)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:08:45");
INSERT INTO clients VALUES("119","BPI","SAN AGUSTIN (BPIFB)","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:09:31");
INSERT INTO clients VALUES("121","BPI ROVING ","BULACAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:10:00");
INSERT INTO clients VALUES("122","DIRECT BANKO","ARAYAT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:10:36");
INSERT INTO clients VALUES("123","DIRECT BANKO","BALAGTAS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:11:29");
INSERT INTO clients VALUES("124","DIRECT BANKO","LUBAO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:12:02");
INSERT INTO clients VALUES("125","DIRECT BANKO","GUIGUINTO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:12:37");
INSERT INTO clients VALUES("126","DIRECT BANKO","SAN ILDEFONSO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:13:40");
INSERT INTO clients VALUES("127","DIRECT BANKO","CALUMPIT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:14:21");
INSERT INTO clients VALUES("128","DIRECT BANKO","BOCAUE","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:15:03");
INSERT INTO clients VALUES("129","DIRECT BANKO","APALIT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:15:44");
INSERT INTO clients VALUES("130","DIRECT BANKO","MUZON","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:16:37");
INSERT INTO clients VALUES("131","DIRECT BANKO","BALIUAG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:17:14");
INSERT INTO clients VALUES("132","DIRECT BANKO","BALANGA SAN JOSE","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","0","0","0","0","0","2024-06-04 11:20:06");
INSERT INTO clients VALUES("133","DIRECT BANKO","STA. MARIA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:22:00");
INSERT INTO clients VALUES("134","DIRECT BANKO","STA. ANA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:23:21");
INSERT INTO clients VALUES("135","DIRECT BANKO","ORANI","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:24:15");
INSERT INTO clients VALUES("137","DIRECT BANKO","FLORIDA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:24:53");
INSERT INTO clients VALUES("138","DIRECT BANKO","PLARIDEL ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:25:39");
INSERT INTO clients VALUES("139","DIRECT BANKO","DINALUPIHAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:26:18");
INSERT INTO clients VALUES("140","DIRECT BANKO","MEXICO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:26:46");
INSERT INTO clients VALUES("141","DIRECT BANKO","IBA ZAMBALES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:27:28");
INSERT INTO clients VALUES("142","BPI ROBINSONS BANK","OLONGAPO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:28:05");
INSERT INTO clients VALUES("144","BPI ROBINSONS BANK","CLARK GLOBAL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:28:37");
INSERT INTO clients VALUES("145","BPI ROBINSONS BANK","SAN JOSE DELMONTE","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.5","105.63","2024-06-04 11:29:05");
INSERT INTO clients VALUES("146","BPI ROBINSONS BANK ","PANIPUAN WAREHOUSE","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:30:38");
INSERT INTO clients VALUES("147","BPI ROBINSONS BANK","BALANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:31:29");
INSERT INTO clients VALUES("148","BPI ROBINSONS BANK","BALAGTAS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:32:12");
INSERT INTO clients VALUES("149","BPI ROBINSONS BANK ","MALOLOS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:33:07");
INSERT INTO clients VALUES("150","BPI ROBINSONS BANK","MEYCAUAYAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:33:50");
INSERT INTO clients VALUES("151","BPI ROBINSONS BANK","ANGELES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:37:45");
INSERT INTO clients VALUES("152","BPI ROBINSONS BANK","SAN FERNANDO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:39:04");
INSERT INTO clients VALUES("153","BPI ROBINSONS BANK","DOLORES SAN FERNANDO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:39:53");
INSERT INTO clients VALUES("154","BPI ","SF HIGHWAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:40:51");
INSERT INTO clients VALUES("155","BPI ","SF MAIN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:41:52");
INSERT INTO clients VALUES("156","BPI","RIZAL OLONGAPO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:43:27");
INSERT INTO clients VALUES("157","BPI ","STOCKYARD","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:44:46");
INSERT INTO clients VALUES("158","BPI ","WAREHOUSE","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:45:36");
INSERT INTO clients VALUES("159","CATHEDRAL","PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:46:26");
INSERT INTO clients VALUES("160","CDM ","GROUP COMMANDER","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:47:15");
INSERT INTO clients VALUES("161","CDM INSPECTOR","BULACAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:47:51");
INSERT INTO clients VALUES("162","CDM INSPECTOR","BULACAN AND PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:49:07");
INSERT INTO clients VALUES("163","CDM OFFICE","MEYCAUAYAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:49:56");
INSERT INTO clients VALUES("164","DIRECT BANKO","MARIVELES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:50:28");
INSERT INTO clients VALUES("165","DIRECT BANKO","STA CRUZ, ZAMBALES ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:51:03");
INSERT INTO clients VALUES("166","DIRECT BANKO ","LIMAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:51:33");
INSERT INTO clients VALUES("167","DIRECT BANKO","MABALACAT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.5","105.63","2024-06-04 11:57:50");
INSERT INTO clients VALUES("168","DIRECT BANKO","MEYCAUAYAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.5","105.63","2024-06-04 11:58:49");
INSERT INTO clients VALUES("169","DIRECT BANKO","OLONGAPO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 11:59:29");
INSERT INTO clients VALUES("170","DOLE","PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 12:00:03");
INSERT INTO clients VALUES("171","GRANVILLE","MEYCAUAYAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 12:00:54");
INSERT INTO clients VALUES("172","HIYAS BANKING","BULACAN AREA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 12:01:30");
INSERT INTO clients VALUES("173","MCS","MEYCAUAYAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 12:02:01");
INSERT INTO clients VALUES("174","M.G.C.S.","PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 12:03:03");
INSERT INTO clients VALUES("175","OFW HOSPITAL","PAMPANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125","81.25","81.25","162.50","105.63","2024-06-04 12:03:54");
INSERT INTO clients VALUES("176","PANDAYAN BOOKSTORE","ARAYAT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","12","81.25","81.25","162.50","105.63","2024-06-04 12:04:30");
INSERT INTO clients VALUES("177","PANDAYAN BOOKSTORE","GERONA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 12:04:15");
INSERT INTO clients VALUES("178","PANDAYAN BOOKSTORE","SAN ILDEFONSO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 12:03:31");
INSERT INTO clients VALUES("179","PANDAYAN BOOKSTORE","GUAGUA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 12:02:50");
INSERT INTO clients VALUES("180","PANDAYAN BOOKSTORE","MONCADA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 12:00:48");
INSERT INTO clients VALUES("181","PANDAYAN BOOKSTORE","PANIQUI","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:59:40");
INSERT INTO clients VALUES("182","PANDAYAN BOOKSTORE","PULILAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:58:55");
INSERT INTO clients VALUES("183","PANDAYAN BOOKSTORE","SAN ILDEFONSO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:55:18");
INSERT INTO clients VALUES("184","PANDAYAN BOOKSTORE","SAN MIGUEL","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:54:16");
INSERT INTO clients VALUES("185","PANDAYAN BOOKSTORE","STO. NIÑO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:53:15");
INSERT INTO clients VALUES("186","PANDAYAN BOOKSTORE","STA. ANA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:52:18");
INSERT INTO clients VALUES("187","PANDAYAN BOOKSTORE","CAMILING ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:49:25");
INSERT INTO clients VALUES("188","PSBANK ","MALOLOS ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:48:39");
INSERT INTO clients VALUES("189","PSBANK ","MALOLOS HIGHWAY","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:44:07");
INSERT INTO clients VALUES("190","PSBANK ","MEYCAUAYAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:42:48");
INSERT INTO clients VALUES("191","PSBANK ","STA. MARIA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:41:34");
INSERT INTO clients VALUES("192","PSBANK ","MARILAO ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:40:47");
INSERT INTO clients VALUES("193","PSBANK ","BALIUAG","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:40:00");
INSERT INTO clients VALUES("194","PSBANK ","PULILAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:39:13");
INSERT INTO clients VALUES("195","PSBANK ","BALAGTAS","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:38:31");
INSERT INTO clients VALUES("196","PSBANK ","PLARIDEL ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:37:42");
INSERT INTO clients VALUES("197","PSBANK ","SAN JOSE DEL MONTE, BULACAN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:36:52");
INSERT INTO clients VALUES("198","PSBANK ","SINDALAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:35:39");
INSERT INTO clients VALUES("199","PSBANK ","GUAGUA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:34:54");
INSERT INTO clients VALUES("200","PSBANK ","ANGELES ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:34:08");
INSERT INTO clients VALUES("201","PSBANK ","APALIT","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:33:20");
INSERT INTO clients VALUES("202","PSBANK ","ANGELES BALIBAGO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:31:25");
INSERT INTO clients VALUES("203","PSBANK ","DOLORES","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:30:07");
INSERT INTO clients VALUES("204","PSBANK ","BALANGA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:28:43");
INSERT INTO clients VALUES("205","PSBANK ","IBA","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:26:56");
INSERT INTO clients VALUES("206","PSBANK ","SUBIC TOWN","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","62.50","78.13","6.25","0","0","0","0","0","0","0","125.00","81.25","81.25","162.50","105.63","2024-06-04 11:24:57");
INSERT INTO clients VALUES("207","PSBANK ","OLONGAPO","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2024-05-01 14:06:51");
INSERT INTO clients VALUES("208","VIISON TAPES","MEYCAUAYAN ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2024-05-01 14:07:23");
INSERT INTO clients VALUES("209","ST. PETER","PAMPANGA ","","","","","","","","0","0","","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2024-05-01 14:10:22");



CREATE TABLE `database_backups` (
  `backup_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `file` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`backup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `deployed_employees` (
  `deployed_employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employment_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`deployed_employee_id`),
  KEY `employee_id` (`employment_id`),
  KEY `client_id` (`client_id`),
  CONSTRAINT `deployed_employees_ibfk_1` FOREIGN KEY (`employment_id`) REFERENCES `employments` (`employment_id`),
  CONSTRAINT `deployed_employees_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `clients` (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=622 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO deployed_employees VALUES("4","28","1","2024-01-01","2024-01-01","2024-05-27 13:13:09");
INSERT INTO deployed_employees VALUES("5","41","1","2024-01-01","2024-01-01","2024-05-27 13:13:47");
INSERT INTO deployed_employees VALUES("6","27","1","2024-01-01","2024-01-01","2024-05-27 13:14:15");
INSERT INTO deployed_employees VALUES("7","332","1","2024-01-01","2024-01-01","2024-05-27 13:16:49");
INSERT INTO deployed_employees VALUES("8","31","2","2024-01-01","2024-01-01","2024-05-27 13:17:41");
INSERT INTO deployed_employees VALUES("9","30","2","2024-01-01","2024-01-01","2024-05-27 13:18:12");
INSERT INTO deployed_employees VALUES("10","186","2","2024-01-01","2024-01-01","2024-05-27 13:19:19");
INSERT INTO deployed_employees VALUES("11","327","2","2024-01-01","2024-01-01","2024-05-27 13:19:58");
INSERT INTO deployed_employees VALUES("12","35","3","2024-01-01","2024-01-01","2024-05-27 13:22:34");
INSERT INTO deployed_employees VALUES("13","254","3","2024-01-01","2024-01-01","2024-05-27 13:29:08");
INSERT INTO deployed_employees VALUES("14","38","3","2024-01-01","2024-01-01","2024-05-27 13:30:17");
INSERT INTO deployed_employees VALUES("16","136","4","2024-01-01","2024-01-01","2024-05-27 13:33:19");
INSERT INTO deployed_employees VALUES("17","235","4","2024-01-01","2024-01-01","2024-05-27 13:41:38");
INSERT INTO deployed_employees VALUES("18","314","4","2024-01-01","2024-01-01","2024-05-27 13:42:34");
INSERT INTO deployed_employees VALUES("19","183","5","2024-01-01","2024-01-01","2024-05-27 14:00:19");
INSERT INTO deployed_employees VALUES("20","268","5","2024-01-01","2024-01-01","2024-05-27 14:01:15");
INSERT INTO deployed_employees VALUES("21","364","5","2024-01-01","2024-01-01","2024-05-27 14:04:22");
INSERT INTO deployed_employees VALUES("22","48","6","2024-01-01","2024-01-01","2024-05-27 14:05:11");
INSERT INTO deployed_employees VALUES("24","49","6","2024-01-01","2024-01-01","2024-05-27 14:07:54");
INSERT INTO deployed_employees VALUES("25","16","6","2024-01-01","2024-01-01","2024-05-27 14:08:13");
INSERT INTO deployed_employees VALUES("26","199","7","2024-01-01","2024-01-01","2024-05-27 14:14:47");
INSERT INTO deployed_employees VALUES("27","210","7","2024-01-01","2024-01-01","2024-05-27 14:16:16");
INSERT INTO deployed_employees VALUES("28","294","7","2024-01-01","2024-01-01","2024-05-27 14:18:52");
INSERT INTO deployed_employees VALUES("29","293","8","2024-01-01","2024-01-01","2024-05-27 14:38:48");
INSERT INTO deployed_employees VALUES("30","322","8","2024-01-01","2024-01-01","2024-05-27 14:39:40");
INSERT INTO deployed_employees VALUES("31","488","5","2024-01-01","2024-01-01","2024-05-27 14:43:23");
INSERT INTO deployed_employees VALUES("32","165","9","2024-01-01","2024-01-01","2024-05-27 14:56:22");
INSERT INTO deployed_employees VALUES("33","456","9","2024-01-01","2024-01-01","2024-05-27 14:57:55");
INSERT INTO deployed_employees VALUES("34","325","9","2024-01-01","2024-01-01","2024-05-27 14:58:35");
INSERT INTO deployed_employees VALUES("35","330","9","2024-01-01","2024-01-01","2024-05-27 14:59:19");
INSERT INTO deployed_employees VALUES("36","51","8","2024-01-01","2024-01-01","2024-05-27 15:02:39");
INSERT INTO deployed_employees VALUES("37","190","10","2024-01-01","2024-01-01","2024-05-27 15:03:40");
INSERT INTO deployed_employees VALUES("38","204","10","2024-01-01","2024-01-01","2024-05-27 15:04:54");
INSERT INTO deployed_employees VALUES("39","232","10","2024-01-01","2024-01-01","2024-05-27 15:05:26");
INSERT INTO deployed_employees VALUES("40","440","11","2024-01-01","2024-01-01","2024-05-27 15:11:35");
INSERT INTO deployed_employees VALUES("41","333","11","2024-01-01","2024-01-01","2024-05-27 15:13:59");
INSERT INTO deployed_employees VALUES("42","335","11","2024-01-01","2024-01-01","2024-05-27 15:14:44");
INSERT INTO deployed_employees VALUES("43","505","11","2024-01-01","2024-01-01","2024-05-27 15:17:12");
INSERT INTO deployed_employees VALUES("44","56","12","2024-01-01","2024-01-01","2024-05-27 15:18:06");
INSERT INTO deployed_employees VALUES("45","95","12","2024-01-01","2024-01-01","2024-05-27 15:18:53");
INSERT INTO deployed_employees VALUES("46","309","12","2024-01-01","2024-01-01","2024-05-27 15:21:55");
INSERT INTO deployed_employees VALUES("47","72","13","2024-01-01","2024-01-01","2024-05-27 15:23:29");
INSERT INTO deployed_employees VALUES("49","318","14","2024-01-01","2024-01-01","2024-05-27 16:10:28");
INSERT INTO deployed_employees VALUES("50","320","14","2024-01-01","2024-01-01","2024-05-27 16:10:52");
INSERT INTO deployed_employees VALUES("51","417","14","2024-01-01","2024-01-01","2024-05-27 16:27:50");
INSERT INTO deployed_employees VALUES("52","70","16","2024-01-01","2024-01-01","2024-05-27 16:41:10");
INSERT INTO deployed_employees VALUES("53","118","16","2024-01-01","2024-01-01","2024-05-27 16:42:36");
INSERT INTO deployed_employees VALUES("54","205","16","2024-01-01","2024-01-01","2024-05-27 16:43:56");
INSERT INTO deployed_employees VALUES("55","381","16","2024-01-01","2024-01-01","2024-05-27 16:45:22");
INSERT INTO deployed_employees VALUES("56","81","17","2024-01-01","2024-01-01","2024-05-27 16:46:38");
INSERT INTO deployed_employees VALUES("57","457","17","2024-01-01","2024-01-01","2024-05-27 16:52:31");
INSERT INTO deployed_employees VALUES("58","92","17","2024-01-01","2024-01-01","2024-05-27 16:54:49");
INSERT INTO deployed_employees VALUES("59","96","17","2024-01-01","2024-01-01","2024-05-27 16:59:10");
INSERT INTO deployed_employees VALUES("60","171","17","2024-01-01","2024-01-01","2024-05-27 17:04:17");
INSERT INTO deployed_employees VALUES("61","245","17","2024-01-01","2024-01-01","2024-05-27 17:05:03");
INSERT INTO deployed_employees VALUES("62","486","17","2024-01-01","2024-01-01","2024-05-27 17:08:01");
INSERT INTO deployed_employees VALUES("63","375","17","2024-01-01","2024-01-01","2024-05-27 17:21:19");
INSERT INTO deployed_employees VALUES("64","380","17","2024-01-01","2024-01-01","2024-05-27 17:22:12");
INSERT INTO deployed_employees VALUES("65","489","17","2024-01-01","2024-01-01","2024-05-27 17:24:48");
INSERT INTO deployed_employees VALUES("66","147","18","2024-01-01","2024-01-01","2024-05-27 17:26:05");
INSERT INTO deployed_employees VALUES("67","161","18","2024-01-01","2024-01-01","2024-05-27 17:26:50");
INSERT INTO deployed_employees VALUES("68","198","18","2024-01-01","2024-01-01","2024-05-27 17:29:42");
INSERT INTO deployed_employees VALUES("69","272","18","2024-01-01","2024-01-01","2024-05-27 17:30:26");
INSERT INTO deployed_employees VALUES("70","77","19","2024-01-01","2024-01-01","2024-05-27 17:38:16");
INSERT INTO deployed_employees VALUES("71","181","19","2024-01-01","2024-01-01","2024-05-27 17:38:54");
INSERT INTO deployed_employees VALUES("72","91","20","2024-01-01","2024-01-01","2024-05-27 17:51:21");
INSERT INTO deployed_employees VALUES("73","290","20","2024-01-01","2024-01-01","2024-05-27 17:54:13");
INSERT INTO deployed_employees VALUES("74","312","20","2024-01-01","2024-01-01","2024-05-27 17:54:56");
INSERT INTO deployed_employees VALUES("75","421","20","2024-01-01","2024-01-01","2024-05-27 17:57:10");
INSERT INTO deployed_employees VALUES("76","548","52","2024-01-01","2024-01-01","2024-05-28 10:17:18");
INSERT INTO deployed_employees VALUES("77","549","52","2024-01-01","2024-01-01","2024-05-28 10:21:16");
INSERT INTO deployed_employees VALUES("78","378","53","2024-01-01","2024-01-01","2024-05-28 10:24:18");
INSERT INTO deployed_employees VALUES("79","398","53","2024-01-01","2024-01-01","2024-05-28 10:25:56");
INSERT INTO deployed_employees VALUES("80","352","53","2024-01-01","2024-01-01","2024-05-28 10:30:56");
INSERT INTO deployed_employees VALUES("81","355","53","2024-01-01","2024-01-01","2024-05-28 10:33:14");
INSERT INTO deployed_employees VALUES("82","550","53","2024-01-01","2024-01-01","2024-05-28 10:38:46");
INSERT INTO deployed_employees VALUES("83","551","53","2024-01-01","2024-01-01","2024-05-28 10:39:28");
INSERT INTO deployed_employees VALUES("84","188","54","2024-01-01","2024-01-01","2024-05-28 10:42:14");
INSERT INTO deployed_employees VALUES("85","321","55","2024-01-01","2024-01-01","2024-05-28 10:48:55");
INSERT INTO deployed_employees VALUES("86","377","55","0000-00-00","2024-01-01","2024-05-28 10:50:08");
INSERT INTO deployed_employees VALUES("87","216","55","2024-01-01","2024-01-01","2024-05-28 10:55:17");
INSERT INTO deployed_employees VALUES("88","86","55","2024-01-01","2024-01-01","2024-05-28 10:56:11");
INSERT INTO deployed_employees VALUES("89","84","56","2024-01-01","2024-01-01","2024-05-28 10:58:08");
INSERT INTO deployed_employees VALUES("90","31","56","2024-01-01","2024-01-01","2024-05-28 10:59:10");
INSERT INTO deployed_employees VALUES("91","441","56","2024-01-01","2024-01-01","2024-05-28 11:00:52");
INSERT INTO deployed_employees VALUES("92","247","56","2024-01-01","2024-01-01","2024-05-28 11:01:30");
INSERT INTO deployed_employees VALUES("93","332","56","2024-01-01","2024-01-01","2024-05-28 11:03:11");
INSERT INTO deployed_employees VALUES("94","389","56","2024-01-01","2024-01-01","2024-05-28 11:03:52");
INSERT INTO deployed_employees VALUES("95","295","57","2024-01-01","2024-01-01","2024-05-28 11:09:50");
INSERT INTO deployed_employees VALUES("96","460","57","2024-01-01","2024-01-01","2024-05-28 11:12:16");
INSERT INTO deployed_employees VALUES("97","373","57","2024-01-01","2024-01-01","2024-05-28 11:13:04");
INSERT INTO deployed_employees VALUES("98","350","57","2024-01-01","2024-01-01","2024-05-28 11:15:45");
INSERT INTO deployed_employees VALUES("99","119","58","2024-01-01","2024-01-01","2024-05-28 11:17:10");
INSERT INTO deployed_employees VALUES("100","172","58","2024-01-01","2024-01-01","2024-05-28 11:17:38");
INSERT INTO deployed_employees VALUES("101","451","58","2024-01-01","2024-01-01","2024-05-28 11:19:43");
INSERT INTO deployed_employees VALUES("102","552","58","2024-01-01","2024-01-01","2024-05-28 11:24:45");
INSERT INTO deployed_employees VALUES("103","500","58","2024-01-01","2024-01-01","2024-05-28 11:26:35");
INSERT INTO deployed_employees VALUES("104","553","59","2024-01-01","2024-01-01","2024-05-28 11:30:16");
INSERT INTO deployed_employees VALUES("105","463","59","2024-01-01","2024-01-01","2024-05-28 11:31:49");
INSERT INTO deployed_employees VALUES("106","436","60","2024-01-01","2024-01-01","2024-05-28 11:33:43");
INSERT INTO deployed_employees VALUES("107","467","60","2024-01-01","2024-01-01","2024-05-28 11:34:44");
INSERT INTO deployed_employees VALUES("108","422","61","2024-01-01","2024-01-01","2024-05-28 11:44:26");
INSERT INTO deployed_employees VALUES("109","107","61","2024-01-01","2024-01-01","2024-05-28 11:44:57");
INSERT INTO deployed_employees VALUES("110","532","61","2024-01-01","2024-01-01","2024-05-28 11:47:15");
INSERT INTO deployed_employees VALUES("111","458","61","2024-01-01","2024-01-01","2024-05-28 11:48:54");
INSERT INTO deployed_employees VALUES("112","130","63","2024-01-01","2024-01-01","2024-05-28 11:50:11");
INSERT INTO deployed_employees VALUES("113","462","63","2024-01-01","2024-01-01","2024-05-28 11:53:43");
INSERT INTO deployed_employees VALUES("114","554","64","2024-01-01","2024-01-01","2024-05-28 11:58:38");
INSERT INTO deployed_employees VALUES("115","555","64","2024-01-01","2024-01-01","2024-05-28 12:01:10");
INSERT INTO deployed_employees VALUES("116","304","64","2024-01-01","2024-01-01","2024-05-28 12:02:36");
INSERT INTO deployed_employees VALUES("117","61","65","2024-01-01","2024-01-01","2024-05-28 12:03:50");
INSERT INTO deployed_employees VALUES("118","429","65","2024-01-01","2024-01-01","2024-05-28 12:05:07");
INSERT INTO deployed_employees VALUES("119","556","66","2024-01-01","2024-01-01","2024-05-28 13:00:19");
INSERT INTO deployed_employees VALUES("120","424","66","2024-01-01","2024-01-01","2024-05-28 13:02:48");
INSERT INTO deployed_employees VALUES("121","211","66","2024-01-01","2024-01-01","2024-05-28 13:04:15");
INSERT INTO deployed_employees VALUES("122","354","66","2024-01-01","2024-01-01","2024-05-28 13:10:00");
INSERT INTO deployed_employees VALUES("123","424","67","2024-01-01","2024-01-01","2024-05-28 13:12:58");
INSERT INTO deployed_employees VALUES("124","557","67","2024-01-01","2024-01-01","2024-05-28 13:30:51");
INSERT INTO deployed_employees VALUES("125","75","69","2024-01-01","2024-01-01","2024-05-28 13:46:38");
INSERT INTO deployed_employees VALUES("126","162","69","2024-01-01","2024-01-01","2024-05-28 13:47:25");
INSERT INTO deployed_employees VALUES("127","283","69","2024-01-01","2024-01-01","2024-05-28 13:48:33");
INSERT INTO deployed_employees VALUES("128","558","69","2024-01-01","2024-01-01","2024-05-28 13:53:08");
INSERT INTO deployed_employees VALUES("129","381","69","2024-01-01","2024-01-01","2024-05-28 13:54:56");
INSERT INTO deployed_employees VALUES("130","157","70","2024-01-01","2024-01-01","2024-05-28 13:56:41");
INSERT INTO deployed_employees VALUES("131","230","70","2024-01-01","2024-01-01","2024-05-28 13:57:55");
INSERT INTO deployed_employees VALUES("134","299","71","2024-01-01","2024-01-01","2024-05-28 14:01:04");
INSERT INTO deployed_employees VALUES("135","152","72","2024-01-01","2024-01-01","2024-05-28 14:03:05");
INSERT INTO deployed_employees VALUES("136","559","72","2024-01-01","2024-01-01","2024-05-28 14:07:36");
INSERT INTO deployed_employees VALUES("137","190","72","2024-01-01","2024-01-01","2024-05-28 14:08:59");
INSERT INTO deployed_employees VALUES("138","61","73","2024-01-12","2024-01-01","2024-05-28 14:12:04");
INSERT INTO deployed_employees VALUES("139","410","73","2024-01-01","2024-01-01","2024-05-28 14:13:22");
INSERT INTO deployed_employees VALUES("140","144","73","2024-01-01","2024-01-01","2024-05-28 14:18:28");
INSERT INTO deployed_employees VALUES("141","306","73","2024-01-01","2024-01-01","2024-05-28 14:19:51");
INSERT INTO deployed_employees VALUES("142","359","73","2024-01-01","2024-01-01","2024-05-28 14:21:18");
INSERT INTO deployed_employees VALUES("143","162","74","2024-01-01","2024-01-01","2024-05-28 14:22:47");
INSERT INTO deployed_employees VALUES("144","230","74","2024-01-01","2024-01-01","2024-05-28 14:23:43");
INSERT INTO deployed_employees VALUES("145","239","74","2024-01-10","2024-01-01","2024-05-28 14:25:06");
INSERT INTO deployed_employees VALUES("146","558","74","2024-01-01","2024-01-01","2024-05-28 14:27:27");
INSERT INTO deployed_employees VALUES("147","560","74","2024-01-01","2024-01-01","2024-05-28 14:34:47");
INSERT INTO deployed_employees VALUES("148","359","74","2024-01-01","2024-01-01","2024-05-28 14:29:44");
INSERT INTO deployed_employees VALUES("149","509","74","2024-01-01","2024-01-01","2024-05-28 14:39:01");
INSERT INTO deployed_employees VALUES("150","97","75","2024-01-01","2024-01-01","2024-05-28 14:40:48");
INSERT INTO deployed_employees VALUES("151","112","75","2024-01-01","2024-01-01","2024-05-28 14:41:23");
INSERT INTO deployed_employees VALUES("152","561","75","2024-01-01","2024-01-01","2024-05-28 14:46:57");
INSERT INTO deployed_employees VALUES("153","405","75","2024-01-01","2024-01-01","2024-05-28 14:48:00");
INSERT INTO deployed_employees VALUES("154","78","76","2024-01-01","2024-01-01","2024-05-28 14:49:57");
INSERT INTO deployed_employees VALUES("155","212","76","2024-01-01","2024-01-02","2024-05-28 14:50:55");
INSERT INTO deployed_employees VALUES("156","349","76","2024-01-01","2024-01-01","2024-05-28 14:55:11");
INSERT INTO deployed_employees VALUES("157","84","77","2024-01-01","2024-01-01","2024-05-28 14:58:57");
INSERT INTO deployed_employees VALUES("158","159","77","2024-01-01","2024-01-01","2024-05-28 14:59:54");
INSERT INTO deployed_employees VALUES("159","562","77","2024-01-01","2024-01-01","2024-05-28 15:08:37");
INSERT INTO deployed_employees VALUES("160","357","77","2024-01-01","2024-01-01","2024-05-28 15:10:03");
INSERT INTO deployed_employees VALUES("161","298","77","2024-01-01","2024-01-01","2024-05-28 15:10:38");
INSERT INTO deployed_employees VALUES("162","320","77","2024-01-01","2024-01-01","2024-05-28 15:12:08");
INSERT INTO deployed_employees VALUES("163","379","78","2024-01-01","2024-01-01","2024-05-28 15:13:51");
INSERT INTO deployed_employees VALUES("164","255","78","2024-01-01","2024-01-01","2024-05-28 15:23:37");
INSERT INTO deployed_employees VALUES("165","470","78","2024-01-01","2024-01-01","2024-05-28 15:43:04");
INSERT INTO deployed_employees VALUES("166","64","79","2024-01-01","2024-01-01","2024-05-28 15:52:03");
INSERT INTO deployed_employees VALUES("167","416","79","2024-01-01","2024-01-01","2024-05-28 15:56:14");
INSERT INTO deployed_employees VALUES("168","303","80","2024-01-01","2024-01-01","2024-05-28 15:58:06");
INSERT INTO deployed_employees VALUES("169","358","80","2024-01-01","2024-01-01","2024-05-28 15:59:03");
INSERT INTO deployed_employees VALUES("170","352","80","2024-01-01","2024-01-01","2024-05-28 16:05:18");
INSERT INTO deployed_employees VALUES("171","564","80","2024-01-02","2024-01-01","2024-05-28 16:23:23");
INSERT INTO deployed_employees VALUES("172","565","80","2024-01-01","2024-01-01","2024-05-28 16:24:08");
INSERT INTO deployed_employees VALUES("173","566","80","2024-01-01","2024-01-01","2024-05-28 16:29:42");
INSERT INTO deployed_employees VALUES("174","148","81","2024-01-01","2024-01-01","2024-05-28 16:31:17");
INSERT INTO deployed_employees VALUES("175","379","81","2024-01-01","2024-01-01","2024-05-28 16:32:40");
INSERT INTO deployed_employees VALUES("176","455","81","2024-01-01","2024-01-01","2024-05-28 16:34:08");
INSERT INTO deployed_employees VALUES("177","304","81","2024-01-01","2024-01-01","2024-05-28 16:34:49");
INSERT INTO deployed_employees VALUES("178","351","81","2024-01-01","2024-01-01","2024-05-28 16:40:01");
INSERT INTO deployed_employees VALUES("179","328","82","2024-01-01","2024-01-01","2024-05-28 16:46:13");
INSERT INTO deployed_employees VALUES("180","370","82","2024-01-01","2024-01-01","2024-05-28 16:48:43");
INSERT INTO deployed_employees VALUES("181","418","83","2024-01-01","2024-01-01","2024-05-28 16:51:54");
INSERT INTO deployed_employees VALUES("182","100","83","2024-01-01","2024-01-20","2024-05-28 16:53:40");
INSERT INTO deployed_employees VALUES("183","286","83","2024-01-01","2024-01-01","2024-05-28 16:54:25");
INSERT INTO deployed_employees VALUES("184","351","83","2024-01-01","2024-01-01","2024-05-28 16:55:07");
INSERT INTO deployed_employees VALUES("185","567","83","2024-01-01","2024-01-01","2024-05-28 17:00:27");
INSERT INTO deployed_employees VALUES("186","102","84","2024-01-01","2024-01-01","2024-05-28 17:01:30");
INSERT INTO deployed_employees VALUES("187","431","84","2024-01-01","2024-01-01","2024-05-29 09:00:58");
INSERT INTO deployed_employees VALUES("188","172","84","2024-01-01","2024-01-01","2024-05-29 09:02:17");
INSERT INTO deployed_employees VALUES("189","464","84","2024-01-01","2024-01-01","2024-05-29 09:05:49");
INSERT INTO deployed_employees VALUES("190","79","85","2024-01-01","2024-01-01","2024-05-29 09:06:58");
INSERT INTO deployed_employees VALUES("191","426","85","2024-01-01","2024-01-01","2024-05-29 09:08:42");
INSERT INTO deployed_employees VALUES("192","351","85","2024-01-01","2024-01-01","2024-05-29 09:10:52");
INSERT INTO deployed_employees VALUES("193","117","86","2024-01-01","2024-01-01","2024-05-29 09:11:29");
INSERT INTO deployed_employees VALUES("194","565","86","2024-01-01","2024-01-01","2024-05-29 09:12:22");
INSERT INTO deployed_employees VALUES("195","105","87","2024-01-01","2024-01-01","2024-05-29 09:16:55");
INSERT INTO deployed_employees VALUES("196","553","87","2024-01-20","2024-01-01","2024-05-29 09:25:06");
INSERT INTO deployed_employees VALUES("197","172","87","0024-01-02","2024-01-01","2024-05-29 09:26:03");
INSERT INTO deployed_employees VALUES("198","501","87","2024-01-01","2024-01-01","2024-05-29 09:29:52");
INSERT INTO deployed_employees VALUES("199","568","87","2024-01-01","2024-01-01","2024-05-29 09:34:26");
INSERT INTO deployed_employees VALUES("200","533","87","2024-01-01","2024-01-01","2024-05-29 09:37:21");
INSERT INTO deployed_employees VALUES("201","530","87","2024-01-01","2024-01-01","2024-05-29 09:40:10");
INSERT INTO deployed_employees VALUES("202","437","87","2024-01-01","2024-01-01","2024-05-29 09:40:55");
INSERT INTO deployed_employees VALUES("203","366","87","2024-01-01","2024-01-01","2024-05-29 09:41:42");
INSERT INTO deployed_employees VALUES("204","569","87","2024-01-01","2024-01-01","2024-05-29 09:44:28");
INSERT INTO deployed_employees VALUES("205","101","88","2024-01-01","2024-01-01","2024-05-29 09:51:51");
INSERT INTO deployed_employees VALUES("206","553","88","2024-01-01","2024-01-01","2024-05-29 09:52:43");
INSERT INTO deployed_employees VALUES("207","172","88","2024-01-01","2024-01-01","2024-05-29 09:53:14");
INSERT INTO deployed_employees VALUES("208","463","88","2024-01-01","2024-01-01","2024-05-29 09:56:05");
INSERT INTO deployed_employees VALUES("209","569","88","2024-01-01","2024-01-01","2024-05-29 09:57:53");
INSERT INTO deployed_employees VALUES("210","52","89","2024-01-01","2024-01-01","2024-05-29 10:00:18");
INSERT INTO deployed_employees VALUES("211","570","89","2024-01-01","2024-01-01","2024-05-29 10:04:42");
INSERT INTO deployed_employees VALUES("212","448","89","2024-01-01","2024-01-01","2024-05-29 10:07:01");
INSERT INTO deployed_employees VALUES("213","530","89","2024-01-01","2024-01-01","2024-05-29 10:08:07");
INSERT INTO deployed_employees VALUES("214","571","89","2024-01-01","2024-01-01","2024-05-29 10:14:16");
INSERT INTO deployed_employees VALUES("215","569","89","2024-01-01","2024-01-01","2024-05-29 10:15:29");
INSERT INTO deployed_employees VALUES("216","432","90","2024-01-01","2024-01-01","2024-05-29 10:21:13");
INSERT INTO deployed_employees VALUES("217","451","90","2024-01-01","2024-01-01","2024-05-29 10:23:36");
INSERT INTO deployed_employees VALUES("218","530","90","2024-01-01","2024-01-01","2024-05-29 10:25:31");
INSERT INTO deployed_employees VALUES("219","101","91","2024-01-01","2024-01-01","2024-05-29 10:28:55");
INSERT INTO deployed_employees VALUES("220","105","91","2024-01-01","2024-01-01","2024-05-29 10:29:31");
INSERT INTO deployed_employees VALUES("221","553","91","2024-01-01","2024-01-02","2024-05-29 10:31:38");
INSERT INTO deployed_employees VALUES("222","568","91","2024-01-01","2024-01-01","2024-05-29 10:34:32");
INSERT INTO deployed_employees VALUES("223","530","91","2024-01-02","2024-01-01","2024-05-29 10:36:07");
INSERT INTO deployed_employees VALUES("224","552","91","2024-01-01","2024-01-01","2024-05-29 10:36:57");
INSERT INTO deployed_employees VALUES("225","572","91","2024-01-01","2024-01-01","2024-05-29 10:40:11");
INSERT INTO deployed_employees VALUES("226","459","92","2024-01-01","2024-01-01","2024-05-29 10:43:16");
INSERT INTO deployed_employees VALUES("227","569","92","2024-01-01","2024-01-01","2024-05-29 10:44:35");
INSERT INTO deployed_employees VALUES("228","573","92","2024-01-01","2024-01-01","2024-05-29 10:45:38");
INSERT INTO deployed_employees VALUES("229","439","93","2024-01-01","2024-01-01","2024-05-29 10:48:37");
INSERT INTO deployed_employees VALUES("230","574","93","2024-01-01","2024-01-01","2024-05-29 10:56:47");
INSERT INTO deployed_employees VALUES("232","481","93","2024-01-01","2024-01-01","2024-05-29 11:07:04");
INSERT INTO deployed_employees VALUES("233","575","93","2024-01-01","2024-01-01","2024-05-29 11:09:38");
INSERT INTO deployed_employees VALUES("234","94","94","2024-01-01","2024-01-01","2024-05-29 11:10:32");
INSERT INTO deployed_employees VALUES("235","525","94","2024-01-01","2024-01-01","2024-05-29 11:14:49");
INSERT INTO deployed_employees VALUES("236","499","95","2024-01-01","2024-01-01","2024-05-29 11:16:30");
INSERT INTO deployed_employees VALUES("237","182","95","2024-01-01","2024-01-01","2024-05-29 11:17:04");
INSERT INTO deployed_employees VALUES("238","285","95","2024-01-01","2024-01-01","2024-05-29 11:18:08");
INSERT INTO deployed_employees VALUES("239","576","95","2024-01-01","2024-01-01","2024-05-29 11:20:22");
INSERT INTO deployed_employees VALUES("240","439","96","2024-01-01","2024-01-01","2024-05-29 11:21:53");
INSERT INTO deployed_employees VALUES("241","577","96","2024-01-01","2024-01-01","2024-05-29 11:25:08");
INSERT INTO deployed_employees VALUES("242","477","96","2024-01-01","2024-01-01","2024-05-29 11:26:23");
INSERT INTO deployed_employees VALUES("243","575","96","2024-01-01","2024-01-01","2024-05-29 11:27:09");
INSERT INTO deployed_employees VALUES("244","89","97","2024-01-01","2024-01-01","2024-05-29 11:28:30");
INSERT INTO deployed_employees VALUES("245","578","97","2024-01-01","2024-01-01","2024-05-29 11:32:19");
INSERT INTO deployed_employees VALUES("246","579","97","2024-01-01","2024-01-01","2024-05-29 11:35:27");
INSERT INTO deployed_employees VALUES("247","316","97","2024-01-01","2024-01-01","2024-05-29 11:36:13");
INSERT INTO deployed_employees VALUES("248","461","98","2024-01-01","2024-01-01","2024-05-29 11:40:39");
INSERT INTO deployed_employees VALUES("249","487","98","2024-01-01","2024-01-01","2024-05-29 11:43:03");
INSERT INTO deployed_employees VALUES("250","107","99","2024-01-01","2024-01-01","2024-05-29 11:44:11");
INSERT INTO deployed_employees VALUES("251","580","99","2024-01-01","2024-01-01","2024-05-29 11:51:07");
INSERT INTO deployed_employees VALUES("252","579","99","2024-01-01","2024-01-01","2024-05-29 11:54:23");
INSERT INTO deployed_employees VALUES("253","532","99","2024-01-01","2024-01-01","2024-05-29 12:06:46");
INSERT INTO deployed_employees VALUES("254","514","99","2024-01-01","2024-01-01","2024-05-29 13:12:00");
INSERT INTO deployed_employees VALUES("255","393","100","2024-01-01","2024-01-01","2024-05-29 13:14:26");
INSERT INTO deployed_employees VALUES("256","446","100","2024-01-01","2024-01-01","2024-05-29 13:15:55");
INSERT INTO deployed_employees VALUES("257","582","100","2024-01-01","2024-01-01","2024-05-29 13:22:21");
INSERT INTO deployed_employees VALUES("258","583","100","2024-01-01","2024-01-01","2024-05-29 13:26:05");
INSERT INTO deployed_employees VALUES("259","281","100","2024-01-01","2024-01-01","2024-05-29 13:27:17");
INSERT INTO deployed_employees VALUES("260","451","100","2024-01-01","2024-01-01","2024-05-29 13:29:03");
INSERT INTO deployed_employees VALUES("261","531","100","2024-01-01","2024-01-01","2024-05-29 13:30:21");
INSERT INTO deployed_employees VALUES("262","581","100","2024-01-01","2024-01-01","2024-05-29 13:31:19");
INSERT INTO deployed_employees VALUES("263","570","101","2024-01-01","2024-01-01","2024-05-29 13:34:42");
INSERT INTO deployed_employees VALUES("264","451","102","2024-01-01","2024-01-02","2024-05-29 13:39:21");
INSERT INTO deployed_employees VALUES("265","258","102","2024-01-01","2024-01-02","2024-05-29 13:40:52");
INSERT INTO deployed_employees VALUES("266","153","103","2024-01-01","2024-01-01","2024-05-29 13:42:10");
INSERT INTO deployed_employees VALUES("267","351","103","2024-01-01","2024-01-01","2024-05-29 13:43:15");
INSERT INTO deployed_employees VALUES("268","564","105","2024-01-01","2024-01-01","2024-05-29 13:47:07");
INSERT INTO deployed_employees VALUES("269","584","105","2024-01-01","2024-01-01","2024-05-29 13:49:14");
INSERT INTO deployed_employees VALUES("270","585","106","2024-01-01","2024-01-01","2024-05-29 13:52:50");
INSERT INTO deployed_employees VALUES("271","351","106","2024-01-01","2024-01-01","2024-05-29 13:53:33");
INSERT INTO deployed_employees VALUES("272","172","107","2024-01-01","2024-01-01","2024-05-29 13:55:13");
INSERT INTO deployed_employees VALUES("273","438","107","2024-01-01","2024-01-01","2024-05-29 13:56:44");
INSERT INTO deployed_employees VALUES("274","437","107","2024-01-01","2024-01-01","2024-05-29 13:57:27");
INSERT INTO deployed_employees VALUES("275","569","107","2024-01-01","2024-01-01","2024-05-29 13:58:26");
INSERT INTO deployed_employees VALUES("276","56","108","2024-01-01","2024-01-01","2024-05-29 13:59:26");
INSERT INTO deployed_employees VALUES("277","110","108","2024-01-01","2024-01-01","2024-05-29 14:00:24");
INSERT INTO deployed_employees VALUES("278","465","108","2024-01-01","2024-01-01","2024-05-29 14:05:40");
INSERT INTO deployed_employees VALUES("279","586","109","2024-01-01","2024-01-01","2024-05-29 14:22:08");
INSERT INTO deployed_employees VALUES("280","78","110","2024-01-01","2024-01-01","2024-05-29 14:24:41");
INSERT INTO deployed_employees VALUES("281","349","110","0024-01-02","2024-01-01","2024-05-29 14:25:43");
INSERT INTO deployed_employees VALUES("282","409","110","2024-01-01","2024-01-01","2024-05-29 14:26:45");
INSERT INTO deployed_employees VALUES("283","357","112","2024-01-01","2024-01-02","2024-05-29 14:27:41");
INSERT INTO deployed_employees VALUES("284","587","113","2024-01-01","2024-01-01","2024-05-29 14:35:33");
INSERT INTO deployed_employees VALUES("285","442","114","2024-01-01","2024-01-01","2024-05-29 14:46:30");
INSERT INTO deployed_employees VALUES("286","492","115","2024-01-01","2024-01-01","2024-05-29 14:48:42");
INSERT INTO deployed_employees VALUES("287","418","116","2024-01-01","2024-01-01","2024-05-29 14:53:52");
INSERT INTO deployed_employees VALUES("288","352","116","2024-01-01","2024-01-01","2024-05-29 14:55:20");
INSERT INTO deployed_employees VALUES("289","351","116","2024-01-01","2024-01-01","2024-05-29 14:57:13");
INSERT INTO deployed_employees VALUES("290","564","116","2024-01-01","2024-01-01","2024-05-29 14:57:58");
INSERT INTO deployed_employees VALUES("291","565","116","2024-01-01","2024-01-01","2024-05-29 14:58:31");
INSERT INTO deployed_employees VALUES("292","501","117","2024-01-01","2024-01-01","2024-05-29 15:00:13");
INSERT INTO deployed_employees VALUES("293","358","118","2024-01-01","2024-01-01","2024-05-29 15:01:58");
INSERT INTO deployed_employees VALUES("294","352","118","2024-01-01","2024-01-01","2024-05-29 15:03:23");
INSERT INTO deployed_employees VALUES("295","564","118","2024-01-01","2024-01-01","2024-05-29 15:04:56");
INSERT INTO deployed_employees VALUES("296","101","119","2024-01-01","2024-01-01","2024-05-29 15:05:41");
INSERT INTO deployed_employees VALUES("297","434","119","2024-01-01","2024-01-01","2024-05-29 15:10:35");
INSERT INTO deployed_employees VALUES("298","588","119","2024-01-01","2024-01-01","2024-05-29 15:22:30");
INSERT INTO deployed_employees VALUES("299","530","119","2024-01-01","2024-01-01","2024-05-29 15:25:46");
INSERT INTO deployed_employees VALUES("300","569","119","2024-01-01","2024-01-02","2024-05-29 15:28:34");
INSERT INTO deployed_employees VALUES("301","572","119","2024-01-01","2024-01-01","2024-05-29 15:31:47");
INSERT INTO deployed_employees VALUES("302","216","121","2024-01-01","2024-01-01","2024-05-29 15:36:57");
INSERT INTO deployed_employees VALUES("303","233","121","2024-01-02","2024-01-01","2024-05-29 15:37:58");
INSERT INTO deployed_employees VALUES("304","291","121","2024-01-02","2024-01-01","2024-05-29 15:38:47");
INSERT INTO deployed_employees VALUES("305","25","121","2024-01-01","2024-01-01","2024-05-29 15:44:10");
INSERT INTO deployed_employees VALUES("306","43","121","2024-01-01","2024-01-01","2024-05-29 16:04:25");
INSERT INTO deployed_employees VALUES("307","469","122","2024-01-01","2024-01-01","2024-05-29 16:14:49");
INSERT INTO deployed_employees VALUES("308","509","123","2024-01-01","2024-01-01","2024-05-29 16:16:32");
INSERT INTO deployed_employees VALUES("309","172","124","2024-01-01","2024-01-01","2024-05-29 16:19:11");
INSERT INTO deployed_employees VALUES("310","589","124","2024-01-01","2024-01-01","2024-05-29 16:21:55");
INSERT INTO deployed_employees VALUES("311","161","125","2024-01-01","2024-01-01","2024-05-29 16:23:23");
INSERT INTO deployed_employees VALUES("312","391","125","2024-01-01","2024-01-01","2024-05-29 16:24:20");
INSERT INTO deployed_employees VALUES("313","212","126","2024-01-01","2024-01-01","2024-05-29 16:37:41");
INSERT INTO deployed_employees VALUES("314","590","126","2024-01-01","2024-01-01","2024-05-29 16:38:26");
INSERT INTO deployed_employees VALUES("315","349","126","2024-01-01","2024-01-01","2024-05-29 16:39:41");
INSERT INTO deployed_employees VALUES("316","56","127","2024-01-01","2024-01-01","2024-05-29 16:40:37");
INSERT INTO deployed_employees VALUES("317","110","127","2024-01-01","2024-01-01","2024-05-29 16:41:22");
INSERT INTO deployed_employees VALUES("318","354","126","2024-01-01","2024-01-01","2024-05-29 16:43:10");
INSERT INTO deployed_employees VALUES("319","465","127","2024-01-01","2024-01-01","2024-05-29 16:45:27");
INSERT INTO deployed_employees VALUES("320","162","128","2024-01-01","2024-01-01","2024-05-29 16:54:21");
INSERT INTO deployed_employees VALUES("321","102","129","2024-01-01","2024-01-01","2024-05-29 16:57:16");
INSERT INTO deployed_employees VALUES("322","431","129","2024-01-01","2024-01-01","2024-05-29 17:00:02");
INSERT INTO deployed_employees VALUES("323","172","129","2024-01-01","2024-01-01","2024-05-29 17:12:34");
INSERT INTO deployed_employees VALUES("324","438","129","2024-01-01","2024-01-01","2024-05-29 17:13:32");
INSERT INTO deployed_employees VALUES("325","464","129","2024-01-01","2024-01-01","2024-05-29 17:15:09");
INSERT INTO deployed_employees VALUES("326","569","129","2024-01-01","2024-01-01","2024-05-29 17:16:08");
INSERT INTO deployed_employees VALUES("327","357","130","2024-01-01","2024-01-01","2024-05-29 17:22:43");
INSERT INTO deployed_employees VALUES("328","211","131","2024-01-01","2024-01-01","2024-05-30 11:37:30");
INSERT INTO deployed_employees VALUES("329","577","132","2024-01-02","2024-01-01","2024-05-30 11:42:08");
INSERT INTO deployed_employees VALUES("330","53","133","2024-01-01","2024-01-01","2024-05-30 11:45:02");
INSERT INTO deployed_employees VALUES("331","591","134","2024-01-01","2024-01-01","2024-05-30 11:47:46");
INSERT INTO deployed_employees VALUES("332","172","134","2024-01-01","2024-01-01","2024-05-30 11:48:18");
INSERT INTO deployed_employees VALUES("333","464","134","2024-01-01","2024-01-01","2024-05-30 11:49:44");
INSERT INTO deployed_employees VALUES("334","469","134","2024-01-01","2024-01-01","2024-05-30 11:50:40");
INSERT INTO deployed_employees VALUES("335","569","134","2024-01-01","2024-01-01","2024-05-30 11:51:33");
INSERT INTO deployed_employees VALUES("336","269","135","2024-01-01","2024-01-01","2024-05-30 11:52:27");
INSERT INTO deployed_employees VALUES("337","67","137","2024-01-01","2024-01-01","2024-05-30 11:54:34");
INSERT INTO deployed_employees VALUES("338","405","138","2024-01-01","2024-01-01","2024-05-30 11:55:50");
INSERT INTO deployed_employees VALUES("339","382","139","2024-01-01","2024-01-01","2024-05-30 12:05:02");
INSERT INTO deployed_employees VALUES("340","59","140","2024-01-01","2024-01-01","2024-05-30 12:06:43");
INSERT INTO deployed_employees VALUES("341","591","140","2024-01-01","2024-01-01","2024-05-30 12:07:53");
INSERT INTO deployed_employees VALUES("342","172","140","2024-01-01","2024-01-01","2024-05-30 12:59:21");
INSERT INTO deployed_employees VALUES("343","568","140","2024-01-01","2024-01-01","2024-05-30 13:00:49");
INSERT INTO deployed_employees VALUES("344","569","140","2024-01-01","2024-01-01","2024-05-30 13:02:58");
INSERT INTO deployed_employees VALUES("345","1","141","2024-01-01","2024-01-01","2024-05-30 13:06:46");
INSERT INTO deployed_employees VALUES("346","167","142","2024-01-01","2024-01-01","2024-05-30 13:07:32");
INSERT INTO deployed_employees VALUES("347","398","144","2024-01-01","2024-01-01","2024-05-30 13:08:46");
INSERT INTO deployed_employees VALUES("348","551","144","2024-01-01","2024-01-01","2024-05-30 13:10:07");
INSERT INTO deployed_employees VALUES("349","355","144","2024-01-01","2024-01-01","2024-05-30 13:17:03");
INSERT INTO deployed_employees VALUES("350","410","145","2024-01-01","2024-01-01","2024-05-30 13:24:43");
INSERT INTO deployed_employees VALUES("351","348","145","2024-01-01","2024-01-01","2024-05-30 13:35:29");
INSERT INTO deployed_employees VALUES("352","592","146","2024-01-01","2024-01-01","2024-05-30 13:38:40");
INSERT INTO deployed_employees VALUES("353","594","146","2024-01-01","2024-01-01","2024-05-30 13:46:27");
INSERT INTO deployed_employees VALUES("354","593","146","2024-01-01","2024-01-01","2024-05-30 13:47:18");
INSERT INTO deployed_employees VALUES("355","101","146","2024-01-01","2024-01-01","2024-05-30 13:47:53");
INSERT INTO deployed_employees VALUES("356","588","146","2024-01-01","2024-01-01","2024-05-30 13:51:17");
INSERT INTO deployed_employees VALUES("357","572","146","2024-01-01","2024-01-01","2024-05-30 13:52:10");
INSERT INTO deployed_employees VALUES("358","577","147","2024-01-01","2024-01-01","2024-05-30 13:53:14");
INSERT INTO deployed_employees VALUES("359","179","148","2024-01-01","2024-01-01","2024-05-30 13:54:10");
INSERT INTO deployed_employees VALUES("360","184","148","2024-01-01","2024-01-01","2024-05-30 13:54:52");
INSERT INTO deployed_employees VALUES("361","561","148","2024-01-01","2024-01-01","2024-05-30 13:56:30");
INSERT INTO deployed_employees VALUES("362","161","149","2024-01-01","2024-01-01","2024-05-30 14:09:21");
INSERT INTO deployed_employees VALUES("363","216","149","2024-01-01","2024-01-01","2024-05-30 14:10:21");
INSERT INTO deployed_employees VALUES("364","226","149","2024-01-01","2024-01-01","2024-05-30 14:10:56");
INSERT INTO deployed_employees VALUES("365","234","149","2024-01-01","2024-01-01","2024-05-30 14:11:33");
INSERT INTO deployed_employees VALUES("366","278","150","2024-01-01","2024-01-01","2024-05-30 14:27:32");
INSERT INTO deployed_employees VALUES("367","592","153","2024-01-01","2024-01-01","2024-05-30 14:30:44");
INSERT INTO deployed_employees VALUES("368","593","153","2024-01-01","2024-01-01","2024-05-30 14:38:07");
INSERT INTO deployed_employees VALUES("369","448","155","2024-01-01","2024-01-01","2024-05-30 14:41:48");
INSERT INTO deployed_employees VALUES("370","55","156","2024-01-01","2024-01-01","2024-05-30 14:42:50");
INSERT INTO deployed_employees VALUES("371","107","156","2024-01-01","2024-01-01","2024-05-30 14:44:38");
INSERT INTO deployed_employees VALUES("372","579","156","2024-01-01","2024-01-01","2024-05-30 14:46:50");
INSERT INTO deployed_employees VALUES("373","532","156","2024-01-01","2024-01-01","2024-05-30 14:48:43");
INSERT INTO deployed_employees VALUES("374","112","157","2024-01-01","2024-01-01","2024-05-30 14:50:07");
INSERT INTO deployed_employees VALUES("375","151","157","2024-01-01","2024-01-01","2024-05-30 14:53:17");
INSERT INTO deployed_employees VALUES("376","160","157","2024-01-01","2024-01-01","2024-05-30 14:53:51");
INSERT INTO deployed_employees VALUES("377","10","157","2024-01-01","2024-01-01","2024-05-30 14:54:28");
INSERT INTO deployed_employees VALUES("378","301","157","2024-01-01","2024-01-01","2024-05-30 14:57:58");
INSERT INTO deployed_employees VALUES("379","134","158","2024-01-01","2024-01-01","2024-05-30 15:00:06");
INSERT INTO deployed_employees VALUES("380","478","158","2024-01-01","2024-01-01","2024-05-30 15:02:34");
INSERT INTO deployed_employees VALUES("381","405","158","2024-01-01","2024-01-01","2024-05-30 15:03:10");
INSERT INTO deployed_employees VALUES("382","568","159","2024-01-01","2024-01-01","2024-05-30 15:04:27");
INSERT INTO deployed_employees VALUES("383","437","159","2024-01-01","2024-01-01","2024-05-30 15:06:41");
INSERT INTO deployed_employees VALUES("384","166","160","2024-01-01","2024-01-01","2024-05-30 15:11:12");
INSERT INTO deployed_employees VALUES("385","503","161","2024-01-01","2024-01-01","2024-05-30 15:14:17");
INSERT INTO deployed_employees VALUES("386","123","162","2024-01-01","2024-01-01","2024-05-30 15:16:53");
INSERT INTO deployed_employees VALUES("387","220","163","2024-01-01","2024-01-01","2024-05-30 15:22:30");
INSERT INTO deployed_employees VALUES("388","399","163","2024-01-01","2024-01-01","2024-05-30 15:23:44");
INSERT INTO deployed_employees VALUES("389","578","164","2024-01-01","2024-01-01","2024-05-30 15:25:33");
INSERT INTO deployed_employees VALUES("390","527","164","2024-01-01","2024-01-01","2024-05-30 15:27:40");
INSERT INTO deployed_employees VALUES("391","439","164","2024-01-01","2024-01-01","2024-05-30 15:28:52");
INSERT INTO deployed_employees VALUES("392","89","166","2024-01-01","2024-01-01","2024-05-30 15:57:09");
INSERT INTO deployed_employees VALUES("393","316","166","2024-01-01","2024-01-01","2024-05-30 15:59:02");
INSERT INTO deployed_employees VALUES("394","378","167","2024-01-01","2024-01-01","2024-05-30 16:00:50");
INSERT INTO deployed_employees VALUES("395","565","167","2024-01-01","2024-01-01","2024-05-30 16:02:07");
INSERT INTO deployed_employees VALUES("396","248","168","2024-01-01","2024-01-01","2024-05-30 16:03:45");
INSERT INTO deployed_employees VALUES("397","514","170","2024-01-01","2024-01-01","2024-05-30 16:07:57");
INSERT INTO deployed_employees VALUES("398","177","171","2024-01-01","2024-01-01","2024-05-30 16:08:46");
INSERT INTO deployed_employees VALUES("399","388","171","2024-01-01","2024-01-01","2024-05-30 16:09:38");
INSERT INTO deployed_employees VALUES("400","394","171","2024-01-01","2024-01-01","2024-05-30 16:10:47");
INSERT INTO deployed_employees VALUES("401","392","172","2024-01-01","2024-01-01","2024-05-30 16:13:20");
INSERT INTO deployed_employees VALUES("402","417","172","2024-01-01","2024-01-01","2024-05-30 16:14:09");
INSERT INTO deployed_employees VALUES("403","368","172","2024-01-01","2024-01-01","2024-05-30 16:16:00");
INSERT INTO deployed_employees VALUES("404","540","175","2024-01-01","2024-01-01","2024-05-30 16:19:18");
INSERT INTO deployed_employees VALUES("405","595","176","2024-01-01","2024-01-01","2024-05-30 16:22:56");
INSERT INTO deployed_employees VALUES("406","349","178","2024-01-01","2024-01-01","2024-05-30 16:28:50");
INSERT INTO deployed_employees VALUES("407","354","178","2024-01-01","2024-01-01","2024-05-30 16:29:34");
INSERT INTO deployed_employees VALUES("408","534","180","2024-01-01","2024-01-01","2024-05-30 16:44:29");
INSERT INTO deployed_employees VALUES("409","270","181","2024-01-01","2024-01-01","2024-05-30 16:50:32");
INSERT INTO deployed_employees VALUES("410","517","181","2024-01-01","2024-01-01","2024-05-30 16:52:57");
INSERT INTO deployed_employees VALUES("411","596","182","2024-01-01","2024-01-01","2024-05-30 16:57:09");
INSERT INTO deployed_employees VALUES("412","354","183","2024-01-01","2024-01-01","2024-05-30 16:58:30");
INSERT INTO deployed_employees VALUES("413","349","183","2024-01-01","2024-01-01","2024-05-30 16:59:22");
INSERT INTO deployed_employees VALUES("414","349","184","2024-01-01","2024-01-01","2024-05-30 17:00:29");
INSERT INTO deployed_employees VALUES("415","419","184","2024-01-01","2024-01-01","2024-05-30 17:01:31");
INSERT INTO deployed_employees VALUES("416","131","185","2024-01-01","2024-01-01","2024-05-30 17:02:32");
INSERT INTO deployed_employees VALUES("417","597","186","2024-01-01","2024-01-01","2024-05-30 17:05:05");
INSERT INTO deployed_employees VALUES("418","353","186","2024-01-01","2024-01-01","2024-05-30 17:07:03");
INSERT INTO deployed_employees VALUES("419","326","187","2024-01-01","2024-01-01","2024-05-30 17:11:16");
INSERT INTO deployed_employees VALUES("420","216","188","2024-01-01","2024-01-01","2024-05-30 17:12:22");
INSERT INTO deployed_employees VALUES("421","242","188","2024-01-01","2024-01-01","2024-05-30 17:13:01");
INSERT INTO deployed_employees VALUES("422","292","188","2024-01-01","2024-01-01","2024-05-30 17:13:41");
INSERT INTO deployed_employees VALUES("423","454","189","2024-01-01","2024-01-01","2024-05-30 17:15:51");
INSERT INTO deployed_employees VALUES("424","164","189","2024-01-01","2024-01-01","2024-05-30 17:16:42");
INSERT INTO deployed_employees VALUES("425","495","190","2024-01-01","2024-01-01","2024-05-30 17:18:23");
INSERT INTO deployed_employees VALUES("426","560","190","2024-01-01","2024-01-01","2024-05-30 17:19:52");
INSERT INTO deployed_employees VALUES("427","394","190","2024-01-01","2024-01-01","2024-05-30 17:20:38");
INSERT INTO deployed_employees VALUES("428","109","191","2024-01-01","2024-01-01","2024-05-30 17:22:04");
INSERT INTO deployed_employees VALUES("429","253","191","2024-01-01","2024-01-01","2024-05-30 17:22:50");
INSERT INTO deployed_employees VALUES("430","76","192","2024-01-01","2024-01-01","2024-05-30 17:24:16");
INSERT INTO deployed_employees VALUES("431","194","193","2024-01-01","2024-01-01","2024-05-30 17:29:57");
INSERT INTO deployed_employees VALUES("432","219","193","2024-01-01","2024-01-01","2024-05-30 17:31:05");
INSERT INTO deployed_employees VALUES("433","264","194","2024-01-01","2024-01-01","2024-05-30 17:33:07");
INSERT INTO deployed_employees VALUES("434","106","194","2024-01-01","2024-01-01","2024-05-30 17:35:38");
INSERT INTO deployed_employees VALUES("435","76","195","2024-01-01","2024-01-01","2024-05-31 13:47:38");
INSERT INTO deployed_employees VALUES("436","121","195","2024-01-01","2024-01-01","2024-05-31 13:48:30");
INSERT INTO deployed_employees VALUES("437","185","196","2024-01-01","2024-01-01","2024-05-31 13:50:17");
INSERT INTO deployed_employees VALUES("438","444","196","2024-01-01","2024-02-02","2024-05-31 13:51:53");
INSERT INTO deployed_employees VALUES("439","207","196","2024-01-01","2024-01-01","2024-05-31 13:52:29");
INSERT INTO deployed_employees VALUES("440","216","196","2024-01-01","2024-01-01","2024-05-31 13:53:08");
INSERT INTO deployed_employees VALUES("441","466","196","2024-01-01","2024-01-01","2024-05-31 13:54:59");
INSERT INTO deployed_employees VALUES("442","74","198","2024-01-01","2024-01-01","2024-05-31 13:56:42");
INSERT INTO deployed_employees VALUES("443","315","198","2024-01-01","2024-01-01","2024-05-31 13:57:53");
INSERT INTO deployed_employees VALUES("444","489","198","2024-01-01","2024-01-01","2024-05-31 13:59:46");
INSERT INTO deployed_employees VALUES("445","24","199","2024-01-01","2024-01-01","2024-05-31 14:01:00");
INSERT INTO deployed_employees VALUES("446","323","199","2024-01-01","2024-01-01","2024-05-31 14:01:43");
INSERT INTO deployed_employees VALUES("447","331","199","2024-01-01","2024-01-01","2024-05-31 14:02:31");
INSERT INTO deployed_employees VALUES("448","366","199","2024-01-01","2024-01-01","2024-05-31 14:04:15");
INSERT INTO deployed_employees VALUES("449","418","200","2024-01-01","2024-01-01","2024-05-31 14:05:46");
INSERT INTO deployed_employees VALUES("450","280","200","2024-01-01","2024-01-01","2024-05-31 14:06:30");
INSERT INTO deployed_employees VALUES("451","371","200","2024-01-01","2024-01-01","2024-05-31 14:07:08");
INSERT INTO deployed_employees VALUES("452","565","200","2024-01-01","2024-01-01","2024-05-31 14:07:50");
INSERT INTO deployed_employees VALUES("453","120","201","2024-01-01","2024-01-01","2024-05-31 14:08:51");
INSERT INTO deployed_employees VALUES("454","172","201","2024-01-01","2024-01-01","2024-05-31 14:09:38");
INSERT INTO deployed_employees VALUES("455","598","201","2024-01-01","2024-01-01","2024-05-31 14:11:53");
INSERT INTO deployed_employees VALUES("456","63","202","2024-01-01","2024-01-02","2024-05-31 14:12:52");
INSERT INTO deployed_employees VALUES("457","371","202","2024-01-01","2024-01-01","2024-05-31 14:13:40");
INSERT INTO deployed_employees VALUES("458","565","202","2024-01-01","2024-01-01","2024-05-31 14:14:32");
INSERT INTO deployed_employees VALUES("459","172","203","2024-01-01","2024-01-01","2024-05-31 14:15:14");
INSERT INTO deployed_employees VALUES("460","215","203","2024-01-01","2024-01-01","2024-05-31 14:15:52");
INSERT INTO deployed_employees VALUES("461","599","203","2024-01-01","2024-01-01","2024-05-31 14:18:07");
INSERT INTO deployed_employees VALUES("462","87","204","2024-01-01","2024-01-01","2024-05-31 14:19:00");
INSERT INTO deployed_employees VALUES("463","439","204","2024-01-01","2024-01-01","2024-05-31 14:19:47");
INSERT INTO deployed_employees VALUES("464","243","204","2024-01-01","2024-01-01","2024-05-31 14:20:33");
INSERT INTO deployed_employees VALUES("465","493","205","2024-01-01","2024-01-01","2024-05-31 14:23:02");
INSERT INTO deployed_employees VALUES("466","285","205","2024-01-01","2024-01-01","2024-05-31 14:23:39");
INSERT INTO deployed_employees VALUES("467","510","205","2024-01-01","2024-01-01","2024-05-31 14:26:14");
INSERT INTO deployed_employees VALUES("468","546","206","2024-01-01","2024-01-01","2024-05-31 14:33:58");
INSERT INTO deployed_employees VALUES("469","512","206","2024-01-01","2024-01-01","2024-05-31 14:36:51");
INSERT INTO deployed_employees VALUES("470","240","207","2024-01-01","2024-01-01","2024-05-31 14:38:01");
INSERT INTO deployed_employees VALUES("471","532","207","2024-01-01","2024-01-01","2024-05-31 14:39:41");
INSERT INTO deployed_employees VALUES("472","543","207","2024-01-01","2024-01-01","2024-05-31 14:41:07");
INSERT INTO deployed_employees VALUES("473","65","208","2024-01-01","2024-01-01","2024-05-31 14:41:44");
INSERT INTO deployed_employees VALUES("474","84","208","2024-01-01","2024-01-01","2024-05-31 14:42:26");
INSERT INTO deployed_employees VALUES("475","389","208","2024-01-01","2024-01-01","2024-05-31 14:43:53");
INSERT INTO deployed_employees VALUES("476","339","22","2024-01-01","2024-01-01","2024-05-31 15:08:54");
INSERT INTO deployed_employees VALUES("477","174","23","2024-01-01","2024-01-01","2024-05-31 15:11:46");
INSERT INTO deployed_employees VALUES("478","195","23","2024-01-01","2024-01-01","2024-05-31 15:12:34");
INSERT INTO deployed_employees VALUES("479","200","23","2024-01-01","2024-01-01","2024-05-31 15:13:10");
INSERT INTO deployed_employees VALUES("480","324","23","2024-01-01","2024-01-01","2024-05-31 15:13:54");
INSERT INTO deployed_employees VALUES("481","81","24","2024-01-01","2024-01-01","2024-05-31 15:15:04");
INSERT INTO deployed_employees VALUES("482","40","25","2024-01-01","2024-01-01","2024-05-31 15:16:14");
INSERT INTO deployed_employees VALUES("483","189","25","2024-01-01","2024-01-01","2024-05-31 15:18:23");
INSERT INTO deployed_employees VALUES("484","308","25","2024-01-01","2024-01-01","2024-05-31 15:20:54");
INSERT INTO deployed_employees VALUES("485","560","25","2024-01-01","2024-01-01","2024-05-31 15:22:13");
INSERT INTO deployed_employees VALUES("486","43","25","2024-01-01","2024-01-01","2024-05-31 15:22:59");
INSERT INTO deployed_employees VALUES("487","45","26","2024-01-01","2024-01-01","2024-05-31 15:24:21");
INSERT INTO deployed_employees VALUES("488","137","26","2024-01-01","2024-01-01","2024-05-31 15:45:21");
INSERT INTO deployed_employees VALUES("489","234","26","2024-01-01","2024-01-01","2024-05-31 15:45:52");
INSERT INTO deployed_employees VALUES("490","46","26","2024-01-01","2024-01-01","2024-05-31 15:50:10");
INSERT INTO deployed_employees VALUES("491","252","27","2024-01-01","2024-01-01","2024-05-31 16:08:44");
INSERT INTO deployed_employees VALUES("492","257","27","2024-01-01","2024-01-01","2024-05-31 16:09:54");
INSERT INTO deployed_employees VALUES("493","296","27","2024-01-01","2024-01-01","2024-05-31 16:10:46");
INSERT INTO deployed_employees VALUES("494","500","27","2024-01-01","2024-01-01","2024-05-31 16:12:46");
INSERT INTO deployed_employees VALUES("495","473","27","2024-01-01","2024-01-01","2024-05-31 16:13:59");
INSERT INTO deployed_employees VALUES("496","141","28","2024-01-01","2024-01-01","2024-05-31 16:15:00");
INSERT INTO deployed_employees VALUES("497","177","28","2024-01-01","2024-01-01","2024-05-31 16:15:37");
INSERT INTO deployed_employees VALUES("498","209","28","2024-01-01","2024-01-01","2024-05-31 16:16:13");
INSERT INTO deployed_employees VALUES("499","13","28","2024-01-01","2024-01-01","2024-05-31 16:17:01");
INSERT INTO deployed_employees VALUES("500","22","28","2024-01-01","2024-01-01","2024-05-31 16:17:35");
INSERT INTO deployed_employees VALUES("501","224","29","2024-01-01","2024-01-01","2024-05-31 16:19:52");
INSERT INTO deployed_employees VALUES("502","535","29","2024-01-01","2024-01-01","2024-05-31 16:21:18");
INSERT INTO deployed_employees VALUES("503","374","29","2024-01-01","2024-01-01","2024-05-31 16:22:14");
INSERT INTO deployed_employees VALUES("504","62","30","2024-01-01","2024-01-01","2024-05-31 16:22:56");
INSERT INTO deployed_employees VALUES("505","180","30","2024-01-01","2024-01-01","2024-05-31 16:23:46");
INSERT INTO deployed_employees VALUES("506","241","30","2024-01-01","2024-01-01","2024-05-31 16:24:27");
INSERT INTO deployed_employees VALUES("507","520","31","2024-01-01","2024-01-01","2024-05-31 16:29:47");
INSERT INTO deployed_employees VALUES("508","139","31","2024-01-01","2024-01-01","2024-05-31 16:30:24");
INSERT INTO deployed_employees VALUES("509","246","31","2024-01-01","2024-01-01","2024-05-31 16:30:58");
INSERT INTO deployed_employees VALUES("510","258","31","2024-01-01","2024-01-01","2024-05-31 16:31:29");
INSERT INTO deployed_employees VALUES("511","500","31","2024-01-01","2024-01-01","2024-05-31 16:32:56");
INSERT INTO deployed_employees VALUES("512","471","31","2024-01-01","2024-01-01","2024-05-31 16:34:01");
INSERT INTO deployed_employees VALUES("513","9","31","2024-01-01","2024-01-01","2024-05-31 16:34:32");
INSERT INTO deployed_employees VALUES("514","402","31","2024-01-01","2024-01-01","2024-05-31 16:35:36");
INSERT INTO deployed_employees VALUES("515","81","32","2024-01-01","2024-01-01","2024-05-31 16:37:32");
INSERT INTO deployed_employees VALUES("516","82","32","2024-01-01","2024-01-01","2024-05-31 16:38:03");
INSERT INTO deployed_employees VALUES("517","245","32","2024-01-01","2024-01-01","2024-05-31 16:40:49");
INSERT INTO deployed_employees VALUES("518","500","32","2024-01-01","2024-01-01","2024-05-31 16:42:24");
INSERT INTO deployed_employees VALUES("519","375","32","2024-01-01","2024-01-01","2024-05-31 16:43:05");
INSERT INTO deployed_employees VALUES("520","402","32","2024-01-01","2024-01-01","2024-05-31 16:44:13");
INSERT INTO deployed_employees VALUES("521","489","32","2024-01-01","2024-01-01","2024-05-31 16:45:26");
INSERT INTO deployed_employees VALUES("522","24","33","2024-01-01","2024-01-01","2024-05-31 16:46:42");
INSERT INTO deployed_employees VALUES("523","74","33","2024-01-01","2024-01-01","2024-05-31 16:47:11");
INSERT INTO deployed_employees VALUES("524","412","33","2024-01-01","2024-01-01","2024-05-31 16:48:25");
INSERT INTO deployed_employees VALUES("525","222","33","2024-01-01","2024-01-01","2024-05-31 16:48:59");
INSERT INTO deployed_employees VALUES("526","266","33","2024-01-01","2024-01-01","2024-05-31 16:49:37");
INSERT INTO deployed_employees VALUES("527","150","34","2024-01-01","2024-01-01","2024-05-31 16:50:22");
INSERT INTO deployed_employees VALUES("528","231","34","2024-01-01","2024-01-01","2024-05-31 16:51:04");
INSERT INTO deployed_employees VALUES("529","245","34","2024-01-01","2024-01-01","2024-05-31 16:51:40");
INSERT INTO deployed_employees VALUES("530","500","34","2024-01-01","2024-01-01","2024-05-31 16:52:35");
INSERT INTO deployed_employees VALUES("531","385","34","2024-01-01","2024-01-01","2024-05-31 16:57:08");
INSERT INTO deployed_employees VALUES("532","402","34","2024-01-01","2024-01-01","2024-05-31 16:58:02");
INSERT INTO deployed_employees VALUES("533","24","35","2024-01-01","2024-01-01","2024-05-31 16:59:18");
INSERT INTO deployed_employees VALUES("534","92","35","2024-01-01","2024-01-01","2024-05-31 16:59:57");
INSERT INTO deployed_employees VALUES("535","96","35","2024-01-01","2024-01-01","2024-05-31 17:00:30");
INSERT INTO deployed_employees VALUES("536","19","35","2024-01-01","2024-01-01","2024-05-31 17:02:38");
INSERT INTO deployed_employees VALUES("537","222","35","2024-01-01","2024-01-01","2024-05-31 17:03:14");
INSERT INTO deployed_employees VALUES("538","266","35","2024-01-01","2024-01-01","2024-05-31 17:03:49");
INSERT INTO deployed_employees VALUES("539","336","35","2024-01-01","2024-01-01","2024-05-31 17:04:49");
INSERT INTO deployed_employees VALUES("540","488","35","2024-01-01","2024-01-01","2024-05-31 17:07:17");
INSERT INTO deployed_employees VALUES("541","520","35","2024-01-01","2024-01-01","2024-05-31 17:09:32");
INSERT INTO deployed_employees VALUES("542","5","35","2024-01-01","2024-01-01","2024-05-31 17:09:59");
INSERT INTO deployed_employees VALUES("543","81","36","2024-01-01","2024-01-01","2024-05-31 17:10:43");
INSERT INTO deployed_employees VALUES("544","135","36","2024-01-01","2024-01-01","2024-05-31 17:11:29");
INSERT INTO deployed_employees VALUES("545","171","36","2024-01-01","2024-01-01","2024-05-31 17:11:51");
INSERT INTO deployed_employees VALUES("546","222","36","2024-01-01","2024-01-01","2024-05-31 17:12:28");
INSERT INTO deployed_employees VALUES("547","287","36","2024-01-01","2024-01-01","2024-05-31 17:13:18");
INSERT INTO deployed_employees VALUES("548","500","36","2024-01-01","2024-01-01","2024-05-31 17:14:20");
INSERT INTO deployed_employees VALUES("549","380","36","2024-01-01","2024-01-01","2024-05-31 17:15:28");
INSERT INTO deployed_employees VALUES("550","489","36","2024-01-01","2024-01-02","2024-05-31 17:16:12");
INSERT INTO deployed_employees VALUES("551","229","37","2024-01-01","2024-01-01","2024-05-31 17:17:33");
INSERT INTO deployed_employees VALUES("552","297","37","2024-01-01","2024-01-01","2024-05-31 17:18:13");
INSERT INTO deployed_employees VALUES("553","311","37","2024-01-01","2024-01-01","2024-05-31 17:18:57");
INSERT INTO deployed_employees VALUES("554","500","37","2024-01-01","2024-01-01","2024-05-31 17:20:12");
INSERT INTO deployed_employees VALUES("555","402","37","2024-01-01","2024-01-01","2024-05-31 17:21:22");
INSERT INTO deployed_employees VALUES("556","17","38","2024-01-01","2024-01-01","2024-05-31 17:21:54");
INSERT INTO deployed_employees VALUES("557","250","38","2024-01-01","2024-01-01","2024-05-31 17:23:44");
INSERT INTO deployed_employees VALUES("558","275","38","2024-01-01","2024-01-02","2024-05-31 17:24:19");
INSERT INTO deployed_employees VALUES("559","289","38","2024-01-01","2024-01-01","2024-05-31 17:24:58");
INSERT INTO deployed_employees VALUES("560","482","38","2024-01-01","2024-01-01","2024-05-31 17:28:12");
INSERT INTO deployed_employees VALUES("561","341","39","2024-01-01","2024-01-01","2024-05-31 17:30:28");
INSERT INTO deployed_employees VALUES("562","124","40","2024-01-01","2024-01-01","2024-05-31 17:31:14");
INSERT INTO deployed_employees VALUES("563","262","40","2024-01-01","2024-01-01","2024-05-31 17:35:21");
INSERT INTO deployed_employees VALUES("564","491","40","2024-01-01","2024-01-01","2024-05-31 17:38:52");
INSERT INTO deployed_employees VALUES("565","402","40","2024-01-01","2024-01-01","2024-05-31 17:46:59");
INSERT INTO deployed_employees VALUES("566","145","41","2024-01-01","2024-01-01","2024-06-05 16:21:06");
INSERT INTO deployed_employees VALUES("567","271","41","2024-01-01","2024-01-01","2024-06-05 16:21:51");
INSERT INTO deployed_employees VALUES("568","500","41","2024-01-01","2024-01-01","2024-06-05 16:22:57");
INSERT INTO deployed_employees VALUES("569","484","41","2024-01-01","2024-01-01","2024-06-05 16:24:05");
INSERT INTO deployed_employees VALUES("570","402","41","2024-01-01","2024-01-01","2024-06-05 16:25:17");
INSERT INTO deployed_employees VALUES("571","411","41","2024-01-01","2024-01-01","2024-06-05 16:26:10");
INSERT INTO deployed_employees VALUES("572","326","42","2024-01-01","2024-01-01","2024-06-05 16:37:38");
INSERT INTO deployed_employees VALUES("573","263","43","2024-01-01","2024-01-01","2024-06-05 16:38:31");
INSERT INTO deployed_employees VALUES("574","113","43","2024-01-01","2024-01-01","2024-06-05 16:39:52");
INSERT INTO deployed_employees VALUES("575","158","43","2024-01-01","2024-01-01","2024-06-05 16:40:36");
INSERT INTO deployed_employees VALUES("576","488","43","2024-01-01","2024-01-01","2024-06-05 16:41:46");
INSERT INTO deployed_employees VALUES("577","476","43","2024-01-01","2024-01-01","2024-06-05 16:42:50");
INSERT INTO deployed_employees VALUES("578","420","44","2024-01-01","2024-01-01","2024-06-05 16:46:07");
INSERT INTO deployed_employees VALUES("579","196","44","2024-01-01","2024-01-01","2024-06-05 16:46:50");
INSERT INTO deployed_employees VALUES("580","245","44","2024-01-01","2024-01-01","2024-06-05 16:47:23");
INSERT INTO deployed_employees VALUES("581","528","44","2024-01-01","2024-01-01","2024-06-05 16:48:38");
INSERT INTO deployed_employees VALUES("582","500","44","2024-01-01","2024-01-01","2024-06-05 16:49:29");
INSERT INTO deployed_employees VALUES("583","113","45","2024-01-01","2024-01-01","2024-06-05 16:52:55");
INSERT INTO deployed_employees VALUES("584","133","45","2024-01-01","2024-01-01","2024-06-05 16:53:25");
INSERT INTO deployed_employees VALUES("585","225","45","2024-01-01","2024-01-01","2024-06-05 16:53:57");
INSERT INTO deployed_employees VALUES("586","276","45","2024-01-01","2024-01-01","2024-06-05 16:54:32");
INSERT INTO deployed_employees VALUES("587","14","45","2024-01-01","2024-01-01","2024-06-05 16:56:51");
INSERT INTO deployed_employees VALUES("588","360","45","2024-01-01","2024-01-01","2024-06-05 16:57:28");
INSERT INTO deployed_employees VALUES("589","402","45","2024-01-01","2024-01-01","2024-06-05 16:58:06");
INSERT INTO deployed_employees VALUES("590","7","46","2024-01-01","2024-01-01","2024-06-05 17:01:50");
INSERT INTO deployed_employees VALUES("591","80","46","2024-01-01","2024-01-01","2024-06-05 17:02:26");
INSERT INTO deployed_employees VALUES("592","8","46","2024-01-01","2024-01-01","2024-06-05 17:02:49");
INSERT INTO deployed_employees VALUES("593","494","46","2024-01-01","2024-01-01","2024-06-05 17:11:00");
INSERT INTO deployed_employees VALUES("594","58","47","2024-01-01","2024-01-01","2024-06-05 17:14:24");
INSERT INTO deployed_employees VALUES("595","208","47","2024-01-01","2024-01-01","2024-06-05 17:15:41");
INSERT INTO deployed_employees VALUES("596","313","47","2024-01-01","2024-01-01","2024-06-05 17:19:35");
INSERT INTO deployed_employees VALUES("597","28","2","2024-06-08","2024-06-19","2024-06-07 02:19:21");
INSERT INTO deployed_employees VALUES("598","57","48","2024-01-01","2024-01-01","2024-06-13 15:20:05");
INSERT INTO deployed_employees VALUES("599","133","48","2024-01-01","2024-01-01","2024-06-13 15:21:24");
INSERT INTO deployed_employees VALUES("600","337","48","2024-01-01","2024-01-01","2024-06-13 15:30:24");
INSERT INTO deployed_employees VALUES("601","488","48","2024-01-01","2024-01-01","2024-06-13 15:58:39");
INSERT INTO deployed_employees VALUES("602","23","49","2024-01-01","2024-01-01","2024-06-13 16:07:29");
INSERT INTO deployed_employees VALUES("603","141","49","2024-01-01","2024-01-01","2024-06-13 16:08:08");
INSERT INTO deployed_employees VALUES("604","178","49","2024-01-01","2024-01-01","2024-06-13 16:08:39");
INSERT INTO deployed_employees VALUES("605","203","49","2024-01-01","2024-01-01","2024-06-13 16:09:06");
INSERT INTO deployed_employees VALUES("606","259","49","2024-01-01","2024-01-01","2024-06-13 16:11:42");
INSERT INTO deployed_employees VALUES("607","265","49","2024-01-01","2024-01-01","2024-06-13 16:12:10");
INSERT INTO deployed_employees VALUES("608","337","49","2024-01-01","2024-01-01","2024-06-13 16:12:43");
INSERT INTO deployed_employees VALUES("609","71","50","2024-01-01","2024-01-01","2024-06-13 16:15:51");
INSERT INTO deployed_employees VALUES("610","128","50","2024-01-01","2024-01-01","2024-06-13 16:16:18");
INSERT INTO deployed_employees VALUES("611","149","50","2024-01-01","2024-01-01","2024-06-13 16:16:51");
INSERT INTO deployed_employees VALUES("612","500","50","2024-01-01","2024-01-01","2024-06-13 16:17:21");
INSERT INTO deployed_employees VALUES("613","457","51","2024-01-01","2024-01-01","2024-06-13 16:19:11");
INSERT INTO deployed_employees VALUES("614","537","51","2024-01-02","2024-01-01","2024-06-13 16:20:09");
INSERT INTO deployed_employees VALUES("615","238","51","2024-01-01","2024-01-01","2024-06-13 16:20:45");
INSERT INTO deployed_employees VALUES("616","245","51","2024-01-01","2024-01-01","2024-06-13 16:21:25");
INSERT INTO deployed_employees VALUES("617","273","51","2024-01-01","2024-01-01","2024-06-13 16:21:54");
INSERT INTO deployed_employees VALUES("618","500","51","2024-01-01","2024-01-01","2024-06-13 16:22:20");
INSERT INTO deployed_employees VALUES("619","380","51","2024-01-01","2024-01-01","2024-06-13 16:22:59");
INSERT INTO deployed_employees VALUES("620","194","71","2024-01-01","2024-11-11","2024-08-15 08:58:57");
INSERT INTO deployed_employees VALUES("621","104","3","2024-01-01","2024-01-01","2024-08-15 09:26:39");



CREATE TABLE `disbursement` (
  `disbursement_id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`disbursement_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `email_verifications` (
  `verification_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) NOT NULL,
  `verification` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`verification_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `employees` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_no` varchar(100) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `middlename` varchar(100) NOT NULL,
  `gender` varchar(100) NOT NULL,
  `civil_status` varchar(100) NOT NULL,
  `telephone` varchar(100) NOT NULL,
  `mobile` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `sss` text NOT NULL,
  `phil` text NOT NULL,
  `pagibig` text NOT NULL,
  `tin` text NOT NULL,
  `ctc` text NOT NULL,
  `rfid` text NOT NULL,
  `gsis` text NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=613 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO employees VALUES("1","0","MICHAEL","ABAD","VILLANO","Male","Married","","","","","33-6635774-0","020500294354","121105716058","","","","","2024-04-23 11:41:49");
INSERT INTO employees VALUES("2","680678","KEVIN","CAMPOS","FLORES","Male","Single","09072327427","09072327427","","LAMBAKIN, MARILAO, BULACAN","34-7507623-9","210256638720","","","","","","2024-04-28 15:38:09");
INSERT INTO employees VALUES("3","679145","FRED","ATENCIO","MASTILERO","Male","Married","09756672064","09756672064","","#174 ILANG-ILANG, GUIGUINTO, BULACAN","33-7490668-8","19-090527254-7","1060-0101-1913","406-758-458-000","","","","2024-04-28 15:42:24");
INSERT INTO employees VALUES("4","681309","JIM RIAN","MATUGAS","GORNO","Male","Single","09678528544","","","THE LAKESHORE, SAN RAFAEL, MEXICO, PAMPANGA","34-3745598-2","07-050973217-3","121160049034","766-127-450-020","","","","2024-04-28 15:48:58");
INSERT INTO employees VALUES("5","680636","KIM PHILIP","VERZANO","TUMAMBING","Male","Single","09509056443","","","#0270 PUROK 3, SAN PEDRO, GUAGUA, PAMPANGA","02-4042679-0","082508860583","121228697590","737663771000","","","","2024-04-28 16:00:57");
INSERT INTO employees VALUES("6","680728","DENNIS","TOLENADA","BASILIO","Male","Married","09100844522","","","SITIO MALASIN, BRGY. SINIGPIT, PANIQUI, TARLAC","02-2036906-8","072009552174","121184904386","499084507","30057296","","","2024-04-28 16:11:44");
INSERT INTO employees VALUES("7","680598","FERNANDO JR.","AGUSTIN","SOLOMON","Male","Married","09305621564","09279798967","","#79 1ST ST. BRGY. BALETE, TARLAC CITY","02-190016-1-2","","104003321015","452834008","","","","2024-04-28 16:15:45");
INSERT INTO employees VALUES("8","680610","MARLON","CABACUNGAN","DEL ROSARIO","Male","Single","","09470867508","","SURGUI 2ND, CAMILING, TARLAC","33-1014788-3","190891446725","106001866107","182982198","","","","2024-04-28 16:21:23");
INSERT INTO employees VALUES("9","680615","ARIEL","VERZANO","LUMBA","Male","Married","","","","PUROK 3, SAN PEDRO, GUAGUA, PAMPANGA","33-2232007-0","190504015963","106001846559","736897634","","","","2024-04-28 16:27:08");
INSERT INTO employees VALUES("10","680649","ALEX","NAVARRO","ABADIANO","Male","Single","","","","SEBASTIAN ST. SAN JUAN, BALAGTAS, BULACAN","","","121113161000","","","","","2024-04-28 16:33:01");
INSERT INTO employees VALUES("11","679972","JOSEPH","DEL ROSARIO","DELA CRUZ","Male","Married","","09354685680","","SALANGAN, SAN MIGUEL, BULACAN","","030507180953","107000304833","","","","","2024-04-28 16:42:54");
INSERT INTO employees VALUES("13","680590","VALENTIN","MISLANG","IBARRA","Male","Married","","09468195491","","VARGAS, STA. IGNACIA, TARLAC","02-1509150-3","070505888470","106001867941","","","","","2024-04-28 16:59:09");
INSERT INTO employees VALUES("14","680558","MELVIN","MORALES","VALDEZ","Male","Married","","","","PUROK 5, BRGY. BAYABAS, TALUGTUG, NUEVA ECIJA","02-4296280-9","2102-5526-7412","","707-622-039-000","","","","2024-04-28 17:22:40");
INSERT INTO employees VALUES("15","679599","ALBERT","MAHUSAY","SUSON","Male","Single","09326624205","","","PUROK 4, BRGY. TIKAY, MALOLOS CITY, BULACAN","33-4966791-0","190891911266","107001116021","","","","","2024-04-28 17:24:24");
INSERT INTO employees VALUES("16","679642","REX","WAGIA","SAMBALANI","Male","Married","","","","#1625 TABING ILOG, TUMANA STA. MARIA, BULACAN","03-9902767-1","07-50043629-6","1410-0064-1480","155-751-687-000","","","","2024-04-28 17:26:51");
INSERT INTO employees VALUES("17","678915","FERNANDO","BARSAGA","ESPINILLA","Male","Married","","","","240 BAYANIHAN ST., POBLACION, BUSTOS, BULACAN","","","141000628288","","","","","2024-04-28 17:32:09");
INSERT INTO employees VALUES("18","679752","JOMAR","ANASTACIO","ADUANA","Male","Married","","","","GLORIA 2, BRGY. SINDALAN CITY OF SAN FERNANDO, PAMPANGA","","","121207099769","","","","","2024-04-28 17:32:57");
INSERT INTO employees VALUES("19","680159","RAMON NONATO","SANTOS","LOPEZ","Male","Married","0905-663-2134","","","#107 PUROK 6, ABULALAS, HAGONOY, BULACAN","03-7311125-7","21-025548777-3","121219654749","35-1-02104","","","","2024-04-28 17:34:20");
INSERT INTO employees VALUES("21","680638","GILBERTO","CALMA","CRUZ","Male","Married","","09219672578","","PUROK 6, BRGY. JULIANA, SAN FERANDO, PAMPANGA","03-8354665-0","190524009145","106001845362","226316505","","","","2024-04-28 17:39:24");
INSERT INTO employees VALUES("22","680591","JESSIE","ROMBAOA","OSOTEO","Male","Married","","","","#299 PUROK, ROSA CORTEZ, ST. CARINO, PANIQUI, TARLAC","02-1844679-9","19-090374192-2","121070659987","105450480","","","","2024-04-28 17:41:34");
INSERT INTO employees VALUES("24","680603","ARNOLD","ANTONIO","PASCUAL","Male","Single","","","","BRGY. LUNA, GERONA, TARLAC","","","121012497560","","","","","2024-04-28 17:54:12");
INSERT INTO employees VALUES("25","680560","RENE","TOLENTINO","ANTONIO","Male","Married","","","","516 CARIÑO, PANIQUI, TARLAC","02-1857053-9","020500153246","106001851412","267958922","","","","2024-04-28 17:56:43");
INSERT INTO employees VALUES("26","680892","ARIEL","ACIERTO","VALERIO","Male","Married","","","","BRGY. DICOLOR, GERONA, TARLAC","","","121286755086","","","","","2024-04-28 17:58:06");
INSERT INTO employees VALUES("27","681242","HONEYVAL","ABANILLA","LOCSIN","Male","Married","","","","","09-3765397-3","","121143573315","","","","","2024-05-01 09:22:32");
INSERT INTO employees VALUES("28","679012","RAYMUNDO","PARABAS","ZARAGOSA","Male","Married","","","","","33-6258157-8","","141000637000","","","","","2024-05-01 14:24:29");
INSERT INTO employees VALUES("29","679015","SERGIO","PINEDA","ROSAS","Male","Married","","","","","03-9021695-7","","141000625769","","","","","2024-05-01 14:25:44");
INSERT INTO employees VALUES("31","679930","JUVETH","ESCANA","DALINGAY","Male","Married","","","","","34-3441693-7","","121224892986","","","","","2024-05-01 14:39:08");
INSERT INTO employees VALUES("33","681034","MARVIN","REYES","BASTO","Male","Married","","09532263013","","","34-1006615-2","020507129057","105001538936","409879324","","","","2024-05-01 14:40:45");
INSERT INTO employees VALUES("34","678922","ALLAN","CARDENAS","IGLAS","Male","Married","","","","","33-7232011-4","","121177026533","","","","","2024-05-01 14:42:16");
INSERT INTO employees VALUES("35","679172","GEOGRAPHY","BASINANG","MIGO","Male","Married","0922-6311-224","09226311224","","#755 FATIMA ST. BAGBAGUIN, STA. MARIA, BULACAN","34-0613138-9","210501024257","1211836999811","293082776","","","","2024-05-01 14:43:24");
INSERT INTO employees VALUES("36","678982","BONIFACIO","FLAMEÑO","MARIANO","Male","Married","","","","","34-0278986-1","","121121698130","","","","","2024-05-01 14:44:25");
INSERT INTO employees VALUES("37","679527","EDGAR","REFUERZO","BUSTILLO","Male","Married","","","","","34-1161463-9","","121191109357","","","","","2024-05-01 14:45:20");
INSERT INTO employees VALUES("38","680393","GEFFRY","SABANAL","GALINDO","Male","Married","","","","","33-8604955-9","","121245332195","","","","","2024-05-01 14:46:01");
INSERT INTO employees VALUES("39","679187","ERLAN","BERNAS","BONDA","Male","Married","","","","","33-7361844-3","","141000628932","","","","","2024-05-01 14:47:00");
INSERT INTO employees VALUES("40","679006","ALFREDO","MANGADAP","NIETO","Male","Married","","","","","33-1886470-2","190521637513","141000631720","166691139","","","","2024-05-01 14:47:49");
INSERT INTO employees VALUES("41","679043","RAMIL","BUCCAT","DELA CRUZ","Male","Married","","","","","33-5612738-8","","108001114293","","","","","2024-05-01 14:48:29");
INSERT INTO employees VALUES("42","679273","FRED","DIOSO","YTIENZA","Male","Married","","","","","071661607-6","","121032763101","","","","","2024-05-01 14:49:16");
INSERT INTO employees VALUES("43","679308","MARK","FORIO","LIMOS","Male","Married","","","","MARILAO, BULACAN","04-2155289-4","","121034065712","19582855","","","","2024-05-01 14:52:31");
INSERT INTO employees VALUES("44","680687","JAYMARK ","BIBON","VITUS","Male","Married","","","","TIBAGAN ST. PRENZA 1, MARILAO, BULACAN","34-3378542-3","210501298233","121085429442","","","","","2024-05-01 14:53:53");
INSERT INTO employees VALUES("45","679480","RANDEL","PARABAS","BELLO","Male","Married","","","","","34-4058759-1","","121187452072","","","","","2024-05-01 14:56:25");
INSERT INTO employees VALUES("46","679606","NIXON","TERNOLA","MACADAY","Male","Married","","","","","34-0068806-1","","121088890976","","","","","2024-05-01 14:57:56");
INSERT INTO employees VALUES("47","679229","ERWIN","CORPUZ","LEAÑO","Male","Married","","","","","02-1036656-3","","121098523082","","","","","2024-05-01 14:59:09");
INSERT INTO employees VALUES("48","679155","EDMAR","BAGOMBOY","NACION","Male","Married","","","","","33-8741862-6","","141000630910","","","","","2024-05-01 15:01:04");
INSERT INTO employees VALUES("49","679645","WARREN PAUL","YONGCO","UBUGAN","Male","Married","","","","","33-2269224-5","","121016461392","","","","","2024-05-01 15:02:22");
INSERT INTO employees VALUES("50","681207","RONALD","LAGAZON","MONTOYA","Male","Married","","","","","02-2155959-2","03026001763-9","121212889154","434727779000","","","","2024-05-01 15:03:57");
INSERT INTO employees VALUES("51","678908","SAMUEL","AGUS","DELA CRUZ","Male","Married","","","","","07-1507202-2","","141000621385","","","","","2024-05-01 15:05:41");
INSERT INTO employees VALUES("52","679599","ALBERT","SUSON","MAHUSAY","Male","Married","","","","","33-4966791-0","","107001116021","","","","","2024-05-01 15:06:38");
INSERT INTO employees VALUES("53","681160","JOSE JAYCO","ORTENERO","INDUCIL","Male","Married","","","","#1308 ALDAMA, SANTA BARBARA, BALIUAG, BULACAN","","","121150877513","","","","","2024-05-01 15:07:59");
INSERT INTO employees VALUES("54","679133","SHERWIN","ANGELES","REYES ","Male","Married","","","","","33-7748257-8","","121122801773","","","","","2024-05-01 15:09:40");
INSERT INTO employees VALUES("55","680742","MARLON","ABCEDE","OSER","Male","Married","","","","","","","121047743975","","","","","2024-05-01 15:11:38");
INSERT INTO employees VALUES("56","681137","JEROME","ABENOJA","GABRIEL","Male","Married","","09972852611","","GUYONG, STA. MARIA, BULACAN","34-4420621-8","2102-5238-6356","121178449464","610-470-659-00000","","","","2024-05-01 15:12:15");
INSERT INTO employees VALUES("57","681201","CINDY MAY","ACEDO","BOLATETE","Female","Single","","0921-826-2250","","ANTIPOLO, RIZAL","34-5360596-5","03-051336421-7","1212-0606-3623","747-121-266-000","","","","2024-05-01 15:13:13");
INSERT INTO employees VALUES("58","679107","MICHAEL PRINCE ","AGAGON","N","Male","Married","","","","","02-2567716-6","","121190939506","","","","","2024-05-01 15:34:42");
INSERT INTO employees VALUES("59","679671","NIÑO","AGATEP","ASUNCION","Male","Married","","","","","34-3685569-3","","121197310528","","","","","2024-05-01 15:35:35");
INSERT INTO employees VALUES("60","680608","LEONARDO","AGSALON","GABRIEL","Male","Married","","09101801553","","CABUGBUGAN, STA. IGNACIA, TARLAC","02-1036083-1","190903909467","106001862657","193393397","","","","2024-05-01 15:37:57");
INSERT INTO employees VALUES("61","680194","ROMEO","AGSALON","NAVARRO","Male","Married","","","","","02-2851023-3","","121156054779","","","","","2024-05-01 15:39:48");
INSERT INTO employees VALUES("62","681347","RONEL","AGUAS","M","Male","Married","","","","","02-2747860-6","","","","","","","2024-05-01 15:40:46");
INSERT INTO employees VALUES("63","681273","ERWIN","AGUS","GARCERO","Male","Married","","","","","33-7549704-4","","106001873737","","","","","2024-05-01 15:41:25");
INSERT INTO employees VALUES("64","679925","JULIUS","AGUSTIN","ALONA","Male","Married","","","","","34-6482411-7","","121197847592","","","","","2024-05-01 15:43:37");
INSERT INTO employees VALUES("65","680564","LEONCIO","AGUSTIN","MANDANI","Male","Married","","","","#146 SAN VICENTE, MACABEBE, PAMPANGA","02-1281806-4","19-089279466-2","0009-247017-03","220-611-482","","","","2024-05-01 15:44:14");
INSERT INTO employees VALUES("66","679110","NICKO","AGUSTIN","RAMALES","Male","Married","","","","","01-1402145-4","","121033206866","","","","","2024-05-01 15:44:43");
INSERT INTO employees VALUES("67","678937","RICHARD","AGUSTIN","MARTINEZ","Male","Married","","","","","02-2493195-5","","121033206943","","","","","2024-05-01 15:45:35");
INSERT INTO employees VALUES("68","680451","PEDRO","AJOC","PEDRAYA","Male","Married","","","","","33-3582112-6","","121026304714","","","","","2024-05-01 15:46:10");
INSERT INTO employees VALUES("69","681375","KING","MONCHING","BAGANG","Male","Married","","","","","","","","","","","","2024-05-01 15:47:33");
INSERT INTO employees VALUES("70","681349","ACE NICOLE","ALFONSO",".","Male","Married","","","","","02-4490274-4","","","","","","","2024-05-01 15:48:10");
INSERT INTO employees VALUES("71","679114","ALLAN GENARO","ALFONSO","NABUNG","Male","Married","","","","","02-1663682-8","","121013287410","","","","","2024-05-01 15:48:49");
INSERT INTO employees VALUES("72","679046","RULLIE","ALISNA","EVORDE","Male","Married","","","","","33-8412506-4","","121051791087","","","","","2024-05-01 15:52:31");
INSERT INTO employees VALUES("73","679121","JOSE","ALULAYA","MARTINEZ","Male","Married","","","","","33-5457647-8","","121052221051","","","","","2024-05-01 15:54:46");
INSERT INTO employees VALUES("74","681169","DANTE","ALVARAN","MANASAN","Male","Married","","","","","33-2122372-5","","121037525253","","","","","2024-05-01 15:55:23");
INSERT INTO employees VALUES("75","678909","DANRUB","AMAHIT","MAGTALAS","Male","Married","","","","","34-0105631-7","","121122796467","","","","","2024-05-01 15:55:58");
INSERT INTO employees VALUES("76","680566","RODEN","AMBIL","COSO","Male","Married","","","","DAMPOL 1ST, PULILAN, BULACAN","34-0599992-0","","121304349130","","","","","2024-05-01 15:56:42");
INSERT INTO employees VALUES("77","679752","JOMAR","ANASTACIO","ADUANA","Male","Married","","","","","02-4074400-3","","121207099769","","","","","2024-05-01 15:57:44");
INSERT INTO employees VALUES("78","680364","JEFFREY","ANCERO","OJEDA","Male","Married","","","","","34-2812128-3","","121174065844","","","","","2024-05-01 15:58:27");
INSERT INTO employees VALUES("79","679090","MERNEL","ANDANZA","TECSO","Male","Married","","","","","04-0557717-0","","121034095498","","","","","2024-05-01 15:59:04");
INSERT INTO employees VALUES("80","680738","RODERICK","ANGELES","REYES","Male","Married","","","","","33-9555502-1","","121018443062","","","","","2024-05-01 16:00:08");
INSERT INTO employees VALUES("81","681124","JOE MARIE","ANTONINO",".","Male","Married","","","","","34-8862339-4","","","","","","","2024-05-01 16:01:06");
INSERT INTO employees VALUES("82","678938","ARNOLD","ANTONIO","ALAYON","Male","Married","","","","","09-2171443-3","","141000639008","","","","","2024-05-01 16:01:28");
INSERT INTO employees VALUES("83","680603","ARNOLD","ANTONIO","PASUCAL","Male","Married","","","","","33-8738951-1","030252528527","121012497560","","","","","2024-05-01 16:02:16");
INSERT INTO employees VALUES("84","680517","ARNIEL","APOLONIO","FUERTE","Male","Married","","","","BRGY CALULUT, SAN FERNANDO CITY, PAMPANGA","34-1184196-5","","121089342977","","","","","2024-05-01 16:02:56");
INSERT INTO employees VALUES("85","680760","JULIUS","AQUINO","ENRILE","Male","Married","","","","","33-7747653-9","","121262626979","","","","","2024-05-01 16:04:44");
INSERT INTO employees VALUES("86","681374","SHAWN MIHCAEL","ARCA","N.M.N","Male","Married","","","","","34-4105688-5","","121179485322","","","","","2024-05-01 16:05:56");
INSERT INTO employees VALUES("87","680992","SALVADOR","ASUNCION","BOLANDO","Male","Married","","","","","33-1407308-9","","121111744470","","","","","2024-05-01 16:08:23");
INSERT INTO employees VALUES("88","681068","ALEXANDER","BALANCIO","G","Male","Married","","","","","02-4722653-7","","","","","","","2024-05-01 16:10:20");
INSERT INTO employees VALUES("89","678940","BERNALDO","BALAOING","M.","Male","Married","","","","","33-1773017-0","","","","","","","2024-05-01 16:12:14");
INSERT INTO employees VALUES("90","679162","DANIEL","BALBALOSA","TUAZON","Male","Married","","","","","02-2632782-6","","121027659972","","","","","2024-05-01 16:12:45");
INSERT INTO employees VALUES("91","681181","ARNEL","BALDEVINO","DUHAYLUNGSOD","Male","Married","","","","","34-3274401-2","","121260816622","","","","","2024-05-01 16:13:22");
INSERT INTO employees VALUES("92","680826","ROGER","BALINGASA","MENDOZA","Male","Married","","","","","02-3319998-2","","121141425577","","","","","2024-05-01 16:15:30");
INSERT INTO employees VALUES("93","679168","RODRIGO","BANGIT","MANABAT","Male","Married","","","","","33-5836254-9","","121189548453","","","","","2024-05-01 16:16:57");
INSERT INTO employees VALUES("94","680624","SERGIO","BARAL","CASAMA","Male","Single","09484740485","","","MUZON, SAN LUIS, BATANGAS","34-0565513-8","09-025469025-1","121135420684","730844","","","","2024-05-01 16:27:54");
INSERT INTO employees VALUES("95","681168","ALFREDO","BARRERA","PAMINTUAN","Male","Married","","","","","03-9941681-3","","140000341349","","","","","2024-05-01 16:29:24");
INSERT INTO employees VALUES("96","680103","AUDIE","BARRERA","GRAPA","Male","Married","","","","","33-6471139-1","","121142294082","","","","","2024-05-01 16:29:54");
INSERT INTO employees VALUES("97","678915","FERNANDO","BARSAGA","ESPENILLA","Male","Married","","","","","33-4810925-9","","141000628288","","","","","2024-05-01 16:31:29");
INSERT INTO employees VALUES("98","681421","JOHN REY","BASAÑEZ",".","Male","Married","","","","","","","","","","","","2024-05-01 16:32:49");
INSERT INTO employees VALUES("99","681395","HERMENEGILDO","BASOS","MAGPAYO","Male","Married","","","","","33-3994135-8","","121080195047","","","","","2024-05-01 16:35:37");
INSERT INTO employees VALUES("100","679987","CARLO","BELANO","N.M.N","Male","Married","","","","","33-6200589-2","","121108749131","","","","","2024-05-01 16:36:46");
INSERT INTO employees VALUES("101","979179","ALLAN","BELEY","FELIPE","Male","Married","","","","","02-2876326-8","","121147980583","","","","","2024-05-01 16:37:27");
INSERT INTO employees VALUES("102","681412","RONIE","BELGA",".","Male","Married","","","","","","","","","","","","2024-05-01 16:39:40");
INSERT INTO employees VALUES("103","681427","KENNETH","BIAG",".","Male","Married","","","","","","","","","","","","2024-05-01 16:43:49");
INSERT INTO employees VALUES("104","681410","ARIEL","BISNAR",".","Male","Married","","","","","02-4748158-9","","","","","","","2024-05-01 16:44:22");
INSERT INTO employees VALUES("105","680436","VIRGILIO","BOITIZON","LUNA","Male","Married","","","","","33-2984102-8","","141000623815","","","","","2024-05-01 16:45:15");
INSERT INTO employees VALUES("106","679076","EDMUNDO","BORROMEOO","BUERE","Male","Married","0935-952-9874","","","BLK. 3 LOT 13 CITRUZ, SAN JOSE DEL MONTE","33-0621687-0","19-051442883-6","1210-7350-2624","912-020-054","","","","2024-05-01 16:46:02");
INSERT INTO employees VALUES("107","679195","ARNOLD","BRANZUELA","COSCULLA","Male","Married","","","","","33-5382498-5","","121189584879","","","","","2024-05-01 16:46:37");
INSERT INTO employees VALUES("108","681245","ROBERTO","BUENAFRANCISCA","LIMIN","Male","Married","","","","","33-7116942-8","","121264290642","","","","","2024-05-01 16:47:28");
INSERT INTO employees VALUES("109","679201","ERWIN","BULSECO","CRUZ","Male","Married","","","","","01-1509434-1","","141000624514","","","","","2024-05-01 16:47:59");
INSERT INTO employees VALUES("110","681411","AUGUST JHON","BUOT",".","Male","Married","","","","","","","121192411728","","","","","2024-05-01 16:48:24");
INSERT INTO employees VALUES("111","681041","JAN MICHAEL","BUREROS","ORBANEJA","Male","Married","","","","","","","121190968995","","","","","2024-05-01 16:49:02");
INSERT INTO employees VALUES("112","680855","ARLENE","CABABAN","MENDOZA","Male","Married","","","","","02-1295871-7","","121131777494","","","","","2024-05-01 16:49:37");
INSERT INTO employees VALUES("113","680049","ALVIN","CABATUAN","LUMBAY","Male","Married","","","","","09-3594190-4","","121154597558","","","","","2024-05-01 16:50:38");
INSERT INTO employees VALUES("114","681078","DOUGLAS","CACERES",".","Male","Married","","","","","02-0883680-1","","","","","","","2024-05-01 16:51:20");
INSERT INTO employees VALUES("115","681433","MARVIN","CADAYONA","SUSON","Male","Married","","","","","09-3318425-5","","","","","","","2024-05-01 16:52:16");
INSERT INTO employees VALUES("116","680579","RENATO","CAISIP","GUEVARRA","Male","Married","0905-867-4598","","","BRGY. CAFE, CONCEPCION, TARLAC","02-1556645-2","19-090178928-6","004002734009","","","","","2024-05-01 16:53:19");
INSERT INTO employees VALUES("117","680583","TEDDY","CALINGASAN","VILLAPANDO","Male","Married","09120597344","","","LUNA GERONA, TARLAC","04-1219394-5","09-05093282-0","1210-4935-3761","939-391-811","","","","2024-05-01 17:00:13");
INSERT INTO employees VALUES("118","680596","MICHAEL","CAMACHO","RAMO","Male","Married","","","","AROROY MASBATE","33-2233261-5","190508100837","1060-0185-1191","902-973-829-000","","","","2024-05-01 17:04:08");
INSERT INTO employees VALUES("119","680641","GILBERT","CAMACHO","RAMO","Male","Married","","","","","03-9542706-4","190524009157","106001345384","146287828","","","","2024-05-01 17:04:38");
INSERT INTO employees VALUES("120","679212","JONATHAN ARIEL","CAMON","GUASCH","Male","Married","","","","","02-0977722-8","","121033701344","","","","","2024-05-01 17:05:47");
INSERT INTO employees VALUES("121","679222","RENANTE","CAÑEGA","INOCANDO","Male","Married","","","","","","","121061621480","","","","","2024-05-01 17:10:48");
INSERT INTO employees VALUES("122","679213","RODELIO","CANGCO","RABE","Male","Married","","","","","02-1340731-9","","121159549211","","","","","2024-05-01 17:11:28");
INSERT INTO employees VALUES("123","679750","ROLANDO","CANILAO","PUNLA","Male","Married","","","","","02-1439248-1","","121011585337","","","","","2024-05-01 17:12:10");
INSERT INTO employees VALUES("124","681272","WILFREDO","CAPSA","ARDIDON","Male","Married","","","","","33-4194489-3","","121143280263","","","","","2024-05-01 17:22:54");
INSERT INTO employees VALUES("125","678922","ALLAN","CARDENAS","I.","Male","Married","","","","","33-7232011-4","","121177026533","","","","","2024-05-04 10:31:56");
INSERT INTO employees VALUES("126","679214","JENNY","CARIAN","J.","Male","Married","","","","","02-0971493-5","","141000621263","","","","","2024-05-04 10:32:40");
INSERT INTO employees VALUES("127","680925","EITHER JOSHUA","CASPILLO","A.","Male","Married","","","","","35-0680938-8","","121309180193","","","","","2024-05-04 10:33:38");
INSERT INTO employees VALUES("128","680550","RONIEL","CASTILLO","V.","Male","Married","","","","ANGELES CITY, PAMPANGA","02-2727517-1","","121124730857","","","","","2024-05-04 10:34:34");
INSERT INTO employees VALUES("129","681158","NAZARINO ","CASTINO JR.","RAMOS","Male","Married","0930-978-7151","","","BUTUAN CITY, AGUSON DEL NORTE","08-1459018-8","02-050987134-8","1210-8576-7069","279-390-326","","","","2024-05-04 10:35:31");
INSERT INTO employees VALUES("130","680872","PORFERIO","CASTRO","DIANGCO","Male","Married","","09661340815","","PUROK 4, TIKAY, MALOLOS, BULACAN","01130056602","010261890054","121050229720","469710089","","","","2024-05-04 10:36:06");
INSERT INTO employees VALUES("131","689595","NARCISO","CATUBIG JR.","L.","Male","Married","","","","","33-4259286-2","","106001857072","","","","","2024-05-04 10:36:55");
INSERT INTO employees VALUES("132","680768","SALVADOR","CAYABYAB JR.","SALINAS","Male","Single","09302874605","","","MALHAKAN, MEYCAUAYAN CITY, BULACAN","34-9282738-0","05-251049669-8","121268753457","","","","","2024-05-04 10:37:33");
INSERT INTO employees VALUES("133","678950","ROGER","CEBU","S.","Male","Married","","","","","03-8206343-5","","141000641245","","","","","2024-05-04 10:38:40");
INSERT INTO employees VALUES("134","680718","SEVERINO","COME JR.","COLANZA","Male","Married","09272945809","","","CAMALIG, MEYCAUAYAN CITY, BULACAN","33-8540640-7","2300-1762-2604","121061641385","570-510-735","","","","2024-05-04 10:39:34");
INSERT INTO employees VALUES("135","679723","RISTY","CONDINO","B.","Male","Married","","","","","33-8658852-8","","141000624525","","","","","2024-05-04 10:40:05");
INSERT INTO employees VALUES("136","680938","JONARSON","CONSTANTINO","F.","Male","Married","","","","","35-1130436-0","","121288763557","","","","","2024-05-04 10:41:04");
INSERT INTO employees VALUES("137","679075","MERVIN","COQUILLA","R.","Male","Married","","","","","07-2845288-8","","121087764505","","","","","2024-05-04 10:41:55");
INSERT INTO employees VALUES("138","679715","PAUL HARVEY","CORDOVA","N.","Male","Married","","","","","04-2903526-1","","121197410897","","","","","2024-05-04 10:42:55");
INSERT INTO employees VALUES("139","681363","AMOR","CORPUZ","TAMAYO","Male","Married","0961-981-7915","09352823980","","#57 LEGASPI ST. PANIQUI, TARLAC","33-3486291-1","19-051846766-6","1040-0061-2550","219-090-069-000","","","","2024-05-04 10:43:31");
INSERT INTO employees VALUES("140","679229","ERWIN","CORPUZ","LEAÑO","Male","Married","","","","C ,ERCADO ST. TUKTUKAN, GUIGUINTO, BULACAN","02-1036656-3","","121098523082","","","","","2024-05-04 10:43:59");
INSERT INTO employees VALUES("141","681098","JOVEL","CRISTOBAL","D.","Male","Married","","","","","34-3615656-7","","","","","","","2024-05-04 10:45:01");
INSERT INTO employees VALUES("142","680605","RODRIGO","CRUZ","ASUNCION","Male","Married","","09301531132","","BALANTACAN, LUBAO, PAMPANGA","02-3332989-1","070509458853","915047893895","","","","","2024-05-04 10:45:30");
INSERT INTO employees VALUES("143","680629","RUFINO","CRUZ JR.","DE LUNA","Male","Married","09438152664","","","BLK. 8 LOT 34, ALECON HOMES, 167 LLANO, PANGASINAN","33-4651770-4","","1210-7081-0788","905-208","","","","2024-05-04 10:46:11");
INSERT INTO employees VALUES("144","680601","PEPITO","CUARESMA","T.","Male","Married","","","","","02-1404857-3","02-050472784-0","102003709649","193862091","","","","2024-05-04 10:47:14");
INSERT INTO employees VALUES("145","678925","ROMEO","CUBERO","O.","Male","Married","","","","","33-2042237-8","","","","","","","2024-05-04 10:48:02");
INSERT INTO employees VALUES("146","681023","JERAMIL","CUIZON JR.",".","Male","Married","","","","","08-1864843-4","","121054682484","","","","","2024-05-04 10:48:46");
INSERT INTO employees VALUES("147","680233","GLECERIO","DA","F.","Male","Married","","","","","33-4213571-1","","121061810746","","","","","2024-05-04 10:49:39");
INSERT INTO employees VALUES("148","680587","ARIEL","DADAP","T.","Male","Married","","","","","04-1690743-8","010515066891","101001946954","","","","","2024-05-04 10:50:29");
INSERT INTO employees VALUES("149","681071","JOSEPHINE","DATU","W","Female","Married","","","","","02-3700980-3","","121161723458","","","","","2024-05-04 10:51:22");
INSERT INTO employees VALUES("150","681035","CARLO","DE LEON","CARREON","Male","Married","0956-513-3368","","","MERCADO MAGONOY, BULACAN","01-2949863-2","","","770-300-777-000","","","","2024-05-04 10:51:58");
INSERT INTO employees VALUES("151","681063","JAYPE","DE LEON","L.","Male","Married","","","","","02-3507486-9","","121133061365","","","","","2024-05-04 10:52:59");
INSERT INTO employees VALUES("152","680594","LEONARDO","DE VERA","F.","Male","Married","","","","","33-5142243-1","","140000233521","","","","","2024-05-04 10:53:40");
INSERT INTO employees VALUES("153","680743","HENRY","DEALAGDON",".","Male","Married","","","","","02-2737122-4","","121060557654","","","","","2024-05-04 10:54:22");
INSERT INTO employees VALUES("154","678958","DENNIS","DEL ROSARIO","SALAMAT","Male","Married","","","","","34-0178568-8","","121140064647","","","","","2024-05-04 10:55:03");
INSERT INTO employees VALUES("156","680852","DELFIN","DELA CRUZ","S.","Male","Married","","","","","07-2069202-5","","121265316704","","","","","2024-05-04 10:56:29");
INSERT INTO employees VALUES("157","680392","EDILBERTO","DELA CRUZ","S.","Male","Married","","","","","33-2551200-5","","121097406304","","","","","2024-05-04 10:57:02");
INSERT INTO employees VALUES("158","681296","REYGAN","DELA CRUZ","ATON","Male","Single","09336677424","","","#304 KUWATRO KANTOS, PUROK 2 B. BAYAN, MALOLOS","33-6800606-0","02-050571594-3","","505-570-459-000","","","","2024-05-04 10:58:31");
INSERT INTO employees VALUES("159","680717","TEODORO","DELA CRUZ JR.","V.","Male","Married","","","","","33-7349554-3","","","","","","","2024-05-04 10:59:19");
INSERT INTO employees VALUES("160","680725","ALFREDO","DELA PASION","JR.","Male","Married","","","","BRGY. VILLA PAZ, GERONA, TARLAC","02-1914146-2","07-050391017-7","121144268758","481397194","","","","2024-05-04 11:00:02");
INSERT INTO employees VALUES("161","678957","RODRIGO","DELA PEÑA JR.","S.","Male","Married","","","","","33-2413828-6","","121032493316","","","","","2024-05-04 11:01:24");
INSERT INTO employees VALUES("162","680632","REYMOND","DELA ROSA","DAVID","Male","Married","0948-416-4669","","","MABILOG CONCEPCION, TARLAC","02-1919114-0","07-201413239-3","1040-0314-3463","307-543-003","","","","2024-05-04 11:01:56");
INSERT INTO employees VALUES("163","680030","CRISINNIE","DELOS REYES","C.","Male","Married","","","","","33-7764626-2","","121268949027","","","","","2024-05-04 11:03:11");
INSERT INTO employees VALUES("164","680452","EDWARD","DEOMAMPO","V.","Male","Married","","","","","04-1274016-5","","121033968243","","","","","2024-05-04 11:03:45");
INSERT INTO employees VALUES("165","679829","MARK CHRISTIAN","DESUACIDO","A.","Male","Married","","","","","34-5137482-9","","121216342279","","","","","2024-05-04 11:04:19");
INSERT INTO employees VALUES("166","679267","RENATO","DEVILA","Q.","Male","Married","","","","","08-0854889-0","","121197396776","","","","","2024-05-04 11:04:49");
INSERT INTO employees VALUES("167","679273","FRED","DIOSO","Y.","Male","Married","","","","","07-1661607-6","","","","","","","2024-05-04 11:05:39");
INSERT INTO employees VALUES("168","679279","MARK ANTHONY","DOMINGO","H.","Male","Married","","","","","33-8796943-4","","121189622100","","","","","2024-05-04 11:06:53");
INSERT INTO employees VALUES("169","678930","ARTEMIO","DOMINGO JR.","S.","Male","Married","","","","","33-2607712-5","","141000636960","","","","","2024-05-04 11:07:24");
INSERT INTO employees VALUES("170","680981","JEFFREY","DORAN","M.","Male","Married","","","","","01-2334341-1","","121144091961","","","","","2024-05-04 11:07:56");
INSERT INTO employees VALUES("171","681424","RAMIL","ECALNIR","E.","Male","Married","","","","","33-0310510-4","","","","","","","2024-05-04 11:08:32");
INSERT INTO employees VALUES("172","681031","GINA MAE","ELLO","P.","Female","Married","","","","","35-1189604-3","","","","","","","2024-05-04 11:09:14");
INSERT INTO employees VALUES("173","680763","JANO","ENAR","C.","Male","Married","","","","#9 PUROK, SAN JOSE, SAN FERNANDO CITY, PAMPANGA","34-7245222-5","112017408570","121219389293","483462636","","","","2024-05-04 11:10:06");
INSERT INTO employees VALUES("174","679283","DARELL","ENOJA","ARCA","Male","Married","","","","","02-0977885-8","","121040492472","","","","","2024-05-04 11:10:33");
INSERT INTO employees VALUES("175","678932","EDMUND","ENTILA","D.","Male","Married","","","","DOÑA CONSOLACION, MALHACAN, MEYCAUAYAN CITY, BULACAN","33-1002287-2","","","","","","","2024-05-04 11:11:50");
INSERT INTO employees VALUES("178","679288","DANILO","ESPAÑOLA JR.","A.","Male","Married","","","","","34-1538942-3","212522187639","121166940202","","","","","2024-05-04 11:13:57");
INSERT INTO employees VALUES("179","678933","RIZALDY","ESPEJO","M.","Male","Married","","","","","33-6449199-6","","141000630354","","","","","2024-05-04 11:14:52");
INSERT INTO employees VALUES("180","680918","CYNTHIA","ESPINOSA",".","Female","Married","","","","","02-3667930-2","","121128333926","","","","","2024-05-04 11:15:23");
INSERT INTO employees VALUES("181","679289","DANILO","ESPINOSA","D.","Male","Married","","","","","33-1593912-2","","121190988890","","","","","2024-05-04 11:15:59");
INSERT INTO employees VALUES("182","680577","HIPOLITO","ESTEBAN","S.","Male","Married","","","","Paniqui, Tarlac
","02-1404101-7","020509304212","121088210425","427836809","","","","2024-05-04 11:16:39");
INSERT INTO employees VALUES("183","681399","NOEL","EUGENIO",".","Male","Married","","09229467474","","","33-2870081-4","070502896537","141000121555","235402289","","","","2024-05-04 11:17:11");
INSERT INTO employees VALUES("184","680634","ORLANDO","FABROS","GUZMAN","Male","Married","","09107982175","","BATANG-BATANG, VICTORIA, TARLAC","33-7845631-2","072014776231","121068756572","","","","","2024-05-04 11:17:46");
INSERT INTO employees VALUES("185","678934","LAURO","FAGUTAO JR.","C.","Male","Married","","","","","33-8531844-3","","121069148271","","","","","2024-05-04 11:18:20");
INSERT INTO employees VALUES("186","679296","ALBERTO","FAMISAN","P.","Male","Married","","","","","33-3543131-2","","121101766727","","","","","2024-05-04 11:18:48");
INSERT INTO employees VALUES("187","681357","ALADIN","FERNANDEZ","PEREZ","Male","Married","0909-442-6753","","","#318 RD 2, BRGY. MATAGDEM, SAN CARLOS CITY, PANGASINAN","02-3817017-1","05-201034096-9","1211-3545-3199","377-309-290-000","","","","2024-05-04 11:20:02");
INSERT INTO employees VALUES("188","681398","NORBERTO","FERRER","T","Male","Married","","","","","33-1272361-4","070500433386","106001786892","","","","","2024-05-04 11:20:59");
INSERT INTO employees VALUES("189","681110","DUSTIN","FISCHER","U","Male","Married","09067221681","","","","33-2464075-8","","121284319309","","","","","2024-05-04 11:21:41");
INSERT INTO employees VALUES("190","678982","BONIFACIO","FLAMEÑO","M.","Male","Married","","","","","34-0278986-1","","121121698130","","","","","2024-05-04 11:22:16");
INSERT INTO employees VALUES("191","681308","CRISANTO","FLORES","E.","Male","Married","","","","","34-2318521-1","","","","","","","2024-05-04 11:23:12");
INSERT INTO employees VALUES("192","679679","MANUEL","FLORES JR.","RAMOS","Male","Married","","","","","01-1401220-1","","121189517335","","","","","2024-05-04 11:23:52");
INSERT INTO employees VALUES("193","679308","MARK","FORIO","LIMOS","Male","Married","","","","","04-2155289-4","","121034065712","","","","","2024-05-04 11:24:22");
INSERT INTO employees VALUES("194","680168","ZEBEDIE","FRANCISCO","L.","Male","Married","","","","","33-9043338-4","","109001287331","","","","","2024-05-04 11:24:57");
INSERT INTO employees VALUES("195","678983","CHRISTOPHER","FRUTO","F.","Female","Married","","","","","33-5228691-9","","","","","","","2024-05-04 11:25:38");
INSERT INTO employees VALUES("196","680064","JOVEN","FUENTES",".","Male","Married","","","","","","","","","","","","2024-05-04 11:26:10");
INSERT INTO employees VALUES("197","680567","RANDY","GACES","BORLA","Male","Married","","","","FILOMENA SUBD. SAN RAFAEL CITY, TARLAC","33-2472308-6","02-050930427-1","106001857630","","","","","2024-05-04 11:27:03");
INSERT INTO employees VALUES("198","680836","BRIAN","GALANG","SERAFINO","Male","Married","","","","","34-6553018-3","","121272615721","","","","","2024-05-04 11:27:33");
INSERT INTO employees VALUES("199","680761","ROSENDO","GALOLO","QUIRONG","Male","Married","","","","","33-3614710-0","","106000839306","","","","","2024-05-04 11:28:19");
INSERT INTO employees VALUES("200","680578","JONATHAN","GAMBOL","GABALEO","Male","Married","0997-107-3255","","","PUROK 4 BRGY. ANUNAS, ANGELES CITY, PAMPANGA","02-1451989-5","19-052401117-8","1060-0184-5704","420-330-972-000","","","","2024-05-04 11:28:48");
INSERT INTO employees VALUES("201","681366","JOHN BENEDICT","GARCIA","PANGILINAN","Male","Single","09302094775","","","LIAS, MARILAO, BULACAN","34-4597579-7","010520066042","121134990752","470-543-801","","","","2024-05-04 11:29:55");
INSERT INTO employees VALUES("202","679321","RICHARD REY","GARCIA","S.","Male","Married","","","","","33-9330132-9","","121166837981","","","","","2024-05-04 11:30:29");
INSERT INTO employees VALUES("203","678987","JUPITER","GASPAR","V.","Male","Married","","","","","33-5126737-9","","141000625757","","","","","2024-05-04 11:31:03");
INSERT INTO employees VALUES("204","681139","JORGE","GATUZ","CRUZ","Male","Married","","09357977530","","ANGAT, BULACAN","33-4196806-0","030505320308","121040579159","214956309000","","","","2024-05-04 11:31:29");
INSERT INTO employees VALUES("205","680607","GEORGE","GAYLA","MAREGMEN","Male","Single","0936681079","","","TARLAC","04-1951578-8","0720115594269","121096578591","","","","","2024-05-04 11:31:55");
INSERT INTO employees VALUES("206","678988","ROEM","GEQUINTO","E.","Male","Married","","","","","34-2242667-0","","121167863035","","","","","2024-05-04 11:32:25");
INSERT INTO employees VALUES("207","678992","IAN","GINES","LAYA","Male","Married","0929-300-2991","","","ALAMINOS, PANGASINAN","34-2513599-7","21-050163521-3","1210-3237-8395","","","","","2024-05-04 11:33:03");
INSERT INTO employees VALUES("208","680899","OMAR","GOROSPE","D.","Male","Married","","","","","","","","","","","","2024-05-04 11:36:56");
INSERT INTO employees VALUES("209","681093","ANTHONY","GOTICO","M.","Male","Married","","","","","","","121021013081","","","","","2024-05-04 11:38:52");
INSERT INTO employees VALUES("210","680814","NICK","GRAGASIN","F.","Male","Married","","","","","02-2166135-4","","121267480553","","","","","2024-05-04 11:42:49");
INSERT INTO employees VALUES("211","680771","ROGER","GRAGASIN JR.","G.","Male","Married","","","","","","","","","","","","2024-05-04 11:46:34");
INSERT INTO employees VALUES("212","679332","GEPSON","GRUMAL ","A","Male","Married","","","","","33-4681111-2","","121189516125","","","","","2024-05-04 12:58:07");
INSERT INTO employees VALUES("213","678994","MICHAEL","GUEVARRA","BANGIT","Male","Married","","","","","33-1945103-3","","121122800351","","","","","2024-05-04 12:59:05");
INSERT INTO employees VALUES("214","680205","MICHAEL ANTHONY","GUEVARRA","ANDRES","Male","Married","","","","","34-5257570-8","","121168928522","","","","","2024-05-04 13:00:03");
INSERT INTO employees VALUES("215","680433","RUDEN","HABITAN","GRUESO","Male","Married","","","","","04-3530468-5","","121140210510","","","","","2024-05-04 13:00:46");
INSERT INTO employees VALUES("216","680492","RONILLO","HERNANDEZ","M","Male","Married","","","","","33-7150503-7","","","","","","","2024-05-04 13:01:42");
INSERT INTO employees VALUES("217","678973","ROMEO","HERRERA","S.","Male","Married","","","","","03-8103397-4","","141000629265","","","","","2024-05-04 13:02:06");
INSERT INTO employees VALUES("218","681355","ALBERT","HINAYON","PIASAN","Male","Married","","09553179815","","","34-6908419-8","02-051201311-3","12104030130","396821239","","","","2024-05-04 13:02:42");
INSERT INTO employees VALUES("219","679341","MARLON","HIPOLITO","G.","Male","Married","","","","","33-1851305-3","","121038990503","","","","","2024-05-04 13:03:10");
INSERT INTO employees VALUES("220","678972","CARLO","IBAÑEZ","A.","Male","Married","","","","","33-9008272-2","","121145256013","","","","","2024-05-04 13:03:57");
INSERT INTO employees VALUES("221","680623","CHRISTOPHER","IGLAMO","PERALTA","Male","Single","","","","TALEGA, NORTE MONCADA, TARLAC","02-3891892-2","030513040500","121149003379","730812711","","","","2024-05-04 13:04:24");
INSERT INTO employees VALUES("222","680573","TORIBIO","IGLAMO","CANTA","Male","Married","","09122227496","","","02-1710452-4","07-060551446-9","106008155275","","","","","2024-05-04 13:04:52");
INSERT INTO employees VALUES("223","679061","ROWELL","IGNACIO","P.","Male","Married","","","","","","","","","","","","2024-05-04 13:05:53");
INSERT INTO employees VALUES("224","680569","ANTONIO","ITAY","M.","Male","Married","","","","","02-1351392-8","190524011860","106001845835","132071729","","","","2024-05-04 13:06:37");
INSERT INTO employees VALUES("225","680633","REYNALDO","JACALA","D.","Male","Married","","","","","02-3295629-4","030510336077","121083977122","713167625","","","","2024-05-04 13:07:09");
INSERT INTO employees VALUES("226","681400","JASON","JAVIER","C.","Male","Married","","","","","33-5132464-9","070503671709","121010114903","231421245","","","","2024-05-04 13:07:51");
INSERT INTO employees VALUES("227","678997","HENRY","JISON JR.","M.","Male","Married","","","","","33-0469472-4","","141000621439","","","","","2024-05-04 13:08:22");
INSERT INTO employees VALUES("228","681352","ARNOLD","LABASAN","B.","Male","Married","","","","","","","","","","","","2024-05-04 13:09:04");
INSERT INTO employees VALUES("229","680969","DONALD","LABASAN","ODIVALAS","Male","Married","","09467690695","","SITIO PANTAY, SAN JOSE, PAOMBONG, BULACAN","09-1804870-6","072013764191","121230464456","381796342","","","","2024-05-04 13:09:28");
INSERT INTO employees VALUES("230","679327","MICHAEL","LACSON","TEGARDA","Male","Married","","","","","34-1763022-2","","121119552747","","","","","2024-05-04 13:10:06");
INSERT INTO employees VALUES("231","681150","JAYSON","LADRINGAN","A.","Male","Married","","","","","02-2303277-4","","121192048100","","","","","2024-05-04 13:10:36");
INSERT INTO employees VALUES("232","678998","CHRISTOPHER","LAGARDE","ARANETA","Male","Married","","","","","34-00036745-0","","141000628666","","","","","2024-05-04 13:11:29");
INSERT INTO employees VALUES("233","679000","JERICO","LAGARDE","ARANETA","Male","Married","","","","","33-5835246-5","","141000627233","","","","","2024-05-04 13:11:57");
INSERT INTO employees VALUES("234","681207","RONALD","LAGAZON","MONTOYA","Male","Married","","","","","02-2155959-2","","121212889154","","","","","2024-05-04 13:12:27");
INSERT INTO employees VALUES("235","681360","JOLITO","LAGON","S.","Male","Married","","","","","02-3836735-3","","","","","","","2024-05-04 13:12:56");
INSERT INTO employees VALUES("236","680752","GEORGE","LARCE","L.","Male","Married","","","","","02-0975639-1","","","","","","","2024-05-04 13:13:31");
INSERT INTO employees VALUES("237","680604","DARYL","LAURENTE","PANTIG","Male","Married","","","","STA. LUCIA, LUBAO, PAMPANGA","02-3398572-7","07-025596220-3","","428050169000","","","","2024-05-04 13:14:17");
INSERT INTO employees VALUES("238","681109","MARSAN","LAVAROZA","REYES","Male","Married","","","","","02-1825765-8","","121133093925","","","","","2024-05-04 13:15:01");
INSERT INTO employees VALUES("239","681172","ARNOLD","LEONGSON","FAJARDO","Male","Married","","09335780612","","Coloong, Malanday, Valenzuela City","33-7356525-3","01-051672397-7","121148238451","435-235-413-000","","","","2024-05-04 13:15:36");
INSERT INTO employees VALUES("240","681340","GLEN","LOPEZ","M.","Male","Married","","","","","02-1754353-8","","","","","","","2024-05-04 13:16:28");
INSERT INTO employees VALUES("241","679002","RYAN GLENN","LOPEZ","IGLESIA","Male","Married","","","","0118 RIZAL ST. SAN SEBASTIAN, HAGONOY, BULACAN","34-2530397-8","","121173724591","","","","","2024-05-04 13:16:55");
INSERT INTO employees VALUES("242","679387","ALLAN","MABAGA ","S.","Male","Married","","","","","08-0943407-1","","141000623861","","","","","2024-05-04 13:17:39");
INSERT INTO employees VALUES("243","680537","NELSON","MACABUHAY","BIBAS","Male","Married","","","","","02-3980339-5","","121164597413","","","","","2024-05-04 13:18:11");
INSERT INTO employees VALUES("244","680316","MARK ANTHONY","MACALDO",".","Male","Married","","","","","","","","","","","","2024-05-04 13:18:55");
INSERT INTO employees VALUES("245","680761","GERONIMO","MACALMA JR.","SANTIAGO","Male","Married","09262928221","09282928221","","SAN JOSE, SAN FERNANDO, PAMPANGA","02-2389528-8","03-050981976-5","0070-941778-11","260-770-587-000","","","","2024-05-04 13:19:29");
INSERT INTO employees VALUES("246","680616","JEFFREY","MACASPAC","MANUEL","Male","Married","0936-524-6258","","","PAMPANGA","02-2820715-1","070-508-555-804","914-356-740-356","29463178500","","","","2024-05-04 13:20:06");
INSERT INTO employees VALUES("247","680997","JAYSON","MADLANGSAKAY","GREGORIO","Male","Married","","","","#161 GUMAMELA ST. PEREZ, MEYCAUAYAN CITY, BULACAN","34-1775197-8","","121217436695","","","","","2024-05-04 13:20:40");
INSERT INTO employees VALUES("248","679392","MARCELO","MAGALING","M.","Male","Married","","","","","33-0133723-3","","","","","","","2024-05-04 13:21:15");
INSERT INTO employees VALUES("249","679003","NOLE","MAGBANUA","DELA CALZADA","Male","Married","","","","","07-1697130-0","","121076348394","","","","","2024-05-04 13:21:57");
INSERT INTO employees VALUES("250","680755","JUBE","MAITEM","GALGO","Male","Married","","09533556981","","BRGY. STA. TRINIDAD, ANGELES CITY","33-4284328-1","08-050978927-8","1210-4072-4355","309954087","","","","2024-05-04 13:22:31");
INSERT INTO employees VALUES("251","681354","JEMUEL","MALIJAO",".","Male","Married","","","","","35-1052639-2","18-251059949-8","121288002241","","","","","2024-05-04 13:23:08");
INSERT INTO employees VALUES("252","679005","NICKERSON","MANALAC","M.","Male","Married","","","","","","","140000454862","","","","","2024-05-04 13:24:23");
INSERT INTO employees VALUES("253","680459","RIZALDY","MANANGAN","A.","Male","Married","","","","","33-4027236-2","","121045367301","","","","","2024-05-04 13:24:59");
INSERT INTO employees VALUES("254","679006","ALFREDO","MANGADAP","NIETO","Male","Married","","","","","33-1886470-2","","141000631720","","","","","2024-05-04 13:25:34");
INSERT INTO employees VALUES("255","679403","JOE MARIE","MANGILIT","VELASCO","Male","Married","","","","","02-3297416-6","","121169355070","","","","","2024-05-04 13:26:08");
INSERT INTO employees VALUES("256","680386","ERNESTO","MANGUNE","CANOVA","Male","Married","","","","","","","121033329224","","","","","2024-05-04 13:27:09");
INSERT INTO employees VALUES("257","680535","DOLORES","MANINANG","M.","Female","Single","09155149951","","","SAN FERNANDO CITY, PAMPANGA","33-4940318-7","02-0505966077-9","1210-8285-9744","746-201-695-000","","","","2024-05-04 13:28:14");
INSERT INTO employees VALUES("258","679080","JOSE MARIO","MANLICLIC","MAGTOTO","Male","Married","","","","","02-1677700-4","","140001283835","","","","","2024-05-04 13:28:50");
INSERT INTO employees VALUES("259","680627","JOHN ERICK","MANUEL","TABIGNE","Male","Married","","","","","02-2322021-4","","121236776830","","","","","2024-05-04 13:29:20");
INSERT INTO employees VALUES("260","679008","VIC","MARASIGAN","L.","Male","Married","","","","","","","","","","","","2024-05-04 13:30:10");
INSERT INTO employees VALUES("261","680956","RYAN  ","MARBEBE","R","Male","Married","","","","","02-3320855-6","","","","","","","2024-05-04 13:30:37");
INSERT INTO employees VALUES("262","680586","JERICO","MARCELO","DONATO","Male","Married","","","","","02-1629584-5","","121088970562","","","","","2024-05-04 13:31:14");
INSERT INTO employees VALUES("263","680549","MARIANO JR.","MARCELO JR.","DONATO","Male","Married","09085057208","","","PUROK GRIPO, STA. BARBARA VICTORIA, TARLAC","02-2163114-8","07-050634862-3","0061-8399-5206","419690731000","","","","2024-05-04 13:31:57");
INSERT INTO employees VALUES("264","678986","ROMEO","MARCIANO","LUSTERIO","Male","Married","","","","","03-8990335-2","","141000627489","","","","","2024-05-04 13:32:21");
INSERT INTO employees VALUES("266","680622","MANUEL","MARTINEZ","MACADANGDANG","Male","Married","","","","CARIÑO, PANIQUI, TARLAC","33-3106232-9","","121053769237","","","","","2024-05-04 13:34:16");
INSERT INTO employees VALUES("267","680571","WILLIAM","MARTINEZ","M.","Male","Married","","","","","01-1655169-2","0450050551","121096508103","","","","","2024-05-04 13:34:43");
INSERT INTO employees VALUES("268","681309","JIM RIAN","MATUGAS","G","Male","Married","","","","","34-3745598-2","","121160049034","","","","","2024-05-04 13:36:00");
INSERT INTO employees VALUES("269","681358","JOSE","MAYNIGO JR.","PALAGANAS","Male","Married","","","","","02-3502107-4","","121125966584","","","","","2024-05-04 13:36:34");
INSERT INTO employees VALUES("270","679416","ERMAN","MELANIO","C.","Male","Married","","","","","02-3472928-3","","121190911656","","","","","2024-05-04 13:37:15");
INSERT INTO employees VALUES("271","679419","EMER","MENDIZABAL","G.","Male","Married","","","","","02-1900561-8","","121098942184","","","","","2024-05-04 13:38:08");
INSERT INTO employees VALUES("272","680597","ADELMAR","MENDOZA","SAGABAEN","Male","Married","","0907139848","","BRGY. CARIÑO, PANIQUI, TARLAC","02-2024447-1","07-050616344-5","106001851283","273553444000","","","","2024-05-04 13:38:33");
INSERT INTO employees VALUES("273","679009","RODERICK","MENESES","CASTRO","Male","Married","","","","","33-4195517-0","04080422881-8","141000623372","243-815-656","","","","2024-05-04 13:39:10");
INSERT INTO employees VALUES("274","680620","ROEL","MEQUIN","C.","Male","Married","","09187833994","","Brgy. Quebiawan, San Fernando, Pampanga","02-1692895-0","01-050279415-4","121070237222","206654860","","","","2024-05-04 13:39:39");
INSERT INTO employees VALUES("275","681418","ELVIN","MERCADO","TULAO","Male","Married","","09335146287","","PASCUAL ST. BAYUGO, MEYCAUAYAN CITY, BULACAN","33-6330231-6","030504245779","107001726332","908482574","","","","2024-05-04 13:40:06");
INSERT INTO employees VALUES("276","680741","EDWIN","MESURADO","AMISTOSO","Male","Married","","","","","34-7008169-8","","121207559932","","","","","2024-05-04 13:41:27");
INSERT INTO employees VALUES("277","680611","DARWIN","MIRANDA ","DIAZ","Male","Married","0927-721-8028","","","BRGY. DEL PILAR, ZARAGOZA, NUEVA ECIJA","33-1543535-4","21-200060283-0","1210-6281-1491","494-415-210","","","","2024-05-04 13:42:11");
INSERT INTO employees VALUES("279","679680","JOE","MONCHING","DILLIA","Male","Married","","09357033533","","269 BANGA 1ST, PLARIDEL, BULACAN","34-6001111-5","","","","","","","2024-05-04 13:43:53");
INSERT INTO employees VALUES("280","681419","ALLEN","MONTEROYO","P.","Male","Married","","","","","33-4941885-5","020257308880","1210723261","478774515000","","","","2024-05-04 13:44:30");
INSERT INTO employees VALUES("281","681379","ALVIN","MORALES","C","Male","Married","","","","","04-3960257-4","","","","","","","2024-05-04 13:44:58");
INSERT INTO employees VALUES("283","680195","RONILO","MURALLA","BACHOCO","Male","Married","","","","","02-3251837-3","","121023143781","","","","","2024-05-04 13:46:43");
INSERT INTO employees VALUES("284","678989","ISRAEL","MUSNI","SIBUG","Male","Married","","","","","02-2155189-1","","121190119372","","","","","2024-05-04 13:47:11");
INSERT INTO employees VALUES("285","680567","EDGAR","NABARTEY JR.","DELA TORRE","Male","Single","09957459586","","","SAN FERNANDO, PAMPANGA","34-2617551-6","030508898750","915317947612","","","","","2024-05-04 13:47:45");
INSERT INTO employees VALUES("286","681066","HOWELL","NAPERI","DELA CRUZ","Male","Married","","","","POBLACION, PLARIDEL, BULACAN","33-7743998-0","07-050535981-8","1210-7061-6746","261-237-974-000","","","","2024-05-04 13:49:07");
INSERT INTO employees VALUES("287","680649","ALEX ","NAVARRO","ABADIANO","Male","Married","","","","","34-0095335-6","","121113161000","","","","","2024-05-04 13:49:53");
INSERT INTO employees VALUES("288","679442","ARIEL","NAVARRO","SANTOS","Male","Married","","","","","02-2852642-1","","121068150102","","","","","2024-05-04 13:50:24");
INSERT INTO employees VALUES("289","679011","EDUARDO","NICDAO","PINEDA","Male","Married","","","","","02-2037274-1","","121081183449","","","","","2024-05-04 13:50:52");
INSERT INTO employees VALUES("290","681256","DERICK","NUNAG","S.","Male","Married","","","","","34-7334329-4","","","","","","","2024-05-04 13:51:45");
INSERT INTO employees VALUES("291","681409","JAYPEE","OCULAR",".","Male","Married","","","","","08-2455786-5","","","","","","","2024-05-04 13:52:22");
INSERT INTO employees VALUES("292","681322","ALEXANDER ","OGBAMIN","BAISA","Male","Married","","","","","33-8418879-7","","121205949969","","","","","2024-05-04 13:56:06");
INSERT INTO employees VALUES("293","679455","ANTHONY","OJANO","SABIDO","Male","Married","","","","","33-5790323-9","","121124496474","","","","","2024-05-04 13:56:38");
INSERT INTO employees VALUES("294","679454","AMOR","OMADTO","OGALESCO","Male","Married","","","","","33-4735986-7","","141000623883","","","","","2024-05-04 13:58:06");
INSERT INTO employees VALUES("295","681160","JOSE JAYCO","ORTENERO","INDUCIL","Male","Married","","","","","34-3122125-1","","121150877513","","","","","2024-05-04 13:58:49");
INSERT INTO employees VALUES("296","681299","RAFFY","ORTIZ",".","Male","Married","","","","","34-2844915-6","220001180630","121083142243","433401129000","","","","2024-05-04 13:59:51");
INSERT INTO employees VALUES("297","678998","RODOLFO","PAAÑO","ABINA","Male","Married","","","","","05-0508196-4","","121013975697","","","","","2024-05-04 14:00:26");
INSERT INTO employees VALUES("298","680572","JOMAR","PACIA","BOLEA","Male","Married","","","","DOLORES KABISIG, SAN FERNANDO, PAMPANGA","042384379-2","070510410287","121194009644","","","","","2024-05-04 14:01:44");
INSERT INTO employees VALUES("299","680582","VICTOR","PADILLA","D.","Male","Married","","","","","02-1334525-1","19-052401366-9","106001846172","146288394","","","","2024-05-04 14:02:27");
INSERT INTO employees VALUES("300","680208","PEDRO","PADUA","PAZ","Male","Married","","","","","03-7532048-6","","121015601945","","","","","2024-05-04 14:02:53");
INSERT INTO employees VALUES("301","678999","ROLANDO","PADUIT","DE JESUS","Male","Married","","","","","03-9610710-9","","121015618975","","","","","2024-05-04 14:05:44");
INSERT INTO employees VALUES("302","680812","LEON ","PAJIMOLIN","B.","Male","Married","","","","","02-3655488-3","","","","","","","2024-05-04 14:12:07");
INSERT INTO employees VALUES("303","679468","ROLLY","PALMA","TUYADANG","Male","Married","","","","","33-2609033-5","","141000641412","","","","","2024-05-04 14:13:04");
INSERT INTO employees VALUES("304","681310","PANGANORON","MELBEN","CUTIN","Male","Married","","","","","34-6665655-8","","121196136592","","","","","2024-05-04 14:14:27");
INSERT INTO employees VALUES("305","679001","JEFFREY","PANOY","B.","Male","Married","","","","","02-1547886-7","","","","","","","2024-05-04 14:15:05");
INSERT INTO employees VALUES("306","679002","LITO","PANOY","B.","Male","Married","","","","","03-7593978-3","","","","","","","2024-05-04 14:15:36");
INSERT INTO employees VALUES("307","680750","JEFFREY","PANZO","MANGABO","Male","Married","0912-780-9597","","","CALAYAAN, GERONA, TARLAC","02-2031156-6","0705067072233","106001869416","424620754000","","","","2024-05-04 14:16:24");
INSERT INTO employees VALUES("308","679477","LEONCIO"," PAPA","MONTAJES","Male","Married","","","","","03-8663960-3","","121191026753","","","","","2024-05-04 14:17:07");
INSERT INTO employees VALUES("309","680886","JOHNNY","PAQUIT","A","Male","Married","","","","","33-7276643-5","","","","","","","2024-05-04 14:17:56");
INSERT INTO employees VALUES("310","679480","RANDEL","PARABAS","BIAG","Male","Married","","","","","34-4058759-1","","121187452072","","","","","2024-05-04 14:18:29");
INSERT INTO employees VALUES("311","679013","JOEL","PARAON","PANAQUITON","Male","Married","","","","","34-2893532-7","","121122832645","","","","","2024-05-04 14:20:28");
INSERT INTO employees VALUES("312","680943","MARK ANTHONY","PASCO","PAGTALUNAN","Male","Married","","","","","02-3411651-1","","121151536855","","","","","2024-05-04 14:21:09");
INSERT INTO employees VALUES("313","680580","ISAGANI","PASCUA","A.","Male","Married","","","","","02-1856677-6","030508052227","107001092427","","","","","2024-05-04 14:21:33");
INSERT INTO employees VALUES("314","679484","CONRADO","PASCUAL","MIJARES","Male","Married","","","","","34-4336287-8","","121191036267","","","","","2024-05-04 14:22:08");
INSERT INTO employees VALUES("315","680618","JERRY","PASION","BAISA","Male","Married","","092137996747","","Cariño, Paniqui, Tarlac","02-1849969-4","072013580198","121109296151","713-967637-000","","","","2024-05-04 14:22:33");
INSERT INTO employees VALUES("316","681361","ERWIN","PATACSIL","U.","Male","Married","","","","","02-3374690-8","052008692386","12112045050","712236963","","","","2024-05-04 14:23:15");
INSERT INTO employees VALUES("317","681371","ANDY","PAULAR","Q","Male","Married","","","","","02-4929456-7","","","","","","","2024-05-04 14:23:37");
INSERT INTO employees VALUES("318","681101","JOVEN","PINEDA","CABANA","Male","Married","","","","","02-3464473-7","","121088844658","","","","","2024-05-04 14:24:49");
INSERT INTO employees VALUES("319","679015","SERGIO","PINEDA","ROSAS","Male","Married","","","","","03-9021695-7","","141000625769","","","","","2024-05-04 14:25:22");
INSERT INTO employees VALUES("320","679016","GUILLERMO","POLICARPIO","PASCUAL","Male","Married","","","","","33-3106744-7","","141000621239","159728290","","","","2024-05-04 14:26:13");
INSERT INTO employees VALUES("321","681353","ERNEST JOHN","POLLOSO","MALLARI","Male","Single","0906-935-1259","","","DAWE, MIMALIM, PAMPANGA","35-0204907-4","07-202337728-5","121280122905","","","","","2024-05-04 14:26:46");
INSERT INTO employees VALUES("322","680808","ROMEO","PORGATORIO","VERTUDAZO","Male","Married","","","","","09-1448215-4","","106001496567","","","","","2024-05-04 14:27:44");
INSERT INTO employees VALUES("323","680210","EDWIN","PORLAYAGAN","DOCUSIN","Male","Married","","","","","34-3125851-2","","121144340097","","","","","2024-05-04 14:28:33");
INSERT INTO employees VALUES("324","679018","JOVET","QUILANG","C.","Male","Married","","","","","34-3615209-5","210501544570","031215963202","450547996","","","","2024-05-04 14:30:37");
INSERT INTO employees VALUES("327","680847","RENANTE","RAMIREZ","VILLACAMPA","Male","Married","","","","","35-0304484-5","","121280863813","","","","","2024-05-04 14:39:45");
INSERT INTO employees VALUES("328","679019","ANTONINO","RAMOS","MARQUEZ","Male","Married","","","","","33-3551170-8","","141000641456","","","","","2024-05-04 14:41:38");
INSERT INTO employees VALUES("329","679077","APOLONIO","RAMOS","ANILA","Male","Married","","09168223134","","PHASASE 1 NORTHVILLE 7, GUIGUINTO, BULACAN","","","141000622895","","","","","2024-05-04 14:47:00");
INSERT INTO employees VALUES("330","679518","MARVIN","RAMOS","P.","Male","Married","","","","","02-2175212-4","","","","","","","2024-05-04 14:47:32");
INSERT INTO employees VALUES("331","679527","EDGAR","REFUERZO","BUSTILLO","Male","Married","","","","","34-1161463-9","","121191109357","","","","","2024-05-04 14:58:00");
INSERT INTO employees VALUES("332","679529","EDGARDO","REGALA","CASAS","Male","Married","","","","","04-1148352-0","","121033265959","","","","","2024-05-04 14:58:34");
INSERT INTO employees VALUES("333","680628","MARIO","REGINALDO","GASPAIL","Male","Married","0946-157-2120","","","SAN ISIDRO, CAMILING, TARLAC","02-1706260-8","02-050940069-6","1211-5248-7405","429234191","","","","2024-05-04 14:59:14");
INSERT INTO employees VALUES("334","680432","ERIC","REVERENTE","BELANO","Male","Single","0906-623-5559","","","BRGY. SANTIAGO, PILAR SORSOGON","05-0711008-7","102018853040","1211-9997-8766","","","","","2024-05-04 14:59:57");
INSERT INTO employees VALUES("335","679531","ALVIN","REYES","TIGLAO","Male","Married","","","","","02-1838427-5","","121124581678","","","","","2024-05-04 15:00:35");
INSERT INTO employees VALUES("336","681034","MARVIN","REYES","BASTO","Male","Married","","","","","34-1006615-2","","105001538936","","","","","2024-05-04 15:03:49");
INSERT INTO employees VALUES("337","681095","ROLAND","REYES","MANAOG","Male","Single","0906-545-4211","","","SAGRADA, INGA CITY","33-8456503-5","","1211-2510-4903","","","","","2024-05-04 15:04:38");
INSERT INTO employees VALUES("338","679816","VIRGILIO","REYES","C.","Male","Married","","","","","","","","","","","","2024-05-04 15:05:09");
INSERT INTO employees VALUES("339","679538","FRANZEL","RILLORAZA","CRUZ","Male","Married","","","","","33-9855258-4","","      121143854313","","","","","2024-05-04 15:05:49");
INSERT INTO employees VALUES("341","681162","GERMAINE","RIVERA","FLORES","Male","Married","","","","","02-3397229-3","","121094152498","","","","","2024-05-04 15:07:47");
INSERT INTO employees VALUES("342","680591","JESSIE","ROMBAOA","OSOTEO","Male","Married","","","","","02-1844679-9","","121070659987","","","","","2024-05-04 15:08:54");
INSERT INTO employees VALUES("343","681187","ROLAND","SAAVEDRA","TEJEROS","Male","Married","","","","","34-2723793-2","","121154875059","","","","","2024-05-04 15:09:28");
INSERT INTO employees VALUES("344","680575","MARCOS","SAGABAEN","MACADANGDANG","Male","Married","","09479618868","","BRGY. CARIÑO, PANIQUI, TARLAC","02-0775930-3","11200000444599","106000062756","118411475","","","","2024-05-04 15:10:15");
INSERT INTO employees VALUES("345","680552","PATRICK","SAGUIT","MIRAVALLES","Male","Married","","","","","02-3413177-4","","121081268685","","","","","2024-05-04 15:10:38");
INSERT INTO employees VALUES("346","680731","REYNALDO","SALEM","S","Male","Married","","","","","02-2413142-5","","","","","","","2024-05-04 15:11:39");
INSERT INTO employees VALUES("347","679563","MARBEN","SALINAS","DOATIN","Male","Married","","","","","33-7482293-7","","121037957919","","","","","2024-05-04 15:12:15");
INSERT INTO employees VALUES("348","681239","ARNEL","SALVADOR","TAPULAO","Male","Married","","","","","01-1886237-6","","121308115091","","","","","2024-05-04 15:12:48");
INSERT INTO employees VALUES("349","681074","CASIMIRO","SALVADOR JR.","S.","Male","Married","","","","","33-7662824-9","","","","","","","2024-05-04 15:15:25");
INSERT INTO employees VALUES("350","679023","ALEX","SANCHEZ","GARCIA","Male","Married","","","","","34-1544215-3","","121122804824","","","","","2024-05-04 15:16:20");
INSERT INTO employees VALUES("352","680602","GEORGE","SAPUNGAY","BERBES","Male","Married","0910-137-0105","","","BAWA, GERONA, TARLAC CITY","02-1137744-1","","1210-6418-5138","271-978-764-000","","","","2024-05-04 15:17:42");
INSERT INTO employees VALUES("353","681359","RANDY","SAURA","MATABANG","Male","Married","","09518649898","","BRGY. PACALAT, MANGATAREM, PANGASINAN","33-7972005-0","02-049921530-5","121248203896","741294959","","","","2024-05-04 15:18:20");
INSERT INTO employees VALUES("354","680655","LARRY","SAURIN","OBNIQUE","Male","Married","","09368762497","","","33-6921177-3"," 070504405034","121068863155","248589670","","","","2024-05-04 15:18:47");
INSERT INTO employees VALUES("355","680993","RYAN","SENINING","CATAIN","Male","Married","","","","","34-1333026-7"," 080512471998","121059500585","","","","","2024-05-04 15:19:24");
INSERT INTO employees VALUES("356","681317","EVEMAR","SERRANO","QUIAMBAO","Male","Married","","","","","02-3638956-6","072015276348","121114355631","449963121000","","","","2024-05-04 15:20:06");
INSERT INTO employees VALUES("357","681339","ROWEL ","SIGOVIA","BELJERA","Male","Single","0953-055-4424","","","ABAR 1ST ZONE, 11-A SAN JOSE CITY, NUEVA ECIJA","02-4994316-4","02-027733133-1","1213-28666773-8","633-144-223","","","","2024-05-04 15:20:45");
INSERT INTO employees VALUES("358","680726","FRANCISCO","SIRINGAN","BARASI","Male","Married","09174745833","","","ALIBAGO, ENRILE CAGAYAN, CAGAYAN VALLEY","33-1567826-3"," 020501039102","106001173685","916853511","","","","2024-05-04 15:21:25");
INSERT INTO employees VALUES("359","680292","ROED","SISON",".","Male","Married","","","","","33-3568751-9","","","","","","","2024-05-04 15:21:50");
INSERT INTO employees VALUES("360","680082","EDDIE","SOCAYRE","ATACADOR","Male","Married","","","","","06-4026449-7"," 132514145419","121209577639","","","","","2024-05-04 15:22:21");
INSERT INTO employees VALUES("361","680643","EDGAR","SOCAYRE","ATACADOR","Male","Married","","","","","06-4026425-1"," 132017455390","121219659889","","","","","2024-05-04 15:22:46");
INSERT INTO employees VALUES("362","680948","HERMOGENES IV","SORIANO","LALATA","Male","Married","","","","","02-2450387-5"," 050501623412","129000304258","","","","","2024-05-04 15:23:15");
INSERT INTO employees VALUES("363","681261","ALEXANDER","SUMIN","E.","Male","Married","","","","","09-2485251-2","","","","","","","2024-05-04 15:23:51");
INSERT INTO employees VALUES("364","681082","CRISTIAN ED","SUMINTA","JAVIER","Male","Married","","","","","02-4439563-6"," 070259370033","121233261046","","","","","2024-05-04 15:24:29");
INSERT INTO employees VALUES("365","679022","RENIEL","TABORA","BARCELONA","Male","Married","","","","","33-8204128-9"," 070504938245","141000622362","","","","","2024-05-04 15:25:06");
INSERT INTO employees VALUES("366","680907","FRANCIS ","TADEJA","ROBERTO","Male","Married","","","","","34-3772055-2"," 030510826791","121167509943","","","","","2024-05-04 15:25:35");
INSERT INTO employees VALUES("367","680570","CHRISTOPHER","TATUALLA","TEOPE","Male","Single","0923-251-6725","","","#648 STIO DUNGAN, DEL CARMEN","33-5739843-3","07-050396129-4","1070-0209-7849","451-630-754","","","","2024-05-04 15:26:57");
INSERT INTO employees VALUES("368","680107","JOEL","TENEDERO","SACAY","Male","Married","","","","","33-6195439-7"," 210500918327","121216073747","","","","","2024-05-04 15:27:29");
INSERT INTO employees VALUES("369","680560","RENE","TOLENTINO","A.","Male","Married","","","","","02-1857053-9"," 020500153246","","","","","","2024-05-04 15:28:23");
INSERT INTO employees VALUES("370","681032","RIC ","TONOG","TOLENTINO","Male","Married","","","","","04-1390147-9"," 070506904194","121062630248","","","","","2024-05-04 15:29:11");
INSERT INTO employees VALUES("371","681348","GILBERT","TORIAGA","ZAMORA","Male","Single","09488328287","","","CADIZ CITY, NEGROSS OCIDENTAL","04-1969468-3","01-051831059-9","1211-0934-3188","388-415-212-000","","","","2024-05-04 15:29:38");
INSERT INTO employees VALUES("372","680445","EDGAR","TORINO","DOMINGUEZ","Male","Married","","","","","33-0070320-8"," 212004818986","121236808007","","","","","2024-05-04 15:30:01");
INSERT INTO employees VALUES("373","681265","JERIC ","TUAZON",".","Male","Married","","","","","35-2412283-0","21-0258934958","121318479703","624512140","","","","2024-05-04 15:31:02");
INSERT INTO employees VALUES("374","679616","NICOLAS","TURINGAN","B","Male","Married","","","","","33-4525262-0"," 210502261333","","","","","","2024-05-04 15:31:44");
INSERT INTO employees VALUES("375","679698","ARTHUR","VALENZONA","PILAPIL","Male","Married","","","","","03-8301704-0"," 210501971442","121124917046","","","","","2024-05-04 15:32:23");
INSERT INTO employees VALUES("376","679626","JEFFREY","VALENZUELA","M.","Male","Married","","","","","34-2165530-3"," 210500806138","","","","","","2024-05-04 16:00:00");
INSERT INTO employees VALUES("377","680589","WILSON","VALIX","MELCHOR","Male","Married","","","","CARIÑO, PANIQUI, TARLAC","02-09366515-1","19-090374236-8","1060-0186-3791","194-672-349","","","","2024-05-04 16:02:43");
INSERT INTO employees VALUES("378","679031","CHANDA","VERGARA","EUSEBIO","Male","Married","","","","","33-8547514-0"," 010506159690","109002671786","","","","","2024-05-04 16:10:58");
INSERT INTO employees VALUES("379","680615","ARIEL","VERZANO","LUMBA","Male","Married","","","","","33-2232007-0"," 190524015963","106001846559","","","","","2024-05-04 16:12:48");
INSERT INTO employees VALUES("380","680764","ROMEO","VICENTE","LINA","Male","Married","0919-389-5500","","","#225 CAINGIN, TABING ILOG , GUIMBA, NUEVA ECIJA","33-8813402-2","03-050385526-3","107001978022","259-917-700","","","","2024-05-04 16:25:37");
INSERT INTO employees VALUES("381","681183","MEIR","VIDUYA","N","Male","Married","","","","","33-7874639-4"," 190895551450","","","","","","2024-05-04 16:26:38");
INSERT INTO employees VALUES("382","679029","MARIO","VIERNES","BARTOLOME","Male","Married","","","","","02-1867043-9"," 210500540871","121031664109","","","","","2024-05-04 16:27:11");
INSERT INTO employees VALUES("383","681140","ALLAN","VIGARE","P.","Male","Married","","","","","02-2658592-7"," 020263075871","","","","","","2024-05-04 16:27:35");
INSERT INTO employees VALUES("384","681171","ROGER","VILLANGCA","AGA","Male","Single","0936-180-2966","","","BRGY. MAGMARALE, SAN MIGUEL, BULACAN","33-1546872-9","19-051280481-4","1210-7519-3265","","","","","2024-05-04 16:28:14");
INSERT INTO employees VALUES("385","680551","ISIDRO","VILLANUEVA JR.","TRINIDAD","Male","Married","","","","SAN ANTONIO, NUEVA ECIJA","33-1930542-2","190514875921","12107645640","204286575","","","","2024-05-04 16:29:15");
INSERT INTO employees VALUES("386","679642","REX","WAGIA","SAMBALANI","Male","Married","","","","","03-9902767-1"," 070500436296","141000641480","","","","","2024-05-04 16:30:04");
INSERT INTO employees VALUES("387","681192","ARTHURO","ZABLAN JR.","C.","Male","Married","","","","","34-5611227-7","012506271574","121166343571","365824118000","","","","2024-05-04 16:30:48");
INSERT INTO employees VALUES("388","679032","REYNALDO","ZARATE","ESTALILLO","Male","Married","","","","","33-6388397-4"," 210501219341","121018663860","","","","","2024-05-04 16:37:12");
INSERT INTO employees VALUES("389","680818","JUNE","ZERRUDO","DESLANTE","Male","Single","0936-772-4696","","","SAN JUAN, METRO MANILA","33-1690926-1"," 210256339034","1212-3445-1052","","","","","2024-05-04 16:39:51");
INSERT INTO employees VALUES("390","679898","LUIS KIVEN","ASTOR","CANARES","Male","Married","","","","","34-0523219-5"," 210250814237","121157401306","","","","","2024-05-07 14:02:15");
INSERT INTO employees VALUES("391","679199","REYNALDO","BUCAG","DAIZON","Male","Married","","","","","02-1209663-7"," 190517336215","121007967958","","","","","2024-05-07 14:04:31");
INSERT INTO employees VALUES("392","679798","RONNIE","CABUG","ROQUE","Male","Married","","","","","02-1609190-0"," 072016948668","121190917427","","","","","2024-05-07 14:06:49");
INSERT INTO employees VALUES("393","678651","EDWIN","CRUZ","DE GUZMAN","Male","Married","","","","","33-3579951-7"," 190896641070","121027701334","","","","","2024-05-07 14:11:59");
INSERT INTO employees VALUES("394","681081","DANILO","DELA CRUZ","D.","Male","Married","","","","","02-2473331-5"," 070254134250","","","","","","2024-05-07 14:13:50");
INSERT INTO employees VALUES("395","678956","LEOPOLDO","DELA CRUZ","RONQUILLO","Male","Married","","","","","03-7315012-4"," 070500432967","141000641268","","","","","2024-05-07 14:15:09");
INSERT INTO employees VALUES("396","679265","REYNALDO","DEPINA","ACELDO","Male","Married","","","","","33-3254046-8"," 210501382692","141000641279","","","","","2024-05-07 14:16:49");
INSERT INTO employees VALUES("397","678959","DENNIS","DUNGO","FERNANDEZ","Male","Married","","","","","33-3707406-5"," 190895528467","121075919660","","","","","2024-05-07 14:19:11");
INSERT INTO employees VALUES("398","678964","HIPOLITO","FERNANDEZ","MAMUYAC","Male","Married","","","","","02-1313104-1"," 070500433343","141000619073","","","","","2024-05-07 14:20:09");
INSERT INTO employees VALUES("399","678965","ROLAND","FEUDO","FERRANCO","Male","Married","","","","","33-9113749-8"," 030502794090","141000630977","","","","","2024-05-07 14:20:59");
INSERT INTO employees VALUES("400","679312","FEDERICO","GABE","UDTOHAN","Female","Married","","","","","02-0814916-1"," 070506035943","140001102693 ","","","","","2024-05-07 14:22:36");
INSERT INTO employees VALUES("401","680773","RONEL","LASIN","DOMDOM","Male","Married","","","","","04-1911815-6"," 070508441213","121054961648","","","","","2024-05-07 14:24:01");
INSERT INTO employees VALUES("402","681238","BENJAMIN","LAT","Y.","Male","Married","","","","","02-1073811-7"," 190504372433","","","","","","2024-05-07 14:25:04");
INSERT INTO employees VALUES("403","679378","RONALDO","LEGASPI","N.","Male","Married","","","","","03-9862870-9"," 072000201899","","","","","","2024-05-07 14:25:56");
INSERT INTO employees VALUES("404","681136","JUN","LOPEZ JR.","LABAO","Male","Married","","","","","07-4102128-3"," 210259180141","121173724591","","","","","2024-05-07 14:27:04");
INSERT INTO employees VALUES("405","678978","MELVIN","LUMANOG","MONTECLARO","Male","Married","","","","","02-2277034-1"," 210501327322","121033585281","","","","","2024-05-07 14:28:15");
INSERT INTO employees VALUES("406","679395","EDGAR","MAITIM","GALGO","Male","Married","","","","","33-17876827-7"," 190521284181","121197421498","","","","","2024-05-07 14:29:23");
INSERT INTO employees VALUES("407","678979","ARNEL","MALLARI","ISLA","Male","Married","","","","","03-9791615-3"," 050251554533","107002446755","","","","","2024-05-07 14:30:11");
INSERT INTO employees VALUES("408","681062","REGGIE","MAME","R.","Male","Married","","","","","34-4087535-5"," 010256713751","121178849101","","","","","2024-05-07 14:30:55");
INSERT INTO employees VALUES("409","678981","JUNDEE","MANGUNE","CANOVA","Male","Married","","","","","02-2954969-8"," 210501115783","121033329224","","","","","2024-05-07 14:31:59");
INSERT INTO employees VALUES("410","678982","RENATO","MANUEL","PANZO","Male","Married","","","","","03-7347715-3"," 210501258487","121033685703","","","","","2024-05-07 14:33:02");
INSERT INTO employees VALUES("411","680553","VERGEL","MERCULIO","L.","Male","Married","","","","","02-2175715-8"," 070505476814","","","","","","2024-05-07 14:34:23");
INSERT INTO employees VALUES("412","681420","MEINARD DANIEL","ODAVAL","A.","Male","Married","","","","","34-6110406-3"," 210254024990","","","","","","2024-05-07 14:35:24");
INSERT INTO employees VALUES("413","681254","CARLOS","OLIS JR.","M.","Male","Married","","","","","02-2922900-2"," 020508540753","","","","","","2024-05-07 14:36:42");
INSERT INTO employees VALUES("414","679000","RICHARD","PAGARIGAN","BAUTISTA","Male","Married","","","","","33-2558083-3"," 210501115767","141000634249","","","","","2024-05-07 14:37:42");
INSERT INTO employees VALUES("415","679470","JUVIMAR","PALTENG","LUCAS","Male","Married","","","","","02-3508838-9"," 062005898345","121096220203","","","","","2024-05-07 14:38:25");
INSERT INTO employees VALUES("416","679007","ALAIN","QUIAMBAO","SALISE","Male","Married","","","","","02-1304498-9","","121073139006","","","","","2024-05-07 14:40:03");
INSERT INTO employees VALUES("417","679744","BENJAMIN","RIVERA JR.","B.","Male","Married","","","","","33-3634614-7","","","","","","","2024-05-07 14:41:56");
INSERT INTO employees VALUES("418","679547","OLIVER","ROBLEADO","URBIS","Male","Married","","","","","01-1454153-6","","121009815114","","","","","2024-05-07 14:42:59");
INSERT INTO employees VALUES("419","680922","ACELEE","SAGUM","NOBLEJAS","Male","Married","","","","","02-1458582-9","","121095468352","","","","","2024-05-07 14:43:53");
INSERT INTO employees VALUES("420","679011","SONNY","SALAK","ANGELES","Male","Married","","","","","02-1704860-6","","141000623603","","","","","2024-05-07 14:44:41");
INSERT INTO employees VALUES("421","681040","ALBERTO","SALAZAR JR.","C.","Male","Married","","","","","03-9791146-2","","","","","","","2024-05-07 14:45:57");
INSERT INTO employees VALUES("422","679709","BENIGNO","SARMIENTO","CATACUTAN","Female","Married","","","","","02-2558731-1"," 030504731029","121070742372","","","","","2024-05-07 14:47:11");
INSERT INTO employees VALUES("423","679018","JOEL","SARMIENTO","PARUNGAO","Male","Married","","","","","02-2170232-3"," 070504262799","140000983908","","","","","2024-05-07 14:47:57");
INSERT INTO employees VALUES("424","681087","JAYSON","SAURANI","S.","Male","Married","","","","","05-1614146-6"," 102027624364","","","","","","2024-05-07 14:48:38");
INSERT INTO employees VALUES("425","680655","LARRY","SAURIN","OBNIQUE","Male","Married","","","","","33-6921177-3","","121068863155","","","","","2024-05-07 14:49:22");
INSERT INTO employees VALUES("426","681426","WESLEY","SEBASTIAN","DE LIMA","Male","Married","","","","","34-6849264-2"," 210254866436","121214053976","","","","","2024-05-07 14:50:55");
INSERT INTO employees VALUES("427","680806","JOHN ROMEL","TECSON","SANCHEZ","Male","Married","","","","","02-4440464-0"," 072524986826","121232117604","","","","","2024-05-07 14:52:50");
INSERT INTO employees VALUES("428","679609","MERVIN","TIOMICO","LOPEZ","Male","Married","","","","","02-2305233-0","","121191244398","","","","","2024-05-07 14:54:52");
INSERT INTO employees VALUES("429","679029","BEJIE","VALDEZ","BEDALLO","Male","Married","","","","","09-1207999-6"," 190518611627","141000623626","","","","","2024-05-07 14:56:35");
INSERT INTO employees VALUES("430","679631","REY","VELARDE","HERMOSA","Male","Married","","","","","34-1707376-6"," 030507608090","121097930383","","","","","2024-05-07 14:57:22");
INSERT INTO employees VALUES("431","679079","ORLANDO","VILLACARLOS","OROT","Male","Married","","","","","02-2789752-0"," 070506700726","121095136388","","","","","2024-05-07 14:58:18");
INSERT INTO employees VALUES("432","681372","RANDY","CHAVEZ",".","Male","Married","","","","","34-3206859-4","210252842165","121146982570","484805325000","","","","2024-05-08 08:50:00");
INSERT INTO employees VALUES("433","680970","ROMAR","CONSULTA","R.","Male","Married","","","","","34-9161013-2"," 102505668127","","","","","","2024-05-08 08:52:14");
INSERT INTO employees VALUES("434","680901","JEROME","CUNDAT","GABRIEL","Male","Married","","","","","","","121178449464","","","","","2024-05-08 08:53:39");
INSERT INTO employees VALUES("435","680854","MARVIN","DATILES","QUINTANA","Male","Married","","","","","33-2867211-7"," 030504370751","121041575877","","","","","2024-05-08 08:55:52");
INSERT INTO employees VALUES("436","681407","CHARLIE","DINO","ESTIPONA","Male","Married","","","","","34-5591253-3"," 020511853045","121169523509","","","","","2024-05-08 08:57:59");
INSERT INTO employees VALUES("437","680360","CESAR","ELANE","MANAHON","Male","Married","","","","","02-1323397-8"," 072000032663","121139063505","","","","","2024-05-08 08:59:06");
INSERT INTO employees VALUES("438","679975","MONETTE","FERNANDEZ","LAGAO","Male","Married","","","","","02-1776943-5"," 030255085987","121273167635","","","","","2024-05-08 09:00:04");
INSERT INTO employees VALUES("439","681065","MICHAEL","GABRIEL","ETCUBAÑAS","Male","Married","","","","","33-1520295-6"," 020502439643","107001072740","","","","","2024-05-08 09:01:25");
INSERT INTO employees VALUES("440","679582","REYNAND","SANTOS","ROXAS","Male","Married","","","","","34-4404397-6"," 210502088321","121191107383","","","","","2024-05-08 09:03:27");
INSERT INTO employees VALUES("441","679653","JHON ROBINSON","SORIAO","CUBE","Male","Married","","","","","02-3884083-8"," 070510233962","121191208472","","","","","2024-05-08 09:04:54");
INSERT INTO employees VALUES("442","681367","JOSEPH","TADLAS",".","Male","Married","","","","","08-3185768-4","21-025913609-6","121323077711","629670068","","","","2024-05-08 09:11:04");
INSERT INTO employees VALUES("443","681224","WINARD","TAPADO","MANILA","Male","Married","","","","","02-4766432-2"," 070261741820","121309023694","","","","","2024-05-08 09:11:57");
INSERT INTO employees VALUES("444","679830","REYNALDO","TOLEDO","M.","Male","Married","","","","","02-1751215-8"," 070505783563","","","","","","2024-05-08 09:13:32");
INSERT INTO employees VALUES("445","679619","MARK REINNO","UDANI","CELADA","Male","Married","","","","","02-2484774-8"," 070506882948","","","","","","2024-05-08 09:14:46");
INSERT INTO employees VALUES("446","681210","ROWEL","VELORIA","BALABA","Male","Married","","","","","33-1730254-0"," 190518005875","108001992570","","","","","2024-05-08 09:16:28");
INSERT INTO employees VALUES("447","679789","RICARDO","VILLACARLOS","OROT","Male","Married","","","","","02-2602640-2"," 070506421347","121095136388","","","","","2024-05-08 09:17:46");
INSERT INTO employees VALUES("448","680221","LIONEL","ILUSTRE","FLORES","Male","Married","","","","","02-2780228-5"," 072012155639","121182887335","","","","","2024-05-08 09:19:29");
INSERT INTO employees VALUES("449","681220","JACKSON","JAMON","C","Male","Married","","","","","02-1713103-4"," 030501578831","","","","","","2024-05-08 09:20:34");
INSERT INTO employees VALUES("450","679781","JOMMEL","JULIAN","ESTALILLA","Male","Married","","","","","34-1785227-5"," 210251288784","121197665496","","","","","2024-05-08 09:23:14");
INSERT INTO employees VALUES("451","680032","ARCEN","LLANOS","ALICIO","Male","Married","","","","","02-3393385-0"," 070508424394","121078408327","","","","","2024-05-08 09:26:23");
INSERT INTO employees VALUES("452","680312","RODOLFO","MANANSALA","DEMOCRITO","Male","Married","","","","","33-2247962-0"," 070253488407","121238384417","","","","","2024-05-08 09:36:27");
INSERT INTO employees VALUES("453","681428","MARK ANTHONY","MARQUEZ",".","Male","Married","","","","","","","","","","","","2024-05-08 09:38:29");
INSERT INTO employees VALUES("454","680120","RANDY","MENDOZA","SEBASTIAN","Male","Married","","","","","34-2408787-1"," 210500797252","121102967117","","","","","2024-05-08 09:39:26");
INSERT INTO employees VALUES("455","678991","MELCHOR","MUSNI","SIBUG","Male","Married","","","","","02-3493679-1"," 210502017998","121197467445","","","","","2024-05-08 09:41:40");
INSERT INTO employees VALUES("456","681142","MANUEL","NARTIA","P.","Male","Married","","","","","","","","","","","","2024-05-08 09:42:14");
INSERT INTO employees VALUES("457","681227","SIDNEY","PABLEO","GALIBOT","Male","Married","","","","","34-6633671-3"," 010263920991","121300593116","","","","","2024-05-08 09:42:51");
INSERT INTO employees VALUES("458","681292","RONNIE","PAMINTUAN","M.","Male","Married","","","","","02-3508838-9","","","","","","","2024-05-08 09:43:40");
INSERT INTO employees VALUES("459","681052","RICHARD","PARDO","MENDOZA","Male","Married","","09207860423","","MUZON SAN JOSE DEL MONE, BULACAN","34-5375888-3","","121153947686","1333136767000","","","","2024-05-08 09:44:46");
INSERT INTO employees VALUES("460","681017","CHRISTIAN","PORTERIA","ARLANTE","Male","Married","","","","","02-3922944-5","","121152378451","","","","","2024-05-08 09:46:02");
INSERT INTO employees VALUES("461","681303","HERALD","QUILANA","LOPEZ","Male","Married","","","","","02-2780719-6","","121116221759","","","","","2024-05-08 09:46:36");
INSERT INTO employees VALUES("462","680342","LITO","REGACHO","BALETE","Male","Married","","","","","02-2960901-7","","121220893938","","","","","2024-05-08 09:47:51");
INSERT INTO employees VALUES("463","681015","MARLON","BRAZAL JR.","OGUIS","Male","Married","","","","","34-6687629-9"," 070510808116","121200935056","","","","","2024-05-08 10:04:39");
INSERT INTO employees VALUES("464","681231","JOSEPH","DACAS","PACHECO","Male","Married","","","","","02-2338197-5"," 070505053085","121068058971","","","","","2024-05-08 10:17:57");
INSERT INTO employees VALUES("465","681350","KING","ALEJO","R.","Male","Married","","","","","02-4023782-4"," 070257850755","","","","","","2024-05-08 11:39:44");
INSERT INTO employees VALUES("466","681169","DANTE","ALVARAN",".","Male","Married","","","","","33-2122372-5"," 070507232815","","","","","","2024-05-08 11:41:38");
INSERT INTO employees VALUES("467","680754","DANNY","BABAO","SILVA","Male","Married","","","","","03-7609624-3"," 190505927633","106001864822","","","","","2024-05-08 11:51:07");
INSERT INTO employees VALUES("469","681394","ERWIN","COLLADO","D","Male","Married","","","","","34-8625713-1"," 072017073614","","","","","","2024-05-08 12:02:52");
INSERT INTO employees VALUES("470","679728","ROGELIO","MAÑOZO","E.","Male","Married","","","","","03-8534125-1","","","","","","","2024-05-08 13:24:29");
INSERT INTO employees VALUES("471","678988","RODOLFO","MASICLAT","ZAPANTA","Male","Married","","","","","03-9592676-3"," 072010595631","109001523734","","","","","2024-05-08 13:29:57");
INSERT INTO employees VALUES("472","680680","RICARDO","MENDEZ","LABASAN","Male","Married","","","","","34-6314980-6"," 030262545721","121184303568","","","","","2024-05-08 13:33:14");
INSERT INTO employees VALUES("473","680916","MARK BRANDY","UBALDO","AQUINO","Male","Married","","","","","02-3232472-9"," 020264631980","121143247889","","","","","2024-05-08 13:55:39");
INSERT INTO employees VALUES("474","681440","BERNARDO","ABRAZADO",".","Male","Married","","","","",""," 072531092806","","","","","","2024-05-08 13:58:13");
INSERT INTO employees VALUES("475","681375","MONCHING","ALEJO","BAGANG","Male","Married","","","","","02-3581823-2","","121246465578","","","","","2024-05-08 14:01:47");
INSERT INTO employees VALUES("477","681439","GERALDO","DUATIN","NALOS","Male","Married","","","","","02-2348984-8"," 190260899140","121088625549","","","","","2024-05-08 14:15:37");
INSERT INTO employees VALUES("478","681434","WILBERT ","ESPERANZA","PENAFLORIDA","Male","Married","","","","","33-8655971-9"," 080510318297","121173957286","","","","","2024-05-08 14:17:10");
INSERT INTO employees VALUES("479","680468","ANGELITO","FLORENTINO","CABUJAT","Male","Married","","","","","33-3279851-1"," 070250597086","121041005496","","","","","2024-05-08 14:20:23");
INSERT INTO employees VALUES("480","680942","ROCKY GRINGO","GANADO","BUGARIN","Male","Married","","","","","02-3746869-3"," 070256986653","121161782342","","","","","2024-05-08 14:21:50");
INSERT INTO employees VALUES("481","681438","JEFFREY","GARCIA","CABOTE","Male","Married","","","","","02-3943913-8"," 050502813835","121165894266","","","","","2024-05-08 14:23:06");
INSERT INTO employees VALUES("482","681067","ALVIN","GAVICA","DE CHAVEZ","Male","Married","","","","","34-3999900-6"," 010518589348","","","","","","2024-05-08 14:27:59");
INSERT INTO employees VALUES("484","681050","PAZ","PETALONA","TACOGUE","Female","Married","","","","","02-4015290-9","","121169845786","","","","","2024-05-08 14:54:19");
INSERT INTO employees VALUES("485","681344","ALBERTO","PETINES","V","Male","Married","","","","","02-2390048-2","","","","","","","2024-05-08 14:55:24");
INSERT INTO employees VALUES("486","680640","JOEY","RAMIREZ","L.","Male","Married","","","","","02-1593587-6","050501203448","121116061833","712703111","","","","2024-05-08 14:56:29");
INSERT INTO employees VALUES("487","679876","JAY","REYES","PURIFICACION","Male","Married","","","","#259 BOROL 2ND, BALAGTAS, BULACAN","02-4160643-8","","       121198774168","","","","","2024-05-08 14:58:08");
INSERT INTO employees VALUES("488","680609","GOMER","RIPARIP","R.","Male","Married","","","","","02-0981839-4","050501953498","106001855534","","","","","2024-05-08 14:58:53");
INSERT INTO employees VALUES("489","681331","LEVY","RIVERA","M","Male","Married","","","","","02-2943460-6","","","","","","","2024-05-08 15:04:55");
INSERT INTO employees VALUES("490","681319","ALJAY","SANTOS","N","Male","Married","","","","","02-4551968-6"," 070259756101","","","","","","2024-05-08 15:22:27");
INSERT INTO employees VALUES("491","681413","MARVIN","SANTOS","SAGUM","Male","Married","","","","","02-2797073-5"," 072013468568","121054963992","","","","","2024-05-08 15:42:42");
INSERT INTO employees VALUES("492","681332","MARK ANTHONY","TIABA","A","Male","Married","","","","","02-4468527-8"," 070260687733","","","","","","2024-05-08 15:48:04");
INSERT INTO employees VALUES("493","680967","ROBIN","TRINIDAD","AQUINO","Male","Married","","","","","34-8484591-4"," 212513789871","121275404983","","","","","2024-05-08 15:50:36");
INSERT INTO employees VALUES("494","680559","FERNANDO","VELASCO","C.","Male","Married","","","","","33-1797866-0","07-050090049-9","107002095286","160171828","","","","2024-05-08 15:52:12");
INSERT INTO employees VALUES("495","679213","RODELIO ","CANGCO","RABE","Male","Married","","","","","02-1340731-9"," 070500719565","121159549211","","","","","2024-05-08 15:55:46");
INSERT INTO employees VALUES("496","678931","EDGARDO","ENRIQUEZ","ALCARAZ","Male","Married","","","","","03-9330409-9"," 070500433254","141000641300","","","","","2024-05-08 16:02:54");
INSERT INTO employees VALUES("497","678986","DONOVAN","GAN ","QUINTAYO","Male","Single","09231126924","","","BLK. 86 LOT 3, TURO, BOCAUE, BULACAN","33-0448338-8","19-000-512634-0","1410-0062-9242","469-961-341-000","","","","2024-05-08 16:05:40");
INSERT INTO employees VALUES("498","679010","RICARDO","MERCADO","YUTUC","Male","Married","","","","","06-1392593-8"," 130501510433","121095115885","","","","","2024-05-08 16:08:57");
INSERT INTO employees VALUES("499","679453","ROBERTO","NUQUI","CABRAL","Male","Married","","","","","34-1875421-7"," 210250365181","121031869918","","","","","2024-05-08 16:10:09");
INSERT INTO employees VALUES("500","679006","JOSE","PRECIOSA","MAGBANUA","Male","Married","","","","","03-9757975-2","","141000641434","","","","","2024-05-08 16:12:09");
INSERT INTO employees VALUES("501","679534","JOSE","REYES","YABES","Male","Married","","","","","03-8386314-2","","121036518702","","","","","2024-05-08 16:15:38");
INSERT INTO employees VALUES("504","679165","GENELITO","BALINAS","GUNDAO","Male","Married","","","","","07-1639413-6"," 190891584656","140001281359","","","","","2024-05-08 16:23:20");
INSERT INTO employees VALUES("505","679167","ELMER","BALUYO","DULCE","Male","Married","","","","","10-0608161-1"," 140500494561","121050659311","","","","","2024-05-08 16:25:11");
INSERT INTO employees VALUES("506","681184","FELIPE","CAPANAS","GARCIA","Male","Married","09334272171","","","","34-1886583-4","21-050133705-0","1211-72-353-9850","287-926-442-000","","","","2024-05-08 16:29:29");
INSERT INTO employees VALUES("507","681275","CHRISTOPHER","CORROS","BANTILLO","Male","Married","","","","","34-0154669-4"," 210501219260","121032501941","","","","","2024-05-08 16:31:51");
INSERT INTO employees VALUES("508","680148","REYNALDO","DRIS JR.","GAYOL","Male","Married","","","","",""," 190513236720","141000634216","","","","","2024-05-08 16:35:30");
INSERT INTO employees VALUES("509","678985","JOSELYN","GADUYON","JUMILLA","Male","Married","","","","","33-3780553-5"," 070500433548","141000619084","","","","","2024-05-08 16:40:28");
INSERT INTO employees VALUES("510","681108","JESUS","GARCIA","GUMARU","Male","Married","09333644885","","","#2084 SANTIAGO, FORTUNE-1, ISABELA","33-2558137-9","02-050803594-3","1211-1919-6783","902-491-686","","","","2024-05-08 16:41:24");
INSERT INTO employees VALUES("512","680544","EDUARDO","LEPARDO","ASAS","Male","Married","","","","",""," 190902792558","121068651807","","","","","2024-05-08 16:45:40");
INSERT INTO employees VALUES("513","680781","ROVILAN","NALON","LANGGONG","Male","Married","","","","",""," 172013474562","121124630834","","","","","2024-05-08 16:49:41");
INSERT INTO employees VALUES("514","679478","LARRY","PAQUERA","S.","Male","Married","","","","","","","","","","","","2024-05-08 16:51:30");
INSERT INTO employees VALUES("515","679482","GERARDO","PARIÑAS","DELA RAMA","Male","Married","","","","","","","121027505861","","","","","2024-05-08 17:04:15");
INSERT INTO employees VALUES("516","680758","EDGARD ","RESPICIO","A.","Male","Married","","","","","01-1820463-3","050501558823","106001705659","216683505000","","","","2024-05-08 17:07:43");
INSERT INTO employees VALUES("517","681038","MARIO","RODRIGUEZ","PONCION","Male","Married","","","","","","","121063137334","","","","","2024-05-08 17:12:26");
INSERT INTO employees VALUES("518","679575","EMMANUEL","SANTIAGO JR.","MAGTAKA","Male","Married","","","","COLOONG, VALENZUELA CITY","","","","","","","","2024-05-08 17:20:01");
INSERT INTO employees VALUES("519","680759","EDWIN","TOLENTINO","CAMPANO","Male","Married","09223663853","","","BLK. 12 LOT-45, TORDISILLAS ST. VILLA GRANDE, LAMBAKIN, MARILAO, BULACAN","01-0717843-7","05-2003261425","121081081995","120-374-751","","","","2024-05-08 17:21:17");
INSERT INTO employees VALUES("520","679033","JOVEL","VIDAL","MEMPIN","Male","Married","","","","",""," 210501646347","121122841003","","","","","2024-05-08 17:23:00");
INSERT INTO employees VALUES("521","679635","LEONARDO","VILLANGCA JR.","PASCUAL","Male","Married","","","","",""," 210501646347","121063116307","","","","","2024-05-08 17:23:52");
INSERT INTO employees VALUES("522","681450","JURICK","ALTAVANO",".","Male","Married","","","","",""," 020511119406","","","","","","2024-05-10 09:12:26");
INSERT INTO employees VALUES("523","681374","SHAWN MICHEL","ARCA",".","Male","Married","","","","","","","121179485322","","","","","2024-05-10 09:13:45");
INSERT INTO employees VALUES("524","681430","V.","BALDERAMA","P.","Male","Married","","","","",""," 070506914572","","","","","","2024-05-10 09:15:40");
INSERT INTO employees VALUES("525","681422","JEFFREY","BANDOLA","MENDEZ","Male","Married","","","","",""," 030255012955","121105979206","","","","","2024-05-10 09:16:27");
INSERT INTO employees VALUES("526","681395","HERMENIGILDO III","BASOS","MAGPAYO","Male","Married","","","","",""," 190251874453","121080195047","","","","","2024-05-10 09:17:55");
INSERT INTO employees VALUES("527","681427","KENNETH","BIAG",".","Male","Married","","","","",""," 210256792049","","","","","","2024-05-10 09:18:53");
INSERT INTO employees VALUES("528","681410","ARIEL","BISNAR",".","Male","Married","","","","",""," 102017407020","","","","","","2024-05-10 09:19:47");
INSERT INTO employees VALUES("529","681411","AUGUST JHON","BUOT","ORTRANO","Male","Married","","","","","","","121192411728","","","","","2024-05-10 09:21:30");
INSERT INTO employees VALUES("530","681386","CHRISTOPHER","DEL CASTILLO","SAN GABRIEL","Male","Married","","","","",""," 080268402229","131332380924","","","","","2024-05-10 09:22:29");
INSERT INTO employees VALUES("531","681435","CHRISTIAN","DELA CRUZ ","B.","Male","Married","","","","",""," 070257351163","","","","","","2024-05-10 09:23:48");
INSERT INTO employees VALUES("532","680895","AMER","DIPUNUD",".","Male","Married","","","","",""," 072020401177","","","","","","2024-05-10 09:25:04");
INSERT INTO employees VALUES("533","681403","RENATO","DIZON JR.","CORONEL","Male","Married","","","","","","","121255305459","","","","","2024-05-10 09:26:16");
INSERT INTO employees VALUES("534","681364","CHRISTIAN ANGELO","FABUNAN",".","Male","Married","","","","",""," 070259330910","","","","","","2024-05-10 09:27:45");
INSERT INTO employees VALUES("535","681402","RONIE","FLORANO","SANCHEZ","Male","Married","","","","",""," 070260440835","121271510301","","","","","2024-05-10 09:29:03");
INSERT INTO employees VALUES("536","681448","ALCRIS","GARCES",".","Male","Married","","","","",""," 052000015075","","","","","","2024-05-10 09:30:29");
INSERT INTO employees VALUES("537","681417","RAYMOND","GIGANTE",".","Male","Married","","","","","","","","","","","","2024-05-10 09:31:55");
INSERT INTO employees VALUES("538","681355","GENESIS","IGLOSO",".","Male","Married","","","","","","","","","","","","2024-05-10 09:33:06");
INSERT INTO employees VALUES("539","681451","PAUL JOHN","KNOELLER",".","Male","Married","","","","","","","","","","","","2024-05-10 09:34:12");
INSERT INTO employees VALUES("540","681431","JOSHUA","MADRID",".","Male","Married","","","","",""," 210254246241","","","","","","2024-05-10 09:35:35");
INSERT INTO employees VALUES("541","681304","JEFFREY","MALANG",".","Male","Married","","","","","","","","","","","","2024-05-10 09:36:27");
INSERT INTO employees VALUES("542","681393","DENVER","OLIDO","PADAPAT","Male","Married","","","","",""," 050255094715","121188583201","","","","","2024-05-10 09:39:41");
INSERT INTO employees VALUES("543","681432","MICHAEL","PACUDAN","ONG","Male","Married","","","","",""," 020506738521","121109385674","","","","","2024-05-10 09:40:41");
INSERT INTO employees VALUES("544","681388","JOHN CARLO","PIEDAD","CORPUZ","Male","Married","","","","","","","121109354378","","","","","2024-05-10 09:41:25");
INSERT INTO employees VALUES("546","681387","JIEMIE","SEMBLANTE",".","Male","Married","","","","","","","","","","","","2024-05-10 09:43:59");
INSERT INTO employees VALUES("547","681391","RONNIE","SIAT","PILAPIL","Male","Married","","","","",""," 080501849069","121130304361","","","","","2024-05-10 09:45:47");
INSERT INTO employees VALUES("548","681447","ROMEO","TAGNILAO JR.","B.","Male","Married","","","","","","","","","","","","2024-05-10 09:46:32");
INSERT INTO employees VALUES("549","681282","MARK","TOLIC","NATALIO","Male","Married","","","","",""," 010264527037","121248677183","","","","","2024-05-10 09:47:08");
INSERT INTO employees VALUES("550","681264","JOEL","VALMADRID","SANTOS","Male","Married","","","","","","","107000210628","","","","","2024-05-10 09:48:16");
INSERT INTO employees VALUES("551","681423","JAKE","VERSOZA",".","Male","Married","","","","","","","","","","","","2024-05-10 09:48:58");
INSERT INTO employees VALUES("552","681060","BIENVENIDO","WAÑA","L.","Male","Married","","","","",""," 062014372798","","","","","","2024-05-10 09:49:55");
INSERT INTO employees VALUES("553","680626","JOEL","ALONSAGAY","COSMILLA","Male","Single","09095010295","","","CABANATUAN CITY","07-3229186-0","21-200536786-4","12-114105802-9","468-507-734","","","","2024-05-10 10:07:13");
INSERT INTO employees VALUES("554","681412","RONIE","GALIDO","B.","Male","Married","","","","","02-3743882-7","","212005723946","","","","","2024-05-10 12:05:34");
INSERT INTO employees VALUES("555","680605","RODRIGO","CRUZ","A.","Male","Married","","","","","02-3332989-1","070509458853","915047893895","","","","","2024-05-10 13:24:40");
INSERT INTO employees VALUES("556","681337","MICHAEL","AMPON","INOCAMPO","Male","Married","","","","BANGA I, PLARIDEL, BULACAN","11-1067527-5","212006866836","121227364308","63586953","","","","2024-05-10 13:31:46");
INSERT INTO employees VALUES("557","680756","FLORANTE","AGUSTIN","S.","Male","Married","","","","","01-1035697-4","190892793356","","","","","","2024-05-10 13:41:22");
INSERT INTO employees VALUES("558","680588","EDGAR","ESCOTO","M.","Male","Married","","09073375982","","","02-1289743-8","020509304158","106001848045","151056416","","","","2024-05-10 13:59:16");
INSERT INTO employees VALUES("559","680333","SERENITO","EVALLAR","CORODVIZ","Male","Married","","","","",""," 020509304158","121277454117","","","","","2024-05-28 10:13:46");
INSERT INTO employees VALUES("560","679380","DONATO","LICONG","AMORA","Male","Married","","","","",""," 210500774503","121053558890","","","","","2024-05-28 10:19:54");
INSERT INTO employees VALUES("561","680774","DENNIS","LOPEZ","J.","Male","Married","","","","",""," 052014186417","","","","","","2024-05-28 10:35:16");
INSERT INTO employees VALUES("562","681456","FLORENCIO","DINGCONG",".","Male","Married","","","","","","","","","","","","2024-05-28 10:35:53");
INSERT INTO employees VALUES("563","680781","ROVILAN","NALON",".","Male","Married","","","","",""," 172013474562","","","","","","2024-05-28 11:23:13");
INSERT INTO employees VALUES("564","680180","JONARD","CELESTE","MARQUEZ","Male","Married","","","","",""," 030253657576","121043712568","","","","","2024-05-28 11:28:00");
INSERT INTO employees VALUES("565","680067","DANILO","ANTONIO",".","Male","Married","","","","","","","","","","","","2024-05-28 11:57:13");
INSERT INTO employees VALUES("566","678953","APOLINARIO","DIMACULANGAN","H.","Male","Married","","","","","","","","","","","","2024-05-28 11:59:51");
INSERT INTO employees VALUES("567","681260","GENER","BALUYOT",".","Male","Married","","","","",""," 020254550656","","","","","","2024-05-28 12:58:18");
INSERT INTO employees VALUES("568","681073","VAL ","RIVERA",".","Male","Married","","","","","","","","","","","","2024-05-28 13:26:35");
INSERT INTO employees VALUES("569","681442","ANTHONY","PAULO",".","Male","Married","","","","","","","","","","","","2024-05-28 13:50:00");
INSERT INTO employees VALUES("570","678956","LEOPOLDO","DELA CRUZ","RONQUILLO","Male","Married","","","","","","","141000641268","","","","","2024-05-28 14:05:05");
INSERT INTO employees VALUES("571","681436","RAMIL","POLICARPIO",".","Male","Married","","","","","","","","","","","","2024-05-28 14:31:12");
INSERT INTO employees VALUES("572","681429","MICHEL","RAMOS","R.","Male","Married","","","","","","","","","","","","2024-05-28 14:44:23");
INSERT INTO employees VALUES("573","681277","MARK LESTER","GREGORIO","SANCHEZ","Male","Married","","","","MATAAS NA KAHOY, LOWER FVR, NORZAGARAY, BULACAN","","","121304030754","","","","","2024-05-28 15:02:05");
INSERT INTO employees VALUES("574","680968","DANILO","SIJESMUNDO","ROSAL","Male","Married","","","","",""," 070505809066","102003110589","","","","","2024-05-28 16:19:50");
INSERT INTO employees VALUES("575","680846","NELSON","TICSE","YAPE","Male","Married","","","","",""," 072005272158","140001271201","","","","","2024-05-28 16:20:53");
INSERT INTO employees VALUES("576","680936","JOHN","VELASCO","DOMINGUEZ","Male","Married","","","","",""," 190904031929","121073122793","","","","","2024-05-28 16:28:21");
INSERT INTO employees VALUES("577","680166","MELENCIO","VERGARA",".","Male","Married","","","","",""," 070501336724","","","","","","2024-05-28 16:57:20");
INSERT INTO employees VALUES("578","680157","MARK RYAN","GALINATO","OBERO","Male","Married","","","","",""," 070259041145","121220025897","","","","","2024-05-29 09:32:55");
INSERT INTO employees VALUES("579","681163","JERICHO","SORIANO","ACUYAN","Male","Married","","","","",""," 070262141231","121315854410","","","","","2024-05-29 09:43:14");
INSERT INTO employees VALUES("580","680749","JUNREY","LABADAN","SUAN","Male","Married","","","","","","  172020680461","121278544662","","","","","2024-05-29 10:03:24");
INSERT INTO employees VALUES("581","680162","RONEL","OBILLOS","DAQUIADO","Male","Married","","","","",""," 070258956344","121216432254","","","","","2024-05-29 10:12:09");
INSERT INTO employees VALUES("582","681405","ORLANDO","VALDEZ","TUQUERO","Male","Married","","","","",""," 072015327449","121200563004","","","","","2024-05-29 10:38:46");
INSERT INTO employees VALUES("583","681086","ROY","TOLENTINO","GASISAN","Male","Married","","","","",""," 212519815483","121264681690","","","","","2024-05-29 10:41:24");
INSERT INTO employees VALUES("584","680885","MARTINEZ","JULIUS","ABAPO","Male","Married","","","","",""," 230005881086","121133815458","","","","","2024-05-29 10:55:15");
INSERT INTO employees VALUES("585","680479","ALLAN","SIBOBO","JALOTJOT","Male","Married","","","","",""," 070250414208","108001470615","","","","","2024-05-29 10:59:23");
INSERT INTO employees VALUES("586","681024","RICHARD","ROMANBAN","MENDOZA","Male","Married","","","","","","","121247814884","","","","","2024-05-29 11:18:59");
INSERT INTO employees VALUES("587","680953","NOMER","PABLO",".","Male","Married","","","","",""," 050254925958","","","","","","2024-05-29 11:23:26");
INSERT INTO employees VALUES("588","680330","STEPHEN","CABURIAN","CASINILLO","Male","Married","","","","",""," 132015698830","121109626227","","","","","2024-05-29 11:30:37");
INSERT INTO employees VALUES("589","681416","JOHNEL","MACABUHAY",".","Male","Married","","","","",""," 070258301801","","","","","","2024-05-29 11:33:15");
INSERT INTO employees VALUES("590","680866","RONNEL","DELA CRUZ","MANTOLINO","Male","Married","","","","",""," 070510979654","121208529481","","","","","2024-05-29 11:46:02");
INSERT INTO employees VALUES("591","680262","ALANO","MACAALANG",".","Male","Married","","","","",""," 070259371609","","","","","","2024-05-29 13:17:45");
INSERT INTO employees VALUES("592","680444","ROSBIL","MANGINGISA","M.","Male","Married","","","","",""," 070511233311","","","","","","2024-05-29 13:19:29");
INSERT INTO employees VALUES("593","680263","SAMSODEN","MANGINGIZA",".","Male","Married","","","","",""," 072015888661","","","","","","2024-05-29 13:20:46");
INSERT INTO employees VALUES("594","680335","ARMAN","MANUEL","CALDERON","Male","Married","","","","",""," 070258948074","121182091032","","","","","2024-05-29 13:47:50");
INSERT INTO employees VALUES("595","681390","RONNIE","GEMENTIZA","ILUSORIO","Male","Married","","","","","","","121034004476","","","","","2024-05-29 13:50:49");
INSERT INTO employees VALUES("596","680412","RODERICK","RIVERA",".","Male","Married","","","","","","","","","","","","2024-05-29 14:07:08");
INSERT INTO employees VALUES("597","681457","RUBEN","IGNACIO",".","Male","Married","","","","","","","","","","","","2024-05-29 14:30:41");
INSERT INTO employees VALUES("598","681406","EUGENE","LABANG",".","Male","Married","","","","",""," 070256744358","","","","","","2024-05-29 15:21:12");
INSERT INTO employees VALUES("599","680426","EMERSON","OMBAO","ABORIDO","Male","Married","","","","",""," 190254621270","121063929217","","","","","2024-05-29 16:20:35");
INSERT INTO employees VALUES("600","680615","ROMWEL","SANTIAGO","PALMARIO","Male","Married","","","","",""," 030512225833","121133262889","","","","","2024-05-29 16:26:03");
INSERT INTO employees VALUES("601","681293","HERBERT","DIVARAS","ENOSAS","Male","Married","","","","",""," 072014840762","121158447323","","","","","2024-05-30 11:46:05");
INSERT INTO employees VALUES("602","681415","MELCHOR","DE MESA",".","Male","Married","","","","","","","","","","","","2024-05-30 13:36:45");
INSERT INTO employees VALUES("603","681414","VICTORIANO","DE VERA","VELARDE","Male","Married","","","","",""," 060000412654","121171003353","","","","","2024-05-30 13:40:00");
INSERT INTO employees VALUES("604","681404","FREDERICK","DE VEYRA","CINCO","Male","Married","","","","",""," 070503690010","121125456039","","","","","2024-05-30 13:41:23");
INSERT INTO employees VALUES("605","680177","GREG","GARCIA","MACALINO","Male","Married","","","","",""," 070508801171","121100923922","","","","","2024-05-30 16:21:17");
INSERT INTO employees VALUES("606","681407","CHARLIE","DINO","ESTIPONA","Male","Married","","","","",""," 020511853045","121169523509","","","","","2024-05-30 16:54:20");
INSERT INTO employees VALUES("607","680221","LIONEL","ILUSTRE","FLORES","Male","Married","","","","","","","121182887335","","","","","2024-05-30 17:03:44");
INSERT INTO employees VALUES("608","679962","NORIEL","PARIOL","MANAHON","Male","Married","","","","","","","121188134673","","","","","2024-05-31 14:10:32");
INSERT INTO employees VALUES("609","678987","LITO","MARIN","ESTACIO","Male","Married","","","","",""," 072013468576","121052541549","","","","","2024-05-31 14:16:40");
INSERT INTO employees VALUES("610","679173","IGMEDIO","BATAC JR","MALLARI","Male","Married","","","","",""," 072000529169","121115668156","","","","","2024-05-31 14:45:35");
INSERT INTO employees VALUES("611","679114","ALLAN GENARO","ALFONSO","NABONG","Male","Married","","","","",""," 070255295703","121013287410","","","","","2024-05-31 14:47:10");
INSERT INTO employees VALUES("612","680332","PEPITO","SIERVO","LOBOS","Male","Married","","","","",""," 070258798870","121210128275","","","","","2024-05-31 14:49:33");



CREATE TABLE `employments` (
  `employment_id` int(11) NOT NULL AUTO_INCREMENT,
  `date_hired` date NOT NULL,
  `date_end` date NOT NULL,
  `employee_id` int(11) NOT NULL,
  `position` varchar(200) NOT NULL,
  `department` varchar(200) NOT NULL,
  `e_type` varchar(200) NOT NULL,
  `status` varchar(11) NOT NULL,
  `active` int(11) NOT NULL DEFAULT 2,
  `rest_day_1` varchar(200) NOT NULL,
  `rest_day_2` varchar(200) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`employment_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employments_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=603 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO employments VALUES("1","2024-01-01","2024-04-01","1","Security Guard","Field","Field","Probationar","1","Monday","No Rest Day","2024-06-09 08:46:35");
INSERT INTO employments VALUES("2","2024-01-01","2024-01-01","2","Security Guard","Field","Field","Contractual","2","Monday","Wednesday","2024-07-06 10:30:59");
INSERT INTO employments VALUES("3","2024-01-01","2024-01-20","3","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:16:01");
INSERT INTO employments VALUES("4","2024-01-01","2024-01-01","4","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:18:40");
INSERT INTO employments VALUES("5","2024-01-01","2024-01-01","5","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:19:34");
INSERT INTO employments VALUES("6","2024-01-01","2024-01-01","6","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:20:12");
INSERT INTO employments VALUES("7","2024-01-01","2024-01-01","7","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:20:58");
INSERT INTO employments VALUES("8","2024-01-01","2024-01-01","8","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:21:56");
INSERT INTO employments VALUES("9","2024-01-01","2024-01-01","9","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:22:47");
INSERT INTO employments VALUES("10","2024-01-01","2024-01-01","10","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:23:27");
INSERT INTO employments VALUES("11","2024-01-01","2024-01-01","17","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:24:02");
INSERT INTO employments VALUES("12","2024-01-01","2024-01-01","11","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:25:05");
INSERT INTO employments VALUES("13","2024-01-01","2024-01-01","13","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:26:24");
INSERT INTO employments VALUES("14","2024-01-01","2024-01-01","14","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:27:58");
INSERT INTO employments VALUES("15","2024-01-01","2024-01-01","15","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:28:44");
INSERT INTO employments VALUES("16","2024-01-01","2024-01-01","16","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:29:22");
INSERT INTO employments VALUES("17","2024-01-01","2024-01-01","18","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:31:17");
INSERT INTO employments VALUES("18","2024-01-01","2024-01-01","19","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:31:55");
INSERT INTO employments VALUES("19","2024-01-01","2024-01-01","21","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:32:28");
INSERT INTO employments VALUES("20","2024-01-01","2024-01-01","22","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:33:10");
INSERT INTO employments VALUES("21","2024-01-01","2024-01-01","24","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:33:53");
INSERT INTO employments VALUES("22","2024-01-01","2024-01-01","25","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:34:29");
INSERT INTO employments VALUES("23","2024-01-01","2024-01-01","26","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:35:02");
INSERT INTO employments VALUES("24","2024-01-01","2024-01-01","27","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:35:46");
INSERT INTO employments VALUES("25","2024-01-01","2024-01-01","28","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:36:26");
INSERT INTO employments VALUES("27","2024-01-01","2024-01-01","29","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:38:01");
INSERT INTO employments VALUES("28","2024-01-01","2024-01-01","31","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:38:38");
INSERT INTO employments VALUES("29","2024-01-01","2024-01-01","33","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:39:44");
INSERT INTO employments VALUES("30","2024-01-01","2024-01-01","34","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:40:22");
INSERT INTO employments VALUES("31","2024-01-01","2024-01-01","35","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:41:01");
INSERT INTO employments VALUES("32","2024-01-01","2024-01-01","36","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:41:39");
INSERT INTO employments VALUES("33","2024-01-01","2024-01-01","37","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:43:02");
INSERT INTO employments VALUES("34","2024-01-01","2024-01-01","38","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:43:53");
INSERT INTO employments VALUES("35","2024-01-01","2024-01-01","39","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:44:28");
INSERT INTO employments VALUES("36","2024-01-01","2024-01-01","40","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:45:35");
INSERT INTO employments VALUES("37","2024-01-01","2024-01-01","41","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:46:30");
INSERT INTO employments VALUES("38","2024-01-01","2024-01-01","42","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:47:05");
INSERT INTO employments VALUES("39","2024-01-01","2024-01-01","43","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:47:43");
INSERT INTO employments VALUES("40","2024-01-01","2024-01-01","44","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:48:16");
INSERT INTO employments VALUES("41","2024-01-01","2024-01-01","45","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:48:52");
INSERT INTO employments VALUES("43","2024-01-01","2024-01-01","46","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:51:36");
INSERT INTO employments VALUES("44","2024-01-01","2024-01-01","47","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:52:25");
INSERT INTO employments VALUES("45","2024-01-01","2024-01-01","48","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:53:01");
INSERT INTO employments VALUES("46","2024-01-01","2024-01-01","49","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:53:49");
INSERT INTO employments VALUES("47","2024-01-01","2024-01-01","50","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:54:26");
INSERT INTO employments VALUES("48","2024-01-01","2024-01-01","51","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:56:02");
INSERT INTO employments VALUES("49","2024-01-01","2024-01-01","52","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:56:39");
INSERT INTO employments VALUES("50","2024-01-01","2024-01-01","53","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:57:14");
INSERT INTO employments VALUES("51","2024-01-01","2024-01-01","54","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:58:33");
INSERT INTO employments VALUES("52","2024-01-01","2024-01-01","55","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 16:59:14");
INSERT INTO employments VALUES("53","2024-01-01","2024-01-01","56","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:00:04");
INSERT INTO employments VALUES("54","2024-01-01","2024-01-01","57","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:00:37");
INSERT INTO employments VALUES("55","2024-01-01","2024-01-01","58","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:01:21");
INSERT INTO employments VALUES("56","2024-01-01","2024-01-01","59","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:01:55");
INSERT INTO employments VALUES("57","2024-01-01","2024-01-01","60","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:02:49");
INSERT INTO employments VALUES("58","2024-01-01","2024-01-01","61","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:03:22");
INSERT INTO employments VALUES("59","2024-01-01","2024-01-01","62","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:03:58");
INSERT INTO employments VALUES("60","2024-01-01","2024-01-01","63","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:05:22");
INSERT INTO employments VALUES("61","2024-01-01","2024-01-01","64","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:05:54");
INSERT INTO employments VALUES("62","2024-01-01","2024-01-01","65","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:06:39");
INSERT INTO employments VALUES("63","2024-01-01","2024-01-01","66","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:07:18");
INSERT INTO employments VALUES("64","2024-01-01","2024-01-01","67","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:07:55");
INSERT INTO employments VALUES("65","2024-01-01","2024-01-01","68","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:08:39");
INSERT INTO employments VALUES("66","2024-01-01","2024-01-01","69","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:09:07");
INSERT INTO employments VALUES("67","2024-01-01","2024-01-01","70","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:09:46");
INSERT INTO employments VALUES("68","2024-01-01","2024-01-01","71","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:10:21");
INSERT INTO employments VALUES("69","2024-01-01","2024-01-01","72","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:10:54");
INSERT INTO employments VALUES("70","2024-01-01","2024-01-01","73","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:11:27");
INSERT INTO employments VALUES("71","2024-01-01","2024-01-01","74","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:12:08");
INSERT INTO employments VALUES("72","2024-01-01","2024-01-01","75","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:12:41");
INSERT INTO employments VALUES("73","2024-01-01","2024-01-01","76","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:13:18");
INSERT INTO employments VALUES("74","2024-01-01","2024-01-01","77","Security Guard","Field","Sunday","Saturday","2","","","2024-05-21 17:13:57");
INSERT INTO employments VALUES("75","2024-01-01","2024-01-25","78","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:13:12");
INSERT INTO employments VALUES("76","2024-01-01","2024-01-01","79","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:15:58");
INSERT INTO employments VALUES("77","2024-01-01","2024-01-01","80","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:16:43");
INSERT INTO employments VALUES("78","2024-01-01","2024-01-01","81","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:18:13");
INSERT INTO employments VALUES("79","2024-01-01","2024-01-01","82","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:18:48");
INSERT INTO employments VALUES("80","2024-01-01","2024-01-01","83","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:19:22");
INSERT INTO employments VALUES("81","2024-01-01","2024-01-25","84","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:20:25");
INSERT INTO employments VALUES("82","2024-01-01","2024-01-01","85","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:22:00");
INSERT INTO employments VALUES("83","2024-01-01","2024-01-01","86","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:22:38");
INSERT INTO employments VALUES("84","2024-01-01","2024-01-01","87","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:23:10");
INSERT INTO employments VALUES("85","2024-01-01","2024-01-01","88","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:23:44");
INSERT INTO employments VALUES("86","2024-01-01","2024-01-01","89","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:24:30");
INSERT INTO employments VALUES("87","2024-01-01","2024-01-01","90","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:25:00");
INSERT INTO employments VALUES("88","2024-01-01","2024-01-01","91","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:25:49");
INSERT INTO employments VALUES("89","2024-01-01","2024-01-01","92","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:27:02");
INSERT INTO employments VALUES("90","2024-01-01","2024-01-01","93","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:27:33");
INSERT INTO employments VALUES("91","2024-01-01","2024-01-01","93","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:28:07");
INSERT INTO employments VALUES("92","2024-01-01","2024-01-01","94","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:28:42");
INSERT INTO employments VALUES("93","2024-01-01","2024-01-01","95","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:29:16");
INSERT INTO employments VALUES("94","2024-01-01","2024-01-01","96","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:30:23");
INSERT INTO employments VALUES("95","2024-01-01","2024-01-01","97","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:31:11");
INSERT INTO employments VALUES("96","2024-01-01","2024-01-01","98","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:31:40");
INSERT INTO employments VALUES("97","2024-01-01","2024-01-01","100","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:33:52");
INSERT INTO employments VALUES("98","2024-01-01","2024-01-01","101","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:34:26");
INSERT INTO employments VALUES("99","2024-01-01","2024-01-01","101","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:35:56");
INSERT INTO employments VALUES("100","2024-01-01","2024-01-01","103","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:36:43");
INSERT INTO employments VALUES("101","2024-01-01","2024-01-01","104","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:38:43");
INSERT INTO employments VALUES("102","2024-01-01","2024-01-01","105","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:40:14");
INSERT INTO employments VALUES("103","2024-01-01","2024-01-01","106","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:42:11");
INSERT INTO employments VALUES("104","2024-01-01","2024-01-01","107","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:44:37");
INSERT INTO employments VALUES("105","2024-01-01","2024-01-01","108","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:45:41");
INSERT INTO employments VALUES("106","2024-01-01","2024-01-01","109","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:46:38");
INSERT INTO employments VALUES("107","2024-01-01","2024-01-01","110","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:47:18");
INSERT INTO employments VALUES("108","2024-01-01","2024-01-01","111","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:47:54");
INSERT INTO employments VALUES("109","2024-01-01","2024-01-01","112","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:48:41");
INSERT INTO employments VALUES("110","2024-01-01","2024-01-01","113","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:49:12");
INSERT INTO employments VALUES("111","2024-01-01","2024-01-01","114","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:49:41");
INSERT INTO employments VALUES("112","2024-01-01","2024-01-01","115","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:50:14");
INSERT INTO employments VALUES("113","2024-01-01","2024-01-01","116","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:50:47");
INSERT INTO employments VALUES("114","2024-01-01","2024-01-01","117","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:51:17");
INSERT INTO employments VALUES("115","2024-01-01","2024-01-01","118","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:51:44");
INSERT INTO employments VALUES("116","2024-01-01","2024-01-01","119","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:52:11");
INSERT INTO employments VALUES("117","2024-01-01","2024-01-01","120","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:52:48");
INSERT INTO employments VALUES("118","2024-01-01","2024-01-01","121","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:53:25");
INSERT INTO employments VALUES("119","2024-01-01","2024-01-01","122","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 10:54:07");
INSERT INTO employments VALUES("120","2024-01-01","2024-01-01","123","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:00:01");
INSERT INTO employments VALUES("121","2024-01-01","2024-01-01","124","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:00:30");
INSERT INTO employments VALUES("122","2024-01-01","2024-01-01","125","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:01:02");
INSERT INTO employments VALUES("123","2024-01-01","2024-01-01","126","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:01:35");
INSERT INTO employments VALUES("124","2024-01-01","2024-01-01","127","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:02:03");
INSERT INTO employments VALUES("125","2024-01-01","2024-01-01","128","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:02:34");
INSERT INTO employments VALUES("126","2024-01-01","2024-01-01","129","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:03:11");
INSERT INTO employments VALUES("127","2024-01-01","2024-01-01","130","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:03:41");
INSERT INTO employments VALUES("128","2024-01-01","2024-01-01","131","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:04:11");
INSERT INTO employments VALUES("129","2024-01-01","2024-01-01","132","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:04:48");
INSERT INTO employments VALUES("130","2024-01-01","2024-01-01","133","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:05:24");
INSERT INTO employments VALUES("131","2024-01-01","2024-01-01","134","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:06:11");
INSERT INTO employments VALUES("132","2024-01-01","2024-01-01","135","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:06:39");
INSERT INTO employments VALUES("133","2024-01-01","2024-01-01","136","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:07:27");
INSERT INTO employments VALUES("134","2024-01-01","2024-01-01","137","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:10:03");
INSERT INTO employments VALUES("135","2024-01-01","2024-01-01","138","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:13:43");
INSERT INTO employments VALUES("136","2024-01-01","2024-01-01","139","Security Guard","Field","Sunday","Saturday","1","No Rest Day","No Rest Day","2024-07-12 15:09:49");
INSERT INTO employments VALUES("137","2024-01-01","2024-01-01","140","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:15:11");
INSERT INTO employments VALUES("138","2024-01-01","2024-01-01","141","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:15:37");
INSERT INTO employments VALUES("139","2024-01-01","2024-01-01","142","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:16:05");
INSERT INTO employments VALUES("140","2024-01-01","2024-01-01","143","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:16:37");
INSERT INTO employments VALUES("141","2024-01-01","2024-01-01","144","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:17:07");
INSERT INTO employments VALUES("142","2024-01-01","2024-01-01","145","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:17:33");
INSERT INTO employments VALUES("143","2024-01-01","2024-01-01","146","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:17:58");
INSERT INTO employments VALUES("144","2024-01-01","2024-01-01","147","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:18:30");
INSERT INTO employments VALUES("145","2024-01-01","2024-01-01","148","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:19:03");
INSERT INTO employments VALUES("146","2024-01-01","2024-01-01","149","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:19:41");
INSERT INTO employments VALUES("147","2024-01-01","2024-01-01","150","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:25:29");
INSERT INTO employments VALUES("148","2024-01-01","2024-01-01","151","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:26:04");
INSERT INTO employments VALUES("149","2024-01-01","2024-01-01","152","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:27:05");
INSERT INTO employments VALUES("150","2024-01-01","2024-01-01","153","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:27:54");
INSERT INTO employments VALUES("151","2024-01-01","2024-01-01","154","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:28:20");
INSERT INTO employments VALUES("152","2024-01-01","2024-01-01","156","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:28:47");
INSERT INTO employments VALUES("153","2024-01-01","2024-01-01","157","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:31:02");
INSERT INTO employments VALUES("154","2024-01-01","2024-01-01","158","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:36:23");
INSERT INTO employments VALUES("155","2024-01-01","2024-01-01","159","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:39:50");
INSERT INTO employments VALUES("156","2024-01-01","2024-01-01","160","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:40:49");
INSERT INTO employments VALUES("157","2024-01-01","2024-01-01","161","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:42:40");
INSERT INTO employments VALUES("158","2024-01-01","2024-01-01","162","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:43:09");
INSERT INTO employments VALUES("159","2024-01-01","2024-01-01","163","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:43:38");
INSERT INTO employments VALUES("160","2024-01-01","2024-01-01","164","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:44:16");
INSERT INTO employments VALUES("161","2024-01-01","2024-01-01","165","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:44:43");
INSERT INTO employments VALUES("162","2024-01-01","2024-01-01","166","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:45:12");
INSERT INTO employments VALUES("163","2024-01-01","2024-01-01","167","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:45:39");
INSERT INTO employments VALUES("164","2024-01-01","2024-01-01","168","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:46:05");
INSERT INTO employments VALUES("165","2024-01-01","2024-01-01","169","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:46:35");
INSERT INTO employments VALUES("166","2024-01-01","2024-01-01","170","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:48:07");
INSERT INTO employments VALUES("167","2024-01-01","2024-01-01","171","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:48:48");
INSERT INTO employments VALUES("168","2024-01-01","2024-01-01","172","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:49:21");
INSERT INTO employments VALUES("171","2024-01-01","2024-01-01","173","Administrator","Field","Sunday","Saturday","2","","","2024-05-22 11:53:04");
INSERT INTO employments VALUES("172","2024-01-01","2024-01-01","174","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:53:36");
INSERT INTO employments VALUES("173","2024-01-01","2024-01-01","175","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:54:20");
INSERT INTO employments VALUES("174","2024-01-01","2024-01-01","178","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:55:19");
INSERT INTO employments VALUES("175","2024-01-01","2024-01-01","179","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:56:02");
INSERT INTO employments VALUES("176","2024-01-01","2024-01-01","180","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:56:43");
INSERT INTO employments VALUES("177","2024-01-01","2024-01-01","181","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:57:17");
INSERT INTO employments VALUES("178","2024-01-01","2024-01-01","182","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:57:47");
INSERT INTO employments VALUES("179","2024-01-01","2024-01-01","183","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:58:48");
INSERT INTO employments VALUES("180","2024-01-01","2024-01-01","184","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 11:59:20");
INSERT INTO employments VALUES("181","2024-01-01","2024-01-01","185","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:00:11");
INSERT INTO employments VALUES("182","2024-01-01","2024-01-01","186","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:00:46");
INSERT INTO employments VALUES("183","2024-01-01","2024-01-01","187","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:01:48");
INSERT INTO employments VALUES("184","2024-01-01","2024-01-01","188","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:02:35");
INSERT INTO employments VALUES("185","2024-01-01","2024-01-01","189","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:03:23");
INSERT INTO employments VALUES("186","2024-01-01","2024-01-01","190","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:03:53");
INSERT INTO employments VALUES("187","2024-01-01","2024-01-01","191","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:05:38");
INSERT INTO employments VALUES("188","2024-01-01","2024-01-01","192","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:06:06");
INSERT INTO employments VALUES("189","2024-01-01","2024-01-01","193","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:06:33");
INSERT INTO employments VALUES("190","2024-01-01","2024-01-01","194","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:07:05");
INSERT INTO employments VALUES("191","2024-01-01","2024-01-01","195","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:07:55");
INSERT INTO employments VALUES("192","2024-01-01","2024-01-01","196","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:08:26");
INSERT INTO employments VALUES("193","2024-01-01","2024-01-01","197","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 12:09:15");
INSERT INTO employments VALUES("194","2024-01-01","2024-01-10","198","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:09:16");
INSERT INTO employments VALUES("195","2024-01-01","2024-01-01","199","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:10:34");
INSERT INTO employments VALUES("196","2024-01-01","2024-01-01","200","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:11:03");
INSERT INTO employments VALUES("197","2024-01-01","2024-01-01","201","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:11:29");
INSERT INTO employments VALUES("198","2024-01-01","2024-01-01","202","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:11:56");
INSERT INTO employments VALUES("199","2024-01-01","2024-01-01","203","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:15:17");
INSERT INTO employments VALUES("200","2024-01-01","2024-01-01","204","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:15:47");
INSERT INTO employments VALUES("203","2024-01-01","2024-01-01","205","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:18:16");
INSERT INTO employments VALUES("204","2024-01-01","2024-01-01","206","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:19:53");
INSERT INTO employments VALUES("205","2024-01-01","2024-01-01","207","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:20:25");
INSERT INTO employments VALUES("206","2024-01-01","2024-01-01","208","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:20:58");
INSERT INTO employments VALUES("207","2024-01-01","2024-01-01","209","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:21:31");
INSERT INTO employments VALUES("208","2024-01-01","2024-01-01","210","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:22:26");
INSERT INTO employments VALUES("209","2024-01-01","2024-01-01","211","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:22:52");
INSERT INTO employments VALUES("210","2024-01-01","2024-01-01","212","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:23:42");
INSERT INTO employments VALUES("211","2024-01-01","2024-01-01","213","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:24:12");
INSERT INTO employments VALUES("212","2024-01-01","2024-01-01","214","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:24:55");
INSERT INTO employments VALUES("215","2024-01-01","2024-01-01","215","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:28:44");
INSERT INTO employments VALUES("216","2024-01-01","2024-01-01","216","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:30:37");
INSERT INTO employments VALUES("217","2024-01-01","2024-01-01","217","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:31:11");
INSERT INTO employments VALUES("218","2024-01-01","2024-01-01","218","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:31:49");
INSERT INTO employments VALUES("219","2024-01-01","2024-01-01","219","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:32:35");
INSERT INTO employments VALUES("220","2024-01-01","2024-01-01","220","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:33:33");
INSERT INTO employments VALUES("221","2024-01-01","2024-01-01","221","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:34:19");
INSERT INTO employments VALUES("222","2024-01-01","2024-01-01","222","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:35:22");
INSERT INTO employments VALUES("223","2024-01-01","2024-01-01","120","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:40:02");
INSERT INTO employments VALUES("224","2024-01-01","2024-01-01","224","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:40:37");
INSERT INTO employments VALUES("225","2024-01-01","2024-01-01","225","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:41:10");
INSERT INTO employments VALUES("226","2024-01-01","2024-01-01","226","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:41:46");
INSERT INTO employments VALUES("227","2024-01-01","2024-01-01","227","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:42:33");
INSERT INTO employments VALUES("228","2024-01-01","2024-01-01","228","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:43:02");
INSERT INTO employments VALUES("229","2024-01-01","2024-01-01","229","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:43:31");
INSERT INTO employments VALUES("230","2024-01-01","2024-01-01","230","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:44:33");
INSERT INTO employments VALUES("231","2024-01-01","2024-01-01","231","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:45:07");
INSERT INTO employments VALUES("232","2024-01-01","2024-01-01","232","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:45:37");
INSERT INTO employments VALUES("233","2024-01-01","2024-01-01","233","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:46:02");
INSERT INTO employments VALUES("234","2024-01-01","2024-01-01","234","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:46:29");
INSERT INTO employments VALUES("235","2024-01-01","2024-01-01","235","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:47:20");
INSERT INTO employments VALUES("236","2024-01-01","2024-01-01","236","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:47:45");
INSERT INTO employments VALUES("237","2024-01-01","2024-01-01","237","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:49:32");
INSERT INTO employments VALUES("238","2024-01-01","2024-01-01","238","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:50:02");
INSERT INTO employments VALUES("239","2024-01-01","2024-01-20","239","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:50:33");
INSERT INTO employments VALUES("240","2024-01-01","2024-01-01","240","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:51:02");
INSERT INTO employments VALUES("241","2024-01-01","2024-01-01","241","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:51:35");
INSERT INTO employments VALUES("242","2024-01-01","2024-01-01","242","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:52:03");
INSERT INTO employments VALUES("243","2024-01-01","2024-01-01","243","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:52:31");
INSERT INTO employments VALUES("244","2024-01-01","2024-01-01","244","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:52:57");
INSERT INTO employments VALUES("245","2024-01-01","2024-01-01","245","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:53:26");
INSERT INTO employments VALUES("246","2024-01-01","2024-01-01","246","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:54:11");
INSERT INTO employments VALUES("247","2024-01-01","2024-01-01","247","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:54:41");
INSERT INTO employments VALUES("248","2024-01-01","2024-01-01","248","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:55:09");
INSERT INTO employments VALUES("249","2024-01-01","2024-01-01","249","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:55:37");
INSERT INTO employments VALUES("250","2024-01-01","2024-01-01","250","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:56:30");
INSERT INTO employments VALUES("251","2024-01-01","2024-01-01","251","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:57:01");
INSERT INTO employments VALUES("252","2024-01-01","2024-01-01","252","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:57:32");
INSERT INTO employments VALUES("253","2024-01-01","2024-01-01","253","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:58:23");
INSERT INTO employments VALUES("254","2024-01-01","2024-01-01","254","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:58:50");
INSERT INTO employments VALUES("255","2024-01-01","2024-01-01","255","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 13:59:19");
INSERT INTO employments VALUES("256","2024-01-01","2024-01-01","256","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:03:59");
INSERT INTO employments VALUES("257","2024-01-01","2024-01-01","257","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:04:44");
INSERT INTO employments VALUES("258","2024-01-01","2024-01-01","258","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:06:13");
INSERT INTO employments VALUES("259","2024-01-01","2024-01-01","259","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:06:47");
INSERT INTO employments VALUES("260","2024-01-01","2024-01-01","260","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:07:17");
INSERT INTO employments VALUES("261","2024-01-01","2024-01-01","261","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:08:03");
INSERT INTO employments VALUES("262","2024-01-01","2024-01-01","262","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:09:39");
INSERT INTO employments VALUES("263","2024-01-01","2024-01-01","263","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:10:59");
INSERT INTO employments VALUES("264","2024-01-01","2024-01-01","264","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:12:13");
INSERT INTO employments VALUES("265","2024-01-01","2024-01-01","266","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:37:23");
INSERT INTO employments VALUES("266","2024-01-01","2024-01-01","267","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:39:13");
INSERT INTO employments VALUES("267","2024-01-01","2024-01-01","268","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:39:43");
INSERT INTO employments VALUES("268","2024-01-01","2024-01-01","269","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:40:32");
INSERT INTO employments VALUES("269","2024-01-01","2024-01-01","270","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:41:16");
INSERT INTO employments VALUES("270","2024-01-01","2024-01-01","271","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:41:42");
INSERT INTO employments VALUES("271","2024-01-01","2024-01-01","272","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:42:18");
INSERT INTO employments VALUES("272","2024-01-01","2024-01-01","273","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:42:51");
INSERT INTO employments VALUES("273","2024-01-01","2024-01-01","274","Security Guard","Office","Sunday","Saturday","2","","","2024-05-22 14:43:19");
INSERT INTO employments VALUES("274","2024-01-01","2024-01-01","275","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:44:23");
INSERT INTO employments VALUES("275","2024-01-01","2024-01-01","276","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:45:26");
INSERT INTO employments VALUES("276","2024-01-01","2024-01-01","277","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:45:58");
INSERT INTO employments VALUES("277","2024-01-01","2024-01-01","279","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:46:31");
INSERT INTO employments VALUES("278","2024-01-01","2024-01-01","280","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:47:05");
INSERT INTO employments VALUES("279","2024-01-01","2024-01-01","281","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:47:42");
INSERT INTO employments VALUES("280","2024-01-01","2024-01-01","283","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:48:24");
INSERT INTO employments VALUES("281","2024-01-01","2024-01-01","284","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:48:58");
INSERT INTO employments VALUES("282","2024-01-01","2024-01-01","285","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:52:27");
INSERT INTO employments VALUES("283","2024-01-01","2024-01-01","286","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:52:59");
INSERT INTO employments VALUES("284","2024-01-01","2024-01-01","287","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:53:48");
INSERT INTO employments VALUES("285","2024-01-01","2024-01-01","288","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 14:54:36");
INSERT INTO employments VALUES("286","2024-01-01","2024-01-01","289","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:20:35");
INSERT INTO employments VALUES("287","2024-01-01","2024-01-01","290","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:21:03");
INSERT INTO employments VALUES("289","2024-01-01","2024-01-01","291","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:22:08");
INSERT INTO employments VALUES("290","2024-01-01","2024-01-01","292","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:22:49");
INSERT INTO employments VALUES("291","2024-01-01","2024-01-01","293","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:23:18");
INSERT INTO employments VALUES("292","2024-01-01","2024-01-01","294","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:57:22");
INSERT INTO employments VALUES("293","2024-01-01","2024-01-01","295","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:59:17");
INSERT INTO employments VALUES("294","2024-01-01","2024-01-01","296","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 15:59:48");
INSERT INTO employments VALUES("295","2024-01-01","2024-01-25","297","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:00:23");
INSERT INTO employments VALUES("296","2024-01-01","2024-01-01","298","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:01:41");
INSERT INTO employments VALUES("297","2024-01-01","2024-01-01","299","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:02:13");
INSERT INTO employments VALUES("298","2024-01-01","2024-01-01","300","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:02:40");
INSERT INTO employments VALUES("299","2024-01-01","2024-01-01","301","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:03:22");
INSERT INTO employments VALUES("300","2024-01-01","2024-01-01","302","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:03:53");
INSERT INTO employments VALUES("301","2024-01-01","2024-01-01","303","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:04:24");
INSERT INTO employments VALUES("302","2024-01-01","2024-01-01","304","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:04:53");
INSERT INTO employments VALUES("303","2024-01-01","2024-01-01","305","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:05:24");
INSERT INTO employments VALUES("304","2024-01-01","2024-01-01","306","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:05:53");
INSERT INTO employments VALUES("305","2024-01-01","2024-01-01","307","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:06:37");
INSERT INTO employments VALUES("306","2024-01-01","2024-01-01","308","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:07:08");
INSERT INTO employments VALUES("307","2024-01-01","2024-01-01","309","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:07:48");
INSERT INTO employments VALUES("308","2024-01-01","2024-01-01","310","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:08:20");
INSERT INTO employments VALUES("309","2024-01-01","2024-01-01","311","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:09:03");
INSERT INTO employments VALUES("310","2024-01-01","2024-01-01","312","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:10:14");
INSERT INTO employments VALUES("311","2024-01-01","2024-01-01","313","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:10:42");
INSERT INTO employments VALUES("312","2024-01-01","2024-01-01","314","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:11:10");
INSERT INTO employments VALUES("313","2024-01-01","2024-01-01","315","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:11:37");
INSERT INTO employments VALUES("314","2024-01-01","2024-01-01","316","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:12:05");
INSERT INTO employments VALUES("315","2024-01-01","2024-01-01","317","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:12:44");
INSERT INTO employments VALUES("316","2024-01-01","2024-01-01","318","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:13:15");
INSERT INTO employments VALUES("317","2024-01-01","2024-01-01","319","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:14:24");
INSERT INTO employments VALUES("318","2024-01-01","2024-01-01","320","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:14:51");
INSERT INTO employments VALUES("319","2024-01-01","2024-01-01","321","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:15:36");
INSERT INTO employments VALUES("320","2024-01-01","2024-01-01","322","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:16:14");
INSERT INTO employments VALUES("321","2024-01-01","2024-01-01","323","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:16:54");
INSERT INTO employments VALUES("322","2024-01-01","2024-01-01","324","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:17:22");
INSERT INTO employments VALUES("323","2024-01-01","2024-01-01","327","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:18:05");
INSERT INTO employments VALUES("324","2024-01-01","2024-01-01","328","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:18:37");
INSERT INTO employments VALUES("325","2024-01-01","2024-01-01","329","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:19:08");
INSERT INTO employments VALUES("326","2024-01-01","2024-01-01","330","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:26:45");
INSERT INTO employments VALUES("327","2024-01-01","2024-01-01","331","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:27:14");
INSERT INTO employments VALUES("328","2024-01-01","2024-01-01","332","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:27:40");
INSERT INTO employments VALUES("329","2024-01-01","2024-01-01","333","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:28:10");
INSERT INTO employments VALUES("330","2024-01-01","2024-01-01","334","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:28:42");
INSERT INTO employments VALUES("331","2024-01-01","2024-01-01","335","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:29:37");
INSERT INTO employments VALUES("332","2024-01-01","2024-01-01","336","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:30:24");
INSERT INTO employments VALUES("333","2024-01-01","2024-01-01","337","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:30:55");
INSERT INTO employments VALUES("334","2024-01-01","2024-01-01","338","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:31:25");
INSERT INTO employments VALUES("335","2024-01-01","2024-01-01","339","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:32:44");
INSERT INTO employments VALUES("336","0000-00-00","2024-01-01","341","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:33:17");
INSERT INTO employments VALUES("337","2024-01-01","2024-01-01","342","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:33:53");
INSERT INTO employments VALUES("338","2024-01-01","2024-01-01","343","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:35:18");
INSERT INTO employments VALUES("339","2024-01-01","2024-01-01","344","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:36:14");
INSERT INTO employments VALUES("340","2024-01-01","2024-01-01","558","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:36:47");
INSERT INTO employments VALUES("341","2024-01-01","2024-01-01","345","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:37:05");
INSERT INTO employments VALUES("342","2024-01-01","2024-01-01","557","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:37:32");
INSERT INTO employments VALUES("343","2024-01-01","2024-01-01","556","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:45:05");
INSERT INTO employments VALUES("344","2024-01-01","2024-01-01","555","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:47:08");
INSERT INTO employments VALUES("345","2024-01-01","2024-01-01","554","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:47:48");
INSERT INTO employments VALUES("346","2024-01-01","2024-01-01","553","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:48:32");
INSERT INTO employments VALUES("347","2024-01-01","2024-01-01","552","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:50:57");
INSERT INTO employments VALUES("348","2024-01-01","2024-01-01","551","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:52:04");
INSERT INTO employments VALUES("349","2024-01-01","2024-01-01","550","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:54:41");
INSERT INTO employments VALUES("350","2024-01-01","2024-01-01","549","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:56:34");
INSERT INTO employments VALUES("351","2024-01-01","2024-01-01","547","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 16:58:07");
INSERT INTO employments VALUES("352","2024-01-01","2024-01-01","546","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:00:11");
INSERT INTO employments VALUES("353","2024-01-01","2024-01-01","544","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:00:48");
INSERT INTO employments VALUES("354","2024-01-01","2024-01-01","543","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:01:45");
INSERT INTO employments VALUES("355","2024-01-01","2024-01-01","542","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:02:26");
INSERT INTO employments VALUES("356","2024-01-01","2024-01-01","541","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:04:41");
INSERT INTO employments VALUES("357","2024-01-12","2024-01-01","540","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:05:30");
INSERT INTO employments VALUES("358","2024-01-01","2024-01-01","346","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:10:05");
INSERT INTO employments VALUES("359","2024-01-01","2024-01-01","347","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:10:40");
INSERT INTO employments VALUES("360","2024-01-01","2024-01-01","348","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:11:53");
INSERT INTO employments VALUES("361","2024-01-01","2024-01-01","349","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:14:22");
INSERT INTO employments VALUES("362","2024-01-01","2024-01-01","350","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:15:58");
INSERT INTO employments VALUES("363","2024-01-01","2024-01-01","352","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:21:45");
INSERT INTO employments VALUES("364","2024-01-01","2024-01-01","353","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:22:15");
INSERT INTO employments VALUES("365","2024-01-01","2024-01-12","354","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:23:04");
INSERT INTO employments VALUES("366","2024-01-01","2024-01-12","355","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:26:14");
INSERT INTO employments VALUES("367","2024-01-01","2024-01-01","356","Security Guard","Field","Sunday","Saturday","2","","","2024-05-22 17:28:18");
INSERT INTO employments VALUES("368","2024-01-01","2024-01-01","357","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 08:34:32");
INSERT INTO employments VALUES("369","2024-01-01","2024-01-01","358","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 08:38:48");
INSERT INTO employments VALUES("370","2024-01-01","2024-01-01","359","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 08:47:03");
INSERT INTO employments VALUES("371","2024-01-01","2024-01-01","360","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 08:48:51");
INSERT INTO employments VALUES("372","2024-01-01","2024-01-01","361","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:24:17");
INSERT INTO employments VALUES("373","2024-01-01","2024-01-01","362","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:24:55");
INSERT INTO employments VALUES("374","2024-01-01","2024-01-01","363","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:25:33");
INSERT INTO employments VALUES("375","2024-01-01","2024-01-01","364","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:26:05");
INSERT INTO employments VALUES("376","2024-01-01","2024-01-01","539","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:27:52");
INSERT INTO employments VALUES("377","2024-01-01","2024-01-01","365","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:27:53");
INSERT INTO employments VALUES("378","2024-01-01","2024-01-01","366","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:28:25");
INSERT INTO employments VALUES("379","2024-01-01","2024-01-01","538","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:28:49");
INSERT INTO employments VALUES("380","2024-01-01","2024-01-01","367","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:29:02");
INSERT INTO employments VALUES("381","2024-01-01","2024-01-01","368","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:29:32");
INSERT INTO employments VALUES("382","2024-01-01","2024-01-01","537","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:29:37");
INSERT INTO employments VALUES("383","2024-01-01","2024-01-01","369","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:30:03");
INSERT INTO employments VALUES("384","2024-01-01","2024-01-01","536","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:30:20");
INSERT INTO employments VALUES("385","2024-01-01","2024-01-01","370","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:30:33");
INSERT INTO employments VALUES("386","2024-01-01","2024-01-01","535","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:31:14");
INSERT INTO employments VALUES("387","2024-01-01","2024-01-01","534","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:32:12");
INSERT INTO employments VALUES("388","2024-01-01","2024-01-01","371","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:32:12");
INSERT INTO employments VALUES("389","2024-01-01","2024-01-01","372","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:32:44");
INSERT INTO employments VALUES("390","2024-01-01","2024-01-01","533","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:33:00");
INSERT INTO employments VALUES("391","2024-01-01","2024-01-01","373","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:33:16");
INSERT INTO employments VALUES("392","2024-01-01","2024-01-01","374","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:33:44");
INSERT INTO employments VALUES("393","2024-01-01","2024-01-01","532","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:33:51");
INSERT INTO employments VALUES("394","2024-01-01","2024-01-01","375","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:34:14");
INSERT INTO employments VALUES("395","2024-01-01","2024-01-01","531","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:34:37");
INSERT INTO employments VALUES("396","2024-01-01","2024-01-01","376","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:34:42");
INSERT INTO employments VALUES("397","2024-01-01","2024-01-01","377","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:35:13");
INSERT INTO employments VALUES("398","2024-01-01","2024-01-01","530","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:35:22");
INSERT INTO employments VALUES("399","2024-01-01","2024-01-01","378","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:35:41");
INSERT INTO employments VALUES("400","2024-01-01","2024-01-01","379","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:36:12");
INSERT INTO employments VALUES("401","2024-01-01","2024-01-01","529","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:40:15");
INSERT INTO employments VALUES("402","2024-01-01","2024-01-01","380","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:40:41");
INSERT INTO employments VALUES("403","2024-01-01","2024-01-01","528","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:41:02");
INSERT INTO employments VALUES("404","2024-01-01","2024-01-01","381","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:41:09");
INSERT INTO employments VALUES("405","2024-01-01","2024-01-01","382","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:41:35");
INSERT INTO employments VALUES("406","2024-01-01","2024-01-01","527","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:41:46");
INSERT INTO employments VALUES("407","2024-01-01","2024-01-01","383","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:44:33");
INSERT INTO employments VALUES("408","2024-01-01","2024-01-01","526","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:44:36");
INSERT INTO employments VALUES("409","2024-01-01","2024-01-01","384","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:45:58");
INSERT INTO employments VALUES("410","2024-01-01","2024-01-01","525","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:46:02");
INSERT INTO employments VALUES("411","2024-01-01","2024-01-01","385","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:46:32");
INSERT INTO employments VALUES("412","2024-01-01","2024-01-01","524","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:47:08");
INSERT INTO employments VALUES("413","2024-01-01","2024-01-01","386","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:47:13");
INSERT INTO employments VALUES("414","2024-01-01","2024-01-01","387","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:47:44");
INSERT INTO employments VALUES("415","2024-01-01","2024-01-01","523","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:48:04");
INSERT INTO employments VALUES("416","2024-01-01","2024-01-01","388","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:48:17");
INSERT INTO employments VALUES("417","2024-01-01","2024-01-01","389","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:48:50");
INSERT INTO employments VALUES("418","2024-01-01","2024-01-01","522","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:48:55");
INSERT INTO employments VALUES("419","2024-01-01","2024-01-01","521","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:49:38");
INSERT INTO employments VALUES("420","2024-01-01","2024-01-01","390","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:50:18");
INSERT INTO employments VALUES("421","2024-01-01","2024-01-01","520","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:50:29");
INSERT INTO employments VALUES("422","2024-01-01","2024-01-01","391","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:51:05");
INSERT INTO employments VALUES("423","2024-01-01","2024-01-01","519","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:51:16");
INSERT INTO employments VALUES("424","2024-01-01","2024-01-01","393","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:51:35");
INSERT INTO employments VALUES("425","2024-01-01","2024-01-01","518","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:51:57");
INSERT INTO employments VALUES("426","2024-01-01","2024-01-01","394","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:52:09");
INSERT INTO employments VALUES("427","2024-01-01","2024-01-01","517","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:52:35");
INSERT INTO employments VALUES("428","2024-01-01","2024-01-01","395","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:52:47");
INSERT INTO employments VALUES("429","2024-01-01","2024-01-01","396","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:53:20");
INSERT INTO employments VALUES("430","2024-01-01","2024-01-01","516","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:53:35");
INSERT INTO employments VALUES("431","2024-01-01","2024-01-01","397","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:53:48");
INSERT INTO employments VALUES("432","2024-01-01","2024-01-01","398","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:54:19");
INSERT INTO employments VALUES("433","2024-01-01","2024-01-01","515","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:54:30");
INSERT INTO employments VALUES("434","2024-01-01","2024-01-01","399","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:55:02");
INSERT INTO employments VALUES("435","2024-01-01","2024-01-01","514","Administrator","Field","Sunday","Saturday","2","","","2024-05-23 10:55:17");
INSERT INTO employments VALUES("436","2024-01-01","2024-01-01","400","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:55:29");
INSERT INTO employments VALUES("437","2024-01-01","2024-01-01","513","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:56:03");
INSERT INTO employments VALUES("438","2024-01-01","2024-01-01","401","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:56:07");
INSERT INTO employments VALUES("439","2024-01-01","2024-01-01","402","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:56:35");
INSERT INTO employments VALUES("440","2024-01-01","2024-01-01","403","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:57:06");
INSERT INTO employments VALUES("441","2024-01-01","2024-01-01","512","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:57:10");
INSERT INTO employments VALUES("442","2024-01-01","2024-01-01","404","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:57:36");
INSERT INTO employments VALUES("443","2024-01-01","2024-01-01","510","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:58:04");
INSERT INTO employments VALUES("444","2024-01-01","2024-01-01","509","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:58:47");
INSERT INTO employments VALUES("445","2024-01-01","2024-01-01","508","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:59:28");
INSERT INTO employments VALUES("446","2024-01-01","2024-01-01","405","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 10:59:45");
INSERT INTO employments VALUES("447","2024-01-01","2024-01-01","406","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:00:12");
INSERT INTO employments VALUES("448","2024-01-01","2024-01-01","407","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:00:46");
INSERT INTO employments VALUES("449","2024-01-01","2024-01-01","507","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:01:13");
INSERT INTO employments VALUES("450","2024-01-01","2024-01-01","408","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:01:33");
INSERT INTO employments VALUES("451","2024-01-01","2024-01-01","409","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:02:01");
INSERT INTO employments VALUES("452","2024-01-01","2024-01-01","506","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:02:03");
INSERT INTO employments VALUES("453","2024-01-01","2024-01-01","410","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:02:32");
INSERT INTO employments VALUES("454","2024-01-01","2024-01-01","505","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:02:57");
INSERT INTO employments VALUES("455","2024-01-01","2024-01-01","411","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:03:03");
INSERT INTO employments VALUES("456","2024-01-01","2024-01-01","412","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:03:32");
INSERT INTO employments VALUES("457","2024-01-01","2024-01-01","504","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:03:48");
INSERT INTO employments VALUES("458","2024-01-01","2024-01-01","413","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:04:02");
INSERT INTO employments VALUES("459","2024-01-01","2024-01-01","501","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:04:28");
INSERT INTO employments VALUES("460","2024-01-01","2024-01-01","414","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:04:34");
INSERT INTO employments VALUES("461","2024-01-01","2024-01-01","415","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:05:06");
INSERT INTO employments VALUES("462","2024-01-01","2024-01-01","500","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:05:07");
INSERT INTO employments VALUES("463","2024-01-01","2024-01-01","416","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:05:45");
INSERT INTO employments VALUES("464","2024-01-01","2024-01-01","499","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:05:53");
INSERT INTO employments VALUES("465","2024-01-01","2024-01-01","417","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:06:21");
INSERT INTO employments VALUES("466","2024-01-01","2024-01-01","498","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:06:34");
INSERT INTO employments VALUES("467","2024-01-01","2024-01-01","418","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:06:55");
INSERT INTO employments VALUES("468","2024-01-01","2024-01-01","497","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:07:13");
INSERT INTO employments VALUES("469","2024-01-01","2024-01-01","419","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:07:22");
INSERT INTO employments VALUES("470","2024-01-01","2024-01-01","420","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:07:50");
INSERT INTO employments VALUES("471","2024-01-01","2024-01-01","421","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:08:25");
INSERT INTO employments VALUES("472","2024-01-01","2024-01-01","496","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:08:36");
INSERT INTO employments VALUES("473","2024-01-01","2024-01-01","422","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:08:53");
INSERT INTO employments VALUES("474","2024-01-01","2024-01-01","495","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:09:20");
INSERT INTO employments VALUES("475","2024-01-01","2024-01-01","423","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:09:24");
INSERT INTO employments VALUES("476","2024-01-01","2024-01-01","494","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:10:06");
INSERT INTO employments VALUES("477","2024-01-01","2024-01-01","424","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:10:06");
INSERT INTO employments VALUES("478","2024-01-01","2024-01-01","425","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:10:33");
INSERT INTO employments VALUES("479","2024-01-01","2024-01-01","494","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:11:01");
INSERT INTO employments VALUES("480","2024-01-01","2024-01-01","426","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:11:03");
INSERT INTO employments VALUES("481","2024-01-01","2024-01-01","427","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:11:32");
INSERT INTO employments VALUES("482","2024-01-01","2024-01-01","493","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:11:40");
INSERT INTO employments VALUES("483","2024-01-01","2024-01-01","428","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:12:05");
INSERT INTO employments VALUES("484","2024-01-01","2024-01-01","492","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:12:16");
INSERT INTO employments VALUES("485","2024-01-01","2024-01-01","429","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:13:09");
INSERT INTO employments VALUES("486","2024-01-01","2024-01-01","491","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:13:17");
INSERT INTO employments VALUES("487","2024-01-01","2024-01-01","430","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:13:44");
INSERT INTO employments VALUES("488","2024-01-01","2024-01-01","490","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:14:07");
INSERT INTO employments VALUES("489","2024-01-01","2024-01-01","431","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:14:11");
INSERT INTO employments VALUES("490","2024-01-01","2024-01-01","432","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:14:50");
INSERT INTO employments VALUES("491","2024-01-01","2024-01-01","489","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:15:11");
INSERT INTO employments VALUES("492","2024-01-01","2024-01-01","433","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:15:20");
INSERT INTO employments VALUES("493","2024-01-01","2024-01-01","434","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:15:52");
INSERT INTO employments VALUES("494","2024-01-01","2024-01-01","488","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:15:54");
INSERT INTO employments VALUES("495","2024-01-01","2024-01-01","435","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:16:32");
INSERT INTO employments VALUES("496","2024-01-01","2024-01-01","487","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:16:45");
INSERT INTO employments VALUES("497","2024-01-01","2024-01-01","486","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:17:44");
INSERT INTO employments VALUES("498","2024-01-01","2024-01-01","436","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:17:48");
INSERT INTO employments VALUES("499","2024-01-01","2024-01-01","437","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:18:18");
INSERT INTO employments VALUES("500","2024-01-01","2024-01-01","485","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:18:29");
INSERT INTO employments VALUES("501","2024-01-01","2024-01-01","438","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:18:53");
INSERT INTO employments VALUES("502","2024-01-01","2024-01-01","484","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:19:15");
INSERT INTO employments VALUES("503","2024-01-01","2024-01-01","439","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:19:48");
INSERT INTO employments VALUES("504","2024-01-01","2024-01-01","482","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:20:03");
INSERT INTO employments VALUES("505","2024-01-01","2024-01-01","440","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:20:19");
INSERT INTO employments VALUES("506","2024-01-01","2024-01-01","482","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:20:47");
INSERT INTO employments VALUES("507","2024-01-01","2024-01-01","441","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:21:52");
INSERT INTO employments VALUES("508","2024-01-01","2024-01-01","480","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:22:39");
INSERT INTO employments VALUES("509","2024-01-01","2024-01-01","442","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:22:44");
INSERT INTO employments VALUES("510","2024-01-01","2024-01-01","443","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:23:15");
INSERT INTO employments VALUES("511","2024-01-01","2024-01-01","479","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:23:21");
INSERT INTO employments VALUES("512","2024-01-01","2024-01-01","444","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:23:46");
INSERT INTO employments VALUES("513","2024-01-01","2024-01-01","478","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:23:59");
INSERT INTO employments VALUES("514","2024-01-01","2024-01-01","445","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:24:13");
INSERT INTO employments VALUES("515","2024-01-01","2024-01-01","446","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:24:43");
INSERT INTO employments VALUES("516","2024-01-01","2024-01-01","477","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:25:15");
INSERT INTO employments VALUES("517","2024-01-01","2024-01-01","446","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:26:20");
INSERT INTO employments VALUES("518","2024-01-01","2024-01-01","447","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:26:49");
INSERT INTO employments VALUES("520","2024-01-01","2024-01-01","475","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:27:58");
INSERT INTO employments VALUES("521","2024-01-01","2024-01-01","448","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:28:19");
INSERT INTO employments VALUES("522","2024-01-01","2024-01-01","474","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:29:31");
INSERT INTO employments VALUES("523","2024-01-01","2024-01-01","449","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:30:51");
INSERT INTO employments VALUES("524","2024-01-01","2024-01-01","450","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:31:28");
INSERT INTO employments VALUES("525","2024-01-01","2024-01-01","451","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:31:58");
INSERT INTO employments VALUES("526","2024-01-01","2024-01-01","473","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:31:58");
INSERT INTO employments VALUES("527","2024-01-01","2024-01-01","452","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:32:30");
INSERT INTO employments VALUES("528","2024-01-01","2024-01-01","472","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:32:52");
INSERT INTO employments VALUES("529","2024-01-01","2024-01-01","453","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:32:57");
INSERT INTO employments VALUES("530","2024-01-01","2024-01-01","454","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:33:30");
INSERT INTO employments VALUES("531","2024-01-01","2024-01-01","455","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:34:10");
INSERT INTO employments VALUES("532","2024-01-01","2024-01-01","456","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:35:14");
INSERT INTO employments VALUES("533","2024-01-01","2024-01-01","471","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:35:17");
INSERT INTO employments VALUES("534","2024-01-01","2024-01-01","457","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:35:54");
INSERT INTO employments VALUES("535","2024-01-01","2024-01-01","470","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:36:15");
INSERT INTO employments VALUES("536","2024-01-01","2024-01-01","458","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:36:23");
INSERT INTO employments VALUES("537","2024-01-01","2024-01-01","469","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:36:56");
INSERT INTO employments VALUES("538","2024-01-01","2024-01-01","459","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:37:27");
INSERT INTO employments VALUES("539","2024-01-01","2024-01-01","467","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:37:40");
INSERT INTO employments VALUES("540","2024-01-01","2024-01-01","460","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:38:06");
INSERT INTO employments VALUES("541","2024-01-01","2024-01-01","466","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:38:15");
INSERT INTO employments VALUES("542","2024-01-01","2024-01-01","465","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:38:55");
INSERT INTO employments VALUES("543","2024-01-01","2024-01-01","461","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:39:28");
INSERT INTO employments VALUES("544","2024-01-01","2024-01-01","462","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:39:55");
INSERT INTO employments VALUES("545","2024-01-01","2024-01-01","463","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:40:24");
INSERT INTO employments VALUES("546","2024-01-01","2024-01-01","464","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:40:53");
INSERT INTO employments VALUES("547","2024-01-01","2024-01-01","548","Security Guard","Field","Sunday","Saturday","2","","","2024-05-23 11:49:52");
INSERT INTO employments VALUES("548","2024-01-01","2024-01-01","559","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 10:16:27");
INSERT INTO employments VALUES("549","2024-01-01","2024-01-01","560","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 10:20:38");
INSERT INTO employments VALUES("550","2024-01-01","2024-01-01","561","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 10:36:57");
INSERT INTO employments VALUES("551","2024-01-01","2024-01-01","562","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 10:38:33");
INSERT INTO employments VALUES("552","2024-01-01","2024-01-01","563","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 11:24:02");
INSERT INTO employments VALUES("553","2024-01-01","2024-01-01","564","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 11:29:44");
INSERT INTO employments VALUES("554","2024-01-01","2024-01-01","565","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 11:58:01");
INSERT INTO employments VALUES("555","2024-01-01","2024-01-01","566","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 12:00:32");
INSERT INTO employments VALUES("556","2024-01-01","2024-01-01","567","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 12:59:29");
INSERT INTO employments VALUES("557","2024-01-01","2024-01-01","568","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 13:30:06");
INSERT INTO employments VALUES("558","2024-01-01","2024-01-01","569","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 13:52:16");
INSERT INTO employments VALUES("559","2024-01-01","2024-01-01","570","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 14:06:48");
INSERT INTO employments VALUES("560","2024-01-01","2024-01-01","571","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 14:33:54");
INSERT INTO employments VALUES("561","2024-01-01","2024-01-01","572","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 14:46:08");
INSERT INTO employments VALUES("562","2024-01-01","2024-01-01","573","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 15:03:13");
INSERT INTO employments VALUES("563","2024-01-01","2024-01-01","573","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 15:07:55");
INSERT INTO employments VALUES("564","2024-01-01","2024-01-01","574","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 16:21:34");
INSERT INTO employments VALUES("565","2024-01-01","2024-01-01","575","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 16:22:19");
INSERT INTO employments VALUES("566","2024-01-01","2024-01-01","576","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 16:29:01");
INSERT INTO employments VALUES("567","2024-01-01","2024-01-01","577","Security Guard","Field","Sunday","Saturday","2","","","2024-05-28 16:58:53");
INSERT INTO employments VALUES("568","2024-01-01","2024-01-01","578","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 09:33:42");
INSERT INTO employments VALUES("569","2024-01-01","2024-01-01","579","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 09:43:54");
INSERT INTO employments VALUES("570","2024-01-01","2024-01-01","580","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 10:04:04");
INSERT INTO employments VALUES("571","2024-01-01","2024-01-01","581","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 10:13:33");
INSERT INTO employments VALUES("572","2024-01-01","2024-01-01","582","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 10:39:24");
INSERT INTO employments VALUES("573","2024-01-01","2024-01-01","583","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 10:42:30");
INSERT INTO employments VALUES("574","2024-01-01","2024-01-01","584","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 10:56:03");
INSERT INTO employments VALUES("575","2024-01-02","2024-01-01","585","Payroll Officer","Field","Sunday","Saturday","2","","","2024-05-29 11:08:56");
INSERT INTO employments VALUES("576","2024-01-01","2024-01-01","586","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 11:19:52");
INSERT INTO employments VALUES("577","2024-01-01","2024-01-01","587","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 11:24:15");
INSERT INTO employments VALUES("578","2024-01-01","2024-01-01","588","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 11:31:36");
INSERT INTO employments VALUES("579","2024-01-01","2024-01-01","589","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 11:34:30");
INSERT INTO employments VALUES("580","2024-01-01","2024-01-01","588","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 11:50:34");
INSERT INTO employments VALUES("581","2024-01-01","2024-01-01","591","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 13:18:37");
INSERT INTO employments VALUES("582","2024-01-01","2024-01-01","593","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 13:21:37");
INSERT INTO employments VALUES("583","2024-01-01","2024-01-01","592","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 13:23:22");
INSERT INTO employments VALUES("584","2024-01-01","2024-01-01","594","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 13:48:33");
INSERT INTO employments VALUES("585","2024-01-01","2024-01-01","595","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 13:51:30");
INSERT INTO employments VALUES("586","2024-01-01","2024-01-01","596","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 14:21:14");
INSERT INTO employments VALUES("587","2024-01-01","2024-01-01","597","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 14:34:41");
INSERT INTO employments VALUES("588","2024-01-01","2024-01-01","598","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 15:21:57");
INSERT INTO employments VALUES("589","2024-01-01","2024-01-01","599","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 16:21:18");
INSERT INTO employments VALUES("590","2024-01-01","2024-01-01","600","Security Guard","Field","Sunday","Saturday","2","","","2024-05-29 16:27:59");
INSERT INTO employments VALUES("591","2024-01-01","2024-01-01","601","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 11:47:06");
INSERT INTO employments VALUES("592","0024-01-02","2024-01-01","602","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 13:38:03");
INSERT INTO employments VALUES("593","2024-01-01","2024-01-01","603","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 13:43:42");
INSERT INTO employments VALUES("594","2024-01-01","2024-01-01","604","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 13:44:56");
INSERT INTO employments VALUES("595","2024-01-01","2024-01-01","605","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 16:22:19");
INSERT INTO employments VALUES("596","2024-01-01","2024-01-01","606","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 16:55:04");
INSERT INTO employments VALUES("597","2024-01-01","2024-01-01","607","Security Guard","Field","Sunday","Saturday","2","","","2024-05-30 17:04:29");
INSERT INTO employments VALUES("598","2024-01-01","2024-01-01","608","Security Guard","Field","Sunday","Saturday","2","","","2024-05-31 14:11:14");
INSERT INTO employments VALUES("599","2024-01-01","2024-01-01","609","Security Guard","Field","Sunday","Saturday","2","","","2024-05-31 14:17:35");
INSERT INTO employments VALUES("600","2024-01-01","2024-01-01","610","Security Guard","Field","Sunday","Saturday","2","","","2024-05-31 14:50:52");
INSERT INTO employments VALUES("601","2024-01-01","2024-01-01","611","Security Guard","Field","Sunday","Saturday","2","","","2024-05-31 14:51:29");
INSERT INTO employments VALUES("602","2024-01-01","2024-01-01","612","Security Guard","Field","Sunday","Saturday","2","","","2024-05-31 14:52:02");



CREATE TABLE `holidays` (
  `holiday_id` int(11) NOT NULL AUTO_INCREMENT,
  `holiday_date` date NOT NULL,
  `holiday` varchar(200) NOT NULL,
  `national_local` varchar(255) NOT NULL DEFAULT 'National Holiday',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`holiday_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO holidays VALUES("1","2024-06-12","Independence Day","National Holiday","2024-07-11 20:22:42");
INSERT INTO holidays VALUES("2","2024-05-01","Labor Day","National Holiday","2024-07-29 17:33:32");



CREATE TABLE `loan_payments` (
  `payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `loans` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `to_pay` float NOT NULL,
  `amount` float NOT NULL,
  `year` varchar(255) NOT NULL,
  `period` varchar(255) NOT NULL,
  `loan_types` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO loan_payments VALUES("1","2","2","","1800","100","2024","January 1 to 15","12","2024-09-13 14:43:49");



CREATE TABLE `loans` (
  `loan_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `amount` float NOT NULL,
  `balance` float NOT NULL,
  `target_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `loan_type` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT 1,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`loan_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO loans VALUES("1","39","ca","3150","3150","2024-01-01 13:01:00","34","1","2024-08-15 09:42:29");
INSERT INTO loans VALUES("2","2","awdwa","2000","1700","2024-09-13 14:43:49","12","1","2024-09-13 11:51:55");



CREATE TABLE `mortuaries` (
  `mortuary_id` int(11) NOT NULL AUTO_INCREMENT,
  `period` varchar(100) NOT NULL,
  `year` varchar(100) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`mortuary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




CREATE TABLE `payslip_rates` (
  `rate_id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`rate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO payslip_rates VALUES("1","4","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","2024-08-27 11:54:44");
INSERT INTO payslip_rates VALUES("2","2","62.50","78.13","6.25","81.25","105.63","0","81.25","0","0","0","0","0","0","125","162.50","1","2024-08-27 13:40:47");



CREATE TABLE `payslips` (
  `payslip_id` int(11) NOT NULL AUTO_INCREMENT,
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
  PRIMARY KEY (`payslip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO payslips VALUES("1","15","112","0","7000","","","","","","","360","250","20","8000","630","","200","200","7170","2024-08-27 14:35:06","35","2","2024","June 1 to 15","112","120","0","0","0","0","8","0","8","0","1000","0","0","0","2","0");
INSERT INTO payslips VALUES("2","15","104","1300","6500","","","","","","","360","250","20","7800","630","","200","200","6970","2024-08-27 14:35:06","34","2","2024","June 1 to 15","104","120","0","0","0","0","0","0","0","0","0","0","0","0","2","0");
INSERT INTO payslips VALUES("3","","","0","","","","","","","","","","20","","20","","","","-20","2024-08-27 14:35:06","190","2","2024","June 1 to 15","0","0","0","0","0","0","0","0","0","0","0","0","0","0","2","0");
INSERT INTO payslips VALUES("4","13","104","0","6500","","","","","","","292.5","250","20","6500","562.5","","200","200","5737.5","2024-08-27 14:35:06","331","2","2024","June 1 to 15","104","104","0","0","0","0","0","0","0","0","0","0","0","0","2","0");
INSERT INTO payslips VALUES("5","4","32","0","2000","","","","","","","135","250","20","2000","405","","200","200","1395","2024-08-27 14:35:06","31","2","2024","June 1 to 15","32","32","0","0","0","0","0","0","0","0","0","0","0","0","2","0");



CREATE TABLE `petty_cash_reports` (
  `petty_cash_report_id` int(11) NOT NULL AUTO_INCREMENT,
  `voucher` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `remarks` text NOT NULL,
  `date_modify` date NOT NULL DEFAULT current_timestamp(),
  `cash_in` float NOT NULL,
  `cash_out` float NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`petty_cash_report_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO petty_cash_reports VALUES("1","","","fund","2024-07-11","10000","0","2024-07-11 20:54:58");
INSERT INTO petty_cash_reports VALUES("2","","","Encashment","2024-07-16","100","0","2024-07-16 09:35:52");



CREATE TABLE `pettycash` (
  `pettycash_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `requested_by` varchar(255) NOT NULL,
  `remarks` varchar(255) NOT NULL,
  `posted` int(11) DEFAULT 2,
  `amount` int(255) NOT NULL,
  PRIMARY KEY (`pettycash_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO pettycash VALUES("1","2024-07-11 20:55:14","Administrator","fund","1","10000");
INSERT INTO pettycash VALUES("2","2024-07-16 09:35:52","cash","Encashment","2","100");



CREATE TABLE `requisition` (
  `requisition_id` int(11) NOT NULL AUTO_INCREMENT,
  `req_id` int(11) NOT NULL,
  `req_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `remarks` varchar(255) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `paid_to` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'DRAFT',
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`requisition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO requisition VALUES("1","97565867","2024-07-11 20:36:19","Sample","Kuya Meralco","","DRAFT","0");
INSERT INTO requisition VALUES("2","78824016","2024-07-11 20:53:40","Sample2","Kuya Meralco2","","DRAFT","0");
INSERT INTO requisition VALUES("3","54892715","2024-07-16 09:32:23","In payment for the motorized allowance","CASH","","DRAFT","0");



CREATE TABLE `requisition_info` (
  `requisition_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `requisition_id` int(11) NOT NULL,
  `vat_non_vat` varchar(255) NOT NULL,
  `particulars` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `basic_unit` varchar(255) NOT NULL,
  `quantity` varchar(255) NOT NULL,
  `unit_price` varchar(255) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `requisition_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`requisition_info_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

INSERT INTO requisition_info VALUES("1","1","Vat","Food","FOOD & MEALS","PACKS","1","1000","1000","0");
INSERT INTO requisition_info VALUES("2","1","Vat","Food","FOOD & MEALS","PACKS","1","1000","1000","0");
INSERT INTO requisition_info VALUES("3","1","Vat","Fuel","FUEL & GASOLINE","PCS","1","1000","1000","0");
INSERT INTO requisition_info VALUES("4","2","Vat","asdasd","EQUIPMENT","BOTTLES","1","100","100","0");
INSERT INTO requisition_info VALUES("5","2","Vat","sadasd","FOOD & MEALS","PACKS","1","500","500","1");



CREATE TABLE `service_deductions` (
  `service_deduction_id` int(11) NOT NULL AUTO_INCREMENT,
  `price_from` varchar(255) NOT NULL,
  `price_to` varchar(255) NOT NULL,
  `msc` varchar(255) NOT NULL,
  `er` varchar(255) NOT NULL,
  `ee` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` varchar(100) NOT NULL,
  PRIMARY KEY (`service_deduction_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO service_deductions VALUES("30","1","3249.99","3000","255","135","2024-04-12 23:46:20","sss");
INSERT INTO service_deductions VALUES("31","3250","3749.99","3500","297.5","157.5","2024-04-12 23:46:42","sss");
INSERT INTO service_deductions VALUES("32","3750","4249.99","4000","340","180","2024-04-12 23:47:09","sss");
INSERT INTO service_deductions VALUES("33","4250","4749.99","4500","382.5","202.5","2024-04-12 23:47:31","sss");
INSERT INTO service_deductions VALUES("34","4750","5249.99","5000","425","225","2024-04-12 23:48:07","sss");
INSERT INTO service_deductions VALUES("35","5250","5749.99","5500","467.5","247.5","2024-04-12 23:48:30","sss");
INSERT INTO service_deductions VALUES("36","5750","6249.99","6000","510","270","2024-04-12 23:50:18","sss");
INSERT INTO service_deductions VALUES("37","6250","6749.99","6500","552.5","292.5","2024-04-12 23:50:36","sss");
INSERT INTO service_deductions VALUES("38","6750","7249.99","7000","595","315","2024-04-12 23:51:00","sss");
INSERT INTO service_deductions VALUES("39","7250","7749.99","7500","637.5","337.5","2024-04-12 23:51:45","sss");
INSERT INTO service_deductions VALUES("40","7750","8249.99","8000","680","360","2024-04-12 23:52:19","sss");
INSERT INTO service_deductions VALUES("41","8250","8749.99","8500","722.5","382.5","2024-04-12 23:52:39","sss");
INSERT INTO service_deductions VALUES("42","8750","9249.99","9000","765","405","2024-04-12 23:52:59","sss");
INSERT INTO service_deductions VALUES("43","9250","9749.99","9500","807.5","427.5","2024-04-12 23:53:19","sss");
INSERT INTO service_deductions VALUES("44","9750","10249.99","10000","850","450","2024-04-12 23:53:49","sss");
INSERT INTO service_deductions VALUES("45","10250","10749.99","10500","892.5","472.5","2024-04-12 23:54:10","sss");
INSERT INTO service_deductions VALUES("46","10740","11249.99","11000","935","495","2024-04-12 23:54:38","sss");
INSERT INTO service_deductions VALUES("47","11250","11749.99","11500","977.5","517.5","2024-04-12 23:55:03","sss");
INSERT INTO service_deductions VALUES("48","11750","12249.99","12000","1020","540","2024-04-12 23:55:28","sss");
INSERT INTO service_deductions VALUES("49","12250","12749.99","12500","1062.5","562.5","2024-04-12 23:55:52","sss");
INSERT INTO service_deductions VALUES("50","12750","13249.99","13000","1105","585","2024-04-12 23:56:13","sss");
INSERT INTO service_deductions VALUES("51","13250","13749.99","13500","1147.5","607.5","2024-04-12 23:56:33","sss");
INSERT INTO service_deductions VALUES("52","14250","14749.99","14500","1232.5","652.5","2024-04-12 23:57:30","sss");
INSERT INTO service_deductions VALUES("53","14750","15249.99","15000","1275","675","2024-04-12 23:57:55","sss");
INSERT INTO service_deductions VALUES("54","15250","15749.99","15500","1317.5","697.5","2024-04-12 23:58:18","sss");
INSERT INTO service_deductions VALUES("55","15750","16249.99","16000","1360","720","2024-04-12 23:59:19","sss");
INSERT INTO service_deductions VALUES("56","16250","16749.99","16500","1402.5","742.5","2024-04-12 23:59:59","sss");
INSERT INTO service_deductions VALUES("57","16750","17249.99","17000","1445","765","2024-04-13 00:00:28","sss");
INSERT INTO service_deductions VALUES("58","17250","17749.99","17500","1487.5","787.5","2024-04-13 00:00:55","sss");
INSERT INTO service_deductions VALUES("59","17750","18249.99","18000","1530","810","2024-04-13 00:01:20","sss");
INSERT INTO service_deductions VALUES("60","18250","50000","50498.7","4292.5","2272.5","2024-06-07 07:32:40","sss");
INSERT INTO service_deductions VALUES("61","1","999999999999999999999999999999999999","9999999999999999999999999999999999999","250","250","2024-06-27 18:57:03","phil");
INSERT INTO service_deductions VALUES("62","1","999999999999999999999999999999999999","9999999999999999999999999999999999999","200","200","2024-06-27 18:57:33","pagibig");



CREATE TABLE `system_types` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `affects_in` int(11) NOT NULL,
  `affects_value` int(11) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO system_types VALUES("12","Overpayment INC & UNI","loan_type","0","0","2024-04-12 21:49:07");
INSERT INTO system_types VALUES("13","Overpayment (Adj.)","loan_type","0","0","2024-04-12 21:49:20");
INSERT INTO system_types VALUES("14","Only One Flexi May 09 or May 14","loan_type","0","0","2024-04-12 21:49:29");
INSERT INTO system_types VALUES("15","Pandayan Deduction","loan_type","0","0","2024-04-12 21:49:50");
INSERT INTO system_types VALUES("16","OVERPAYMENT","loan_type","0","0","2024-04-12 21:49:59");
INSERT INTO system_types VALUES("17","Company ID","loan_type","0","0","2024-04-12 21:50:07");
INSERT INTO system_types VALUES("18","CBASTRAC TRAINING","loan_type","0","0","2024-04-12 21:50:14");
INSERT INTO system_types VALUES("19","Philhealth 1% 2022","loan_type","0","0","2024-04-12 21:50:25");
INSERT INTO system_types VALUES("20","Laptop","loan_type","0","0","2024-04-12 21:50:32");
INSERT INTO system_types VALUES("21","SSS CONTRI","loan_type","0","0","2024-04-12 21:50:38");
INSERT INTO system_types VALUES("22","Pag ibig Penalty","loan_type","0","0","2024-04-12 21:50:47");
INSERT INTO system_types VALUES("23","Cash Advance","loan_type","1","1","2024-04-12 21:54:33");
INSERT INTO system_types VALUES("24","Lic. Renewal","loan_type","0","0","2024-04-12 21:54:41");
INSERT INTO system_types VALUES("25","Meal","loan_type","0","0","2024-04-12 21:54:49");
INSERT INTO system_types VALUES("26","Lost Firearm","loan_type","0","0","2024-04-12 21:55:31");
INSERT INTO system_types VALUES("27","Supplies","loan_type","0","0","2024-04-12 21:55:42");
INSERT INTO system_types VALUES("28","Death Contri","loan_type","0","0","2024-04-12 21:55:50");
INSERT INTO system_types VALUES("29","ID","loan_type","0","0","2024-04-12 21:55:55");
INSERT INTO system_types VALUES("30","Salary Loan","loan_type","0","0","2024-04-12 21:56:01");
INSERT INTO system_types VALUES("31","Policy Loan","loan_type","0","0","2024-04-12 21:56:41");
INSERT INTO system_types VALUES("32","Calamity Loan","loan_type","0","0","2024-04-12 21:56:49");
INSERT INTO system_types VALUES("33","Multi Purpose","loan_type","0","0","2024-04-12 21:57:06");
INSERT INTO system_types VALUES("34","Cash Advance 2","loan_type","1","1","2024-04-12 21:57:12");
INSERT INTO system_types VALUES("35","Cash Advance 3","loan_type","1","1","2024-04-12 21:57:20");
INSERT INTO system_types VALUES("36","Firing","loan_type","0","0","2024-04-12 21:57:26");
INSERT INTO system_types VALUES("37","FA","loan_type","0","0","2024-04-12 21:57:31");
INSERT INTO system_types VALUES("38","Emergency","loan_type","0","0","2024-04-12 21:57:37");
INSERT INTO system_types VALUES("39","Certificates","loan_type","0","0","2024-04-12 21:57:41");
INSERT INTO system_types VALUES("40","Cash Advance 4","loan_type","1","1","2024-04-12 21:57:53");
INSERT INTO system_types VALUES("41","Cash Advance 5","loan_type","1","1","2024-04-12 21:57:58");
INSERT INTO system_types VALUES("42","Bank Charges","loan_type","0","0","2024-04-12 21:58:05");
INSERT INTO system_types VALUES("43","Cash Advance 6","loan_type","1","1","2024-04-12 21:58:10");
INSERT INTO system_types VALUES("45","Uniform Less","loan_type","0","0","2024-04-12 21:59:09");
INSERT INTO system_types VALUES("46","Medical","loan_type","0","0","2024-04-12 21:59:14");
INSERT INTO system_types VALUES("47","SSS LOAN 1","loan_type","0","0","2024-04-12 21:59:19");
INSERT INTO system_types VALUES("48","SSS CALAMITY 1","loan_type","0","0","2024-04-12 21:59:24");
INSERT INTO system_types VALUES("49","BSMA Training","loan_type","0","0","2024-04-12 21:59:29");
INSERT INTO system_types VALUES("50","Seminar","loan_type","0","0","2024-04-12 21:59:34");
INSERT INTO system_types VALUES("51","OVER PAYMENT - NOV 2","loan_type","0","0","2024-04-12 21:59:40");
INSERT INTO system_types VALUES("52","Overpayment INC & UNI","loan_type","0","0","2024-04-12 22:00:01");
INSERT INTO system_types VALUES("53","Overpayment (Adj.)","loan_type","0","0","2024-04-12 22:00:17");
INSERT INTO system_types VALUES("54","Only One Flexi May 09 or May 14","loan_type","0","0","2024-04-12 22:00:22");
INSERT INTO system_types VALUES("55","Pandayan Deduction","loan_type","0","0","2024-04-12 22:00:34");
INSERT INTO system_types VALUES("56","OVERPAYMENT","loan_type","0","0","2024-04-12 22:00:39");
INSERT INTO system_types VALUES("57","Company ID","loan_type","0","0","2024-04-12 22:00:50");
INSERT INTO system_types VALUES("58","CBASTRAC TRAINING","loan_type","0","0","2024-04-12 22:00:54");
INSERT INTO system_types VALUES("59","Philhealth 1% 2022","loan_type","0","0","2024-04-12 22:00:59");
INSERT INTO system_types VALUES("60","NLRC Case","expense_type","0","0","2024-04-12 22:03:07");
INSERT INTO system_types VALUES("61","Salaries & Wages Guards","expense_type","0","0","2024-04-12 22:03:12");
INSERT INTO system_types VALUES("62","Salaries & Wages Management","expense_type","0","0","2024-04-12 22:03:23");
INSERT INTO system_types VALUES("63","SSS, Philhealth & E.C.","expense_type","0","0","2024-04-12 22:03:28");
INSERT INTO system_types VALUES("64","Pag-ibig Contribution","expense_type","0","0","2024-04-12 22:03:41");
INSERT INTO system_types VALUES("65","Taxes & Licenses","expense_type","0","0","2024-04-12 22:04:13");
INSERT INTO system_types VALUES("66","Fringe Benefits","expense_type","0","0","2024-04-12 22:04:18");
INSERT INTO system_types VALUES("67","Interest","expense_type","0","0","2024-04-12 22:04:25");
INSERT INTO system_types VALUES("68","Food Non-Vat","expense_type","0","0","2024-04-12 22:04:30");
INSERT INTO system_types VALUES("69","Miscellaneous Non-Vat","expense_type","0","0","2024-04-12 22:04:35");
INSERT INTO system_types VALUES("70","Water","expense_type","0","0","2024-04-12 22:04:40");
INSERT INTO system_types VALUES("71","Telecommunication","expense_type","0","0","2024-04-12 22:04:46");
INSERT INTO system_types VALUES("72","Light & Electricity","expense_type","0","0","2024-04-12 22:04:57");
INSERT INTO system_types VALUES("73","Representation","expense_type","0","0","2024-04-12 22:05:46");
INSERT INTO system_types VALUES("74","Repairs & Maintenance","expense_type","0","0","2024-04-12 22:05:52");
INSERT INTO system_types VALUES("75","Transportation","expense_type","0","0","2024-04-12 22:05:57");
INSERT INTO system_types VALUES("76","Fuel & Gasoline","expense_type","0","0","2024-04-12 22:06:02");
INSERT INTO system_types VALUES("77","Miscellaneous VAT","expense_type","0","0","2024-04-12 22:06:07");
INSERT INTO system_types VALUES("78","Rental","expense_type","0","0","2024-04-12 22:06:12");
INSERT INTO system_types VALUES("79","Supplies","expense_type","0","0","2024-04-12 22:06:18");
INSERT INTO system_types VALUES("80","Foods & Meals","expense_type","0","0","2024-04-12 22:06:25");
INSERT INTO system_types VALUES("81","Ammunition","expense_type","0","0","2024-04-12 22:06:30");
INSERT INTO system_types VALUES("82","Other","expense_type","0","0","2024-04-12 22:06:35");
INSERT INTO system_types VALUES("83","Fund Transfer","expense_type","0","0","2024-04-12 22:06:42");
INSERT INTO system_types VALUES("84","Cash Advance Guards","expense_type","0","0","2024-04-12 22:06:48");
INSERT INTO system_types VALUES("85","Cash Advance Management","expense_type","0","0","2024-04-12 22:06:57");
INSERT INTO system_types VALUES("86","Others","expense_type","0","0","2024-04-12 22:07:01");
INSERT INTO system_types VALUES("87","Personal Expenses","expense_type","0","0","2024-04-12 22:07:06");
INSERT INTO system_types VALUES("88","Equipment","expense_type","0","0","2024-04-12 22:07:10");
INSERT INTO system_types VALUES("89","Salaries & Wages Officers/Inspectors","expense_type","0","0","2024-04-12 22:07:16");
INSERT INTO system_types VALUES("90","Interest for Cash Advance","expense_type","0","0","2024-04-12 22:07:25");
INSERT INTO system_types VALUES("91","Purchases Firearms/Radios/Metal Detectors","expense_type","0","0","2024-04-12 22:08:20");
INSERT INTO system_types VALUES("92","Bank Transfer - Bank","expense_type","0","0","2024-04-12 22:08:25");
INSERT INTO system_types VALUES("93","Bank Transfer - Guards","expense_type","0","0","2024-04-12 22:08:33");
INSERT INTO system_types VALUES("94","Background Investigation","expense_type","0","0","2024-04-12 22:08:39");
INSERT INTO system_types VALUES("95","Financial Assistance - DOLE","expense_type","0","0","2024-04-12 22:08:46");
INSERT INTO system_types VALUES("96","Manpower Expenses","expense_type","0","0","2024-04-12 22:08:51");
INSERT INTO system_types VALUES("97","Manpower Expenses - Others","expense_type","0","0","2024-04-12 22:09:02");
INSERT INTO system_types VALUES("98","SSS Sickness Reimbursement","expense_type","0","0","2024-04-12 22:09:29");
INSERT INTO system_types VALUES("99","Cash Bond","expense_type","0","0","2024-04-12 22:09:52");
INSERT INTO system_types VALUES("100","Backwages","expense_type","0","0","2024-04-12 22:09:59");
INSERT INTO system_types VALUES("101","Cash Bond - DOLE Case","expense_type","0","0","2024-04-12 22:10:07");
INSERT INTO system_types VALUES("102","Insurance Reimbursement","expense_type","0","0","2024-04-12 22:10:11");
INSERT INTO system_types VALUES("103","Insurance","expense_type","0","0","2024-04-12 22:10:16");
INSERT INTO system_types VALUES("104","DOLE Expenses","expense_type","0","0","2024-04-12 22:10:23");
INSERT INTO system_types VALUES("105","Certification","expense_type","0","0","2024-04-12 22:10:28");
INSERT INTO system_types VALUES("106","Retirement","expense_type","0","0","2024-04-12 22:10:33");
INSERT INTO system_types VALUES("107","NLRC Case","expense_type","0","0","2024-04-12 22:10:38");
INSERT INTO system_types VALUES("108","Pag Ibig Cont. Additonal Payment ","loan_type","0","0","2024-04-13 00:01:58");



CREATE TABLE `user_authentication` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_type` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `pin` varchar(255) NOT NULL,
  `email_address` varchar(255) NOT NULL,
  `active` int(11) DEFAULT 1,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO user_authentication VALUES("1","NO_AUTHENTICATION","","","","","1");
INSERT INTO user_authentication VALUES("2","USERNAME_PASSWORD","jhonorlan","123456","","","1");
INSERT INTO user_authentication VALUES("3","PIN_AUTHENTICATION","","","123457","","2");
INSERT INTO user_authentication VALUES("4","EMAIL_AUTHENTICATION","","","","jhonorlantero@gmail.com","1");



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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO user_profile VALUES("MAIN_PROFILE","CDM","SECURITY AGENCY INC.","aw","Saluysoy Meycauayan City Bulacan","(044) 840-8145","0","cdmcorporation@yahoo.com","public/assets/media/uploads/cBWso.jpg","public/assets/media/uploads/fwgKe.jpg","2024","January 1 to 15","2024-04-17 12:43:23");

