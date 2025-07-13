import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables. Check your .env file.')
}

export const supabase = createClient<Database>(
  supabaseUrl || '',
  supabaseKey || '',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
)

// Helper function to handle Supabase errors consistently
export const handleSupabaseError = (error: Error | null) => {
  if (error) {
    console.error('Supabase error:', error.message)
    // You could also log to a service or show a toast notification
    return { error: error.message || 'An unexpected error occurred' }
  }
  return null
}
