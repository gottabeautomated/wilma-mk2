-- Add missing updated_at column to guests table (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'guests' AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE guests ADD COLUMN updated_at timestamp with time zone default timezone('utc'::text, now()) not null;
    END IF;
END $$;

-- Create or replace the update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger for guests updated_at
DROP TRIGGER IF EXISTS update_guests_updated_at ON guests;
CREATE TRIGGER update_guests_updated_at 
  BEFORE UPDATE ON guests
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Fix guests policies to use wedding_id instead of user_id
DROP POLICY IF EXISTS "Users can view own guests" ON guests;
DROP POLICY IF EXISTS "Users can create guests" ON guests;
DROP POLICY IF EXISTS "Users can update guests" ON guests;
DROP POLICY IF EXISTS "Users can delete guests" ON guests;

-- Create new wedding-based policies
CREATE POLICY "Users can view own wedding guests" ON guests 
  FOR SELECT USING (
    wedding_id IN (
      SELECT id FROM weddings 
      WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create wedding guests" ON guests 
  FOR INSERT WITH CHECK (
    wedding_id IN (
      SELECT id FROM weddings 
      WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update wedding guests" ON guests 
  FOR UPDATE USING (
    wedding_id IN (
      SELECT id FROM weddings 
      WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete wedding guests" ON guests 
  FOR DELETE USING (
    wedding_id IN (
      SELECT id FROM weddings 
      WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
    )
  ); 