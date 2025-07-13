import type { WeddingStyle } from '../types/budget.types';

/**
 * Budget category data with allocation percentages and recommendations
 */
export interface BudgetCategory {
  id: string;
  name: string;
  description: string;
  baseAllocation: number; // Base percentage allocation (0-1)
  recommendations: string[];
  savingTips: string[];
  guestCountSensitive: boolean; // Whether category is affected by guest count
  regionSensitive: boolean; // Whether category is affected by location
  styleSensitive: boolean; // Whether category is affected by wedding style
  seasonSensitive: boolean; // Whether category is affected by season
}

/**
 * Location data with cost factors
 */
export interface LocationData {
  region: string;
  locations: string[]; // List of locations that fall under this region
  factor: number; // Cost multiplier (1.0 = average)
  description: string;
}

/**
 * Style cost factor data
 */
export interface StyleCostFactor {
  factor: number; // Cost multiplier (1.0 = average)
  description: string;
}

/**
 * Wedding budget categories with allocation percentages and recommendations
 */
export const budgetCategories: BudgetCategory[] = [
  {
    id: 'venue',
    name: 'Venue & Rentals',
    description: 'Wedding venue, ceremony location, tables, chairs, and equipment rentals',
    baseAllocation: 0.40,
    recommendations: [
      'Look for all-inclusive venues to reduce separate rental costs',
      'Consider off-peak days and times for significant venue discounts',
      'Explore non-traditional venues like parks, museums, or family properties'
    ],
    savingTips: [
      'Book your venue during off-season or on a weekday for 20-30% savings',
      'Choose a venue that doesn\'t require much decoration to save on decor',
      'Find a venue that allows outside catering and alcohol to avoid markup'
    ],
    guestCountSensitive: true,
    regionSensitive: true,
    styleSensitive: true,
    seasonSensitive: true
  },
  {
    id: 'catering',
    name: 'Catering & Drinks',
    description: 'Food, beverages, bartenders, and catering staff',
    baseAllocation: 0.25,
    recommendations: [
      'Consider a buffet or family-style service instead of plated meals',
      'Limit open bar hours or offer select signature cocktails',
      'Schedule your reception between meal times for lighter fare options'
    ],
    savingTips: [
      'Limit your open bar to beer and wine only to save 30-40% on alcohol costs',
      'Consider a brunch or lunch reception instead of dinner to save 25-30%',
      'Reduce passed appetizers and opt for stationed hors d\'oeuvres to save on staff'
    ],
    guestCountSensitive: true,
    regionSensitive: true,
    styleSensitive: false,
    seasonSensitive: false
  },
  {
    id: 'photography',
    name: 'Photography & Video',
    description: 'Professional photographers, videographers and photo booths',
    baseAllocation: 0.12,
    recommendations: [
      'Book a photographer that offers engagement photos included in the package',
      'Consider a shorter coverage time for the videographer',
      'Look for up-and-coming photographers with growing portfolios'
    ],
    savingTips: [
      'Book a photographer for fewer hours and focus on key moments',
      'Skip the photo album in your initial package and create it later',
      'Consider hiring separate photographers for ceremony and reception'
    ],
    guestCountSensitive: false,
    regionSensitive: true,
    styleSensitive: false,
    seasonSensitive: false
  },
  {
    id: 'attire',
    name: 'Attire & Beauty',
    description: 'Wedding dress, suits, accessories, hair, makeup, and grooming',
    baseAllocation: 0.08,
    recommendations: [
      'Look for sample sales or pre-owned dresses',
      'Consider renting suits instead of buying',
      'Schedule hair and makeup trials on the same day as other appointments'
    ],
    savingTips: [
      'Consider a pre-owned wedding dress to save 40-60% off retail',
      'Choose seasonal flowers for your bouquet to reduce costs',
      'Do your own makeup and only book professional hair styling'
    ],
    guestCountSensitive: false,
    regionSensitive: false,
    styleSensitive: true,
    seasonSensitive: false
  },
  {
    id: 'flowers',
    name: 'Flowers & Decor',
    description: 'Floral arrangements, centerpieces, lighting, and decorations',
    baseAllocation: 0.10,
    recommendations: [
      'Use more greenery and fewer flowers in arrangements',
      'Repurpose ceremony flowers at the reception',
      'Choose seasonal and local blooms for best pricing'
    ],
    savingTips: [
      'Focus on statement pieces and minimize smaller arrangements',
      'Use candles and lighting effects instead of elaborate floral displays',
      'Choose in-season flowers to save 20-40% on your floral budget'
    ],
    guestCountSensitive: true,
    regionSensitive: false,
    styleSensitive: true,
    seasonSensitive: true
  },
  {
    id: 'entertainment',
    name: 'Entertainment & Music',
    description: 'DJ, band, ceremony musicians, and entertainment',
    baseAllocation: 0.07,
    recommendations: [
      'Book a DJ with ceremony sound system capabilities',
      'Look for bands that can perform in smaller configurations for different parts of the day',
      'Consider unique entertainment like photo booths or lawn games'
    ],
    savingTips: [
      'Choose a DJ instead of a live band to save 50-70%',
      'Use a playlist for cocktail hour and book musicians only for key moments',
      'Look for entertainment packages that include multiple services'
    ],
    guestCountSensitive: false,
    regionSensitive: true,
    styleSensitive: true,
    seasonSensitive: false
  },
  {
    id: 'stationery',
    name: 'Invitations & Stationery',
    description: 'Save-the-dates, invitations, programs, menus, and thank you cards',
    baseAllocation: 0.03,
    recommendations: [
      'Consider digital save-the-dates and RSVP management',
      'Choose simplified printing methods like digital over letterpress',
      'Order extra invitation envelopes for addressing mistakes'
    ],
    savingTips: [
      'Use digital invitations and save-the-dates to save 80-100% on paper costs',
      'Skip the inner envelope and other extras to reduce printing costs',
      'Choose standard postage rather than custom stamps'
    ],
    guestCountSensitive: true,
    regionSensitive: false,
    styleSensitive: true,
    seasonSensitive: false
  },
  {
    id: 'cake',
    name: 'Cake & Desserts',
    description: 'Wedding cake, dessert table, and late-night snacks',
    baseAllocation: 0.02,
    recommendations: [
      'Choose a smaller display cake with sheet cake served to guests',
      'Consider a dessert table with variety instead of a large cake',
      'Look for bakeries that specialize in weddings for best quality'
    ],
    savingTips: [
      'Order a smaller display cake and serve sheet cake to guests',
      'Choose a simple design with minimal hand detailing to reduce labor costs',
      'Consider alternatives like cupcakes, pies, or a dessert table'
    ],
    guestCountSensitive: true,
    regionSensitive: false,
    styleSensitive: false,
    seasonSensitive: false
  },
  {
    id: 'transportation',
    name: 'Transportation',
    description: 'Wedding party transportation, guest shuttles, and getaway car',
    baseAllocation: 0.02,
    recommendations: [
      'Book venues close to each other to minimize transportation needs',
      'Consider providing transportation only for the wedding party',
      'Look for unique transportation options that double as photo opportunities'
    ],
    savingTips: [
      'Choose ceremony and reception venues in the same location',
      'Limit transportation to just the wedding party rather than all guests',
      'Book transportation for shorter time periods covering only key moments'
    ],
    guestCountSensitive: true,
    regionSensitive: true,
    styleSensitive: false,
    seasonSensitive: false
  },
  {
    id: 'favors',
    name: 'Favors & Gifts',
    description: 'Guest favors, wedding party gifts, and parent gifts',
    baseAllocation: 0.02,
    recommendations: [
      'Choose meaningful favors that guests will actually use',
      'Consider edible favors or donations to charity in lieu of physical items',
      'Personalize gifts for the wedding party based on their interests'
    ],
    savingTips: [
      'Skip favors entirely—many guests leave them behind',
      'Choose edible favors that can double as place cards',
      'DIY thoughtful gifts for your wedding party instead of purchasing'
    ],
    guestCountSensitive: true,
    regionSensitive: false,
    styleSensitive: true,
    seasonSensitive: false
  }
];

