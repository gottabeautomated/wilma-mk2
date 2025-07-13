export interface BudgetFormData {
  guestCount: number;
  location: string;
  weddingDate: Date;
  style: 'modern' | 'rustic' | 'classic' | 'boho' | 'vintage' | 'outdoor';
  budgetRange: number;
  priorities: string[];
}

export interface BudgetBreakdown {
  venue: number;
  catering: number;
  photography: number;
  flowers: number;
  music: number;
  attire: number;
  other: number;
  [key: string]: number;
}

export interface BudgetResult {
  totalBudget: number;
  breakdown: BudgetBreakdown;
  recommendations: string[];
  confidenceScore: number;
}
