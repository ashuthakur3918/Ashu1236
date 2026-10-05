CREATE TABLE IF NOT EXISTS cms_drafts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 content_key text NOT NULL UNIQUE,
 payload jsonb NOT NULL,
 status text NOT NULL DEFAULT 'draft',
 updated_at timestamptz NOT NULL DEFAULT now(),
 scheduled_at timestamptz,
 published_at timestamptz
);
CREATE INDEX IF NOT EXISTS cms_drafts_status_idx ON cms_drafts(status);