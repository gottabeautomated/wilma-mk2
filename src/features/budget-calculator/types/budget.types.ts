import { z } from 'zod';

// Budget form schema with validation
export const budgetFormSchema = z.object({
  guestCount: z.number().min(10, "Minimum 10 guests").max(1000, "Maximum 1000 guests"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  weddingDate: z.date().min(new Date(), "Wedding date must be in the future"),
  style: z.enum(['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor'], {
    required_error: "Please select a wedding style",
  }),
  budgetRange: z.number().min(5000, "Minimum budget is $5,000").max(200000, "Maximum budget is $200,000"),
  priorities: z.array(z.string()).min(1, "Select at least 1 priority").max(5, "Maximum 5 priorities"),
  partnerNames: z.tuple([
    z.string().min(1, "Partner 1 name is required"),
    z.string().min(1, "Partner 2 name is required"),
  ]),
});

// Form data type derived from schema
export type BudgetFormData = z.infer<typeof budgetFormSchema>;

// Form props for BudgetForm component
export interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  initialData: BudgetFormData;
  currentStep: 1 | 2 | 3 | 4;
  onNextStep: () => void;
  onPrevStep: () => void;
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

// Component Props
export interface BudgetChartProps {
  categories: BudgetBreakdownItem[];
  totalBudget: number;
  isPriority?: (categoryId: string) => boolean;
  selectedCategory?: string;
  onSelectCategory?: (id: string) => void;
}

export interface CategoryBreakdownProps {
  categories: BudgetBreakdownItem[];
  totalBudget: number;
  isPriority?: (categoryId: string) => boolean;
  selectedCategory?: string;
  onSelectCategory?: (id: string | undefined) => void;
}

export interface AIRecommendationsProps {
  recommendations: BudgetRecommendation[];
  savingsSuggestions?: SavingsSuggestion[];
  confidenceScore: number;
  totalPotentialSavings?: number;
}

export interface EmailCaptureModalProps {
  isOpen: boolean;
  onSubmit: (email: string) => Promise<void>;
  onSkip: () => void;
  formData: BudgetFormData;
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
