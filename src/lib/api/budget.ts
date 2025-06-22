import { supabase, handleSupabaseError } from '@/lib/supabase'

// Interface for budget calculation
export interface BudgetCalculation {
  id: string
  user_id: string | null
  session_id: string | null
  input_data: any
  total_budget: number | null
  category_breakdown: any
  ai_recommendations?: any
  regional_factors?: any
  confidence_score?: number
  created_at: string
}

/**
 * Get budget calculations for the current user
 * If user is authenticated, fetches their calculations
 * Otherwise, fetches by session ID
 */
export async function getBudgetCalculations(sessionId?: string): Promise<{ data: BudgetCalculation[] | null; error: string | null }> {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;
    
    let query = supabase
      .from('budget_calculations')
      .select('*');
    
    // If user is logged in, get their calculations
    if (userId) {
      query = query.eq('user_id', userId);
    } 
    // Otherwise use session ID if provided
    else if (sessionId) {
      query = query.eq('session_id', sessionId);
    } else {
      // No user or session ID provided
      return { 
        data: [], 
        error: null 
      };
    }
    
    // Order by most recent
    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return { 
      data: data as BudgetCalculation[],
      error: null 
    };
  } catch (error: any) {
    console.error('Error fetching budget calculations:', error.message);
    return { 
      data: null, 
      error: error.message 
    };
  }
}

/**
 * Save a new budget calculation
 */
export async function saveBudgetCalculation(data: Omit<BudgetCalculation, 'id' | 'created_at'>): Promise<{ data: BudgetCalculation | null; error: string | null }> {
  try {
    const { data: newRecord, error } = await supabase
      .from('budget_calculations')
      .insert([
        {
          ...data,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();
    
    if (error) throw error;
    
    return { 
      data: newRecord as BudgetCalculation,
      error: null 
    };
  } catch (error: any) {
    console.error('Error saving budget calculation:', error.message);
    return { 
      data: null, 
      error: error.message 
    };
  }
}

/**
 * Get a specific budget calculation by ID
 */
export async function getBudgetCalculationById(id: string): Promise<{ data: BudgetCalculation | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('budget_calculations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    
    return { 
      data: data as BudgetCalculation,
      error: null 
    };
  } catch (error: any) {
    console.error('Error fetching budget calculation:', error.message);
    return { 
      data: null, 
      error: error.message 
    };
  }
}

/**
 * Update an existing budget calculation
 */
export async function updateBudgetCalculation(id: string, updates: Partial<BudgetCalculation>): Promise<{ data: BudgetCalculation | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('budget_calculations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    
    return { 
      data: data as BudgetCalculation,
      error: null 
    };
  } catch (error: any) {
    console.error('Error updating budget calculation:', error.message);
    return { 
      data: null, 
      error: error.message 
    };
  }
}

/**
 * Delete a budget calculation
 */
export async function deleteBudgetCalculation(id: string): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase
      .from('budget_calculations')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    
    return { 
      success: true,
      error: null 
    };
  } catch (error: any) {
    console.error('Error deleting budget calculation:', error.message);
    return { 
      success: false, 
      error: error.message 
    };
  }
}
