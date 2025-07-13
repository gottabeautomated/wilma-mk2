# Wilma Mk2 - Wedding Planning Platform

Eine moderne, Micro-Apps-basierte Hochzeitsplanungsplattform mit separaten Tools für jeden Aspekt der Hochzeitsplanung.

## 🏗️ Architektur

Wilma Mk2 verwendet eine Micro-Apps-Architektur, bei der jedes Tool als separate Next.js-Anwendung auf Vercel bereitgestellt wird:

- **Landing Page**: `wilma.com` - Hauptwebsite und Marketing
- **Budget Tool**: `budget.wilma.com` - Budgetplanung und -verwaltung
- **Timeline Tool**: `timeline.wilma.com` - Zeitplanung und Ablaufplanung
- **Venue Tool**: `venue.wilma.com` - Location-Suche und -verwaltung
- **Wellness Tool**: `wellness.wilma.com` - Wellness-Tipps und Stressmanagement
- **Guests Tool**: `guests.wilma.com` - Gästeliste und RSVP-Verwaltung
- **Dashboard**: `app.wilma.com` - Hauptanwendung mit Authentifizierung

## 🛠️ Tech Stack

- **Monorepo**: Turborepo + npm workspaces
- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (separate deployments per app)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts

## 🎨 Design System

### Wedding Theme Colors

```css
:root {
  --wedding-blush: 350 47% 88%;   /* Sanftes Rosa */
  --wedding-rose: 346 77% 70%;    /* Kräftiges Rosa */
  --wedding-gold: 43 74% 66%;     /* Warmes Gold */
  --wedding-sage: 120 13% 62%;    /* Beruhigendes Grün */
  --wedding-cream: 47 100% 97%;   /* Cremeweiß */
  --wedding-mauve: 315 16% 70%;   /* Elegantes Mauve */
}
```

## 🚀 Getting Started

### Voraussetzungen

- Node.js 18+
- npm 8+
- Supabase CLI (optional für lokale Entwicklung)

### Installation

1. **Repository klonen**
   ```bash
   git clone <repository-url>
   cd wilma-mk2-ecosystem
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen einrichten**
   ```bash
   # Erstellen Sie .env.local Dateien in jedem App-Verzeichnis
   cp apps/landing/.env.example apps/landing/.env.local
   cp apps/budget/.env.example apps/budget/.env.local
   # ... für alle anderen Apps
   ```

4. **Supabase einrichten**
   ```bash
   # Supabase CLI installieren (falls noch nicht geschehen)
   npm install -g supabase
   
   # Lokale Supabase-Instanz starten
   supabase start
   ```

5. **Entwicklungsserver starten**
   ```bash
   # Alle Apps gleichzeitig starten
   npm run dev
   
   # Oder einzelne Apps
   npm run dev --workspace=@wilma/landing
   npm run dev --workspace=@wilma/budget
   ```

## 📁 Projektstruktur

```
wilma-mk2-ecosystem/
├── apps/
│   ├── landing/          # wilma.com (Port 3000)
│   ├── budget/           # budget.wilma.com (Port 3001)
│   ├── timeline/         # timeline.wilma.com (Port 3002)
│   ├── venue/            # venue.wilma.com (Port 3003)
│   ├── wellness/         # wellness.wilma.com (Port 3004)
│   ├── guests/           # guests.wilma.com (Port 3005)
│   └── dashboard/        # app.wilma.com (Port 3006)
├── packages/
│   ├── ui/               # Shared UI components
│   ├── database/         # Supabase client & types
│   ├── auth/             # Authentication helpers
│   └── shared/           # Shared utilities
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
├── package.json
├── turbo.json
└── README.md
```

## 🔧 Entwicklung

### Verfügbare Skripte

```bash
# Alle Apps bauen
npm run build

# Alle Apps im Entwicklungsmodus starten
npm run dev

# Linting für alle Packages
npm run lint

# TypeScript-Checks
npm run type-check

# Clean build artifacts
npm run clean
```

### Neue App hinzufügen

1. **App-Verzeichnis erstellen**
   ```bash
   mkdir apps/neue-app
   cd apps/neue-app
   ```

2. **Next.js-Projekt initialisieren**
   ```bash
   npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
   ```

3. **Package.json anpassen**
   - Name auf `@wilma/neue-app` ändern
   - Workspace-Dependencies hinzufügen
   - Port für dev-Script anpassen

4. **Konfigurationsdateien anpassen**
   - `next.config.js` mit transpilePackages
   - `tailwind.config.js` mit UI-Package-Preset
   - `tsconfig.json` mit Workspace-Paths

### Neue UI-Komponente hinzufügen

1. **Komponente in `packages/ui/src/components/` erstellen**
2. **In `packages/ui/src/components/index.ts` exportieren**
3. **In Apps importieren: `import { Component } from '@wilma/ui'`**

## 🗄️ Datenbank

### Supabase Setup

1. **Projekt erstellen**
   ```bash
   supabase init
   ```

2. **Migrationen erstellen**
   ```bash
   supabase migration new create_initial_tables
   ```

3. **Migrationen anwenden**
   ```bash
   supabase db push
   ```

4. **Seed-Daten laden**
   ```bash
   supabase db reset
   ```

### Wichtige Tabellen

- `weddings` - Hochzeitsinformationen
- `venues` - Locations
- `guests` - Gästeliste
- `budget_items` - Budgetposten
- `timeline_events` - Timeline-Events
- `wellness_tips` - Wellness-Tipps

## 🚀 Deployment

### Vercel Setup

1. **Projekt in Vercel importieren**
2. **Root Directory auf jeweilige App setzen**
3. **Build Command anpassen: `cd ../../ && npm run build --workspace=@wilma/app-name`**
4. **Output Directory: `.next`**
5. **Umgebungsvariablen setzen**

### Umgebungsvariablen

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App-spezifische Variablen
NEXT_PUBLIC_APP_URL=https://app.wilma.com
```

## 🤝 Contributing

1. **Feature Branch erstellen**
   ```bash
   git checkout -b feature/neue-funktion
   ```

2. **Änderungen committen**
   ```bash
   git add .
   git commit -m "feat: neue Funktion hinzugefügt"
   ```

3. **Pull Request erstellen**

## 📝 License

MIT License - siehe [LICENSE](LICENSE) Datei für Details.

## 🆘 Support

Bei Fragen oder Problemen:

1. **Issues** auf GitHub erstellen
2. **Dokumentation** in den jeweiligen App-Verzeichnissen prüfen
3. **Discussions** für allgemeine Fragen nutzen

---

**Wilma Mk2** - Ihre perfekte Hochzeitsplanung 🎉 