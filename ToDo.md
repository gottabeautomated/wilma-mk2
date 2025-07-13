# Wilma Mk2 - ToDo Liste

## Priorität 1: Kernfunktionalität vervollständigen

### Allgemein
- [x] Supabase-Integration gestartet
- [x] Supabase-Konfiguration eingerichtet (.env Datei)
- [ ] Supabase-Integration vollständig implementieren
  - [x] Budget-API für Supabase angepasst
  - [x] React Query Hooks für Budget-Daten implementiert
  - [x] Routing-Probleme beheben (Verlinkung zu Budget-Calculator)
  - [ ] API-Funktionen für andere Features implementieren (Timeline, Gäste, etc.)
- [ ] Benutzerauthentifizierung (Login/Signup) fertigstellen
  - [ ] Login-Komponente mit Supabase Auth verbinden
  - [ ] Signup-Komponente mit Supabase Auth verbinden
  - [ ] Passwort-Reset-Funktionalität hinzufügen
  - [ ] Auth-Zustand persistieren
- [ ] Globalen Zustand mit Jotai optimieren
  - [ ] Auth-Zustand in Jotai-Atoms abbilden
  - [ ] Feature-spezifische Atoms erstellen
- [ ] React Router Konfiguration überprüfen und verfeinern
  - [ ] Geschützte Routen implementieren
  - [ ] Navigationsprobleme beheben

### Feature: Budget-Rechner
- [x] Grundlegende Supabase-Integration für Budget-Speicherung
  - [x] Budget-API mit Supabase verbinden
  - [x] React Query Hooks für CRUD-Operationen
  - [x] Session-basierte Budget-Speicherung
  - [x] UI-Integration vervollständigen (Speichern/Laden/Aktualisieren)
  - [x] Fehlerbehandlung verbessern
- [ ] Kategoriemanagement implementieren
  - [ ] Hinzufügen/Bearbeiten/Löschen von Kategorien
  - [ ] Prozentuale Verteilung anpassen
  - [ ] Kategorie-Templates
- [ ] Ausgabenerfassung und -verfolgung
  - [ ] Ausgaben pro Kategorie erfassen
  - [ ] Bezahlte/Unbezahlte Ausgaben markieren
  - [ ] Belege hochladen und speichern
- [x] Budget-Visualisierung (Diagramme)
  - [x] Tortendiagramm für Kategorien
  - [x] Fortschrittsbalken für Gesamtbudget
  - [x] Ausgaben vs. Budget-Vergleich
- [x] Ausgabenprognose
  - [x] KI-basierte Budgetvorschläge
  - [x] Regionale Preisanpassungen

### Feature: Zeitplan-Generator
- [ ] Zeitlinien-Editor
- [ ] Meilenstein-Tracking
- [ ] Erinnerungen und Benachrichtigungen
- [ ] Zeitleisten-Vorlagen

### Feature: Gäste-Manager
- [ ] Gästelisten-CRUD-Operationen
- [ ] RSVP-Tracking
- [ ] Sitzordnungs-Tool
- [ ] Essen/Allergien/Präferenzen-Tracking

### Feature: Veranstaltungsort-Analyse
- [ ] Veranstaltungsort-Vergleichstool
- [ ] Kartenintegration
- [ ] Bewertungssystem
- [ ] Verfügbarkeitskalender

### Feature: Stress-Planer
- [ ] Stress-Assessment-Tool
- [ ] Achtsamkeitsübungen
- [ ] Fortschrittsverfolgung
- [ ] Ressourcen und Tipps

## Priorität 2: UI/UX Verbesserungen

- [ ] Responsives Design auf allen Seiten sicherstellen
- [ ] Barrierefreiheit verbessern
- [ ] Dark Mode vollständig implementieren
- [ ] UI-Konsistenz über alle Features hinweg sicherstellen
- [ ] Animation und Übergänge mit Framer Motion optimieren
- [ ] Feedback-Mechanismen (Toast-Nachrichten etc.) erweitern

## Priorität 3: Tests und Qualitätssicherung

- [ ] Unit-Tests für alle Komponenten
- [ ] Integration-Tests für Feature-Flows
- [ ] End-to-End-Tests für kritische Benutzerpfade
- [ ] Leistungsoptimierung
- [ ] Fehlerbehandlung und Grenzbedingungen

## Priorität 4: Dokumentation

- [ ] Inline-Code-Dokumentation vervollständigen
- [ ] API-Dokumentation
- [ ] Nutzerhandbuch erstellen
- [ ] Entwicklerdokumentation erweitern

## Priorität 5: Deployment und DevOps

- [ ] CI/CD-Pipeline einrichten
- [ ] Staging-Umgebung konfigurieren
- [ ] Produktionsumgebung einrichten
- [ ] Monitoring und Logging-Strategie implementieren
- [ ] Backup- und Wiederherstellungsprozesse

## Zukünftige Erweiterungen

- [ ] Mobile App-Version
- [ ] Mehrsprachige Unterstützung
- [ ] Integrationen mit Hochzeitsindustrie-Diensten
- [ ] KI-gestützte Empfehlungssysteme
- [ ] Premium-Funktionen und Monetarisierungsstrategie
