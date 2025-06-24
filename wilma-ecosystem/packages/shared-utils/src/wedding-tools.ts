/**
 * Type definition for a wedding planning tool
 */
export interface WeddingTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  url: string;
  status: 'active' | 'coming-soon';
}

/**
 * List of all wedding planning tools in the Wilma ecosystem
 */
export const WEDDING_TOOLS: WeddingTool[] = [
  {
    id: 'budget',
    name: 'Budget Calculator',
    description: 'Plan your wedding budget with AI assistance to optimize spending and allocate funds.',
    icon: 'Calculator',
    url: 'https://budget.wilma-wedding.com',
    status: 'active',
  },
  {
    id: 'timeline',
    name: 'Timeline Generator',
    description: 'Create a personalized wedding day timeline to keep everything on schedule.',
    icon: 'Calendar',
    url: 'https://timeline.wilma-wedding.com',
    status: 'coming-soon',
  },
  {
    id: 'guests',
    name: 'Guest Manager',
    description: 'Manage your guest list, track RSVPs, and organize seating arrangements.',
    icon: 'Users',
    url: 'https://guests.wilma-wedding.com',
    status: 'coming-soon',
  },
  {
    id: 'venue',
    name: 'Venue Analyzer',
    description: 'Find and compare wedding venues that match your style and budget.',
    icon: 'MapPin',
    url: 'https://venue.wilma-wedding.com',
    status: 'coming-soon',
  },
  {
    id: 'wellness',
    name: 'Stress Planner',
    description: 'Manage wedding planning stress with personalized wellness tips and checklists.',
    icon: 'Heart',
    url: 'https://wellness.wilma-wedding.com',
    status: 'coming-soon',
  },
];
