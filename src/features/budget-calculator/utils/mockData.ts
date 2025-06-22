import type { 
  BudgetFormData, 
  CategoryAllocation, 
  AIRecommendation, 
  SavingsSuggestion,
  RegionalFactor,
  StyleFactor
} from "../types/budget.types";

// Budget categories with default allocations (% of total budget)
export const budgetCategories = [
  { id: "venue", name: "Venue & Rentals", category: "Venue & Rentals", defaultPercentage: 30, minPercentage: 25, maxPercentage: 40, description: "Ceremony and reception locations" },
  { id: "catering", name: "Catering & Bar", category: "Catering & Bar", defaultPercentage: 25, minPercentage: 20, maxPercentage: 35, description: "Food, beverages, and service" },
  { id: "photography", name: "Photography & Video", category: "Photography & Video", defaultPercentage: 12, minPercentage: 8, maxPercentage: 15, description: "Professional photo and video services" },
  { id: "attire", name: "Attire & Beauty", category: "Attire & Beauty", defaultPercentage: 10, minPercentage: 5, maxPercentage: 15, description: "Wedding attire and beauty services" },
  { id: "flowers", name: "Flowers & Decor", category: "Flowers & Decor", defaultPercentage: 8, minPercentage: 5, maxPercentage: 12, description: "Floral arrangements and decorations" },
  { id: "music", name: "Music & Entertainment", category: "Music & Entertainment", defaultPercentage: 7, minPercentage: 5, maxPercentage: 10, description: "DJ, band, and other entertainment" },
  { id: "stationery", name: "Invitations & Stationery", category: "Invitations & Stationery", defaultPercentage: 3, minPercentage: 2, maxPercentage: 5, description: "Invitations, programs, and other paper goods" },
  { id: "transportation", name: "Transportation", category: "Transportation", defaultPercentage: 2, minPercentage: 1, maxPercentage: 5, description: "Wedding day transportation" },
  { id: "rings", name: "Wedding Rings", category: "Wedding Rings", defaultPercentage: 2, minPercentage: 1, maxPercentage: 3, description: "Wedding bands for the couple" },
  { id: "favors", name: "Gifts & Favors", category: "Gifts & Favors", defaultPercentage: 2, minPercentage: 1, maxPercentage: 4, description: "Wedding party gifts and guest favors" },
  { id: "misc", name: "Miscellaneous", category: "Miscellaneous", defaultPercentage: 3, minPercentage: 2, maxPercentage: 5, description: "Other expenses and contingency" },
];

// Regional pricing factors
export const regionalPricingFactors: RegionalFactor[] = [
  { region: "New York City", factor: 1.5, description: "Premium urban pricing with high demand" },
  { region: "San Francisco", factor: 1.4, description: "High-cost metropolitan area" },
  { region: "Los Angeles", factor: 1.3, description: "Popular destination with luxury venues" },
  { region: "Chicago", factor: 1.2, description: "Major city with moderate premium" },
  { region: "Miami", factor: 1.25, description: "Popular destination with seasonal pricing" },
  { region: "Seattle", factor: 1.15, description: "Urban setting with moderate costs" },
  { region: "Boston", factor: 1.25, description: "Historic venues command premium prices" },
  { region: "Washington DC", factor: 1.2, description: "Moderate to high-cost capital region" },
  { region: "Austin", factor: 1.1, description: "Growing market with increasing costs" },
  { region: "Denver", factor: 1.05, description: "Moderate pricing with beautiful surroundings" },
  { region: "Nashville", factor: 1.05, description: "Popular for destination weddings" },
  { region: "Charleston", factor: 1.15, description: "Historic southern charm with premium" },
  { region: "New Orleans", factor: 1.1, description: "Unique cultural wedding destination" },
  { region: "Phoenix", factor: 0.95, description: "Good value with seasonal considerations" },
  { region: "Las Vegas", factor: 1.0, description: "Wide range of options at various price points" },
  { region: "Atlanta", factor: 1.0, description: "Metropolitan pricing with southern charm" },
  { region: "Dallas", factor: 1.05, description: "Moderate luxury market" },
  { region: "Houston", factor: 1.0, description: "Competitive market with many options" },
  { region: "Philadelphia", factor: 1.1, description: "Historic city with moderate premium" },
  { region: "Portland", factor: 1.05, description: "Creative options with moderate pricing" },
  { region: "San Diego", factor: 1.15, description: "Beautiful weather premium" },
  { region: "Minneapolis", factor: 0.95, description: "Good value with seasonal options" },
  { region: "Detroit", factor: 0.9, description: "Emerging market with great value" },
  { region: "St. Louis", factor: 0.9, description: "Affordable with many venue options" },
  { region: "Kansas City", factor: 0.9, description: "Good value in the heartland" },
  { region: "Cleveland", factor: 0.85, description: "Great value with historic venues" },
  { region: "Pittsburgh", factor: 0.9, description: "Affordable with character" },
  { region: "Cincinnati", factor: 0.85, description: "Affordable midwestern charm" },
  { region: "Salt Lake City", factor: 0.9, description: "Mountain beauty at reasonable prices" },
  { region: "Indianapolis", factor: 0.85, description: "Affordable with many options" },
  { region: "Default", factor: 1.0, description: "Standard pricing for most locations" },
];

