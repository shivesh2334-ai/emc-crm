-- Matches prisma/schema.prisma's Lead model exactly.
-- Used for manual schema bootstrap (e.g. pasting into Supabase SQL editor).
-- The authoritative migration history is in prisma/migrations/.
CREATE TABLE IF NOT EXISTS "Lead" (
  "id" TEXT PRIMARY KEY,
  "name" TEXT NOT NULL,
  "mobile" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'NEW',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Auto-update "updatedAt" on every row update (for non-ORM direct SQL writes).
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_lead_updated_at ON "Lead";
CREATE TRIGGER set_lead_updated_at
  BEFORE UPDATE ON "Lead"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

