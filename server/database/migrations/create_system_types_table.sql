-- Add db_status column to system_types table

-- Check if system_types table exists, if not create it
CREATE TABLE IF NOT EXISTS system_types (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(200) NOT NULL,
  `category` varchar(100) NOT NULL,
  `affects_in` int(11) NOT NULL DEFAULT 0,
  `affects_value` int(11) NOT NULL DEFAULT 0,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `db_status` tinyint(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Add db_status column if it doesn't exist
ALTER TABLE system_types 
ADD COLUMN IF NOT EXISTS `db_status` tinyint(1) NOT NULL DEFAULT 1;

-- Insert default loan types if system_types is empty
INSERT INTO system_types (`type`, `category`, `affects_in`, `affects_value`, `db_status`)
SELECT 'Cash Advance', 'loan_type', 1, 1, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM system_types WHERE category = 'loan_type' LIMIT 1);

INSERT INTO system_types (`type`, `category`, `affects_in`, `affects_value`, `db_status`)
SELECT 'Salary Loan', 'loan_type', 0, 0, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM system_types WHERE type = 'Salary Loan' AND category = 'loan_type');

INSERT INTO system_types (`type`, `category`, `affects_in`, `affects_value`, `db_status`)
SELECT 'Emergency Loan', 'loan_type', 0, 0, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM system_types WHERE type = 'Emergency Loan' AND category = 'loan_type');

INSERT INTO system_types (`type`, `category`, `affects_in`, `affects_value`, `db_status`)
SELECT 'Calamity Loan', 'loan_type', 0, 0, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM system_types WHERE type = 'Calamity Loan' AND category = 'loan_type');

INSERT INTO system_types (`type`, `category`, `affects_in`, `affects_value`, `db_status`)
SELECT 'Multi-Purpose Loan', 'loan_type', 0, 0, 1 FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM system_types WHERE type = 'Multi-Purpose Loan' AND category = 'loan_type'); 