// Wedding style cost factors
export const styleCostFactors: StyleFactor[] = [
  { 
    style: "modern", 
    factor: 1.05, 
    description: "Clean lines, minimalist design, often with unique venues and custom elements" 
  },
  { 
    style: "rustic", 
    factor: 0.9, 
    description: "Natural elements, barn venues, and DIY opportunities can reduce costs" 
  },
  { 
    style: "classic", 
    factor: 1.0, 
    description: "Traditional elegance with timeless elements" 
  },
  { 
    style: "boho", 
    factor: 0.95, 
    description: "Free-spirited style with natural elements and personalized touches" 
  },
  { 
    style: "vintage", 
    factor: 1.1, 
    description: "Antique elements and curated details can add to overall costs" 
  },
  { 
    style: "outdoor", 
    factor: 0.9, 
    description: "Natural settings, though weather contingencies may add costs" 
  },
];

// Category descriptions
const categoryDescriptions = {
  "Venue & Rentals": "Includes the ceremony and reception locations, site fees, chair and table rentals, tents, and other equipment.",
  "Catering & Bar": "Covers food, service, cake, and beverages including alcohol. This typically includes staffing and service fees.",
  "Photography & Video": "Professional photo and video services, including engagement sessions, wedding day coverage, and final deliverables.",
  "Attire & Beauty": "Wedding attire, accessories, hair, makeup, and grooming services for the couple and wedding party.",
  "Flowers & Decor": "Floral arrangements, centerpieces, ceremony arch, bouquets, boutonnieres, and other decorative elements.",
  "Music & Entertainment": "Ceremony music, reception DJ or band, sound equipment, lighting, and any other entertainment services.",
  "Invitations & Stationery": "Save-the-dates, invitations, RSVP cards, programs, menu cards, thank you notes, and postage.",
  "Transportation": "Wedding day transportation for the couple and wedding party, guest shuttles, and parking services.",
  "Wedding Rings": "Cost of wedding bands for the couple, including custom design work if applicable.",
  "Gifts & Favors": "Gifts for the wedding party, parents, helpers, and favors for guests.",
  "Miscellaneous": "Marriage license, officiant fees, wedding coordinator, tips, and any unexpected expenses."
};

