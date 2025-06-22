import { 
  BudgetFormData, 
  BudgetCalculationResult, 
  BudgetCategory, 
  WeddingStyle
} from '../types/budget.types';
import {
  budgetCategories,
  budgetAllocationByStyle,
  regionalPricingFactors,
  guestCountImpactFactors,
  generateAIRecommendations
} from './mockData';

/**
 * Calculate the regional pricing factor based on location
 */
export function getRegionalPricingFactor(location: string): number {
  // Try to find an exact match for the location
  const exactMatch = regionalPricingFactors[location];
  if (exactMatch) return exactMatch;
  
  // Try to find a partial match based on city or state
  const partialMatches = Object.keys(regionalPricingFactors).filter(
    key => location.includes(key) || key.includes(location)
  );
  
  if (partialMatches.length > 0) {
    return regionalPricingFactors[partialMatches[0]];
  }
  
  // Default factor if no match is found
  return regionalPricingFactors.default;
}

/**
 * Get guest count impact factor based on the number of guests
 */
export function getGuestCountFactor(guestCount: number): number {
  for (const [size, data] of Object.entries(guestCountImpactFactors)) {
    if (guestCount >= data.min && guestCount <= data.max) {
      return data.factor;
    }
  }
  
  // Default to the highest factor for very large weddings
  return guestCountImpactFactors['xx-large'].factor;
}

/**
 * Calculate the confidence score for the budget calculation
 * Higher score = more accurate estimate
 */
export function calculateConfidenceScore(formData: BudgetFormData): number {
  let score = 70; // Base score
  
  // Location specificity adds confidence
  if (formData.location && formData.location.length > 0) {
    const hasExactMatch = !!regionalPricingFactors[formData.location];
    score += hasExactMatch ? 10 : 5;
  }
  
  // Wedding date adds confidence
  if (formData.weddingDate) {
    const monthsAway = Math.ceil(
      (formData.weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30)
    );
    
    // Closer dates have higher confidence
    if (monthsAway < 6) {
      score += 10;
    } else if (monthsAway < 12) {
      score += 5;
    }
  }
  
  // Having priorities defined adds confidence
  if (formData.priorities && formData.priorities.length > 0) {
    score += Math.min(formData.priorities.length * 2, 10);
  }
  
  // Cap at 100
  return Math.min(score, 100);
}

/**
 * Calculate budget allocation based on form data
 */
export function calculateBudget(formData: BudgetFormData): BudgetCalculationResult {
  const { guestCount, location, weddingDate, style, budgetRange, priorities } = formData;
  
  // Get factors that affect the budget
  const regionalFactor = getRegionalPricingFactor(location);
  const guestCountFactor = getGuestCountFactor(guestCount);
  
  // Calculate total adjusted budget
  const totalBudget = budgetRange;
  
  // Calculate category allocation based on wedding style
  const styleAllocation = budgetAllocationByStyle[style];
  
  // Generate categories with amounts based on style and priorities
  const categories: BudgetCategory[] = budgetCategories.map(category => {
    const basePercentage = styleAllocation[category.id] || 0;
    
    // Adjust percentage based on priorities (increase priority categories, decrease others)
    let adjustedPercentage = basePercentage;
    const isPriority = priorities.includes(category.id);
    
    if (isPriority) {
      // Boost priority categories by up to 20%
      adjustedPercentage = basePercentage * 1.2;
    } else {
      // Decrease non-priority categories to compensate
      adjustedPercentage = basePercentage * 0.9;
    }
    
    // Calculate the amount for this category
    const amount = Math.round((totalBudget * adjustedPercentage / 100) * regionalFactor * guestCountFactor);
    
    return {
      id: category.id,
      name: category.name,
      percentage: adjustedPercentage,
      amount,
      description: category.description,
      isHighPriority: isPriority
    };
  });
  
  // Recalculate percentages to ensure they sum to 100%
  const totalPercentage = categories.reduce((sum, cat) => sum + cat.percentage, 0);
  categories.forEach(cat => {
    cat.percentage = Math.round((cat.percentage / totalPercentage) * 100 * 10) / 10;
  });
  
  // Generate AI recommendations
  const recommendations = generateAIRecommendations(style, priorities, totalBudget);
  
  // Calculate confidence score
  const confidenceScore = calculateConfidenceScore(formData);
  
  return {
    totalBudget,
    categories,
    recommendations,
    confidenceScore,
    regionalFactor
  };
}

/**
 * Calculate the total potential savings from recommendations
 */
export function calculatePotentialSavings(result: BudgetCalculationResult): number {
  return result.recommendations.reduce((total, rec) => total + rec.potentialSavings, 0);
}

/**
 * Format budget data for chart display
 */
export function formatBudgetForChart(categories: BudgetCategory[]) {
  return categories.map(category => ({
    name: category.name,
    value: category.amount,
    fill: getCategoryColor(category.id, category.isHighPriority),
  }));
}

/**
 * Get a color for a category based on its ID and priority
 */
function getCategoryColor(categoryId: string, isHighPriority: boolean): string {
  // Wedding color palette
  const colors = {
    primary: isHighPriority ? '#D8827D' : '#E6A8A4', // wedding-rose
    secondary: isHighPriority ? '#829FA6' : '#A6BFC5', // wedding-sage
    accent1: isHighPriority ? '#DBAE6C' : '#E5C495', // wedding-gold
    accent2: isHighPriority ? '#1F3A4A' : '#506B7A', // wedding-navy
    accent3: isHighPriority ? '#F4E9E1' : '#F8F2ED', // wedding-cream
  };
  
  // Map categories to colors
  const colorMap: Record<string, string> = {
    'venue': colors.primary,
    'catering': colors.secondary,
    'photography': colors.accent1,
    'attire': colors.accent3,
    'flowers': colors.secondary,
    'music': colors.accent1,
    'decorations': colors.accent3,
    'invitations': colors.accent2,
    'transportation': colors.primary,
    'ceremony': colors.accent2,
    'beauty': colors.accent3,
    'gifts': colors.accent1,
    'accommodation': colors.primary,
    'coordinator': colors.secondary,
    'misc': colors.accent2,
  };
  
  return colorMap[categoryId] || colors.primary;
}
