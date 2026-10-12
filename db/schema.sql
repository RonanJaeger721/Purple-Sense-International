-- Apply to a dedicated Postgres database before setting DATABASE_URL.
CREATE TABLE IF NOT EXISTS quote_enquiries (
 reference text PRIMARY KEY,
 payload jsonb NOT NULL,
 status text NOT NULL CHECK (status IN ('pending', 'emailed', 'failed')),
 created_at timestamptz NOT NULL DEFAULT now()
);
-- This table contains customer information. Restrict DB credentials to the server.
