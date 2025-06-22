// Form data types
export type WeddingStyle = "modern" | "rustic" | "classic" | "boho" | "vintage" | "outdoor";

export interface FormStep {
  id: string;
  label: string;
  description: string;
}

export interface BudgetFormData {
  guestCount: number;
  location: string;
  weddingDate: Date;
  style: WeddingStyle;
  budgetRange: number;
  priorities: string[];
  relationshipYears?: number;
  partnerNames: string[];
}

// Coach tips
export const coachTips: Record<string, string> = {
  personalInfo: "Providing both partner names helps us personalize your budget plan. If you're planning solo, just fill in one name!",
  basics: "Guest count is one of the biggest factors affecting your wedding budget. Each guest adds costs for catering, beverages, rentals, and more.",
  details: "Your wedding style influences many budget decisions. Modern weddings often focus on unique venues, while rustic weddings may save on natural decor elements.",
  budget: "Being clear about your priorities helps allocate your budget wisely. Most couples spend 40-50% on venue and catering combined."
};

// Style preview data
export interface StylePreviewData {
  description: string;
  palette: string[];
}

export const stylePreviewData: Record<WeddingStyle, StylePreviewData> = {
  modern: {
    description: "Clean lines, minimalist approach, architectural details, and a sophisticated palette.",
    palette: ["#121212", "#FFFFFF", "#DDDDDD", "#707070", "#E5E5E5"]
  },
  rustic: {
    description: "Natural elements, wood textures, earth tones, and a relaxed countryside feel.",
    palette: ["#5E4B3E", "#A47551", "#DEBA9D", "#94A061", "#615D47"]
  },
  classic: {
    description: "Timeless elegance with structured designs, traditional elements, and refined details.",
    palette: ["#060047", "#B3005E", "#E90064", "#FF5F9E", "#FFF5E0"]
  },
  boho: {
    description: "Free-spirited style with eclectic details, textural elements, and nature-inspired touches.",
    palette: ["#7D5A50", "#B4846C", "#E5B299", "#FCDEC0", "#7D5A50"]
  },
  vintage: {
    description: "Nostalgic elements with antique touches, soft colors, and romantic details.",
    palette: ["#3A3042", "#DB9D47", "#FF784F", "#EBBAB9", "#FAF2F2"]
  },
  outdoor: {
    description: "Natural settings with garden elements, seasonal influences, and environmental harmony.",
    palette: ["#1A4D2E", "#FF9F29", "#FAF3E3", "#3C8654", "#D2E3C8"]
  }
};

// Budget calculation result types
export interface CategoryAllocation {
  category: string;
  amount: number;
  percentage: number;
  isHighPriority: boolean;
  description?: string;
  name?: string;
  recommendation?: string;
  savingsTip?: {
    description: string;
    potentialSavings: number;
  };
}

export interface RegionalFactor {
  region: string;
  factor: number;
  description: string;
}

export interface StyleFactor {
  style: string;
  factor: number;
  description: string;
}

export interface CategoryImpact {
  category: string;
  effect: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  importance: "high" | "medium" | "low";
  rationale: string;
  categoryImpacts: CategoryImpact[];
}

export interface SavingsSuggestion {
  id: string;
  title: string;
  description: string;
  potentialSavings: number;
  importance: "high" | "medium" | "low";
  implementation: string;
  tradeoffs: string;
}

export interface BudgetResult {
  totalBudget: number;
  categories: CategoryAllocation[];
  recommendations: AIRecommendation[];
  savingsSuggestions: SavingsSuggestion[];
  confidenceScore: number;
  totalPotentialSavings: number;
  regionalFactor: RegionalFactor;
  styleFactor: StyleFactor;
}

export interface BudgetCalculationResult {
  result: BudgetResult;
  formData: BudgetFormData;
}

// Component prop types
export interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void;
  initialData: BudgetFormData;
  currentStep?: number;
  onNextStep?: () => void;
  onPrevStep?: () => void;
}

export interface BudgetChartProps {
  categories: CategoryAllocation[];
  totalBudget: number;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export interface CategoryBreakdownProps {
  categories: CategoryAllocation[];
  totalBudget: number;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export interface AIRecommendationsProps {
  recommendations: AIRecommendation[];
  savingsSuggestions: SavingsSuggestion[];
  confidenceScore: number;
  totalPotentialSavings: number;
}

export interface BudgetResultsProps {
  result: BudgetResult;
  formData: BudgetFormData;
}

export interface EmailCaptureModalProps {
  isOpen: boolean;
  onSubmit: (email: string) => void;
  onSkip: () => void;
  formData: BudgetFormData;
}

// Chart data types
export interface ChartData {
  name: string;
  value: number;
  amount: number;
  color: string;
  isHighPriority: boolean;
}