/**
 * Location cost factors by region
 */
export const locationFactors: LocationData[] = [
  {
    region: 'Major Metropolitan',
    locations: ['new york', 'san francisco', 'los angeles', 'chicago', 'boston', 'washington dc', 'seattle', 'miami'],
    factor: 1.75,
    description: 'Higher cost metropolitan area with premium venue and service pricing'
  },
  {
    region: 'Urban',
    locations: ['philadelphia', 'atlanta', 'denver', 'austin', 'dallas', 'houston', 'phoenix', 'portland', 'nashville'],
    factor: 1.35,
    description: 'Urban area with moderately high wedding costs'
  },
  {
    region: 'Suburban',
    locations: ['suburbs', 'county', 'township'],
    factor: 1.0,
    description: 'Typical suburban pricing for wedding services'
  },
  {
    region: 'Rural',
    locations: ['rural', 'country', 'farm', 'barn', 'village'],
    factor: 0.8,
    description: 'Lower cost rural area with more affordable options'
  },
  {
    region: 'Destination',
    locations: ['hawaii', 'caribbean', 'mexico', 'europe', 'bali', 'thailand', 'resort'],
    factor: 1.8,
    description: 'Premium pricing for destination wedding locations'
  }
];

/**
 * Style cost factors by wedding style
 */
export const styleCostFactors: Record<WeddingStyle, StyleCostFactor> = {
  modern: {
    factor: 1.2,
    description: 'Contemporary aesthetic with clean lines and minimalist elegance'
  },
  rustic: {
    factor: 0.9,
    description: 'Natural, countryside charm with handcrafted elements'
  },
  classic: {
    factor: 1.1,
    description: 'Timeless elegance with traditional elements'
  },
  boho: {
    factor: 0.95,
    description: 'Free-spirited style with eclectic and natural elements'
  },
  vintage: {
    factor: 1.05,
    description: 'Nostalgic charm with antique-inspired details'
  },
  outdoor: {
    factor: 0.85,
    description: 'Natural settings with open-air celebrations'
  }
};
