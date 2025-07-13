export interface BudgetData {
  // Basics
  partner1Name: string
  partner2Name: string
  weddingDate: string
  guestCount: number
  email: string
  phone?: string
  relationshipLength?: string
  
  // Details
  totalBudget: number
  weddingLocation: string
  venueType: string
  budgetFlexibility: 'strict' | 'medium' | 'flexible'
  budgetSource?: string[]
  
  // Style
  weddingStyle: 'elegant' | 'rustic' | 'modern' | 'vintage' | 'boho'
  colorScheme?: string[]
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  timeOfDay?: string
  formalityLevel?: string
  culturalTraditions?: string[]
  specialRequirements?: string
  
  // Priorities
  topPriorities?: Record<string, number>
  mustHaves?: string[]
  niceToHaves?: string[]
  dealBreakers?: string[]
  inspirationSources?: string[]
  
  // Calculated results (optional)
  budgetBreakdown?: {
    venue: number
    catering: number
    photography: number
    flowers: number
    music: number
    dress: number
    rings: number
    decoration: number
    other: number
  }
  
  recommendations?: string[]
  savings?: string[]
}

export interface BudgetFormStep {
  id: number
  title: string
  description: string
  isCompleted: boolean
}

export interface LocationOption {
  id: string
  name: string
  icon: string
  multiplier: number
  description: string
}

export interface WeddingStyleOption {
  id: string
  name: string
  icon: string
  description: string
  multiplier: number
}

export interface SeasonOption {
  id: string
  name: string
  icon: string
  description: string
  multiplier: number
}

export interface BudgetCategory {
  id: string
  name: string
  percentage: number
  amount: number
  description: string
  icon: string
}

export type WeddingStyle = 
  | 'romantic'
  | 'modern'
  | 'rustic'
  | 'elegant'
  | 'bohemian'
  | 'minimalist'

export interface BudgetBreakdown {
  categories: BudgetCategory[]
  totalBudget: number
  recommendations: string[]
  savings: number
  extras: number
}

export interface LocationData {
  name: string
  averageCost: number
  currency: string
  region: string
}

export interface StyleData {
  name: WeddingStyle
  displayName: string
  description: string
  averageMultiplier: number
  characteristics: string[]
}

// Grunddaten - Stufe 1
export interface BasicsData {
  partner1Name: string
  partner2Name: string
  weddingDate: Date
  guestCount: number
  email: string
  phone?: string
  relationshipLength: number // Jahre zusammen
  engagementLength: number // Monate verlobt
}

// Location & Budget - Stufe 2
export interface DetailsData {
  weddingLocation: string
  locationCity: string
  locationCountry: string
  totalBudget: number
  budgetFlexibility: 'strict' | 'somewhat_flexible' | 'very_flexible'
  budgetSource: ('savings' | 'family_contribution' | 'loan' | 'gifts')[]
  venueType: 'hotel' | 'castle' | 'garden' | 'church' | 'outdoor' | 'restaurant' | 'other'
  ceremonyReceptionSame: boolean
  // Prioritäten für Budget-Gewichtung (max 5 auswählbar)
  topPriorities?: ('venue' | 'catering' | 'photography' | 'attire' | 'flowers' | 'entertainment' | 'invitations' | 'cake' | 'transportation' | 'favors')[]
}

// Style & Vision - Stufe 3
export interface StyleData {
  weddingStyle: 'modern' | 'rustic' | 'classic' | 'boho' | 'vintage' | 'outdoor'
  colorScheme: string[]
  season: 'spring' | 'summer' | 'autumn' | 'winter'
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night'
  formalityLevel: 'casual' | 'semi_formal' | 'formal' | 'black_tie'
  culturalTraditions: string[]
  specialRequirements: string[]
}

