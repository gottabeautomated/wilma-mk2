import { useState } from "react";
import type { 
  BudgetFormData, 
  BudgetResult
} from "../types/budget.types";
import { generateBudgetBreakdown } from "../utils/budgetCalculations";

export function useBudgetCalculation() {
  const [formData, setFormData] = useState<BudgetFormData | null>(null);
  const [result, setResult] = useState<BudgetResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Simulate an API call to get budget calculations
  const calculateBudget = async (data: BudgetFormData): Promise<BudgetResult> => {
    setIsCalculating(true);
    setFormData(data);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate budget breakdown
      const budgetBreakdown = generateBudgetBreakdown(data);
      
      // Create budget result
      const budgetResult: BudgetResult = {
        formData: data,
        result: budgetBreakdown
      };
      
      setResult(budgetResult);
      return budgetResult;
    } catch (error) {
      console.error("Error calculating budget:", error);
      throw error;
    } finally {
      setIsCalculating(false);
    }
  };
  
  const resetCalculator = () => {
    setFormData(null);
    setResult(null);
  };
  
  return {
    calculateBudget,
    resetCalculator,
    formData,
    result,
    isCalculating,
  };
}
