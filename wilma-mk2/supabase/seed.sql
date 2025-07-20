-- Seed data for Wilma Mk2 wedding planning platform

-- Insert sample venues
INSERT INTO venues (id, name, address, capacity, price_per_guest, contact_email, contact_phone, images, amenities) VALUES
('venue-1', 'Schloss Schönbrunn', 'Schönbrunner Schloßstraße 47, 1130 Wien', 200, 150.00, 'info@schloss-schoenbrunn.at', '+43 1 811 13 0', 
  ARRAY['https://example.com/schloss1.jpg', 'https://example.com/schloss2.jpg'], 
  ARRAY['Garten', 'Terrasse', 'Küche', 'Parkplatz', 'Bar']),
('venue-2', 'Hofburg Wien', 'Heldenplatz, 1010 Wien', 300, 200.00, 'events@hofburg-wien.at', '+43 1 587 36 66', 
  ARRAY['https://example.com/hofburg1.jpg'], 
  ARRAY['Historische Räume', 'Garten', 'Küche', 'Valet Parking', 'Weinkeller']),
('venue-3', 'Belvedere Palace', 'Prinz Eugen-Straße 27, 1030 Wien', 150, 180.00, 'events@belvedere.at', '+43 1 795 57 0', 
  ARRAY['https://example.com/belvedere1.jpg'], 
  ARRAY['Garten', 'Kunstgalerie', 'Küche', 'Parkplatz']);

-- Insert sample budget categories
INSERT INTO budget_categories (id, name, description, color) VALUES
('cat-1', 'Location & Catering', 'Venue, Essen und Getränke', '#FF6B6B'),
('cat-2', 'Dekoration & Blumen', 'Blumen, Dekoration, Tischdecken', '#4ECDC4'),
('cat-3', 'Fotografie & Video', 'Fotograf, Videograf, Drucke', '#45B7D1'),
('cat-4', 'Musik & Entertainment', 'DJ, Live-Musik, Unterhaltung', '#96CEB4'),
('cat-5', 'Kleidung & Accessoires', 'Brautkleid, Anzug, Schmuck', '#FFEAA7'),
('cat-6', 'Transport & Logistik', 'Limousine, Shuttle, Transport', '#DDA0DD'),
('cat-7', 'Beauty & Wellness', 'Friseur, Make-up, Maniküre', '#98D8C8'),
('cat-8', 'Sonstiges', 'Verschiedene Ausgaben', '#F7DC6F');

-- Insert sample timeline templates
INSERT INTO timeline_templates (id, name, description, events) VALUES
('template-1', 'Klassische Hochzeit', 'Standard-Timeline für eine klassische Hochzeit', 
  ARRAY[
    '{"time": "14:00", "title": "Brautkleid anziehen", "category": "preparation"}',
    '{"time": "15:00", "title": "Fotograf kommt", "category": "preparation"}',
    '{"time": "16:00", "title": "Standesamt", "category": "ceremony"}',
    '{"time": "17:00", "title": "Empfang", "category": "reception"}',
    '{"time": "18:00", "title": "Abendessen", "category": "reception"}',
    '{"time": "20:00", "title": "Erster Tanz", "category": "reception"}',
    '{"time": "22:00", "title": "Party", "category": "reception"}'
  ]::jsonb[]),
('template-2', 'Intime Hochzeit', 'Timeline für eine kleine, intime Hochzeit', 
  ARRAY[
    '{"time": "13:00", "title": "Vorbereitung", "category": "preparation"}',
    '{"time": "15:00", "title": "Trauung", "category": "ceremony"}',
    '{"time": "16:00", "title": "Champagner", "category": "reception"}',
    '{"time": "17:30", "title": "Dinner", "category": "reception"}',
    '{"time": "19:00", "title": "Geselligkeit", "category": "reception"}'
  ]::jsonb[]);

-- Insert sample wellness tips
INSERT INTO wellness_tips (id, category, title, content, difficulty) VALUES
('tip-1', 'stress-management', 'Atemübungen für den Hochzeitstag', 
  'Nehmen Sie sich 5 Minuten Zeit für tiefe Atemübungen. Atmen Sie 4 Sekunden ein, halten Sie 4 Sekunden und atmen Sie 6 Sekunden aus.', 'easy'),
('tip-2', 'nutrition', 'Gesunde Ernährung vor der Hochzeit', 
  'Essen Sie ausgewogen mit viel Gemüse, Proteinen und gesunden Fetten. Vermeiden Sie Crash-Diäten.', 'medium'),
('tip-3', 'exercise', 'Sanfte Bewegung', 
  'Spaziergänge, Yoga oder Schwimmen helfen beim Stressabbau und halten Sie fit.', 'easy'),
('tip-4', 'sleep', 'Guter Schlaf ist wichtig', 
  'Versuchen Sie 7-8 Stunden Schlaf zu bekommen. Vermeiden Sie Bildschirme vor dem Schlafengehen.', 'medium'),