// Savings recommendations by category
const savingsTipsByCategory = {
  "Venue & Rentals": [
    {
      description: "Consider an off-season or weekday wedding to reduce venue costs by 20-30%.",
      potentialSavings: 3000
    },
    {
      description: "Look for all-inclusive venues to avoid the cost of sourcing separate vendors and rentals.",
      potentialSavings: 1500
    },
    {
      description: "Consider non-traditional venues like parks, museums, or family properties that may offer lower rates.",
      potentialSavings: 2500
    }
  ],
  "Catering & Bar": [
    {
      description: "Opt for a lunch or brunch reception instead of dinner to save 25-30% on catering costs.",
      potentialSavings: 2000
    },
    {
      description: "Choose a limited bar instead of an open bar, or offer beer, wine, and a signature cocktail.",
      potentialSavings: 1500
    },
    {
      description: "Select a buffet or family-style service instead of a plated meal to reduce service staff costs.",
      potentialSavings: 1200
    }
  ],
  "Photography & Video": [
    {
      description: "Book a photographer for fewer hours and focus on capturing key moments.",
      potentialSavings: 800
    },
    {
      description: "Consider hiring separate photographers for ceremony and reception instead of one for the full day.",
      potentialSavings: 1000
    },
    {
      description: "Ask about associate photographers who work under the main photographer but at a lower rate.",
      potentialSavings: 1200
    }
  ],
  "Attire & Beauty": [
    {
      description: "Shop sample sales or consider pre-owned wedding attire to save 40-60% off retail prices.",
      potentialSavings: 1000
    },
    {
      description: "Choose seasonal flowers that are locally available to reduce floral costs.",
      potentialSavings: 600
    },
    {
      description: "Do your own hair or makeup, or have a talented friend help with wedding day beauty.",
      potentialSavings: 500
    }
  ],
  "Flowers & Decor": [
    {
      description: "Use more greenery and fewer flowers in arrangements to reduce costs while maintaining visual impact.",
      potentialSavings: 800
    },
    {
      description: "Repurpose ceremony flowers for the reception to get double duty from key floral pieces.",
      potentialSavings: 500
    },
    {
      description: "Choose in-season, locally grown flowers instead of exotic blooms that need to be imported.",
      potentialSavings: 600
    }
  ],
  "Music & Entertainment": [
    {
      description: "Use a DJ instead of a live band to save 50-70% on musical entertainment.",
      potentialSavings: 1500
    },
    {
      description: "Create your own playlist and rent sound equipment instead of hiring a professional DJ.",
      potentialSavings: 800
    },
    {
      description: "Book entertainment through a music school or university to find talented, affordable musicians.",
      potentialSavings: 1000
    }
  ],
  "Invitations & Stationery": [
    {
      description: "Use digital invitations and RSVPs to save on printing and postage costs.",
      potentialSavings: 400
    },
    {
      description: "Order from affordable online retailers instead of custom stationery designers.",
      potentialSavings: 300
    },
    {
      description: "DIY your wedding stationery using templates and quality home printing.",
      potentialSavings: 350
    }
  ]
};

// Helper functions for budget calculations
export function getRegionalPricingFactor(location: string): RegionalFactor {
  // Try to find an exact match first
  const exactMatch = regionalPricingFactors.find(
    (factor) => factor.region.toLowerCase() === location.toLowerCase()
  );
  
  if (exactMatch) return exactMatch;
  
  // If no exact match, try to find a partial match
  const partialMatch = regionalPricingFactors.find(
    (factor) => location.toLowerCase().includes(factor.region.toLowerCase())
  );
  
  if (partialMatch) return partialMatch;
  
  // If no match at all, return the default factor
  return regionalPricingFactors.find((factor) => factor.region === "Default") || 
    { region: "Default", factor: 1.0, description: "Standard pricing for most locations" };
}

export function getStyleCostFactor(style: string): StyleFactor {
  return (
    styleCostFactors.find((factor) => factor.style === style) || 
    { style: "classic", factor: 1.0, description: "Traditional elegance with timeless elements" }
  );
}

interface BudgetAllocationParams {
  totalBudget: number;
  guestCount: number;
  priorities: string[];
  style: string;
}

