CREATE TABLE IF NOT EXISTS cms_revisions (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 content_key text NOT NULL,
 payload jsonb NOT NULL,
 note text
);
CREATE TABLE IF NOT EXISTS cms_media (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 name text NOT NULL,
 url text NOT NULL,
 alt_text text,
 caption text,
 folder text DEFAULT 'General',
 tags text,
 width integer,
 height integer
);
CREATE TABLE IF NOT EXISTS cms_settings (
 setting_key text PRIMARY KEY,
 payload jsonb NOT NULL,
 updated_at timestamptz NOT NULL DEFAULT now()
);