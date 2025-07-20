import { createClient } from '@supabase/supabase-js';

// Debug environment variables before using them
console.log('🔍 Supabase Environment Check:');
console.log('URL exists:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
console.log('URL value:', process.env.NEXT_PUBLIC_SUPABASE_URL);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Check your .env.local file in apps/landing/');
}

if (!supabaseAnonKey) {
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Check your .env.local file in apps/landing/');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth State Management (Client)
export const onAuthStateChange = (callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) =>
  supabase.auth.onAuthStateChange(callback);

// Session Handling
export const getSession = () => supabase.auth.getSession();
export const getUser = () => supabase.auth.getUser();

export default supabase; 