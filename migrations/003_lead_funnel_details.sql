ALTER TABLE leads ADD COLUMN IF NOT EXISTS planning_stage text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS date_flexibility text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS accommodation text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS transport text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS contact_preference text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS priority_tags text;