export function calculateBudgetAllocation(params: BudgetAllocationParams): CategoryAllocation[] {
  const { totalBudget, guestCount, priorities, style } = params;
  
  // Adjust allocations based on priorities and guest count
  const allocations = budgetCategories.map((category) => {
    // Start with the default percentage
    let percentage = category.defaultPercentage;
    
    // Adjust for guest count (smaller weddings need higher % for fixed costs)
    if (guestCount < 50) {
      // For small weddings, fixed costs take up more of the budget percentage
      if (category.category === "Venue & Rentals" || 
          category.category === "Photography & Video" ||
          category.category === "Music & Entertainment") {
        percentage = Math.min(category.maxPercentage, percentage + 2);
      } else if (category.category === "Catering & Bar") {
        percentage = Math.max(category.minPercentage, percentage - 3);
      }
    } else if (guestCount > 150) {
      // For large weddings, catering takes up more of the budget
      if (category.category === "Catering & Bar") {
        percentage = Math.min(category.maxPercentage, percentage + 3);
      } else if (category.category === "Venue & Rentals") {
        percentage = Math.min(category.maxPercentage, percentage + 2);
      } else if (category.category === "Flowers & Decor") {
        percentage = Math.max(category.minPercentage, percentage - 1);
      }
    }
    
    // Adjust for style preferences
    if (style === "modern" && category.category === "Venue & Rentals") {
      percentage = Math.min(category.maxPercentage, percentage + 2);
    } else if (style === "rustic" && category.category === "Flowers & Decor") {
      percentage = Math.max(category.minPercentage, percentage - 1);
    } else if (style === "classic" && category.category === "Attire & Beauty") {
      percentage = Math.min(category.maxPercentage, percentage + 1);
    } else if (style === "boho" && category.category === "Flowers & Decor") {
      percentage = Math.min(category.maxPercentage, percentage + 2);
    } else if (style === "vintage" && category.category === "Decor") {
      percentage = Math.min(category.maxPercentage, percentage + 2);
    } else if (style === "outdoor" && category.category === "Venue & Rentals") {
      percentage = Math.min(category.maxPercentage, percentage - 2);
    }
    
    // Is this a priority category for the couple?
    const isPriority = priorities.some(
      (priority) => category.category.toLowerCase().includes(priority.toLowerCase())
    );
    
    // Adjust percentage based on priority (or not)
    if (isPriority) {
      percentage = Math.min(category.maxPercentage, percentage + 3);
    }
    
    return {
      category: category.category,
      defaultPercentage: category.defaultPercentage,
      adjustedPercentage: percentage,
      isHighPriority: isPriority,
    };
  });
  
  // Normalize percentages to ensure they sum to 100%
  const totalPercentage = allocations.reduce(
    (sum, item) => sum + item.adjustedPercentage, 
    0
  );
  
  const normalizedAllocations = allocations.map((item) => {
    const normalizedPercentage = Math.round((item.adjustedPercentage / totalPercentage) * 100);
    
    // Calculate amount based on normalized percentage
    const amount = Math.round((normalizedPercentage / 100) * totalBudget);
    
    // Add description and savings tip
    let description = categoryDescriptions[item.category as keyof typeof categoryDescriptions] || "";
    
    // Add a random savings tip if available for this category
    const categorySavingsTips = savingsTipsByCategory[item.category as keyof typeof savingsTipsByCategory];
    let savingsTip = undefined;
    
    if (categorySavingsTips && categorySavingsTips.length > 0) {
      // Randomly select a savings tip
      savingsTip = categorySavingsTips[Math.floor(Math.random() * categorySavingsTips.length)];
    }
    
    return {
      category: item.category,
      amount,
      percentage: normalizedPercentage,
      isHighPriority: item.isHighPriority,
      description,
      savingsTip,
    };
  });
  
  return normalizedAllocations;
}

interface AIRecommendationsParams {
  totalBudget: number;
  guestCount: number;
  location: string;
  style: string;
  priorities: string[];
  weddingDate: Date;
}

