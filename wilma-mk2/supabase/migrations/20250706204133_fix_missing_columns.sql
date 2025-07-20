-- Fix schema cache issues for guests table
-- This migration ensures all columns are properly indexed and accessible

-- Refresh the schema cache
NOTIFY pgrst, 'reload schema';

-- Add indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_guests_wedding_id ON guests(wedding_id);
CREATE INDEX IF NOT EXISTS idx_guests_rsvp_status ON guests(rsvp_status);
CREATE INDEX IF NOT EXISTS idx_guests_side ON guests(side);
CREATE INDEX IF NOT EXISTS idx_guests_plus_one ON guests(plus_one);
CREATE INDEX IF NOT EXISTS idx_guests_relationship ON guests(relationship_to_couple);

-- Add comment to track this migration
COMMENT ON TABLE guests IS 'Gäste-Tabelle mit korrektem Schema-Cache - aktualisiert 2025-01-06';
