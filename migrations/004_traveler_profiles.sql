CREATE TABLE IF NOT EXISTS traveler_profiles (
  user_id TEXT PRIMARY KEY,
  display_name TEXT,
  home_city TEXT,
  travel_style TEXT,
  interests TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)