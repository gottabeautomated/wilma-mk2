-- Migration: Add seating chart functionality tables
-- This migration adds tables for the seating chart functionality that are missing from the current schema

-- Drop existing table_assignment and seat_assignment columns from guests table
-- and add new structure compatible with seating chart
ALTER TABLE guests DROP COLUMN IF EXISTS table_assignment;
ALTER TABLE guests DROP COLUMN IF EXISTS seat_assignment;

-- Add new columns to guests table for seating chart compatibility
ALTER TABLE guests ADD COLUMN table_assignment_id UUID;
ALTER TABLE guests ADD COLUMN seat_number INTEGER;
ALTER TABLE guests ADD COLUMN seating_preferences TEXT;
ALTER TABLE guests ADD COLUMN photo_url TEXT;
ALTER TABLE guests ADD COLUMN photo_source TEXT CHECK (photo_source IN ('upload', 'social', 'contacts', 'ai_generated'));

-- Rename relationship column to relationship_to_couple for consistency
ALTER TABLE guests RENAME COLUMN relationship TO relationship_to_couple;

-- Update plus_one structure - rename plus_one_allowed to plus_one for consistency
ALTER TABLE guests RENAME COLUMN plus_one_allowed TO plus_one;

-- Add missing updated_at column to guests table
ALTER TABLE guests ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL;

-- Create trigger for updated_at on guests table
CREATE TRIGGER update_guests_updated_at BEFORE UPDATE ON guests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Tables for seating arrangements
CREATE TABLE tables (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('round', 'rectangle', 'oval', 'custom', 'l_shape', 'u_shape')),
  position JSONB NOT NULL, -- {x: number, y: number}
  rotation FLOAT DEFAULT 0,
  seats INTEGER NOT NULL CHECK (seats > 0),
  custom_shape TEXT,
  style JSONB NOT NULL DEFAULT '{"color": "#D4AF37", "material": "wood", "pattern": "solid"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Guest relationships for seating optimization
CREATE TABLE guest_relationships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings ON DELETE CASCADE NOT NULL,
  guest1_id UUID REFERENCES guests ON DELETE CASCADE NOT NULL,
  guest2_id UUID REFERENCES guests ON DELETE CASCADE NOT NULL,
  relationship_type TEXT NOT NULL CHECK (relationship_type IN ('family', 'friend', 'colleague', 'partner', 'enemy', 'ex', 'acquaintance')),
  strength INTEGER NOT NULL CHECK (strength BETWEEN 1 AND 10),
  should_sit_together BOOLEAN NOT NULL DEFAULT true,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(guest1_id, guest2_id)
);

-- Venue layouts for seating chart
CREATE TABLE venue_layouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  original_sketch_url TEXT,
  svg_layout TEXT,
  real_dimensions JSONB, -- {width: number, height: number}
  elements JSONB DEFAULT '[]', -- Array of venue elements
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seating optimizations for AI-powered seating
CREATE TABLE seating_optimizations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings ON DELETE CASCADE NOT NULL,
  optimization_score DECIMAL(5,2) NOT NULL,
  algorithm_version TEXT NOT NULL,
  parameters JSONB NOT NULL,
  result_data JSONB NOT NULL,
  applied BOOLEAN DEFAULT false,
  applied_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Guest photos for seating chart visualization
CREATE TABLE guest_photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  guest_id UUID REFERENCES guests ON DELETE CASCADE NOT NULL,
  storage_path TEXT NOT NULL,
  original_filename TEXT,
  file_size INTEGER,
  crop_data JSONB, -- {x: number, y: number, width: number, height: number}
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(guest_id)
);

-- Seating analytics for tracking user interactions
CREATE TABLE seating_analytics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  session_id TEXT,
  event_type TEXT NOT NULL,
  event_data JSONB NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table presets for reusable table configurations
CREATE TABLE table_presets (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('round', 'rectangle', 'oval', 'custom', 'l_shape', 'u_shape')),
  seats INTEGER NOT NULL CHECK (seats > 0),
  custom_shape TEXT,
  style JSONB NOT NULL DEFAULT '{"color": "#D4AF37", "material": "wood", "pattern": "solid"}',
  is_public BOOLEAN DEFAULT false,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on new tables
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE venue_layouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE seating_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE seating_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE table_presets ENABLE ROW LEVEL SECURITY;

