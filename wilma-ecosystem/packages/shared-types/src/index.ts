// Re-export database types
export * from './database.types';

// Budget Types
export interface BudgetFormData {
  guestCount: number;
  location: string;
  weddingDate: Date;
  style: 'modern' | 'rustic' | 'classic' | 'boho' | 'vintage' | 'outdoor';
  budgetRange: number;
  priorities: string[];
  partnerNames: [string, string];
}

// Budget category type
export interface BudgetCategory {
  id: string;
  name: string;
  description: string;
  defaultPercentage: number;
  minPercentage: number;
  maxPercentage: number;
  priorityIncrease: number;
}

// Budget breakdown item
export interface BudgetBreakdownItem {
  categoryId: string;
  id?: string;
  name: string;
  amount: number;
  percentage: number;
  description: string;
  isPriority: boolean;
  color?: string;
  recommendations?: string[];
  savingTips?: string[];
  isHighPriority?: boolean;
}

// Budget recommendation
export interface BudgetRecommendation {
  categoryId: string;
  text: string;
  potentialSavings: number;
  confidenceScore: number;
  title?: string;
  description?: string;
  impact?: 'high' | 'medium' | 'low';
  category?: string;
}

// Savings suggestion
export interface SavingsSuggestion {
  title: string;
  description: string;
  potentialSavings: number;
  category: string;
}

// Budget breakdown result
export interface BudgetBreakdown {
  totalBudget: number;
  categories: BudgetBreakdownItem[];
  recommendations: BudgetRecommendation[];
  confidenceScore: number;
  regionalFactor: number;
  seasonalFactor: number;
  savingsSuggestions?: SavingsSuggestion[];
  totalPotentialSavings?: number;
}

// Budget result type
export interface BudgetResult {
  formData: BudgetFormData;
  result: BudgetBreakdown;
}

// Email capture form type
export interface EmailCaptureForm {
  email: string;
}

// Additional types for calculations
export type WeddingStyle = 'modern' | 'rustic' | 'classic' | 'boho' | 'vintage' | 'outdoor';

export interface CategoryAllocation {
  categoryId?: string;
  id?: string;
  percentage: number;
  name?: string;
  amount?: number;
  description?: string;
  recommendations?: string[];
  savingTips?: string[];
  color?: string;
  isHighPriority?: boolean;
  isPriority?: boolean;
}

export interface AIRecommendation {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: string;
  text?: string;
  savingAmount?: number;
  confidence?: 'high' | 'medium' | 'low';
}

export interface RegionalFactor {
  region: string;
  factor: number;
  description: string;
  costFactor?: number; // For compatibility
  locations?: string[];
}

export interface StyleFactor {
  style: WeddingStyle;
  factor: number;
  description: string;
  costFactor?: number; // For compatibility
  categoryFactors?: Record<string, number>;
}

// Additional types for AIRecommendations component
export interface RecommendationDisplay {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  potentialSavings: number;
  category: string;
}
