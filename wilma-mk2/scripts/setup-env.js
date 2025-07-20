#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Apps-Verzeichnisse
const apps = [
  'landing',
  'budget', 
  'timeline',
  'venue',
  'wellness',
  'guests',
  'dashboard'
];

// Template für .env.local
const envTemplate = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://app.wilma.com
NEXT_PUBLIC_LANDING_URL=https://wilma.com

# Analytics (optional)
NEXT_PUBLIC_GA_TRACKING_ID=your_google_analytics_id
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
`;

console.log('🚀 Erstelle .env.local Dateien für alle Apps...\n');

apps.forEach(app => {
  const envPath = path.join(__dirname, '..', 'apps', app, '.env.local');
  const appDir = path.join(__dirname, '..', 'apps', app);
  
  // Prüfe ob App-Verzeichnis existiert
  if (!fs.existsSync(appDir)) {
    console.log(`⚠️  App-Verzeichnis ${app} existiert nicht, überspringe...`);
    return;
  }
  
  // Prüfe ob .env.local bereits existiert
  if (fs.existsSync(envPath)) {
    console.log(`📝 .env.local für ${app} existiert bereits`);
    return;
  }
  
  // Erstelle .env.local
  try {
    fs.writeFileSync(envPath, envTemplate);
    console.log(`✅ .env.local für ${app} erstellt`);
  } catch (error) {
    console.error(`❌ Fehler beim Erstellen von .env.local für ${app}:`, error.message);
  }
});

console.log('\n📋 Nächste Schritte:');
console.log('1. Gehe zu supabase.com und erstelle ein neues Projekt');
console.log('2. Kopiere die Project URL und anon key aus den API Settings');
console.log('3. Ersetze "your_supabase_project_url" und "your_supabase_anon_key" in allen .env.local Dateien');
console.log('4. Führe das SQL-Schema aus supabase/migrations/20250101000000_initial_schema.sql in deinem Supabase Dashboard aus');
console.log('5. Starte die Apps mit: npm run dev --workspace=@wilma/landing');

console.log('\n📚 Siehe SUPABASE_SETUP.md für detaillierte Anweisungen'); 