import { supabase } from "../lib/supabase";
export class DataMigrationService {
    static async migrateAnonymousData(userId, sessionId) {
        // Migration läuft in einer Transaktion (all-or-nothing)
        const { error } = await supabase.rpc("migrate_anonymous_data", { user_id: userId, session_id: sessionId });
        if (error)
            throw new Error("Migration fehlgeschlagen: " + error.message);
        return true;
    }
    // Optional: Einzelmigrationsmethoden, falls du sie brauchst
    static async migrateBudgetCalculations(userId, sessionId) { }
    static async migrateVenueAnalyses(userId, sessionId) { }
    static async migrateToolSessions(userId, sessionId) { }
    static async verifyMigrationComplete(userId, sessionId) {
        // Prüfe, ob alle Daten korrekt übertragen wurden
        // z.B. Zähle Einträge mit userId und sessionId
    }
    static async rollbackMigration(userId, sessionId) {
        // Setze migrierte Daten zurück (nur im Fehlerfall)
    }
}
