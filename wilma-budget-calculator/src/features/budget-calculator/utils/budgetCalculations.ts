import type { 
  BudgetFormData, 
  BudgetBreakdown, 
  CategoryAllocation,
  AIRecommendation,
  SavingsSuggestion,
  RegionalFactor,
  StyleFactor,
  WeddingStyle,
  BudgetBreakdownItem,
  BudgetRecommendation
} from '../types/budget.types';
import { budgetCategories, locationFactors, styleCostFactors } from './mockData';

/**
 * Generates a personalized budget breakdown based on user inputs
 */
export const generateBudgetBreakdown = (formData: BudgetFormData): BudgetBreakdown => {
  const { 
    guestCount, 
    location, 
    weddingDate, 
    style, 
    budgetRange, 
    priorities 
  } = formData;

  // Get regional cost factor
  const regionalFactor = getRegionalFactor(location);
  
  // Get style cost factor
  const styleFactor = getStyleFactor(style);
  
  // Calculate seasonal factor (peak season = higher costs)
  const seasonalFactor = getSeasonalFactor(weddingDate);
  
  // Generate category allocations
  const categories = generateCategoryAllocations(
    budgetRange,
    priorities,
    guestCount,
    regionalFactor,
    styleFactor,
    seasonalFactor
  );
  
  // Generate recommendations
  const recommendations = generateRecommendations(
    formData,
    categories
  );
  
  // Generate savings suggestions
  const savingsSuggestions = generateSavingsSuggestions(
    formData,
    categories
  );
  
  // Calculate total potential savings
  const totalPotentialSavings = savingsSuggestions.reduce(
    (total, suggestion) => total + suggestion.potentialSavings, 
    0
  );
  
  // Calculate confidence score (70-95%)
  const confidenceScore = calculateConfidenceScore(formData);
  
  // Convert to the expected types before returning
  const categoryItems: BudgetBreakdownItem[] = categories.map(cat => ({
    categoryId: cat.id || '',  // Ensure categoryId is not undefined
    name: cat.name || '',
    amount: cat.amount || 0,
    percentage: cat.percentage,
    description: cat.description || '',
    isPriority: !!cat.isHighPriority,
    color: cat.color,
    recommendations: cat.recommendations,
    savingTips: cat.savingTips,
    isHighPriority: cat.isHighPriority,
    id: cat.id
  }));

  const recItems: BudgetRecommendation[] = recommendations.map(rec => ({
    categoryId: rec.category || '',
    text: rec.description || '',
    potentialSavings: rec.savingAmount || 0,
    confidenceScore: rec.confidence === 'high' ? 90 : (rec.confidence === 'medium' ? 75 : 60),
    title: rec.title,
    description: rec.description,
    impact: rec.impact,
    category: rec.category
  }));

  return {
    totalBudget: budgetRange,
    categories: categoryItems,
    recommendations: recItems,
    savingsSuggestions,
    confidenceScore,
    totalPotentialSavings,
    regionalFactor: regionalFactor.factor,
    seasonalFactor
  };
};

/**
 * Get the regional cost factor based on location
 */
const getRegionalFactor = (location: string): RegionalFactor => {
  // Default factor if location not found
  const defaultFactor: RegionalFactor = {
    region: 'Other',
    factor: 1.0,
    description: 'Average cost region'
  };
  
  // Try to match location with known regions
  const lowercaseLocation = location.toLowerCase();
  for (const locationFactor of locationFactors) {
    // Check if location includes any of the locations in our database
    if (locationFactor.locations.some(loc => 
      lowercaseLocation.includes(loc.toLowerCase())
    )) {
      return {
        region: locationFactor.region,
        factor: locationFactor.factor,
        description: locationFactor.description
      };
    }
  }
  
  return defaultFactor;
};

/**
 * Get the style cost factor based on wedding style
 */
const getStyleFactor = (style: WeddingStyle): StyleFactor => {
  const styleFactor = styleCostFactors[style];
  
  if (!styleFactor) {
    return {
      style,
      factor: 1.0,
      description: 'Standard wedding style'
    };
  }
  
  return {
    style,
    factor: styleFactor.factor,
    description: styleFactor.description
  };
};

/**
 * Calculate seasonal factor (higher for peak season May-October)
 */
const getSeasonalFactor = (date: Date): number => {
  const month = date.getMonth();
  
  // Peak season (May-October) = 1.15
  // Off-season (November-April) = 0.9
  return (month >= 4 && month <= 9) ? 1.15 : 0.9;
};

/**
 * Generate category allocations based on inputs
 */
