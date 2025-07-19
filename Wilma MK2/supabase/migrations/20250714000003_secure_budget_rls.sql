-- Secure Budget RLS Migration
-- Adds user_id column and implements proper Row Level Security

-- Add user_id column to budget_calculations
ALTER TABLE budget_calculations ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Add user_id column to email_logs  
ALTER TABLE email_logs ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create form_drafts table for auto-save functionality
CREATE TABLE form_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    form_key VARCHAR(100) NOT NULL,
    form_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, form_key)
);

-- Update budget_calculations with additional fields for better data structure
ALTER TABLE budget_calculations ADD COLUMN input_data JSONB;
ALTER TABLE budget_calculations ADD COLUMN category_breakdown JSONB;
ALTER TABLE budget_calculations ADD COLUMN ai_recommendations JSONB;
ALTER TABLE budget_calculations ADD COLUMN confidence_score DECIMAL(3,2) DEFAULT 0.75;

-- Drop existing public access policies
DROP POLICY IF EXISTS "Allow public access to budget_calculations" ON budget_calculations;
DROP POLICY IF EXISTS "Allow public access to email_logs" ON email_logs;

-- Create secure RLS policies for budget_calculations
CREATE POLICY "Users can only access their own budgets" ON budget_calculations
    FOR ALL USING (auth.uid() = user_id);

-- Create secure RLS policies for email_logs
CREATE POLICY "Users can only access their own email logs" ON email_logs
    FOR ALL USING (auth.uid() = user_id);

-- Create RLS policies for form_drafts
ALTER TABLE form_drafts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can only access their own form drafts" ON form_drafts
    FOR ALL USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_budget_calculations_user_id ON budget_calculations(user_id);
CREATE INDEX idx_budget_calculations_user_created ON budget_calculations(user_id, created_at DESC);
CREATE INDEX idx_email_logs_user_id ON email_logs(user_id);
CREATE INDEX idx_form_drafts_user_key ON form_drafts(user_id, form_key);
CREATE INDEX idx_form_drafts_updated ON form_drafts(updated_at DESC);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for auto-updating timestamps
CREATE TRIGGER update_budget_calculations_updated_at 
    BEFORE UPDATE ON budget_calculations 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_form_drafts_updated_at 
    BEFORE UPDATE ON form_drafts 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to migrate existing email-based data to user-based
CREATE OR REPLACE FUNCTION migrate_email_to_user_data()
RETURNS void AS $$
DECLARE
    budget_record RECORD;
    user_record RECORD;
BEGIN
    -- Migrate budget_calculations
    FOR budget_record IN 
        SELECT * FROM budget_calculations WHERE user_id IS NULL AND email IS NOT NULL
    LOOP
        -- Try to find user by email
        SELECT id INTO user_record FROM auth.users WHERE email = budget_record.email LIMIT 1;
        
        IF FOUND THEN
            UPDATE budget_calculations 
            SET user_id = user_record.id 
            WHERE id = budget_record.id;
        END IF;
    END LOOP;
    
    -- Migrate email_logs
    FOR budget_record IN 
        SELECT * FROM email_logs WHERE user_id IS NULL AND email IS NOT NULL
    LOOP
        -- Try to find user by email
        SELECT id INTO user_record FROM auth.users WHERE email = budget_record.email LIMIT 1;
        
        IF FOUND THEN
            UPDATE email_logs 
            SET user_id = user_record.id 
            WHERE id = budget_record.id;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute migration (can be run safely multiple times)
SELECT migrate_email_to_user_data();

-- Add comments for documentation
COMMENT ON TABLE form_drafts IS 'Stores auto-saved form data for users';
COMMENT ON COLUMN budget_calculations.user_id IS 'Links budget to authenticated user for RLS';
COMMENT ON COLUMN budget_calculations.input_data IS 'Complete form input data as JSON';
COMMENT ON COLUMN budget_calculations.category_breakdown IS 'Calculated budget categories';
COMMENT ON COLUMN budget_calculations.ai_recommendations IS 'AI-generated recommendations and tips';
COMMENT ON COLUMN budget_calculations.confidence_score IS 'Confidence in calculation accuracy (0.0-1.0)';
