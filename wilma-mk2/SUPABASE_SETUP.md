# Supabase Setup ohne CLI - Manuelle Einrichtung

Da die Supabase CLI Installation Probleme bereitet, können wir Supabase auch manuell über das Web-Interface einrichten.

## 🚀 Schritt 1: Supabase Cloud Projekt erstellen

1. Gehe zu [supabase.com](https://supabase.com)
2. Klicke auf "Start your project"
3. Melde dich mit GitHub an
4. Klicke auf "New Project"
5. Wähle deine Organisation
6. Gib einen Projektnamen ein: `wilma-mk2`
7. Gib ein Datenbank-Passwort ein (speichere es sicher!)
8. Wähle eine Region (z.B. West Europe)
9. Klicke auf "Create new project"

## 🔧 Schritt 2: Umgebungsvariablen abrufen

1. Gehe zu deinem Supabase Dashboard
2. Klicke auf "Settings" → "API"
3. Kopiere die folgenden Werte:
   - **Project URL** (z.B. `https://xyz.supabase.co`)
   - **anon public** Key (beginnt mit `eyJ...`)

## 📝 Schritt 3: Umgebungsvariablen setzen

Erstelle `.env.local` Dateien in jedem App-Verzeichnis:

```bash
# apps/landing/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# apps/budget/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# apps/timeline/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# apps/venue/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# apps/wellness/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# apps/guests/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# apps/dashboard/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🗄️ Schritt 4: Datenbankschema erstellen

1. Gehe zu deinem Supabase Dashboard
2. Klicke auf "SQL Editor"
3. Klicke auf "New query"
4. Kopiere den gesamten Inhalt aus `supabase/migrations/20250101000000_initial_schema.sql`
5. Füge ihn in den SQL Editor ein
6. Klicke auf "Run" (oder drücke Ctrl+Enter)

## 🌱 Schritt 5: Seed-Daten laden

1. Erstelle eine neue SQL Query
2. Kopiere den Inhalt aus `supabase/seed.sql`
3. Führe die Query aus

## 🔐 Schritt 6: Authentication einrichten

1. Gehe zu "Authentication" → "Settings"
2. Unter "Site URL" setze: `http://localhost:3000`
3. Unter "Redirect URLs" füge hinzu:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3001/auth/callback`
   - `http://localhost:3002/auth/callback`
   - `http://localhost:3003/auth/callback`
   - `http://localhost:3004/auth/callback`
   - `http://localhost:3005/auth/callback`
   - `http://localhost:3006/auth/callback`

## 🧪 Schritt 7: Testen

1. Starte die Landing-App:
   ```bash
   npm run dev --workspace=@wilma/landing
   ```

2. Öffne http://localhost:3000

3. Teste die Datenbankverbindung:
   ```typescript
   // In der Browser-Konsole oder in einer Komponente
   import { supabase } from '@wilma/database'
   
   // Teste die Verbindung
   const { data, error } = await supabase.from('profiles').select('*').limit(1)
   console.log('Connection test:', { data, error })
   ```

## 🔄 Schritt 8: Weitere Apps initialisieren

Für jede weitere App:

1. Erstelle das App-Verzeichnis (falls noch nicht geschehen)
2. Kopiere die Konfiguration von `apps/landing`
3. Passe den Port in `package.json` an
4. Erstelle `.env.local` mit den Supabase-Credentials
5. Starte die App

## 📊 Schritt 9: Monitoring

### Supabase Dashboard Features:

- **Table Editor**: Daten direkt in der Datenbank anzeigen/bearbeiten
- **SQL Editor**: Komplexe Queries ausführen
- **Logs**: API-Aufrufe und Fehler überwachen
- **Auth**: Benutzer und Sessions verwalten
- **Storage**: Dateien hochladen/verwalten

### Nützliche Queries:

```sql
-- Alle Hochzeiten anzeigen
SELECT * FROM weddings;

-- Benutzer mit Profilen
SELECT p.*, u.email FROM profiles p 
JOIN auth.users u ON p.id = u.id;

-- Budget-Berechnungen der letzten 7 Tage
SELECT * FROM budget_calculations 
WHERE created_at > NOW() - INTERVAL '7 days';
```

## 🚨 Troubleshooting

### Häufige Probleme:

1. **CORS-Fehler**
   - Prüfe die Site URL in Auth Settings
   - Stelle sicher, dass localhost:3000 hinzugefügt ist

2. **RLS-Policy-Fehler**
   - Prüfe, ob der Benutzer authentifiziert ist
   - Überprüfe die Policies in der Datenbank

3. **Verbindungsfehler**
   - Prüfe die Umgebungsvariablen
   - Stelle sicher, dass die URLs korrekt sind

### Debugging:

```typescript
// In der Browser-Konsole
import { supabase } from '@wilma/database'

// Session prüfen
const { data: { session } } = await supabase.auth.getSession()
console.log('Current session:', session)

// RLS testen
const { data, error } = await supabase.from('weddings').select('*')
console.log('Weddings query:', { data, error })
```

## 🎯 Nächste Schritte

Nach der Einrichtung kannst du:

1. **Apps entwickeln** mit vollständiger Datenbankanbindung
2. **Authentication** implementieren
3. **Real-time Features** nutzen
4. **File Uploads** implementieren
5. **Analytics** hinzufügen

## 📚 Ressourcen

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)

---

**Hinweis**: Diese manuelle Einrichtung ist für die Entwicklung ausreichend. Für Produktion solltest du später die CLI verwenden oder die Migrationen über das Dashboard verwalten. 