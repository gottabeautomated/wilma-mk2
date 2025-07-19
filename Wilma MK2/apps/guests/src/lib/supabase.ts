import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pyqooruoylfvrzbbxglp.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cW9vcnVveWxmdnJ6YmJ4Z2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODkzODAsImV4cCI6MjA2NjM2NTM4MH0.ahXqbeLGVpDiR9UIR6mBITb5mtHtgaGnLC3OPd2fYEo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Re-export seatingAPI from the separate file
export { seatingAPI } from './seatingAPI'
