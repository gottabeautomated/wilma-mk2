import { createClient } from '@supabase/supabase-js';
// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
// Auth helper functions
export const authHelpers = {
    // Registrierung
    async signUp(email, password, fullName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    display_name: fullName
                }
            }
        });
        return { data, error };
    },
    // Anmeldung
    async signIn(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        return { data, error };
    },
    // Abmeldung
    async signOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    },
    // Aktueller Benutzer
    getCurrentUser() {
        return supabase.auth.getUser();
    },
    // Session überwachen
    onAuthStateChange(callback) {
        return supabase.auth.onAuthStateChange(callback);
    }
};
export default supabase;
