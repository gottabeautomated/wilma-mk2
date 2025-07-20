import { createClient } from '@supabase/supabase-js';
export const initSupabaseClient = (supabaseUrl, supabaseAnonKey) => {
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true,
        },
    });
};
