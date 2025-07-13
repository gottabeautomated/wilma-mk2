import { supabase } from "../lib/supabase";

export class DataMigrationService {
  static async migrateAnonymousData(userId: string, sessionId: string) {
    // Migration läuft in einer Transaktion (all-or-nothing)
    const { error } = await supabase.rpc("migrate_anonymous_data", { user_id: userId, session_id: sessionId });
    if (error) throw new Error("Migration fehlgeschlagen: " + error.message);
    return true;
  }

  // Optional: Einzelmigrationsmethoden, falls du sie brauchst
  static async migrateBudgetCalculations(userId: string, sessionId: string) { /* ... */ }
  static async migrateVenueAnalyses(userId: string, sessionId: string) { /* ... */ }
  static async migrateToolSessions(userId: string, sessionId: string) { /* ... */ }

  static async verifyMigrationComplete(userId: string, sessionId: string) {
    // Prüfe, ob alle Daten korrekt übertragen wurden
    // z.B. Zähle Einträge mit userId und sessionId
  }

  static async rollbackMigration(userId: string, sessionId: string) {
    // Setze migrierte Daten zurück (nur im Fehlerfall)
  }
} 