('tip-5', 'mindfulness', 'Meditation für Brautpaare', 
  '5-10 Minuten tägliche Meditation können helfen, ruhig und fokussiert zu bleiben.', 'easy');

-- Seed-Daten für Wilma Mk2 Entwicklung

-- Test-Benutzer (werden automatisch erstellt wenn sich jemand anmeldet)
-- Hier fügen wir nur Beispieldaten für anonyme Nutzer hinzu

-- Beispiel Budget-Berechnungen (anonyme Sessions)
INSERT INTO budget_calculations (
  session_id,
  input_data,
  total_budget,
  category_breakdown,
  ai_recommendations,
  regional_factors,
  confidence_score
) VALUES 
(
  'test-session-1',
  '{"guest_count": 80, "location": "Vienna", "style": "modern", "budget_range": "20000-30000"}',
  25000.00,
  '{"venue": 8000, "catering": 6000, "photography": 3000, "decoration": 2000, "music": 1500, "attire": 2000, "transportation": 1000, "misc": 1500}',
  '{"recommendations": ["Consider off-peak season for better venue prices", "Local photographers often offer better value"], "tips": ["Book venue 12 months in advance", "Negotiate package deals"]}',
  '{"cost_of_living": "high", "wedding_industry": "developed", "seasonal_factors": "summer_peak"}',
  0.85
),
(
  'test-session-2',
  '{"guest_count": 120, "location": "Salzburg", "style": "rustic", "budget_range": "15000-20000"}',
  18000.00,
  '{"venue": 6000, "catering": 5000, "photography": 2500, "decoration": 1500, "music": 1200, "attire": 1500, "transportation": 800, "misc": 1000}',
  '{"recommendations": ["Rustic venues in Salzburg offer great value", "Local caterers provide authentic Austrian cuisine"], "tips": ["Consider weekday weddings for better rates", "DIY decorations can save money"]}',
  '{"cost_of_living": "medium", "wedding_industry": "growing", "seasonal_factors": "spring_shoulder"}',
  0.78
);

-- Beispiel Venue-Analysen (anonyme Sessions)
INSERT INTO venue_analyses (
  session_id,
  venue_name,
  image_urls,
  analysis_results,
  compatibility_score,
  ai_recommendations
) VALUES 
(
  'test-venue-session-1',
  'Schloss Schönbrunn',
  ARRAY['https://example.com/schloss1.jpg', 'https://example.com/schloss2.jpg'],
  '{"capacity": 200, "indoor_outdoor": "mixed", "parking": "available", "accessibility": "good", "photography_spots": "excellent", "catering_options": "in-house"}',
  0.92,
  '{"pros": ["Historic venue", "Beautiful gardens", "Professional staff"], "cons": ["High cost", "Limited availability"], "recommendations": ["Book 18 months in advance", "Consider weekday events"]}'
),
(
  'test-venue-session-2',
  'Weingut Mayer am Pfarrplatz',
  ARRAY['https://example.com/weingut1.jpg'],
  '{"capacity": 80, "indoor_outdoor": "outdoor", "parking": "limited", "accessibility": "moderate", "photography_spots": "good", "catering_options": "partner"}',
  0.75,
  '{"pros": ["Rustic charm", "Wine tasting", "Scenic views"], "cons": ["Weather dependent", "Limited parking"], "recommendations": ["Have backup plan for rain", "Arrange shuttle service"]}'
);

-- Beispiel Email-Captures (Lead Generation)
INSERT INTO email_captures (
  email,
  source,
  capture_data,
  consent_marketing
) VALUES 
(
  'test@example.com',
  'budget-calculator',
  '{"guest_count": 100, "budget_range": "25000-35000", "location": "Vienna"}',
  true
),
(
  'demo@example.com',
  'venue-analyzer',
  '{"venue_interest": "castle", "guest_count": 150, "style": "classic"}',
  false
);

-- Beispiel Tool-Sessions (Analytics)
INSERT INTO tool_sessions (
  session_id,
  tool_name,
  session_data,
  started_at,
  completed_at,
  completion_percentage
) VALUES 
(
  'test-tool-session-1',
  'budget-calculator',
  '{"steps_completed": 5, "total_steps": 6, "user_engagement": "high"}',
  NOW() - INTERVAL '2 hours',
  NOW() - INTERVAL '1 hour 45 minutes',
  83.33
),
(
  'test-tool-session-2',
  'venue-analyzer',
  '{"steps_completed": 3, "total_steps": 4, "user_engagement": "medium"}',
  NOW() - INTERVAL '1 hour',
  NOW() - INTERVAL '30 minutes',
  75.00
);

-- Hinweis: Diese Daten sind nur für Entwicklung und Tests gedacht
-- In Produktion sollten echte Benutzerdaten verwendet werden 