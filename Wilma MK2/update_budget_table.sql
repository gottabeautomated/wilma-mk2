-- Update der bestehenden budget_calculations Tabelle für Wilma MK2
-- Führe dieses SQL in deinem Supabase SQL Editor aus

-- Fehlende Spalten hinzufügen
ALTER TABLE budget_calculations 
ADD COLUMN IF NOT EXISTS email VARCHAR(255),
ADD COLUMN IF NOT EXISTS partner1_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS partner2_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS wedding_date DATE,
ADD COLUMN IF NOT EXISTS guest_count INTEGER,
ADD COLUMN IF NOT EXISTS wedding_style VARCHAR(50),
ADD COLUMN IF NOT EXISTS venue_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS season VARCHAR(20),
ADD COLUMN IF NOT EXISTS budget_breakdown JSONB,
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Bestehende Spalten beibehalten und anpassen
-- total_budget, category_breakdown, ai_recommendations sollten bleiben

-- Neue Indexes für Performance
CREATE INDEX IF NOT EXISTS idx_budget_calculations_email_new ON budget_calculations(email);
CREATE INDEX IF NOT EXISTS idx_budget_calculations_created_at_new ON budget_calculations(created_at);

-- RLS Policies prüfen und anpassen
ALTER TABLE budget_calculations ENABLE ROW LEVEL SECURITY;

-- Neue Policy erstellen (falls noch nicht vorhanden)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'budget_calculations' 
        AND policyname = 'Allow public access to budget_calculations'
    ) THEN
        CREATE POLICY "Allow public access to budget_calculations" ON budget_calculations
            FOR ALL USING (true);
    END IF;
END$$;

-- Test-Update um zu prüfen ob alles funktioniert
-- (Nur wenn du willst - vorsichtig bei bestehenden Daten!)
-- INSERT INTO budget_calculations (
--     email, partner1_name, partner2_name, wedding_date, 
--     guest_count, total_budget, wedding_style, venue_type, season, budget_breakdown
-- ) VALUES (
--     'test@wilma.de', 'Max', 'Maria', '2024-06-15',
--     80, 15000, 'elegant', 'castle', 'summer', '[]'::jsonb
-- );

-- Struktur prüfen
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'budget_calculations' 
ORDER BY ordinal_position; 