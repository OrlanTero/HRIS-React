-- Add restday_ot column to clients table if it doesn't exist
ALTER TABLE clients ADD COLUMN IF NOT EXISTS restday_ot DECIMAL(10,2) DEFAULT 0.00 AFTER special_holiday_ot; 