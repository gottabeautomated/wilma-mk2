import { createClient } from '@supabase/supabase-js'
import type { Database } from '@wilma/shared-types'

// Environment variables should be properly set in each app
// We're using placeholders here for the shared package
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Common interface for auth user data
export interface UserData {
  id: string
  email?: string
  full_name?: string
  avatar_url?: string
}

// Type guard for UserData
export function isUserData(obj: any): obj is UserData {
  return obj && typeof obj === 'object' && typeof obj.id === 'string'
}

// Parse user data from Supabase user
export function parseUserData(user: any): UserData | null {
  if (!user) return null
  
  return {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name,
    avatar_url: user.user_metadata?.avatar_url
  }
}
