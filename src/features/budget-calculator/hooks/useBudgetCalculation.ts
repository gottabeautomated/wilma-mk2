import { useState } from "react";
import type { 
  BudgetFormData, 
  BudgetResult,
  BudgetCalculationResult
} from "../types/budget.types";
import { 
  calculateBudgetAllocation,
  getRegionalPricingFactor, 
  getStyleCostFactor,
  getAIRecommendations,
  getSavingsSuggestions
} from "../utils/mockData";

export function useBudgetCalculation() {
  const [formData, setFormData] = useState<BudgetFormData | null>(null);
  const [result, setResult] = useState<BudgetCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  
  // Simulate an API call to get budget calculations
  const calculateBudget = async (data: BudgetFormData): Promise<BudgetCalculationResult> => {
    setIsCalculating(true);
    setFormData(data);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Get regional pricing factor
      const regionalFactor = getRegionalPricingFactor(data.location);
      
      // Get style cost factor
      const styleFactor = getStyleCostFactor(data.style);
      
      // Calculate base budget adjusted by factors
      const adjustedBudget = data.budgetRange * regionalFactor.factor * styleFactor.factor;
      const totalBudget = Math.round(adjustedBudget / 100) * 100; // Round to nearest 100
      
      // Get budget allocations
      const categories = calculateBudgetAllocation({
        totalBudget,
        guestCount: data.guestCount,
        priorities: data.priorities,
        style: data.style,
      });
      
      // Get AI recommendations
      const recommendations = getAIRecommendations({
        totalBudget,
        guestCount: data.guestCount,
        location: data.location,
        style: data.style,
        priorities: data.priorities,
        weddingDate: data.weddingDate,
      });
      
      // Get savings suggestions
      const savingsSuggestions = getSavingsSuggestions({
        totalBudget,
        categories,
        guestCount: data.guestCount,
        style: data.style,
      });
      
      // Calculate total potential savings
      const totalPotentialSavings = savingsSuggestions.reduce(
        (total, suggestion) => total + suggestion.potentialSavings, 
        0
      );
      
      // Calculate confidence score (70-95%)
      const baseConfidence = 85;
      const locationBonus = data.location.length > 3 ? 3 : 0;
      const prioritiesBonus = data.priorities.length > 0 ? data.priorities.length * 1 : 0;
      let confidenceScore = baseConfidence + locationBonus + prioritiesBonus;
      confidenceScore = Math.min(95, confidenceScore);
      
      // Create budget result
      const budgetResult: BudgetResult = {
        totalBudget,
        categories,
        recommendations,
        savingsSuggestions,
        confidenceScore,
        totalPotentialSavings,
        regionalFactor,
        styleFactor,
      };
      
      const calculationResult: BudgetCalculationResult = {
        result: budgetResult,
        formData: data,
      };
      
      setResult(calculationResult);
      return calculationResult;
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
