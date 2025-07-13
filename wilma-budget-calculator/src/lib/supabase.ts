import { createClient } from '@supabase/supabase-js'
import type { Database } from '@wilma/shared-types'

// Get environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Function to save a budget calculation to Supabase
export async function saveBudgetCalculation(
  input: any, 
  results: any, 
  userId?: string, 
  weddingId?: string
) {
  const isAuthEnabled = import.meta.env.VITE_ENABLE_BUDGET_SAVING === 'true'
  if (!isAuthEnabled) return { success: false, reason: 'Saving is disabled' }

  try {
    // Generate a session ID for anonymous users
    const sessionId = userId || `anon-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
    
    const { data, error } = await supabase
      .from('budget_calculations')
      .insert({
        user_id: userId || null,
        session_id: userId ? null : sessionId,
        wedding_id: weddingId || null,
        input_data: input,
        results: results
      })
      .select()
    
    if (error) {
      console.error('Error saving budget calculation:', error)
      return { success: false, error }
    }
    
    return { 
      success: true, 
      data: data?.[0],
      sessionId: userId ? null : sessionId
    }
  } catch (error) {
    console.error('Unexpected error saving budget calculation:', error)
    return { success: false, error }
  }
}

// Function to capture email for anonymous users
export async function captureEmail(email: string, calculationData?: any) {
  try {
    const { data, error } = await supabase
      .from('email_captures')
      .insert({
        email,
        source: 'budget_calculator',
        capture_data: calculationData || null
      })
      .select()
    
    if (error) {
      console.error('Error capturing email:', error)
      return { success: false, error }
    }
    
    return { success: true, data: data?.[0] }
  } catch (error) {
    console.error('Unexpected error capturing email:', error)
    return { success: false, error }
  }
}
