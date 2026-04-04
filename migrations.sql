-- Migration: Add verificationId column to otps table
-- Date: 2026-02-09
-- Description: Adds MessageCentral verificationId support and extends OTP purposes

-- Add verificationId column
ALTER TABLE otps 
ADD COLUMN IF NOT EXISTS "verificationId" VARCHAR NULL;

-- Drop old constraint if it exists
ALTER TABLE otps 
DROP CONSTRAINT IF EXISTS "CHK_otps_purpose";

-- Add new constraint with updated purposes (register, login, vote)
ALTER TABLE otps 
ADD CONSTRAINT "CHK_otps_purpose" 
CHECK (purpose IN ('register', 'login', 'vote'));

-- Create index on phone for faster lookups
CREATE INDEX IF NOT EXISTS "IDX_otps_phone_purpose" 
ON otps (phone, purpose);

-- Create index on verificationId for faster lookups
CREATE INDEX IF NOT EXISTS "IDX_otps_verificationId" 
ON otps ("verificationId");

-- Verify the migration
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'otps' 
AND column_name = 'verificationId';