const generateCategoryAllocations = (
  totalBudget: number,
  priorities: string[],
  guestCount: number,
  regionalFactor: RegionalFactor,
  styleFactor: StyleFactor,
  seasonalFactor: number
): CategoryAllocation[] => {
  // Wedding category colors
  const categoryColors = [
    '#FF9AA2', // Light pink
    '#FFDAC1', // Light orange
    '#E2F0CB', // Light green
    '#B5EAD7', // Mint
    '#C7CEEA', // Light blue
    '#F8C8DC', // Pink
    '#E6C3C3', // Dusty rose
    '#DFD3C3', // Beige
    '#F0EAD6', // Ivory
    '#BCD2E8'  // Baby blue
  ];
  
  // Apply default allocation percentages based on category
  const allocations = budgetCategories.map((category, index) => {
    // Higher allocation % for priorities
    const isPriority = priorities.includes(category.id);
    
    // Base allocation percentage
    let percentage = category.baseAllocation;
    
    // Boost priority categories (+30%)
    if (isPriority) {
      percentage *= 1.3;
    }
    
    // Adjust based on guest count
    if (category.guestCountSensitive) {
      // Higher guest count = more allocation for guest-sensitive categories
      percentage *= 1 + ((guestCount - 100) / 1000);
    }
    
    // Apply regional factor for region-sensitive categories
    if (category.regionSensitive) {
      percentage *= regionalFactor.factor;
    }
    
    // Apply style factor for style-sensitive categories
    if (category.styleSensitive) {
      percentage *= styleFactor.factor;
    }
    
    // Apply seasonal factor for season-sensitive categories
    if (category.seasonSensitive) {
      percentage *= seasonalFactor;
    }
    
    return {
      id: category.id,
      name: category.name,
      amount: 0, // Placeholder, will be calculated after normalization
      percentage,
      description: category.description,
      recommendations: category.recommendations || [],
      savingTips: category.savingTips || [],
      color: categoryColors[index % categoryColors.length],
      isHighPriority: isPriority
    };
  });
  
  // Normalize percentages to sum to 1.0
  const totalPercentage = allocations.reduce((sum, item) => sum + item.percentage, 0);
  const normalizedAllocations = allocations.map(item => ({
    ...item,
    percentage: item.percentage / totalPercentage
  }));
  
  // Calculate actual amounts based on budget
  const finalAllocations = normalizedAllocations.map(item => ({
    ...item,
    amount: Math.round(totalBudget * item.percentage)
  }));
  
  return finalAllocations;
};

/**
 * Generate AI recommendations based on form data and allocations
 */
const generateRecommendations = (
  formData: BudgetFormData,
  categories: CategoryAllocation[]
): AIRecommendation[] => {
  const recommendations: AIRecommendation[] = [];
  
  // Add recommendations based on wedding style
  const styleRecommendations = getStyleRecommendations(formData.style);
  recommendations.push(...styleRecommendations);
  
  // Add recommendations based on season
  const seasonRecommendations = getSeasonRecommendations(formData.weddingDate);
  recommendations.push(...seasonRecommendations);
  
  // Add recommendations based on guest count
  if (formData.guestCount > 150) {
    recommendations.push({
      title: 'Consider Tiered Catering',
      description: 'With your larger guest count, consider a tiered catering approach with premium options for close family and more economical choices for extended guests.',
      impact: 'medium',
      category: 'Catering'
    });
  }
  
  // Add recommendations based on priorities
  for (const categoryId of formData.priorities) {
    const category = categories.find(c => c.id === categoryId);
    if (category && category.recommendations && category.recommendations.length > 0) {
    // Add 1-2 recommendations for each priority category
    const priorityRec: AIRecommendation = {
      title: `${category.name} Focus: ${category.recommendations?.[0] || ''}`,
      description: `As ${category.name || ''} is a priority, ${category.recommendations?.[0] || ''}`,
      impact: 'high',
      category: category.name || ''
    };
      recommendations.push(priorityRec);
    }
  }
  
  // Add general budget optimization recommendations
  recommendations.push({
    title: 'Strategic Budget Allocation',
    description: `Based on your priorities, we've allocated more budget to ${
      formData.priorities.map(p => categories.find(c => c.id === p)?.name || p).join(', ')
    }. Consider reducing spend in less visible areas.`,
    impact: 'high',
    category: 'Budget'
  });
  
  return recommendations;
};

/**
 * Get recommendations based on wedding style
 */
const getStyleRecommendations = (style: WeddingStyle): AIRecommendation[] => {
  switch (style) {
    case 'modern':
      return [{
        title: 'Minimalist Modern Venue',
        description: 'Look for industrial or urban venues with clean lines and open spaces that require minimal decoration to achieve your modern aesthetic.',
        impact: 'high',
        category: 'Venue'
      }];
    case 'rustic':
      return [{
        title: 'DIY Rustic Decor',
        description: 'Embrace DIY decor like mason jars, reclaimed wood signs, and wildflower arrangements to enhance your rustic theme while reducing decor costs.',
        impact: 'medium',
        category: 'Decor'
      }];
    case 'classic':
      return [{
        title: 'Timeless Florals',
        description: 'For your classic wedding, focus on timeless florals like roses and hydrangeas that are available year-round for better pricing.',
        impact: 'medium',
        category: 'Flowers'
      }];
    case 'boho':
      return [{
        title: 'Outdoor Boho Setting',
        description: 'Consider outdoor venues like parks or beaches that naturally complement your boho style while reducing venue costs.',
        impact: 'high',
        category: 'Venue'
      }];
    case 'vintage':
      return [{
        title: 'Vintage Rental Sourcing',
        description: 'Source authentic vintage items from antique shops or family heirlooms to enhance your vintage theme without buying new decor.',
        impact: 'medium',
        category: 'Decor'
      }];
    case 'outdoor':
      return [{
        title: 'Weather Contingency',
        description: 'Include a weather contingency plan in your budget for an outdoor wedding, such as tent rental or a backup indoor location.',
        impact: 'high',
        category: 'Venue'
      }];
    default:
      return [];
  }
};