-- Create policies for tables
CREATE POLICY "Users can view tables for their weddings" ON tables 
  FOR SELECT USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can create tables for their weddings" ON tables 
  FOR INSERT WITH CHECK (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can update tables for their weddings" ON tables 
  FOR UPDATE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can delete tables for their weddings" ON tables 
  FOR DELETE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

-- Create policies for guest_relationships
CREATE POLICY "Users can view guest relationships for their weddings" ON guest_relationships
  FOR SELECT USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can create guest relationships for their weddings" ON guest_relationships
  FOR INSERT WITH CHECK (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can update guest relationships for their weddings" ON guest_relationships
  FOR UPDATE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can delete guest relationships for their weddings" ON guest_relationships
  FOR DELETE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

-- Create policies for venue_layouts
CREATE POLICY "Users can view venue layouts for their weddings" ON venue_layouts
  FOR SELECT USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can create venue layouts for their weddings" ON venue_layouts
  FOR INSERT WITH CHECK (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can update venue layouts for their weddings" ON venue_layouts
  FOR UPDATE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can delete venue layouts for their weddings" ON venue_layouts
  FOR DELETE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

-- Create policies for seating_optimizations
CREATE POLICY "Users can view seating optimizations for their weddings" ON seating_optimizations
  FOR SELECT USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can create seating optimizations for their weddings" ON seating_optimizations
  FOR INSERT WITH CHECK (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can update seating optimizations for their weddings" ON seating_optimizations
  FOR UPDATE USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

-- Create policies for guest_photos
CREATE POLICY "Users can view guest photos for their weddings" ON guest_photos
  FOR SELECT USING (guest_id IN (
    SELECT guests.id FROM guests 
    JOIN weddings ON guests.wedding_id = weddings.id 
    WHERE weddings.user_id = auth.uid() OR weddings.partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can create guest photos for their weddings" ON guest_photos
  FOR INSERT WITH CHECK (guest_id IN (
    SELECT guests.id FROM guests 
    JOIN weddings ON guests.wedding_id = weddings.id 
    WHERE weddings.user_id = auth.uid() OR weddings.partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can update guest photos for their weddings" ON guest_photos
  FOR UPDATE USING (guest_id IN (
    SELECT guests.id FROM guests 
    JOIN weddings ON guests.wedding_id = weddings.id 
    WHERE weddings.user_id = auth.uid() OR weddings.partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can delete guest photos for their weddings" ON guest_photos
  FOR DELETE USING (guest_id IN (
    SELECT guests.id FROM guests 
    JOIN weddings ON guests.wedding_id = weddings.id 
    WHERE weddings.user_id = auth.uid() OR weddings.partner_user_id = auth.uid()
  ));

-- Create policies for seating_analytics
CREATE POLICY "Users can view seating analytics for their weddings" ON seating_analytics
  FOR SELECT USING (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ));

CREATE POLICY "Users can create seating analytics" ON seating_analytics
  FOR INSERT WITH CHECK (wedding_id IN (
    SELECT id FROM weddings WHERE user_id = auth.uid() OR partner_user_id = auth.uid()
  ) OR user_id = auth.uid() OR user_id IS NULL);

-- Create policies for table_presets
CREATE POLICY "Users can view own table presets" ON table_presets
  FOR SELECT USING (user_id = auth.uid() OR is_public = true);

CREATE POLICY "Users can create own table presets" ON table_presets
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own table presets" ON table_presets
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete own table presets" ON table_presets
  FOR DELETE USING (user_id = auth.uid());

-- Create triggers for updated_at on new tables
CREATE TRIGGER update_tables_updated_at BEFORE UPDATE ON tables
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_venue_layouts_updated_at BEFORE UPDATE ON venue_layouts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_tables_wedding_id ON tables(wedding_id);
CREATE INDEX idx_guest_relationships_wedding_id ON guest_relationships(wedding_id);
CREATE INDEX idx_guest_relationships_guest1_id ON guest_relationships(guest1_id);
CREATE INDEX idx_guest_relationships_guest2_id ON guest_relationships(guest2_id);
CREATE INDEX idx_venue_layouts_wedding_id ON venue_layouts(wedding_id);
CREATE INDEX idx_seating_optimizations_wedding_id ON seating_optimizations(wedding_id);
CREATE INDEX idx_guest_photos_guest_id ON guest_photos(guest_id);
CREATE INDEX idx_seating_analytics_wedding_id ON seating_analytics(wedding_id);
CREATE INDEX idx_seating_analytics_user_id ON seating_analytics(user_id);
CREATE INDEX idx_table_presets_user_id ON table_presets(user_id);
CREATE INDEX idx_guests_table_assignment_id ON guests(table_assignment_id);
CREATE INDEX idx_guests_wedding_id_table_assignment ON guests(wedding_id, table_assignment_id);

-- Add foreign key constraint after tables table is created
ALTER TABLE guests ADD CONSTRAINT fk_guests_table_assignment 
  FOREIGN KEY (table_assignment_id) REFERENCES tables(id) ON DELETE SET NULL; 