export function getAIRecommendations(params: AIRecommendationsParams): AIRecommendation[] {
  const { totalBudget, guestCount, location, style, priorities, weddingDate } = params;
  
  // Determine if it's a peak season wedding
  const weddingMonth = new Date(weddingDate).getMonth();
  const isPeakSeason = weddingMonth >= 4 && weddingMonth <= 9; // May through October
  
  // Calculate months until wedding
  const today = new Date();
  const monthsUntilWedding = (weddingDate.getFullYear() - today.getFullYear()) * 12 + 
    (weddingDate.getMonth() - today.getMonth());
  
  // Base recommendations that apply to most weddings
  const recommendations: AIRecommendation[] = [
    {
      id: "rec-budget-1",
      title: "Consider a Budget Buffer",
      description: "Set aside 10-15% of your total budget as a contingency fund for unexpected expenses. Many couples exceed their budget due to last-minute additions or unexpected costs.",
      importance: "high",
      rationale: "Wedding expenses often exceed initial budgets by 15-20%. Having a buffer prevents financial stress during your planning process.",
      categoryImpacts: [
        { category: "All Categories", effect: "Prevents overspending and borrowing" }
      ]
    },
    {
      id: "rec-guests-1",
      title: "Evaluate Your Guest Count Carefully",
      description: `With ${guestCount} guests, each additional 10 guests will increase your catering costs by approximately $${Math.round(totalBudget * 0.025).toLocaleString()}. Consider creating an A and B guest list if you need to reduce numbers.`,
      importance: "high",
      rationale: "Guest count is the biggest factor affecting your overall budget. Each guest impacts catering, bar, rentals, and other per-person costs.",
      categoryImpacts: [
        { category: "Catering & Bar", effect: "Direct per-person cost" },
        { category: "Venue & Rentals", effect: "May require larger space or more rentals" },
        { category: "Flowers & Decor", effect: "More tables means more centerpieces" }
      ]
    }
  ];
  
  // Add timing-based recommendations
  if (monthsUntilWedding < 6) {
    recommendations.push({
      id: "rec-timing-1",
      title: "Prioritize Vendor Bookings",
      description: `With ${monthsUntilWedding} months until your wedding, immediately prioritize booking your remaining key vendors. Many top professionals book 12-18 months in advance, especially for peak season dates.`,
      importance: "high",
      rationale: "Short planning timelines may limit vendor availability, potentially leading to higher costs for available vendors.",
      categoryImpacts: [
        { category: "Venue & Rentals", effect: "Limited options may increase costs" },
        { category: "Photography & Video", effect: "Top photographers book far in advance" },
        { category: "Catering & Bar", effect: "May need to be flexible on menu options" }
      ]
    });
  }
  
  // Add seasonal recommendations
  if (isPeakSeason) {
    recommendations.push({
      id: "rec-season-1",
      title: "Plan for Peak Season Pricing",
      description: `Your wedding falls within peak wedding season when venues and vendors often charge premium rates. Consider negotiating packages or finding weekday dates to manage costs.`,
      importance: "medium",
      rationale: "Peak season weddings typically cost 15-20% more than off-season dates due to high demand.",
      categoryImpacts: [
        { category: "Venue & Rentals", effect: "Peak season premium pricing" },
        { category: "Catering & Bar", effect: "Less negotiation flexibility" },
        { category: "Photography & Video", effect: "Higher rates during busy season" }
      ]
    });
  } else {
    recommendations.push({
      id: "rec-season-2",
      title: "Leverage Off-Season Advantages",
      description: `Your off-peak wedding date gives you negotiating power. Ask vendors about off-season discounts, and request complimentary upgrades or services to maximize value.`,
      importance: "medium",
      rationale: "Off-season weddings can save 10-30% on venue and vendor costs due to lower demand.",
      categoryImpacts: [
        { category: "Venue & Rentals", effect: "Potential for significant discounts" },
        { category: "Catering & Bar", effect: "More negotiating power on menus" },
        { category: "Photography & Video", effect: "Possible package upgrades" }
      ]
    });
  }
  
  // Add style-specific recommendations
  if (style === "modern") {
    recommendations.push({
      id: "rec-style-modern",
      title: "Balance Modern Design with Budget",
      description: "Modern weddings often feature clean lines and minimalist decor, which can be cost-effective. Focus on architectural venues that need minimal decoration and statement pieces rather than numerous small details.",
      importance: "medium",
      rationale: "Modern style can be achieved through careful curation rather than quantity of decorative elements.",
      categoryImpacts: [
        { category: "Venue & Rentals", effect: "Choose architecturally interesting spaces" },
        { category: "Flowers & Decor", effect: "Fewer, more impactful arrangements" }
      ]
    });
  } else if (style === "rustic") {
    recommendations.push({
      id: "rec-style-rustic",
      title: "Embrace DIY for Rustic Elements",
      description: "Your rustic wedding style lends itself to handmade and DIY elements. Consider crafting your own centerpieces, signage, or favors to add personal touches while saving on decor costs.",
      importance: "medium",
      rationale: "Rustic aesthetics often celebrate imperfection and handcrafted elements, making DIY appropriate and expected.",
      categoryImpacts: [
        { category: "Flowers & Decor", effect: "DIY decor can reduce costs by 40-60%" },
        { category: "Gifts & Favors", effect: "Handmade favors add personal touch" }
      ]
    });
  }
  
  // Add location-specific recommendations if needed
  const regionalFactor = getRegionalPricingFactor(location);
  if (regionalFactor.factor > 1.2) {
    recommendations.push({
      id: "rec-location-1",
      title: `Manage Costs in ${regionalFactor.region}`,
      description: `${regionalFactor.region} is among the most expensive wedding markets with costs approximately ${Math.round((regionalFactor.factor - 1) * 100)}% higher than national averages. Consider suburban venues or nearby areas for better rates.`,
      importance: "high",
      rationale: regionalFactor.description,
      categoryImpacts: [
        { category: "Venue & Rentals", effect: "High premium in prime locations" },
        { category: "Catering & Bar", effect: "Higher labor and product costs" }
      ]
    });
  }
  
  // Add budget-specific recommendations
  const budgetPerGuest = Math.round(totalBudget / guestCount);
  if (budgetPerGuest < 200) {
    recommendations.push({
      id: "rec-budget-2",
      title: "Maximize Impact with Limited Budget",
      description: `With approximately $${budgetPerGuest} per guest, focus spending on elements guests will notice most: food quality, bar service, and music. Consider reducing flower quantities and simplifying stationery.`,
      importance: "high",
      rationale: "When working with tighter budgets, prioritizing guest experience over decorative elements results in more memorable events.",
      categoryImpacts: [
        { category: "Catering & Bar", effect: "Prioritize food quality over variety" },
        { category: "Music & Entertainment", effect: "Essential for atmosphere" },
        { category: "Flowers & Decor", effect: "Area to find savings" }
      ]
    });
  } else if (budgetPerGuest > 500) {
    recommendations.push({
      id: "rec-budget-3",
      title: "Invest in Memorable Experiences",
      description: `Your generous budget of $${budgetPerGuest} per guest allows for luxury touches. Consider unique entertainment elements, interactive food stations, or custom design elements that guests will remember.`,
      importance: "medium",
      rationale: "Higher budgets allow for personalized experiences that create lasting memories beyond standard wedding elements.",
      categoryImpacts: [
        { category: "Catering & Bar", effect: "Consider chef tastings or specialty stations" },
        { category: "Music & Entertainment", effect: "Add unique performers or experiences" },
        { category: "Flowers & Decor", effect: "Invest in statement installations" }
      ]
    });
  }
  
  return recommendations;
}

