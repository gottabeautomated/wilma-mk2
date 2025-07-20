# Wilma MK2 - Gäste Management

Ein elegantes Gäste-Management-System für Hochzeiten mit interaktivem Sitzplan.

## Features

### 🎯 **Hauptfunktionen**
- **Interaktiver Sitzplan**: SVG-basierte Drag-and-Drop-Tischplanung
- **Gästeverwaltung**: Vollständige Verwaltung aller Hochzeitsgäste
- **Tisch-Designer**: Individuelle Tischformen und -größen
- **Saal-Editor**: Anpassbare Veranstaltungsräume
- **Echtzeitaktualisierung**: Kollaborative Bearbeitung
- **Mobile Optimierung**: Responsive Design für alle Geräte

### 🎨 **Design System**
- **Schriften**: Playfair Display (Überschriften), Poppins (Fließtext)
- **Farbpalette**: 
  - Royal (#6B46C1)
  - Gold (#D4AF37)
  - Moss (#6B7F5B)
  - Champagne (#DBC2A4)
  - Soft Rose (#F9F3F0)

### 🛠 **Technologie**
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Supabase (PostgreSQL, Real-time)
- **State Management**: React Hooks, Zustand (geplant)

## Entwicklung

### Voraussetzungen
- Node.js 18+
- npm oder yarn
- Supabase Account

### Installation
```bash
cd apps/guests
npm install
```

### Umgebungsvariablen
Erstellen Sie eine `.env` Datei:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Starten
```bash
npm run dev
```

## Komponenten

### SeatingChart
- Interaktiver SVG-Sitzplan
- Drag-and-Drop Tische
- Gästezuweisung per Klick
- Zoom- und Pan-Funktionen
- Echtzeit-Kollaboration

### GuestList
- Vollständige Gästeliste
- Suchfunktion
- Filtermöglichkeiten
- Massenaktionen

### TableDesigner
- Individuelle Tischgestaltung
- Verschiedene Tischformen
- Sitzplatzanpassung
- Farbkonfiguration

## API Integration

Die App nutzt Supabase für:
- Gästedatenbank
- Tischkonfiguration
- Echtzeit-Updates
- Benutzerauthentifizierung
- Analytics und Tracking

## Deployment

```bash
npm run build
npm run preview
```

## Lizenz

Privates Projekt - Wilma MK2 Wedding Management System 