/**
 * Get recommendations based on wedding season
 */
const getSeasonRecommendations = (date: Date): AIRecommendation[] => {
  const month = date.getMonth();
  
  // Summer (June-August)
  if (month >= 5 && month <= 7) {
    return [{
      title: 'Summer Heat Management',
      description: 'Consider your guests\' comfort with cooling options like shaded areas, fans, or cold refreshments stations.',
      impact: 'medium',
      category: 'Guest Experience'
    }];
  }
  
  // Fall (September-November)
  if (month >= 8 && month <= 10) {
    return [{
      title: 'Seasonal Fall Decor',
      description: 'Take advantage of natural fall elements like pumpkins, autumn leaves, and seasonal blooms to reduce floral costs.',
      impact: 'medium',
      category: 'Decor'
    }];
  }
  
  // Winter (December-February)
  if (month >= 11 || month <= 1) {
    return [{
      title: 'Winter Venue Negotiation',
      description: 'Leverage your off-season date to negotiate better rates with venues and vendors who have less bookings during winter months.',
      impact: 'high',
      category: 'Venue'
    }];
  }
  
  // Spring (March-May)
  if (month >= 2 && month <= 4) {
    return [{
      title: 'Spring Floral Selection',
      description: 'Choose in-season spring flowers like tulips, daffodils, and peonies for your arrangements to optimize your floral budget.',
      impact: 'medium',
      category: 'Flowers'
    }];
  }
  
  return [];
};

/**
 * Generate savings suggestions based on the budget breakdown
 */
const generateSavingsSuggestions = (
  formData: BudgetFormData,
  categories: CategoryAllocation[]
): SavingsSuggestion[] => {
  const suggestions: SavingsSuggestion[] = [];
  
  // Find categories with highest budget allocation that are not priorities
  const nonPriorityCategories = categories
    .filter(cat => !cat.isHighPriority)
    .sort((a, b) => (b.amount || 0) - (a.amount || 0));
  
  // Add savings suggestions for top non-priority categories
  for (const category of nonPriorityCategories.slice(0, 3)) {
    if (category.savingTips && category.savingTips.length > 0) {
      // Calculate potential savings (10-20% of category budget)
      const savingsPercentage = 0.1 + Math.random() * 0.1; // Between 10-20%
      const potentialSavings = Math.round((category.amount || 0) * savingsPercentage);
      
      suggestions.push({
        title: `${category.name || ''}: ${category.savingTips?.[0]?.split('.')[0] || ''}`,
        description: category.savingTips?.[0] || '',
        potentialSavings,
        category: category.name || ''
      });
    }
  }
  
  // Add general savings suggestions
  if (formData.guestCount > 120) {
    const guestReductionSavings = Math.round((formData.guestCount - 100) * 150); // Approx $150 per guest
    suggestions.push({
      title: 'Optimize Guest Count',
      description: 'Consider reducing your guest list to close family and friends. Each guest adds cost for food, drinks, invitations, and favors.',
      potentialSavings: guestReductionSavings,
      category: 'Guest List'
    });
  }
  
  if (formData.weddingDate.getMonth() >= 4 && formData.weddingDate.getMonth() <= 9) {
    // Peak season - suggest off-season date
    const offSeasonSavings = Math.round(formData.budgetRange * 0.15); // Approx 15% of total budget
    suggestions.push({
      title: 'Consider Off-Season Date',
      description: 'Moving your date to November through April could lower your venue and vendor costs by 15-25%.',
      potentialSavings: offSeasonSavings,
      category: 'Date Selection'
    });
  }
  
  // Add Friday/Sunday suggestion
  const weekendSavings = Math.round(formData.budgetRange * 0.1); // Approx 10% of total budget
  suggestions.push({
    title: 'Friday or Sunday Wedding',
    description: 'Consider a Friday or Sunday wedding instead of Saturday to save on venue costs.',
    potentialSavings: weekendSavings,
    category: 'Date Selection'
  });
  
  return suggestions;
};

/**
 * Calculate AI confidence score based on inputs
 */
const calculateConfidenceScore = (formData: BudgetFormData): number => {
  let score = 75; // Base score
  
  // More data = higher confidence
  if (formData.location.length > 0) score += 5;
  if (formData.priorities.length >= 3) score += 5;
  if (formData.partnerNames[0] && formData.partnerNames[1]) score += 2;
  
  // Cap at 95
  return Math.min(score, 95);
};