interface SavingsSuggestionsParams {
  totalBudget: number;
  categories: CategoryAllocation[];
  guestCount: number;
  style: string;
}

export function getSavingsSuggestions(params: SavingsSuggestionsParams): SavingsSuggestion[] {
  const { totalBudget, categories, guestCount, style } = params;
  
  // General saving suggestions that apply to most weddings
  const suggestions: SavingsSuggestion[] = [
    {
      id: "save-1",
      title: "Consider a Weekday or Off-Season Wedding",
      description: "Choosing a weekday (Monday-Thursday) or off-season date (November-April in most regions) can save 20-30% on your venue and vendor costs.",
      potentialSavings: Math.round(totalBudget * 0.2),
      importance: "high",
      implementation: "Contact your desired venue about pricing for different days of the week and months. Many venues offer significant discounts for non-Saturday weddings or dates outside peak season.",
      tradeoffs: "Guest attendance may be lower for weekday weddings. Off-season dates may have weather constraints depending on your location."
    },
    {
      id: "save-2",
      title: "Trim Your Guest List",
      description: `Each guest costs approximately $${Math.round(totalBudget / guestCount)} when factoring in catering, bar, rentals, stationery, and favors. Reducing your guest count by 10% could yield significant savings.`,
      potentialSavings: Math.round((totalBudget / guestCount) * (guestCount * 0.1)),
      importance: "high",
      implementation: "Create an A-list and B-list for invitations, limit plus-ones, or consider an adults-only wedding if appropriate for your social circle.",
      tradeoffs: "Some friends or family may feel excluded. Consider having an informal celebration later for those who couldn't be invited."
    }
  ];
  
  // Add category-specific saving suggestions based on the highest budget categories
  const topCategories = [...categories]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 3);
  
  topCategories.forEach((category) => {
    if (category.category === "Venue & Rentals") {
      suggestions.push({
        id: "save-venue-1",
        title: "Choose a Naturally Beautiful Venue",
        description: "Select a venue with natural beauty (gardens, ocean views, etc.) that requires minimal additional decoration, saving on decor costs.",
        potentialSavings: Math.round(category.amount * 0.15),
        importance: "medium",
        implementation: "Research public gardens, historic homes, or parks with scenic backdrops that provide natural beauty.",
        tradeoffs: "May have restrictions on hours, noise levels, or specific vendors you can use."
      });
    }
    
    if (category.category === "Catering & Bar") {
      suggestions.push({
        id: "save-catering-1",
        title: "Customize Your Bar Service",
        description: "Instead of a full open bar, offer beer, wine, and 1-2 signature cocktails to reduce alcohol costs by 30-40%.",
        potentialSavings: Math.round(category.amount * 0.15),
        importance: "medium",
        implementation: "Discuss limited bar packages with your caterer or venue. Create signature drinks that can be batched in advance.",
        tradeoffs: "Some guests may expect a full bar. Make sure to have good non-alcoholic options available as well."
      });
    }
    
    if (category.category === "Photography & Video") {
      suggestions.push({
        id: "save-photo-1",
        title: "Optimize Photography Hours",
        description: "Book your photographer for the key hours instead of the entire day. Focus coverage on ceremony, formal portraits, and the beginning of the reception.",
        potentialSavings: Math.round(category.amount * 0.25),
        importance: "medium",
        implementation: "Ask photographers about smaller packages with 6-8 hours of coverage instead of 10-12 hours.",
        tradeoffs: "You may miss capturing getting-ready moments or late-reception events. Consider asking a skilled friend to capture these informally."
      });
    }
    
    if (category.category === "Flowers & Decor") {
      suggestions.push({
        id: "save-flowers-1",
        title: "Focus Flowers on High-Impact Areas",
        description: "Concentrate your floral budget on high-visibility elements (ceremony backdrop, bride's bouquet, head table) and use candles and non-floral elements elsewhere.",
        potentialSavings: Math.round(category.amount * 0.3),
        importance: "medium",
        implementation: "Ask your florist to create a proposal that prioritizes 2-3 statement pieces and uses minimal flowers for other areas.",
        tradeoffs: "Less overall floral presence. Compensate with lighting, fabric draping, or candles for atmosphere."
      });
    }
  });
  
  // Style-specific saving suggestions
  if (style === "rustic" || style === "boho") {
    suggestions.push({
      id: "save-style-1",
      title: `Embrace DIY Elements for Your ${style.charAt(0).toUpperCase() + style.slice(1)} Wedding`,
      description: `Your ${style} style is perfect for incorporating handmade elements. Consider DIY centerpieces, signage, or ceremony backdrops using natural materials.`,
      potentialSavings: Math.round(totalBudget * 0.05),
      importance: "medium",
      implementation: "Plan DIY projects well in advance to avoid last-minute stress. Start with simpler projects and recruit crafty friends to help.",
      tradeoffs: "DIY requires time and sometimes skills. Factor in material costs and the possibility that some projects may not turn out as expected."
    });
  }
  
  return suggestions;
}
