-- DSGVO-Consent-Management Tabelle
CREATE TABLE user_consents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  
  -- Consent-Status
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ,
  
  -- Double-Opt-In
  verification_token VARCHAR(255),
  email_verified BOOLEAN NOT NULL DEFAULT false,
  verification_timestamp TIMESTAMPTZ,
  
  -- Opt-Out
  opted_out BOOLEAN NOT NULL DEFAULT false,
  opt_out_timestamp TIMESTAMPTZ,
  opt_out_reason TEXT,
  
  -- Consent-Details
  marketing_consent BOOLEAN NOT NULL DEFAULT false,
  analytics_consent BOOLEAN NOT NULL DEFAULT false,
  ai_processing_consent BOOLEAN NOT NULL DEFAULT false,
  
  -- Metadata
  ip_address INET,
  user_agent TEXT,
  consent_version VARCHAR(10) NOT NULL DEFAULT 'v1.0',
  
  -- Tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(email)
);

-- RLS aktivieren
ALTER TABLE user_consents ENABLE ROW LEVEL SECURITY;

-- Policies für Consent-Verwaltung
CREATE POLICY "Users can view their own consent" ON user_consents
  FOR SELECT USING (auth.email() = email);

CREATE POLICY "Users can update their own consent" ON user_consents
  FOR UPDATE USING (auth.email() = email);

CREATE POLICY "Anyone can insert consent (for registration)" ON user_consents
  FOR INSERT WITH CHECK (true);

-- Index für Performance
CREATE INDEX idx_user_consents_email ON user_consents(email);
CREATE INDEX idx_user_consents_verification_token ON user_consents(verification_token);
CREATE INDEX idx_user_consents_status ON user_consents(consent_given, email_verified, opted_out);

-- Function für automatische updated_at
CREATE OR REPLACE FUNCTION update_user_consents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_user_consents_updated_at
  BEFORE UPDATE ON user_consents
  FOR EACH ROW EXECUTE FUNCTION update_user_consents_updated_at(); 