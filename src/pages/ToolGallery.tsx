import { Link } from 'react-router-dom'
import { Calculator, Calendar, Users, Building2, BrainCircuit } from 'lucide-react'
import { motion } from 'framer-motion'
import { ToolCard } from '@/components/ui/ToolCard'

const tools = [
  {
    id: 'budget-calculator',
    name: 'Budget Calculator',
    description: 'Create a personalized wedding budget with AI-powered recommendations tailored to your style and priorities.',
    icon: <Calculator className="h-8 w-8 text-[hsl(var(--wedding-rose))]" />,
    path: '/budget-calculator',
    color: 'bg-[hsl(var(--wedding-rose)/0.1)]',
    features: [
      'Smart budget allocation based on your priorities',
      'Regional pricing adjustments for your location',
      'Interactive pie chart & category breakdown',
      'Personalized savings recommendations'
    ]
  },
  {
    id: 'timeline-generator',
    name: 'Timeline Generator',
    description: 'Create a detailed timeline for your wedding day and planning process.',
    icon: <Calendar className="h-8 w-8 text-[hsl(var(--wedding-gold))]" />,
    path: '/timeline-generator',
    color: 'bg-[hsl(var(--wedding-gold)/0.1)]',
    features: [
      'Customizable wedding day schedule',
      'Planning milestones with reminders',
      'Vendor timeline coordination',
      'Shareable timeline for wedding party'
    ]
  },
  {
    id: 'guest-manager',
    name: 'Guest Manager',
    description: 'Manage your guest list, track RSVPs, and organize seating arrangements.',
    icon: <Users className="h-8 w-8 text-[hsl(var(--wedding-navy))]" />,
    path: '/guest-manager',
    color: 'bg-[hsl(var(--wedding-navy)/0.1)]',
    features: [
      'Digital RSVP tracking',
      'Guest grouping and categories',
      'Meal preference tracking',
      'Interactive seating chart'
    ]
  },
  {
    id: 'venue-analyzer',
    name: 'Venue Analyzer',
    description: 'Compare wedding venues side-by-side to find the perfect location.',
    icon: <Building2 className="h-8 w-8 text-[hsl(var(--wedding-blush))]" />,
    path: '/venue-analyzer',
    color: 'bg-[hsl(var(--wedding-blush)/0.1)]',
    features: [
      'Multi-venue comparison',
      'Cost analysis and budgeting',
      'Capacity and layout planning',
      'Vendor compatibility scoring'
    ]
  },
  {
    id: 'stress-planner',
    name: 'Stress Planner',
    description: 'Identify potential stress points and create a plan to manage them.',
    icon: <BrainCircuit className="h-8 w-8 text-[hsl(var(--wedding-sage))]" />,
    path: '/stress-planner',
    color: 'bg-[hsl(var(--wedding-sage)/0.1)]',
    features: [
      'Stress factor identification',
      'Self-care reminder system',
      'Delegation suggestion tool',
      'Stress reduction techniques'
    ]
  }
]

export function ToolGallery() {
  return (
    <div className="wedding-section">
      <div className="wedding-container">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-wedding-serif font-bold mb-4">Wedding Planning Tools</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of wedding planning tools designed to make your wedding preparation effortless and enjoyable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <ToolCard
                title={tool.name}
                description={tool.description}
                icon={
                  tool.id === 'budget-calculator' ? Calculator :
                  tool.id === 'timeline-generator' ? Calendar :
                  tool.id === 'guest-manager' ? Users :
                  tool.id === 'venue-analyzer' ? Building2 : BrainCircuit
                }
                path={tool.path}
                variant="default"
              />
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="wedding-card max-w-2xl mx-auto bg-gradient-to-r from-[hsl(var(--wedding-cream))] to-[hsl(var(--wedding-blush)/0.3)] p-8">
            <h2 className="text-2xl font-wedding-serif font-semibold mb-4">Want to save your progress?</h2>
            <p className="text-muted-foreground mb-6">
              Create a free account to save your wedding planning progress across all tools and access premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[hsl(var(--wedding-rose))] text-white hover:bg-[hsl(var(--wedding-rose)/0.9)] h-10 px-4 py-2"
              >
                Sign up free
              </Link>
              <Link 
                to="/login"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