// Priorities & Preferences - Stufe 4
export interface PrioritiesData {
  topPriorities: {
    venueRentals: number        // 1-10 Wichtigkeit
    cateringDrinks: number
    photographyVideo: number
    attireBeauty: number
    flowersDecor: number
    entertainmentMusic: number
    invitationsStationery: number
    cakeDesserts: number
    transportation: number
    favorsGifts: number
    honeymoon: number
  }
  mustHaves: string[]
  niceToHaves: string[]
  dealBreakers: string[]
  previousWeddingExperience: boolean
  inspirationSources: ('pinterest' | 'instagram' | 'magazines' | 'friends' | 'vendors')[]
}

// Vollständige Form-Daten
export interface WeddingFormData {
  basics?: BasicsData
  details?: DetailsData
  style?: StyleData
  priorities?: PrioritiesData
}

// KI-Empfehlungen
export interface AIRecommendations {
  budgetBreakdown: {
    category: string
    recommendedAmount: number
    percentage: number
    reasoning: string
  }[]
  vendorSuggestions: {
    category: string
    vendors: Vendor[]
    whyRecommended: string
  }[]
  timelineSuggestions: {
    task: string
    monthsBefore: number
    priority: 'high' | 'medium' | 'low'
  }[]
  costSavingTips: string[]
  seasonalAdvice: string[]
}

// Vendor-Daten
export interface Vendor {
  id: string
  name: string
  category: string
  rating: number
  priceRange: '$' | '$$' | '$$$' | '$$$$'
  location: string
  description: string
  website?: string
  phone?: string
  specialties: string[]
  availability: boolean
  portfolioImages: string[]
}

// Results Dashboard
export interface ResultsDashboard {
  budgetBreakdown: BudgetCategory[]
  timeline: WeddingTimeline
  vendorDirectory: Vendor[]
  checklistItems: TodoItem[]
  costComparison: RegionalCostData
  sustainabilityScore: number
  stressLevel: 'low' | 'medium' | 'high'
  recommendations: AIRecommendations
}

export interface WeddingTimeline {
  id: string
  task: string
  description: string
  monthsBefore: number
  priority: 'high' | 'medium' | 'low'
  category: string
  completed: boolean
  dueDate: Date
}

export interface TodoItem {
  id: string
  title: string
  description: string
  category: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  dueDate: Date
  estimatedTime: number // Minuten
}

export interface RegionalCostData {
  region: string
  averageCosts: Record<string, number>
  priceComparison: 'below_average' | 'average' | 'above_average'
  marketTrends: {
    category: string
    trend: 'increasing' | 'stable' | 'decreasing'
    percentage: number
  }[]
}

// Engagement & Follow-up
export interface EngagementData {
  emailSequence: {
    day: number
    subject: string
    content: string
    cta: string
  }[]
  personalizedContent: {
    budgetUpdates: boolean
    vendorRecommendations: boolean
    timelineReminders: boolean
    tipsAndAdvice: boolean
  }
  shareableResults: {
    pdfExport: boolean
    socialMediaCards: boolean
    partnersView: boolean
  }
}

// Analytics
export interface AnalyticsEvents {
  form_started: { timestamp: Date }
  step_completed: { step: number, time_spent: number }
  budget_changed: { old_value: number, new_value: number }
  style_selected: { style: string }
  priorities_set: { top_3: string[] }
  form_completed: { total_time: number }
  results_viewed: { budget_range: string }
  email_submitted: { lead_quality: 'high' | 'medium' | 'low' }
  pdf_downloaded: { timestamp: Date }
  vendor_clicked: { vendor_id: string, category: string }
}

export interface LeadScore {
  budgetRange: number      // 1-10 basierend auf Budget
  timeline: number         // näher = höher
  engagement: number       // Form completion rate
  dataQuality: number      // vollständige Daten
  totalScore: number       // 1-100
}

// Validation Errors
export interface ValidationErrors {
  basics?: Partial<Record<keyof BasicsData, string>>
  details?: Partial<Record<keyof DetailsData, string>>
  style?: Partial<Record<keyof StyleData, string>>
  priorities?: Partial<Record<keyof PrioritiesData, string>>
} 