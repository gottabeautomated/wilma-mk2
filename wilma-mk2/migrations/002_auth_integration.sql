-- Migration: Add user_id to existing tables, Foreign Keys, Migration Tracking, Updated_at Trigger
BEGIN;

-- 1. Spalte user_id zu bestehenden Tabellen hinzufügen (nullable für Migration)
ALTER TABLE public.budget_calculations ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.venue_analyses ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.email_captures ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
ALTER TABLE public.tool_sessions ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- 2. Migration Tracking
ALTER TABLE public.budget_calculations ADD COLUMN IF NOT EXISTS migrated_to_user boolean DEFAULT false;
ALTER TABLE public.venue_analyses ADD COLUMN IF NOT EXISTS migrated_to_user boolean DEFAULT false;
ALTER TABLE public.tool_sessions ADD COLUMN IF NOT EXISTS migrated_to_user boolean DEFAULT false;

-- 3. updated_at Trigger für alle Tabellen
DO $$
DECLARE
  tbl text;
BEGIN
  FOREACH tbl IN ARRAY ARRAY['budget_calculations', 'venue_analyses', 'email_captures', 'tool_sessions']
  LOOP
    -- Trigger-Funktion erstellen
    EXECUTE format($f$
      CREATE OR REPLACE FUNCTION public.set_%1$s_updated_at()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = now();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    $f$, tbl);
    
    -- Trigger erstellen (falls noch nicht vorhanden)
    EXECUTE format($f$
      DROP TRIGGER IF EXISTS trg_%1$s_updated_at ON public.%1$s;
      CREATE TRIGGER trg_%1$s_updated_at
        BEFORE UPDATE ON public.%1$s
        FOR EACH ROW
        EXECUTE FUNCTION public.set_%1$s_updated_at();
    $f$, tbl);
  END LOOP;
END $$;

COMMIT;

-- Rollback
-- ALTER TABLE public.budget_calculations DROP COLUMN IF EXISTS user_id, DROP COLUMN IF EXISTS migrated_to_user;
-- ALTER TABLE public.venue_analyses DROP COLUMN IF EXISTS user_id, DROP COLUMN IF EXISTS migrated_to_user;
-- ALTER TABLE public.email_captures DROP COLUMN IF EXISTS user_id;
-- ALTER TABLE public.tool_sessions DROP COLUMN IF EXISTS user_id, DROP COLUMN IF EXISTS migrated_to_user; 