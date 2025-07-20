-- Migration: Form Drafts Table for Auto-Save Feature
-- Description: Creates a table to store form drafts for auto-save functionality
-- Date: 2025-07-14

-- Create form_drafts table
CREATE TABLE IF NOT EXISTS public.form_drafts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    form_key TEXT NOT NULL,
    form_data JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure one draft per user per form
    UNIQUE(user_id, form_key)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_form_drafts_user_id ON public.form_drafts(user_id);
CREATE INDEX IF NOT EXISTS idx_form_drafts_form_key ON public.form_drafts(form_key);
CREATE INDEX IF NOT EXISTS idx_form_drafts_updated_at ON public.form_drafts(updated_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.form_drafts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own form drafts
CREATE POLICY "Users can view their own form drafts" ON public.form_drafts
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own form drafts" ON public.form_drafts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own form drafts" ON public.form_drafts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own form drafts" ON public.form_drafts
    FOR DELETE USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_form_drafts_updated_at 
    BEFORE UPDATE ON public.form_drafts 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant necessary permissions
GRANT ALL ON public.form_drafts TO authenticated;
GRANT ALL ON public.form_drafts TO service_role;

-- Add helpful comments
COMMENT ON TABLE public.form_drafts IS 'Stores form drafts for auto-save functionality';
COMMENT ON COLUMN public.form_drafts.user_id IS 'Reference to the authenticated user';
COMMENT ON COLUMN public.form_drafts.form_key IS 'Unique identifier for the form type (e.g., budget-calculator)';
COMMENT ON COLUMN public.form_drafts.form_data IS 'JSON data containing the form state';
COMMENT ON COLUMN public.form_drafts.created_at IS 'When the draft was first created';
COMMENT ON COLUMN public.form_drafts.updated_at IS 'When the draft was last updated';
