-- Budget Calculations Table
CREATE TABLE budget_calculations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    partner1_name VARCHAR(255) NOT NULL,
    partner2_name VARCHAR(255) NOT NULL,
    wedding_date DATE,
    guest_count INTEGER NOT NULL,
    total_budget INTEGER NOT NULL,
    wedding_style VARCHAR(50),
    venue_type VARCHAR(50),
    season VARCHAR(20),
    budget_breakdown JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Email Logs Table
CREATE TABLE email_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    subject TEXT,
    content TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(20) DEFAULT 'sent',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_budget_calculations_email ON budget_calculations(email);
CREATE INDEX idx_budget_calculations_created_at ON budget_calculations(created_at);
CREATE INDEX idx_email_logs_email ON email_logs(email);
CREATE INDEX idx_email_logs_sent_at ON email_logs(sent_at);

-- RLS (Row Level Security) policies
ALTER TABLE budget_calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Allow public access for demo (in production, use proper auth)
CREATE POLICY "Allow public access to budget_calculations" ON budget_calculations
    FOR ALL USING (true);

CREATE POLICY "Allow public access to email_logs" ON email_logs
    FOR ALL USING (true);
