import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getBudgetCalculations, saveBudgetCalculation, updateBudgetCalculation, deleteBudgetCalculation } from '@/lib/api/budget'
import type { BudgetCalculation } from '@/lib/api/budget'
import { useToast } from '@/hooks/use-toast'
import { generateUniqueId } from '@/lib/utils'

// React Query hook for fetching budget calculations
export function useBudgetCalculations(sessionId?: string) {
  // Create a unique session ID if not provided and store in localStorage
  const getSessionId = () => {
    if (sessionId) return sessionId;
    
    let storedSessionId = localStorage.getItem('wilma_session_id');
    if (!storedSessionId) {
      storedSessionId = generateUniqueId();
      localStorage.setItem('wilma_session_id', storedSessionId);
    }
    return storedSessionId;
  };

  return useQuery({
    queryKey: ['budget-calculations', getSessionId()],
    queryFn: () => getBudgetCalculations(getSessionId()),
  });
}

// React Query mutation hook for saving a new budget calculation
export function useSaveBudgetCalculation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const sessionId = localStorage.getItem('wilma_session_id') || generateUniqueId();
  
  return useMutation({
    mutationFn: (data: Omit<BudgetCalculation, 'id' | 'created_at'>) => 
      saveBudgetCalculation({
        ...data,
        session_id: data.session_id || sessionId
      }),
    onSuccess: () => {
      // Invalidate and refetch the budget calculations query
      queryClient.invalidateQueries({ queryKey: ['budget-calculations'] });
      
      toast({
        title: "Saved successfully",
        description: "Your budget calculation has been saved.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error saving",
        description: error.message || "There was a problem saving your data.",
      });
    }
  });
}

// React Query mutation hook for updating a budget calculation
export function useUpdateBudgetCalculation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: string, updates: Partial<BudgetCalculation> }) => 
      updateBudgetCalculation(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-calculations'] });
      
      toast({
        title: "Updated successfully",
        description: "Your budget calculation has been updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error updating",
        description: error.message || "There was a problem updating your data.",
      });
    }
  });
}

// React Query mutation hook for deleting a budget calculation
export function useDeleteBudgetCalculation() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: (id: string) => deleteBudgetCalculation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-calculations'] });
      
      toast({
        title: "Deleted successfully",
        description: "Your budget calculation has been deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: "Error deleting",
        description: error.message || "There was a problem deleting your data.",
      });
    }
  });
}
