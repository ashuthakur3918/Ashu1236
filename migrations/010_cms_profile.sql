CREATE TABLE IF NOT EXISTS cms_profiles (
 member_id text PRIMARY KEY,
 display_name text NOT NULL DEFAULT '',
 avatar_url text NOT NULL DEFAULT '',
 bio text NOT NULL DEFAULT '',
 timezone text NOT NULL DEFAULT 'Asia/Kolkata',
 email_notifications boolean NOT NULL DEFAULT true,
 theme text NOT NULL DEFAULT 'frontier',
 updated_at timestamptz NOT NULL DEFAULT now()
);