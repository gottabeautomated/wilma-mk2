import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types/supabase';

export const initSupabaseClient = (
  supabaseUrl: string,
  supabaseAnonKey: string
): SupabaseClient<Database> => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });
}; 