CREATE TABLE IF NOT EXISTS trip_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  destination TEXT,
  start_date DATE,
  end_date DATE,
  style TEXT,
  budget TEXT,
  interests TEXT,
  plan_json TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)