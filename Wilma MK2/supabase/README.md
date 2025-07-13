# Supabase Setup für Wilma Mk2

Diese Dokumentation beschreibt die Einrichtung und Verwendung von Supabase für das Wilma Mk2 Wedding Planning Ökosystem.

## 🗄️ Datenbankschema

Das Schema umfasst alle notwendigen Tabellen für die Hochzeitsplanungsplattform:

### Haupttabellen

- **profiles** - Benutzerprofile (erweitert auth.users)
- **weddings** - Hochzeitsinformationen
- **budget_calculations** - Budget-Berechnungen (auch für anonyme Nutzer)
- **timelines** - Timeline-Generierungen
- **timeline_tasks** - Timeline-Aufgaben
- **guests** - Gästeliste und RSVP-Verwaltung
- **venue_analyses** - Venue-Analysen (auch für anonyme Nutzer)
- **stress_assessments** - Stress-Bewertungen
- **email_captures** - E-Mail-Erfassung für Lead Generation
- **tool_sessions** - Tool-Sessions für Analytics

### Benutzerdefinierte Typen

- `wedding_style` - Hochzeitsstile (modern, rustic, classic, etc.)
- `rsvp_status` - RSVP-Status (pending, confirmed, declined, maybe)
- `task_priority` - Aufgabenprioritäten (low, medium, high, critical)
- `venue_type` - Venue-Typen (indoor, outdoor, destination, mixed)

## 🔐 Row Level Security (RLS)

Alle Tabellen haben RLS aktiviert mit spezifischen Policies:

- **Authentifizierte Benutzer** können nur ihre eigenen Daten sehen/bearbeiten
- **Anonyme Benutzer** können bestimmte Tools nutzen (Budget, Venue-Analyse)
- **Lead Generation** ist für alle zugänglich

## 🚀 Einrichtung

### 1. Supabase CLI installieren

```bash
npm install -g supabase
```

### 2. Lokale Entwicklung

```bash
# Supabase starten
supabase start

# Migrationen anwenden
supabase db push

# Seed-Daten laden
supabase db reset
```

### 3. Produktionsumgebung

```bash
# Mit Supabase Cloud verbinden
supabase link --project-ref your-project-ref

# Migrationen deployen
supabase db push
```

## 🔧 Umgebungsvariablen

Erstellen Sie `.env.local` Dateien in jedem App-Verzeichnis:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App-spezifische URLs
NEXT_PUBLIC_APP_URL=https://app.wilma.com
NEXT_PUBLIC_LANDING_URL=https://wilma.com
```

## 📊 Datenbank-Helper

Das `@wilma/database` Package bietet Helper-Funktionen für alle Tabellen:

```typescript
import { db } from '@wilma/database'

// Wedding erstellen
const { data, error } = await db.weddings.create({
  user_id: 'user-uuid',
  wedding_date: '2024-06-15',
  budget: 25000
})

// Gäste abrufen
const { data: guests } = await db.guests.getByWeddingId('wedding-uuid')

// Budget-Berechnung für anonyme Nutzer
const { data: calculation } = await db.budgetCalculations.create({
  session_id: 'anonymous-session-id',
  input_data: { guest_count: 100, location: 'Vienna' }
})
```

## 🔄 Migrationen

### Neue Migration erstellen

```bash
supabase migration new add_new_table
```

### Migration anwenden

```bash
# Lokal
supabase db push

# Produktion
supabase db push --linked
```

## 📈 Analytics & Tracking

### Tool Sessions

Jede App sollte Tool-Sessions für Analytics erstellen:

```typescript
import { db } from '@wilma/database'

// Session starten
const { data: session } = await db.toolSessions.create({
  user_id: user?.id || null,
  session_id: generateSessionId(),
  tool_name: 'budget-calculator'
})

// Session beenden
await db.toolSessions.update(session.id, {
  completed_at: new Date().toISOString(),
  completion_percentage: 100
})
```

### Email Captures

Für Lead Generation:

```typescript
import { db } from '@wilma/database'

await db.emailCaptures.create({
  email: 'user@example.com',
  source: 'budget-tool',
  capture_data: { guest_count: 100 },
  consent_marketing: true
})
```

## 🛡️ Sicherheit

### RLS Policies

- Alle Tabellen haben RLS aktiviert
- Policies basieren auf `auth.uid()`
- Anonyme Nutzer können nur bestimmte Tabellen verwenden

### Datenvalidierung

- Alle Eingaben werden serverseitig validiert
- TypeScript-Typen für alle Datenbankoperationen
- Zod-Schemas für Formularvalidierung

## 🔍 Monitoring

### Supabase Dashboard

- Überwachen Sie die Datenbank-Performance
- Prüfen Sie RLS-Policies
- Analysieren Sie Query-Performance

### Logs

```bash
# Supabase Logs anzeigen
supabase logs

# Spezifische Logs
supabase logs --type auth
supabase logs --type db
```

## 🚨 Troubleshooting

### Häufige Probleme

1. **RLS-Policy verhindert Zugriff**
   - Prüfen Sie, ob der Benutzer authentifiziert ist
   - Überprüfen Sie die Policy-Bedingungen

2. **TypeScript-Fehler**
   - Führen Sie `npm run build` im Database-Package aus
   - Aktualisieren Sie die Typen nach Schema-Änderungen

3. **Migration-Fehler**
   - Prüfen Sie die SQL-Syntax
   - Stellen Sie sicher, dass alle Abhängigkeiten erfüllt sind

### Debugging

```bash
# Datenbank-Status prüfen
supabase status

# Lokale Datenbank zurücksetzen
supabase db reset

# Migrationen zurücksetzen
supabase db reset --linked
```

## 📚 Weitere Ressourcen

- [Supabase Dokumentation](https://supabase.com/docs)
- [RLS Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [TypeScript Integration](https://supabase.com/docs/guides/api/typescript-support) 