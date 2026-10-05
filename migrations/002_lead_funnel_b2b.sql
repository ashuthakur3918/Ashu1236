ALTER TABLE leads ADD COLUMN IF NOT EXISTS lead_type text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS company_name text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS agency_type text;