# Wilma Mk2 - Micro-Apps Architecture Cline Prompts

Diese Prompts erstellen Wilma Mk2 als echte Micro-App Architektur, wo jedes Tool ein eigenständiges Projekt ist. Verwende diese Prompts in der angegebenen Reihenfolge.

---

## 1. Workspace Setup & Shared UI Library

```markdown
I want to create a micro-apps architecture for Wilma Mk2, a modern wedding planning platform. Please set up the workspace structure and create a shared UI library first.

## Project Structure Overview
```
wilma-mk2-ecosystem/
├── packages/
│   ├── ui/                     # Shared UI library
│   ├── api-client/             # Shared API client
│   └── types/                  # Shared TypeScript types
├── apps/
│   ├── landing/                # Main marketing site
│   ├── budget-calculator/      # Budget tool micro-app
│   ├── timeline-generator/     # Timeline tool micro-app
│   ├── guest-manager/          # Guest tool micro-app
│   ├── venue-analyzer/         # Venue tool micro-app
│   └── stress-planner/         # Wellness tool micro-app
├── package.json                # Root workspace
├── pnpm-workspace.yaml         # PNPM workspace config
└── turbo.json                  # Turborepo config
```

## Initial Setup Tasks

1. **Initialize workspace with Turborepo + PNPM**
   ```bash
   npx create-turbo@latest wilma-mk2-ecosystem --package-manager pnpm
   cd wilma-mk2-ecosystem
   ```

2. **Update root package.json**
   ```json
   {
     "name": "wilma-mk2-ecosystem",
     "private": true,
     "workspaces": [
       "apps/*",
       "packages/*"
     ],
     "scripts": {
       "build": "turbo run build",
       "dev": "turbo run dev",
       "lint": "turbo run lint",
       "test": "turbo run test",
       "type-check": "turbo run type-check"
     },
     "devDependencies": {
       "turbo": "^1.11.2",
       "typescript": "^5.3.3",
       "@types/node": "^20.10.6"
     },
     "packageManager": "pnpm@8.15.0"
   }
   ```

3. **Create pnpm-workspace.yaml**
   ```yaml
   packages:
     - "apps/*"
     - "packages/*"
   ```

4. **Create turbo.json**
   ```json
   {
     "$schema": "https://turbo.build/schema.json",
     "pipeline": {
       "build": {
         "dependsOn": ["^build"],
         "outputs": ["dist/**", ".next/**", "!.next/cache/**"]
       },
       "dev": {
         "cache": false,
         "persistent": true
       },
       "lint": {},
       "type-check": {}
     }
   }
   ```

## Create Shared UI Library (packages/ui)

Create a comprehensive UI library with wedding-themed components:

### packages/ui/package.json
```json
{
  "name": "@wilma/ui",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./styles": "./dist/styles.css"
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --external react",
    "dev": "tsup src/index.ts --format cjs,esm --dts --external react --watch",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-label": "^2.0.2",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2",
    "@radix-ui/react-toast": "^1.1.5",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.1.0",
    "lucide-react": "^0.309.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "eslint": "^8.56.0",
    "react": "^18.2.0",
    "tsup": "^8.0.1",
    "typescript": "^5.3.3"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

### Wedding-Themed Components to Create

**Core Components (packages/ui/src/components/):**
- `Button.tsx` - Wedding-themed button variants
- `Card.tsx` - Beautiful card containers
- `Input.tsx` - Form inputs with validation states
- `Label.tsx` - Form labels
- `Select.tsx` - Dropdown selections
- `Dialog.tsx` - Modal dialogs
- `Toast.tsx` - Notification toasts
- `Progress.tsx` - Progress indicators
- `Badge.tsx` - Status badges

**Wedding-Specific Components:**
- `WeddingCard.tsx` - Tool showcase cards
- `ToolCard.tsx` - Individual tool cards for landing page
- `ResultsCard.tsx` - Results display cards
- `EmailCapture.tsx` - Lead generation component
- `StepIndicator.tsx` - Multi-step form progress
- `LoadingSpinner.tsx` - Beautiful loading states
- `ErrorBoundary.tsx` - Error handling

### Wedding Theme Configuration

**packages/ui/src/styles/globals.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

@layer base {
  :root {
    /* Wedding Color Palette */
    --wedding-blush: 350 47% 88%;
    --wedding-rose: 346 77% 70%;
    --wedding-gold: 43 74% 66%;
    --wedding-sage: 120 13% 62%;
    --wedding-cream: 47 100% 97%;
    --wedding-mauve: 315 16% 70%;
    
    /* Primary Colors */
    --primary: var(--wedding-rose);
    --primary-foreground: 0 0% 98%;
    
    /* Secondary Colors */
    --secondary: var(--wedding-blush);
    --secondary-foreground: 0 0% 15%;
    
    /* Accent Colors */
    --accent: var(--wedding-gold);
    --accent-foreground: 0 0% 15%;
    
    /* Custom Wedding Gradients */
    --wedding-gradient: linear-gradient(135deg, 
      hsl(var(--wedding-blush)), 
      hsl(var(--wedding-rose))
    );
    --wedding-soft-gradient: linear-gradient(135deg,
      hsl(var(--wedding-cream)),
      hsl(var(--wedding-blush))
    );
  }
  
  .font-wedding-serif {
    font-family: 'Playfair Display', serif;
  }
  
  .font-wedding-sans {
    font-family: 'Inter', sans-serif;
  }
}

@layer components {
  .wedding-card {
    @apply bg-gradient-to-br from-wedding-cream to-wedding-blush/20 border border-wedding-rose/20 shadow-lg;
  }
  
  .wedding-button {
    @apply bg-gradient-to-r from-wedding-rose to-wedding-mauve text-white hover:from-wedding-rose/90 hover:to-wedding-mauve/90;
  }
  
  .wedding-input {
    @apply border-wedding-rose/30 focus:border-wedding-rose focus:ring-wedding-rose/20;
  }
}
```

**packages/ui/tailwind.config.js:**
```js
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'wedding-blush': 'hsl(var(--wedding-blush))',
        'wedding-rose': 'hsl(var(--wedding-rose))',
        'wedding-gold': 'hsl(var(--wedding-gold))',
        'wedding-sage': 'hsl(var(--wedding-sage))',
        'wedding-cream': 'hsl(var(--wedding-cream))',
        'wedding-mauve': 'hsl(var(--wedding-mauve))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        accent: 'hsl(var(--accent))'
      },
      fontFamily: {
        'wedding-serif': ['Playfair Display', 'serif'],
        'wedding-sans': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'wedding-gradient': 'var(--wedding-gradient)',
        'wedding-soft': 'var(--wedding-soft-gradient)'
      }
    }
  },
  plugins: []
}
```

### Build Configuration

**packages/ui/tsconfig.json:**
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

**packages/ui/tsup.config.ts:**
```typescript
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";'
  }
})
```

Please create this complete shared UI library with all the wedding-themed components and proper build configuration.
```

---

## 2. Shared API Client & Types

```markdown
Now I need to create the shared API client and types library for the Wilma Mk2 micro-apps ecosystem.

## Create Shared API Client (packages/api-client)

### packages/api-client/package.json
```json
{
  "name": "@wilma/api-client",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "lint": "eslint src/",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@supabase/supabase-js": "^2.38.5",
    "@tanstack/react-query": "^5.17.15",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "eslint": "^8.56.0",
    "tsup": "^8.0.1",
    "typescript": "^5.3.3"
  }
}
```

### API Client Structure
```
packages/api-client/src/
├── index.ts
├── supabase/
│   ├── client.ts
│   ├── auth.ts
│   └── database.types.ts
├── services/
│   ├── budget.ts
│   ├── timeline.ts
│   ├── guests.ts
│   ├── venues.ts
│   └── wellness.ts
├── hooks/
│   ├── useBudgetCalculations.ts
│   ├── useTimelineGeneration.ts
│   ├── useGuestManagement.ts
│   ├── useVenueAnalysis.ts
│   └── useWellnessAssessment.ts
├── types/
│   ├── budget.ts
│   ├── timeline.ts
│   ├── guests.ts
│   ├── venues.ts
│   └── wellness.ts
└── utils/
    ├── api.ts
    ├── errors.ts
    └── validation.ts
```

### Core Supabase Client

**packages/api-client/src/supabase/client.ts:**
```typescript
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const createSupabaseClient = (
  supabaseUrl?: string,
  supabaseKey?: string
) => {
  const url = supabaseUrl || process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const key = supabaseKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  if (!url || !key) {
    throw new Error('Supabase URL and key are required')
  }
  
  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  })
}

export const supabase = createSupabaseClient()
export type SupabaseClient = ReturnType<typeof createSupabaseClient>
```

### TypeScript Types

**packages/api-client/src/types/budget.ts:**
```typescript
import { z } from 'zod'

export const BudgetFormSchema = z.object({
  guestCount: z.number().min(1).max(1000),
  location: z.string().min(2),
  weddingDate: z.date().min(new Date()),
  style: z.enum(['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor']),
  budgetRange: z.number().min(1000).max(200000),
  priorities: z.array(z.string()).min(1)
})

export type BudgetFormData = z.infer<typeof BudgetFormSchema>

export interface BudgetCalculationResult {
  id: string
  totalBudget: number
  breakdown: {
    venue: number
    catering: number
    photography: number
    videography: number
    flowers: number
    music: number
    attire: number
    other: number
  }
  aiRecommendations: AIRecommendation[]
  regionalFactors: RegionalFactors
  confidenceScore: number
  createdAt: string
}

export interface AIRecommendation {
  category: string
  suggestion: string
  potentialSavings: number
  priority: 'low' | 'medium' | 'high'
  implementationTips: string[]
}

export interface RegionalFactors {
  location: string
  seasonalMultiplier: number
  competitionLevel: 'low' | 'medium' | 'high'
  averageCosts: Record<string, number>
}
```

### API Service Functions

**packages/api-client/src/services/budget.ts:**
```typescript
import { supabase } from '../supabase/client'
import type { BudgetFormData, BudgetCalculationResult } from '../types/budget'

export const budgetService = {
  async calculateBudget(data: BudgetFormData): Promise<BudgetCalculationResult> {
    const { data: result, error } = await supabase.functions.invoke('calculate-budget', {
      body: data
    })
    
    if (error) throw new Error(error.message)
    return result
  },

  async saveBudgetCalculation(
    userId: string | null,
    calculation: BudgetCalculationResult
  ): Promise<void> {
    const { error } = await supabase
      .from('budget_calculations')
      .insert({
        user_id: userId,
        session_id: userId ? null : generateSessionId(),
        input_data: calculation,
        total_budget: calculation.totalBudget,
        category_breakdown: calculation.breakdown,
        ai_recommendations: calculation.aiRecommendations,
        confidence_score: calculation.confidenceScore
      })
    
    if (error) throw new Error(error.message)
  },

  async getUserCalculations(userId: string): Promise<BudgetCalculationResult[]> {
    const { data, error } = await supabase
      .from('budget_calculations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) throw new Error(error.message)
    return data || []
  },

  async captureEmail(email: string, source: string, data: any): Promise<void> {
    const { error } = await supabase
      .from('email_captures')
      .insert({
        email,
        source,
        capture_data: data,
        consent_marketing: true
      })
    
    if (error && error.code !== '23505') { // Ignore duplicate emails
      throw new Error(error.message)
    }
  }
}

function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
```

### React Query Hooks

**packages/api-client/src/hooks/useBudgetCalculations.ts:**
```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { budgetService } from '../services/budget'
import type { BudgetFormData } from '../types/budget'

export const useBudgetCalculation = () => {
  return useMutation({
    mutationFn: budgetService.calculateBudget,
    onSuccess: (data) => {
      // Track successful calculation
      console.log('Budget calculated:', data)
    }
  })
}

export const useSaveBudgetCalculation = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ userId, calculation }: { userId: string | null, calculation: any }) =>
      budgetService.saveBudgetCalculation(userId, calculation),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget-calculations'] })
    }
  })
}

export const useUserBudgetCalculations = (userId: string | null) => {
  return useQuery({
    queryKey: ['budget-calculations', userId],
    queryFn: () => budgetService.getUserCalculations(userId!),
    enabled: !!userId
  })
}

export const useEmailCapture = () => {
  return useMutation({
    mutationFn: ({ email, source, data }: { email: string, source: string, data: any }) =>
      budgetService.captureEmail(email, source, data)
  })
}
```

### Error Handling & Utilities

**packages/api-client/src/utils/errors.ts:**
```typescript
export class APIError extends Error {
  constructor(
    message: string,
    public code?: string,
    public status?: number
  ) {
    super(message)
    this.name = 'APIError'
  }
}

export const handleSupabaseError = (error: any): never => {
  throw new APIError(
    error.message || 'An unexpected error occurred',
    error.code,
    error.status
  )
}

export const isNetworkError = (error: any): boolean => {
  return error.message?.includes('fetch') || error.message?.includes('network')
}
```

### Build Configuration

**packages/api-client/tsconfig.json:**
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "node_modules"]
}
```

## Create Shared Types Package (packages/types)

### packages/types/package.json
```json
{
  "name": "@wilma/types",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "tsup": "^8.0.1",
    "typescript": "^5.3.3"
  }
}
```

**packages/types/src/index.ts:**
```typescript
// Re-export all types from API client
export * from '@wilma/api-client/types/budget'
export * from '@wilma/api-client/types/timeline'
export * from '@wilma/api-client/types/guests'
export * from '@wilma/api-client/types/venues'
export * from '@wilma/api-client/types/wellness'

// Common shared types
export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Wedding {
  id: string
  userId: string
  partnerUserId?: string
  weddingDate?: string
  venueName?: string
  guestCount: number
  budget?: number
  style?: WeddingStyle
  completionPercentage: number
  createdAt: string
  updatedAt: string
}

export type WeddingStyle = 'modern' | 'rustic' | 'classic' | 'boho' | 'vintage' | 'outdoor'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: any
  }
}
```

Please create this complete shared API client and types package with all the service functions, React Query hooks, and proper TypeScript types.
```

---

## 3. Landing Page Micro-App

```markdown
Now I need to create the main landing page micro-app for Wilma Mk2. This will be the central hub that showcases all tools and drives users to the individual micro-apps.

## Create Landing Page App (apps/landing)

Initialize as Next.js app for better SEO:

```bash
cd apps
npx create-next-app@latest landing --typescript --tailwind --eslint --app --src-dir --import-alias="@/*"
```

### apps/landing/package.json
```json
{
  "name": "wilma-landing",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev -p 3000",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@wilma/ui": "workspace:*",
    "@wilma/api-client": "workspace:*",
    "@wilma/types": "workspace:*",
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.18.0",
    "@tanstack/react-query": "^5.17.15",
    "lucide-react": "^0.309.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.6",
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "eslint": "^8.56.0",
    "eslint-config-next": "14.0.4",
    "typescript": "^5.3.3"
  }
}
```

### Landing Page Structure
```
apps/landing/src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── components/
│       ├── Hero.tsx
│       ├── ToolGallery.tsx
│       ├── ToolCard.tsx
│       ├── Features.tsx
│       ├── Testimonials.tsx
│       ├── CTA.tsx
│       └── Footer.tsx
├── components/
│   ├── ui/ (imported from @wilma/ui)
│   └── shared/
└── lib/
    ├── constants.ts
    └── utils.ts
```

### Main Layout and SEO

**apps/landing/src/app/layout.tsx:**
```typescript
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/components/providers/QueryProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair'
})

export const metadata: Metadata = {
  title: 'Wilma - AI-Powered Wedding Planning Made Simple',
  description: 'Plan your perfect wedding with AI-powered tools. Get personalized budget recommendations, smart timelines, and stress-free planning guidance.',
  keywords: ['wedding planning', 'AI wedding planner', 'wedding budget calculator', 'wedding timeline', 'wedding tools'],
  authors: [{ name: 'Wilma Team' }],
  openGraph: {
    title: 'Wilma - AI-Powered Wedding Planning',
    description: 'Plan your perfect wedding with AI-powered tools',
    url: 'https://wilma.com',
    siteName: 'Wilma',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Wilma Wedding Planning Tools'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wilma - AI-Powered Wedding Planning',
    description: 'Plan your perfect wedding with AI-powered tools',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-wedding-sans antialiased">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
```

### Hero Section

**apps/landing/src/app/components/Hero.tsx:**
```typescript
'use client'

import { Button } from '@wilma/ui'
import { ArrowRight, Heart, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-wedding-cream via-wedding-blush/30 to-wedding-rose/20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 text-wedding-rose/20 animate-pulse">
          <Heart size={40} />
        </div>
        <div className="absolute top-40 right-20 text-wedding-gold/30 animate-bounce">
          <Sparkles size={32} />
        </div>
        <div className="absolute bottom-32 left-20 text-wedding-sage/25 animate-pulse">
          <Heart size={28} />
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-wedding-serif text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Plan Your{' '}
              <span className="bg-gradient-to-r from-wedding-rose to-wedding-mauve bg-clip-text text-transparent">
                Perfect Wedding
              </span>
              {' '}with AI
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
          >
            Smart tools that eliminate wedding planning stress. Get AI-powered budget recommendations, 
            personalized timelines, and expert guidance for your special day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="wedding-button text-lg px-8 py-4"
              onClick={() => window.open('https://budget.wilma.com', '_blank')}
            >
              Start Planning for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4 border-wedding-rose text-wedding-rose hover:bg-wedding-rose hover:text-white"
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-sm text-gray-500"
          >
            ✨ Join 10,000+ couples planning their perfect wedding
          </motion.div>
        </div>
      </div>
    </section>
  )
}
```

### Tool Gallery

**apps/landing/src/app/components/ToolGallery.tsx:**
```typescript
'use client'

import { motion } from 'framer-motion'
import ToolCard from './ToolCard'
import { Calculator, Calendar, Users, MapPin, Heart } from 'lucide-react'

const tools = [
  {
    id: 'budget-calculator',
    title: 'AI Budget Calculator',
    description: 'Get personalized budget recommendations based on your guest count, location, and style preferences.',
    icon: Calculator,
    url: 'https://budget.wilma.com',
    features: ['Regional pricing data', 'AI-powered recommendations', 'Instant PDF export'],
    color: 'from-wedding-rose to-wedding-mauve'
  },
  {
    id: 'timeline-generator',
    title: 'Smart Timeline Generator',
    description: 'Create an intelligent wedding planning timeline with vendor deadlines and stress management.',
    icon: Calendar,
    url: 'https://timeline.wilma.com',
    features: ['Vendor booking deadlines', 'Critical path planning', 'Calendar integration'],
    color: 'from-wedding-gold to-wedding-sage'
  },
  {
    id: 'guest-manager',
    title: 'Guest List Manager',
    description: 'Effortlessly manage RSVPs, dietary restrictions, and seating arrangements.',
    icon: Users,
    url: 'https://guests.wilma.com',
    features: ['RSVP automation', 'Seating optimization', 'Dietary tracking'],
    color: 'from-wedding-sage to-wedding-blush'
  },
  {
    id: 'venue-analyzer',
    title: 'Venue Analyzer',
    description: 'Upload venue photos and get AI-powered analysis of capacity, style, and suitability.',
    icon: MapPin,
    url: 'https://venue.wilma.com',
    features: ['Photo analysis', 'Capacity estimation', 'Style matching'],
    color: 'from-wedding-blush to-wedding-gold'
  },
  {
    id: 'stress-planner',
    title: 'Wellness Planner',
    description: 'Monitor planning stress and get personalized wellness recommendations.',
    icon: Heart,
    url: 'https://wellness.wilma.com',
    features: ['Stress assessment', 'Wellness tracking', 'Timeline optimization'],
    color: 'from-wedding-mauve to-wedding-rose'
  }
]

export default function ToolGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Plan Your Wedding
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tools work together to make wedding planning stress-free and enjoyable.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ToolCard tool={tool} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

### Individual Tool Card

**apps/landing/src/app/components/ToolCard.tsx:**
```typescript
'use client'

import { Card, CardContent, CardHeader, Button } from '@wilma/ui'
import { ArrowRight, LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface Tool {
  id: string
  title: string
  description: string
  icon: LucideIcon
  url: string
  features: string[]
  color: string
}

interface ToolCardProps {
  tool: Tool
}

export default function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon

  const handleTryTool = () => {
    // Track tool click
    window.open(tool.url, '_blank')
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="wedding-card h-full hover:shadow-xl transition-all duration-300 border-0">
        <CardHeader className="pb-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-wedding-serif text-2xl font-semibold text-gray-900 mb-2">
            {tool.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {tool.description}
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-2 mb-6">
            {tool.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-2 h-2 bg-wedding-rose rounded-full mr-3" />
                {feature}
              </div>
            ))}
          </div>
          
          <Button 
            onClick={handleTryTool}
            className="w-full wedding-button group"
          >
            Try Tool for Free
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

### Navigation & Footer

**apps/landing/src/app/components/Navigation.tsx:**
```typescript
'use client'

import { useState } from 'react'
import { Button } from '@wilma/ui'
import { Menu, X, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigation = [
    { name: 'Tools', href: '#tools' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' }
  ]

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-wedding-rose/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-wedding-rose to-wedding-mauve rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="font-wedding-serif text-2xl font-bold text-gray-900">
              Wilma
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-wedding-rose transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="wedding-button">
              Start Planning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-wedding-rose/10"
            >
              <div className="py-4 space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-600 hover:text-wedding-rose transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="w-full wedding-button mt-4">
                  Start Planning
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
```

### Main Page Assembly

**apps/landing/src/app/page.tsx:**
```typescript
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ToolGallery from './components/ToolGallery'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <ToolGallery />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
```

### Tailwind Configuration

**apps/landing/tailwind.config.js:**
```js
const path = require('path')

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'wedding-blush': 'hsl(350, 47%, 88%)',
        'wedding-rose': 'hsl(346, 77%, 70%)',
        'wedding-gold': 'hsl(43, 74%, 66%)',
        'wedding-sage': 'hsl(120, 13%, 62%)',
        'wedding-cream': 'hsl(47, 100%, 97%)',
        'wedding-mauve': 'hsl(315, 16%, 70%)'
      },
      fontFamily: {
        'wedding-serif': ['var(--font-playfair)', 'serif'],
        'wedding-sans': ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
}
```

### Next.js Configuration

**apps/landing/next.config.js:**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@wilma/ui', '@wilma/api-client', '@wilma/types'],
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com']
  },
  experimental: {
    optimizePackageImports: ['@wilma/ui']
  }
}

module.exports = nextConfig
```

Please create this complete landing page micro-app with all the components, navigation, hero section, tool gallery, and proper Next.js configuration for SEO optimization.
```

---

## 4. Budget Calculator Micro-App

```markdown
Now I need to create the Budget Calculator as a standalone micro-app. This will be deployed to budget.wilma.com and be the first tool users interact with.

## Create Budget Calculator App (apps/budget-calculator)

Initialize as Vite React app for fast development:

```bash
cd apps
npm create vite@latest budget-calculator -- --template react-ts
cd budget-calculator
```

### apps/budget-calculator/package.json
```json
{
  "name": "wilma-budget-calculator",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite --port 3001",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@wilma/ui": "workspace:*",
    "@wilma/api-client": "workspace:*",
    "@wilma/types": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "@tanstack/react-query": "^5.17.15",
    "react-hook-form": "^7.49.2",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "framer-motion": "^10.18.0",
    "recharts": "^2.8.0",
    "jspdf": "^2.5.1",
    "html2canvas": "^1.4.1",
    "date-fns": "^3.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.12",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0"
  }
}
```

### Budget Calculator Structure
```
apps/budget-calculator/src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── BudgetForm.tsx
│   ├── BudgetResults.tsx
│   ├── BudgetChart.tsx
│   ├── CategoryBreakdown.tsx
│   ├── AIRecommendations.tsx
│   ├── ExportOptions.tsx
│   ├── EmailCapture.tsx
│   └── LoadingAnimation.tsx
├── hooks/
│   ├── useBudgetCalculation.ts
│   ├── useBudgetExport.ts
│   └── useAnalytics.ts
├── utils/
│   ├── budgetCalculations.ts
│   ├── exportHelpers.ts
│   └── validation.ts
├── types/
│   └── budget.types.ts
└── data/
    └── mockData.ts
```

### Main App Component

**apps/budget-calculator/src/App.tsx:**
```typescript
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { BudgetForm } from './components/BudgetForm'
import { BudgetResults } from './components/BudgetResults'
import { LoadingAnimation } from './components/LoadingAnimation'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import type { BudgetFormData, BudgetCalculationResult } from '@wilma/types'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

type AppState = 'form' | 'loading' | 'results' | 'error'

function App() {
  const [appState, setAppState] = useState<AppState>('form')
  const [formData, setFormData] = useState<BudgetFormData | null>(null)
  const [results, setResults] = useState<BudgetCalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = async (data: BudgetFormData) => {
    setFormData(data)
    setAppState('loading')
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Mock calculation result
      const calculationResult: BudgetCalculationResult = {
        id: `calc_${Date.now()}`,
        totalBudget: data.budgetRange,
        breakdown: {
          venue: Math.round(data.budgetRange * 0.35),
          catering: Math.round(data.budgetRange * 0.30),
          photography: Math.round(data.budgetRange * 0.10),
          videography: Math.round(data.budgetRange * 0.05),
          flowers: Math.round(data.budgetRange * 0.08),
          music: Math.round(data.budgetRange * 0.05),
          attire: Math.round(data.budgetRange * 0.05),
          other: Math.round(data.budgetRange * 0.02)
        },
        aiRecommendations: [
          {
            category: 'venue',
            suggestion: `For ${data.location}, consider booking 12-18 months ahead for better rates`,
            potentialSavings: Math.round(data.budgetRange * 0.1),
            priority: 'high',
            implementationTips: [
              'Book during off-peak season',
              'Consider Friday or Sunday ceremonies',
              'Look for venues with inclusive packages'
            ]
          },
          {
            category: 'catering',
            suggestion: 'Buffet style can save 20-30% compared to plated dinner',
            potentialSavings: Math.round(data.budgetRange * 0.08),
            priority: 'medium',
            implementationTips: [
              'Choose seasonal menu items',
              'Limit bar options to wine and beer',
              'Consider family-style service'
            ]
          }
        ],
        regionalFactors: {
          location: data.location,
          seasonalMultiplier: 1.15,
          competitionLevel: 'medium',
          averageCosts: {
            venue: 12000,
            catering: 120,
            photography: 3500
          }
        },
        confidenceScore: 0.87,
        createdAt: new Date().toISOString()
      }
      
      setResults(calculationResult)
      setAppState('results')
    } catch (err) {
      setError('Failed to calculate budget. Please try again.')
      setAppState('error')
    }
  }

  const handleStartOver = () => {
    setAppState('form')
    setFormData(null)
    setResults(null)
    setError(null)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-wedding-cream via-wedding-blush/20 to-white">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <AnimatePresence mode="wait">
            {appState === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BudgetForm onSubmit={handleFormSubmit} />
              </motion.div>
            )}

            {appState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LoadingAnimation formData={formData!} />
              </motion.div>
            )}

            {appState === 'results' && results && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <BudgetResults 
                  results={results} 
                  formData={formData!}
                  onStartOver={handleStartOver}
                />
              </motion.div>
            )}

            {appState === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold text-red-800 mb-2">
                    Something went wrong
                  </h2>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={handleStartOver}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
```

### Budget Form Component

**apps/budget-calculator/src/components/BudgetForm.tsx:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Label, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@wilma/ui'
import { BudgetFormSchema, type BudgetFormData } from '@wilma/types'
import { Calendar, Users, MapPin, Palette, DollarSign } from 'lucide-react'

interface BudgetFormProps {
  onSubmit: (data: BudgetFormData) => void
}

export function BudgetForm({ onSubmit }: BudgetFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<BudgetFormData>({
    resolver: zodResolver(BudgetFormSchema),
    defaultValues: {
      guestCount: 100,
      location: '',
      budgetRange: 30000,
      priorities: ['venue', 'photography']
    }
  })

  const watchedBudget = watch('budgetRange')

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered Wedding Budget Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Get personalized budget recommendations based on your wedding details
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="wedding-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-wedding-serif text-center">
              Tell us about your dream wedding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Guest Count */}
              <div className="space-y-2">
                <Label htmlFor="guestCount" className="flex items-center text-lg font-medium">
                  <Users className="w-5 h-5 mr-2 text-wedding-rose" />
                  How many guests are you expecting?
                </Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="100"
                  className="wedding-input text-lg p-4"
                  {...register('guestCount', { valueAsNumber: true })}
                />
                {errors.guestCount && (
                  <p className="text-red-500 text-sm">{errors.guestCount.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center text-lg font-medium">
                  <MapPin className="w-5 h-5 mr-2 text-wedding-rose" />
                  Where are you planning to get married?
                </Label>
                <Input
                  id="location"
                  placeholder="New York, NY"
                  className="wedding-input text-lg p-4"
                  {...register('location')}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location.message}</p>
                )}
              </div>

              {/* Wedding Date */}
              <div className="space-y-2">
                <Label htmlFor="weddingDate" className="flex items-center text-lg font-medium">
                  <Calendar className="w-5 h-5 mr-2 text-wedding-rose" />
                  When is your wedding date?
                </Label>
                <Input
                  id="weddingDate"
                  type="date"
                  className="wedding-input text-lg p-4"
                  {...register('weddingDate', { valueAsDate: true })}
                />
                {errors.weddingDate && (
                  <p className="text-red-500 text-sm">{errors.weddingDate.message}</p>
                )}
              </div>

              {/* Wedding Style */}
              <div className="space-y-2">
                <Label className="flex items-center text-lg font-medium">
                  <Palette className="w-5 h-5 mr-2 text-wedding-rose" />
                  What's your wedding style?
                </Label>
                <Select onValueChange={(value) => setValue('style', value as any)}>
                  <SelectTrigger className="wedding-input text-lg p-4">
                    <SelectValue placeholder="Select your style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern & Chic</SelectItem>
                    <SelectItem value="rustic">Rustic & Natural</SelectItem>
                    <SelectItem value="classic">Classic & Elegant</SelectItem>
                    <SelectItem value="boho">Boho & Free-spirited</SelectItem>
                    <SelectItem value="vintage">Vintage & Romantic</SelectItem>
                    <SelectItem value="outdoor">Outdoor & Garden</SelectItem>
                  </SelectContent>
                </Select>
                {errors.style && (
                  <p className="text-red-500 text-sm">{errors.style.message}</p>
                )}
              </div>

              {/* Budget Range */}
              <div className="space-y-2">
                <Label htmlFor="budgetRange" className="flex items-center text-lg font-medium">
                  <DollarSign className="w-5 h-5 mr-2 text-wedding-rose" />
                  What's your estimated budget?
                </Label>
                <div className="space-y-3">
                  <Input
                    id="budgetRange"
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    className="w-full"
                    {...register('budgetRange', { valueAsNumber: true })}
                  />
                  <div className="text-center">
                    <span className="text-2xl font-bold text-wedding-sage">
                      {watchedHelpLevel}/10
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Full DIY</span>
                    <span>Some Help</span>
                    <span>Full Professional</span>
                  </div>
                </div>
                <div className="text-sm text-gray-600 text-center">
                  {watchedHelpLevel <= 3 && "You'll handle most tasks yourself - we'll create a detailed DIY timeline"}
                  {watchedHelpLevel > 3 && watchedHelpLevel <= 7 && "You'll use some professional services - we'll balance DIY and vendor tasks"}
                  {watchedHelpLevel > 7 && "You'll hire professionals for most tasks - we'll focus on coordination and decision deadlines"}
                </div>
              </div>

              {/* Guest Count (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="guestCount" className="flex items-center text-lg font-medium">
                  <Users className="w-5 h-5 mr-2 text-wedding-sage" />
                  Estimated guest count (Optional)
                </Label>
                <Input
                  id="guestCount"
                  type="number"
                  placeholder="100"
                  className="wedding-input text-lg p-4"
                  {...register('guestCount', { valueAsNumber: true })}
                />
                <p className="text-sm text-gray-500">
                  Helps us adjust timeline complexity for save-the-dates and invitations
                </p>
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <Label className="text-lg font-medium">
                  Any special requirements for your wedding?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {specialRequirementOptions.map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement}
                        onCheckedChange={(checked) => {
                          const current = watch('specialRequirements') || []
                          if (checked) {
                            setValue('specialRequirements', [...current, requirement])
                          } else {
                            setValue('specialRequirements', current.filter(r => r !== requirement))
                          }
                        }}
                      />
                      <Label 
                        htmlFor={requirement}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full wedding-button text-lg py-6 font-semibold"
                >
                  {isSubmitting ? 'Generating Timeline...' : 'Create My AI Timeline'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8 space-y-2"
      >
        <p className="text-sm text-gray-500">
          📅 Based on 1,000+ successful weddings • AI-powered • 100% Free
        </p>
        <p className="text-xs text-gray-400">
          Get your personalized timeline with vendor deadlines and stress management tips
        </p>
      </motion.div>
    </div>
  )
}
```

### Timeline Display Component

**apps/timeline-generator/src/components/TimelineDisplay.tsx:**
```typescript
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button, Progress } from '@wilma/ui'
import { TaskCard } from './TaskCard'
import { MilestoneMarker } from './MilestoneMarker'
import { ProgressTracker } from './ProgressTracker'
import { TimelineExport } from './TimelineExport'
import { EmailCapture } from './EmailCapture'
import type { TimelineGeneration, TimelineFormData, TimelineTask } from '../types/timeline.types'
import { Calendar, ArrowLeft, Download, Share2 } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'

interface TimelineDisplayProps {
  timeline: TimelineGeneration
  formData: TimelineFormData
  onStartOver: () => void
}

export function TimelineDisplay({ timeline, formData, onStartOver }: TimelineDisplayProps) {
  const [tasks, setTasks] = useState<TimelineTask[]>(timeline.tasks)
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar' | 'list'>('timeline')
  
  const daysUntilWedding = differenceInDays(formData.weddingDate, new Date())
  const completedTasks = tasks.filter(task => task.completed).length
  const totalTasks = tasks.length
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100)

  const handleTaskToggle = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const groupedTasks = tasks.reduce((groups, task) => {
    const monthKey = format(task.dueDate, 'yyyy-MM')
    if (!groups[monthKey]) {
      groups[monthKey] = []
    }
    groups[monthKey].push(task)
    return groups
  }, {} as Record<string, TimelineTask[]>)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Card className="wedding-card shadow-xl">
          <CardContent className="pt-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-wedding-sage to-wedding-gold rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Wedding Planning Timeline
            </h1>
            <div className="text-3xl md:text-4xl font-bold text-wedding-sage mb-2">
              {daysUntilWedding} days to go!
            </div>
            <p className="text-xl text-gray-600 mb-4">
              Wedding date: {format(formData.weddingDate, 'EEEE, MMMM do, yyyy')}
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <span>📊 AI Confidence: {Math.round(timeline.confidenceScore * 100)}%</span>
              <span>•</span>
              <span>📋 {totalTasks} tasks planned</span>
              <span>•</span>
              <span>⏰ {timeline.milestones.length} milestones</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Progress Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <ProgressTracker 
          tasks={tasks}
          milestones={timeline.milestones}
          progressPercentage={progressPercentage}
        />
      </motion.div>

      {/* View Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center space-x-2"
      >
        <Button
          variant={viewMode === 'timeline' ? 'default' : 'outline'}
          onClick={() => setViewMode('timeline')}
          className={viewMode === 'timeline' ? 'wedding-button' : ''}
        >
          Timeline View
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'outline'}
          onClick={() => setViewMode('list')}
          className={viewMode === 'list' ? 'wedding-button' : ''}
        >
          List View
        </Button>
        <Button
          variant={viewMode === 'calendar' ? 'default' : 'outline'}
          onClick={() => setViewMode('calendar')}
          className={viewMode === 'calendar' ? 'wedding-button' : ''}
        >
          Calendar View
        </Button>
      </motion.div>

      {/* Timeline Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        {viewMode === 'timeline' && (
          <div className="space-y-8">
            {Object.entries(groupedTasks)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([monthKey, monthTasks]) => (
                <div key={monthKey}>
                  <div className="flex items-center mb-4">
                    <div className="bg-wedding-sage text-white px-4 py-2 rounded-full font-semibold">
                      {format(new Date(monthKey + '-01'), 'MMMM yyyy')}
                    </div>
                    <div className="flex-1 h-px bg-wedding-sage/30 ml-4" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {monthTasks
                      .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                      .map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onToggle={handleTaskToggle}
                        />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        )}

        {viewMode === 'list' && (
          <Card className="wedding-card">
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks
                  .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                  .map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskToggle(task.id)}
                          className="h-4 w-4 text-wedding-sage"
                        />
                        <div>
                          <div className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Due: {format(task.dueDate, 'MMM do, yyyy')} • {task.category}
                          </div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {task.priority}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}
      </motion.div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Card className="wedding-card">
          <CardHeader>
            <CardTitle className="font-wedding-serif text-2xl">
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timeline.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 ${
                    rec.urgency === 'high' ? 'border-red-400 bg-red-50' :
                    rec.urgency === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                    'border-blue-400 bg-blue-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">
                        {rec.type === 'timing' && '⏰'} 
                        {rec.type === 'vendor' && '🏪'} 
                        {rec.type === 'stress_management' && '💚'} 
                        {rec.type === 'cost_saving' && '💰'} 
                        {rec.message}
                      </div>
                      {rec.dueDate && (
                        <div className="text-sm text-gray-600">
                          Due: {format(rec.dueDate, 'MMM do, yyyy')}
                        </div>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      rec.urgency === 'high' ? 'bg-red-100 text-red-800' :
                      rec.urgency === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.urgency}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Email Capture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <EmailCapture 
          timeline={timeline}
          formData={formData}
        />
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <TimelineExport 
          timeline={timeline}
          formData={formData}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
      >
        <Button
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Create New Timeline
        </Button>
        
        <Button
          onClick={() => window.open('https://budget.wilma.com', '_blank')}
          size="lg"
          className="wedding-button"
        >
          Calculate Budget
        </Button>
        
        <Button
          onClick={() => window.open('https://guests.wilma.com', '_blank')}
          variant="outline"
          size="lg"
          className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white"
        >
          Manage Guest List
        </Button>
      </motion.div>

      {/* Cross-promotion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="bg-gradient-to-r from-wedding-sage/20 to-wedding-gold/20 rounded-xl p-6 text-center"
      >
        <h3 className="font-wedding-serif text-2xl font-semibold mb-2">
          Complete Your Wedding Planning Suite
        </h3>
        <p className="text-gray-600 mb-4">
          Now that you have your timeline, set your budget and manage your guest list
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            onClick={() => window.open('https://budget.wilma.com', '_blank')}
            className="wedding-button"
          >
            Budget Calculator
          </Button>
          <Button 
            onClick={() => window.open('https://guests.wilma.com', '_blank')}
            variant="outline"
            className="border-wedding-rose text-wedding-rose hover:bg-wedding-rose hover:text-white"
          >
            Guest Manager
          </Button>
          <Button 
            onClick={() => window.open('https://venue.wilma.com', '_blank')}
            variant="outline"
            className="border-wedding-mauve text-wedding-mauve hover:bg-wedding-mauve hover:text-white"
          >
            Venue Analyzer
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
```

### Task Card Component

**apps/timeline-generator/src/components/TaskCard.tsx:**
```typescript
import { motion } from 'framer-motion'
import { Card, CardContent, Button, Badge } from '@wilma/ui'
import type { TimelineTask } from '../types/timeline.types'
import { Calendar, Clock, User, AlertTriangle } from 'lucide-react'
import { format, differenceInDays } from 'date-fns'

interface TaskCardProps {
  task: TimelineTask
  onToggle: (taskId: string) => void
}

export function TaskCard({ task, onToggle }: TaskCardProps) {
  const daysUntilDue = differenceInDays(task.dueDate, new Date())
  const isOverdue = daysUntilDue < 0
  const isUrgent = daysUntilDue <= 7 && daysUntilDue >= 0

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      venue: 'bg-blue-100 text-blue-800',
      vendors: 'bg-green-100 text-green-800',
      attire: 'bg-purple-100 text-purple-800',
      legal: 'bg-red-100 text-red-800',
      guests: 'bg-pink-100 text-pink-800',
      decor: 'bg-yellow-100 text-yellow-800',
      planning: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || colors.planning
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full transition-all duration-200 ${
        task.completed 
          ? 'opacity-75 bg-green-50 border-green-200' 
          : isOverdue 
            ? 'border-red-300 shadow-red-100' 
            : isUrgent 
              ? 'border-orange-300 shadow-orange-100' 
              : 'hover:shadow-lg'
      }`}>
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
                className="h-4 w-4 text-wedding-sage rounded focus:ring-wedding-sage"
              />
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`} />
            </div>
            <Badge className={getCategoryColor(task.category)}>
              {task.category}
            </Badge>
          </div>

          {/* Task Name */}
          <h3 className={`font-semibold text-gray-900 mb-2 ${
            task.completed ? 'line-through text-gray-500' : ''
          }`}>
            {task.name}
          </h3>

          {/* Description */}
          {task.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {task.description}
            </p>
          )}

          {/* Due Date */}
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span className={
              isOverdue ? 'text-red-600 font-medium' :
              isUrgent ? 'text-orange-600 font-medium' : ''
            }>
              {format(task.dueDate, 'MMM do, yyyy')}
            </span>
            {isOverdue && (
              <span className="ml-2 text-red-600 text-xs font-medium">
                OVERDUE
              </span>
            )}
            {isUrgent && !isOverdue && (
              <span className="ml-2 text-orange-600 text-xs font-medium">
                URGENT
              </span>
            )}
          </div>

          {/* Duration */}
          {task.estimatedDuration > 0 && (
            <div className="flex items-center text-sm text-gray-500 mb-2">
              <Clock className="w-4 h-4 mr-1" />
              <span>{task.estimatedDuration} hours</span>
            </div>
          )}

          {/* Assigned To */}
          {task.assignedTo && (
            <div className="flex items-center text-sm text-gray-500 mb-3">
              <User className="w-4 h-4 mr-1" />
              <span>{task.assignedTo}</span>
            </div>
          )}

          {/* AI Generated Badge */}
          {task.aiGenerated && (
            <div className="flex items-center text-xs text-wedding-sage mb-2">
              <span className="bg-wedding-sage/10 text-wedding-sage px-2 py-1 rounded">
                ✨ AI Suggested
              </span>
            </div>
          )}

          {/* Warnings */}
          {(isOverdue || isUrgent) && (
            <div className={`flex items-center text-xs p-2 rounded ${
              isOverdue ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
            }`}>
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>
                {isOverdue 
                  ? `${Math.abs(daysUntilDue)} days overdue` 
                  : `Due in ${daysUntilDue} days`}
              </span>
            </div>
          )}

          {/* Notes */}
          {task.notes && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                📝 {task.notes}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
```

### Mock Timeline Generator

**apps/timeline-generator/src/data/mockTimeline.ts:**
```typescript
import type { TimelineFormData, TimelineGeneration, TimelineTask, TimelineMilestone } from '../types/timeline.types'
import { addDays, addWeeks, addMonths, subMonths } from 'date-fns'

export function generateMockTimeline(formData: TimelineFormData): TimelineGeneration {
  const weddingDate = formData.weddingDate
  const complexity = formData.complexity
  const venueType = formData.venueType
  const helpLevel = formData.helpLevel
  
  // Generate tasks based on complexity and help level
  const baseTasks = getBaseTasks(weddingDate, complexity, venueType, helpLevel)
  const specialTasks = getSpecialRequirementTasks(weddingDate, formData.specialRequirements || [])
  
  const allTasks = [...baseTasks, ...specialTasks]
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .map((task, index) => ({ ...task, sortOrder: index }))

  const milestones = generateMilestones(weddingDate, allTasks)
  const criticalPath = identifyCriticalPath(allTasks)
  
  return {
    id: `timeline_${Date.now()}`,
    tasks: allTasks,
    milestones,
    criticalPath,
    recommendations: generateRecommendations(formData, allTasks),
    seasonalFactors: getSeasonalFactors(weddingDate, venueType),
    confidenceScore: 0.92,
    createdAt: new Date().toISOString()
  }
}

function getBaseTasks(weddingDate: Date, complexity: string, venueType: string, helpLevel: number): TimelineTask[] {
  const tasks: TimelineTask[] = []
  let taskId = 1

  // 12 months before
  if (complexity !== 'simple') {
    tasks.push({
      id: `task_${taskId++}`,
      name: 'Set wedding budget',
      description: 'Determine your total wedding budget and how you\'ll allocate it across categories',
      category: 'planning',
      dueDate: subMonths(weddingDate, 12),
      estimatedDuration: 3,
      priority: 'critical',
      dependencies: [],
      completed: false,
      aiGenerated: true,
      sortOrder: 0
    })
  }

  // 10-11 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Book wedding venue',
    description: 'Research and book your ceremony and reception venues',
    category: 'venue',
    dueDate: subMonths(weddingDate, 10),
    estimatedDuration: 8,
    priority: 'critical',
    dependencies: ['task_1'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 9 months before
  if (helpLevel >= 7) {
    tasks.push({
      id: `task_${taskId++}`,
      name: 'Hire wedding planner',
      description: 'Interview and hire a professional wedding planner',
      category: 'planning',
      dueDate: subMonths(weddingDate, 9),
      estimatedDuration: 6,
      priority: 'high',
      dependencies: ['task_1'],
      completed: false,
      aiGenerated: true,
      sortOrder: 0
    })
  }

  // 8 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Book photographer',
    description: 'Research, interview, and book your wedding photographer',
    category: 'vendors',
    dueDate: subMonths(weddingDate, 8),
    estimatedDuration: 5,
    priority: 'high',
    dependencies: ['task_2'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 6 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Book catering',
    description: 'Select and book your wedding catering service',
    category: 'vendors',
    dueDate: subMonths(weddingDate, 6),
    estimatedDuration: 4,
    priority: 'high',
    dependencies: ['task_2'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 5 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Send save-the-dates',
    description: 'Design and send save-the-date cards to your guests',
    category: 'guests',
    dueDate: subMonths(weddingDate, 5),
    estimatedDuration: 3,
    priority: 'medium',
    dependencies: [],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 4 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Order wedding dress',
    description: 'Shop for and order your wedding dress (allows time for alterations)',
    category: 'attire',
    dueDate: subMonths(weddingDate, 4),
    estimatedDuration: 6,
    priority: 'high',
    dependencies: [],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 3 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Send wedding invitations',
    description: 'Design, print, and mail wedding invitations',
    category: 'guests',
    dueDate: subMonths(weddingDate, 3),
    estimatedDuration: 4,
    priority: 'critical',
    dependencies: ['task_6'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 2 months before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Finalize guest count',
    description: 'Collect all RSVPs and confirm final guest count with vendors',
    category: 'guests',
    dueDate: subMonths(weddingDate, 2),
    estimatedDuration: 2,
    priority: 'high',
    dependencies: ['task_8'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 1 month before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Final dress fitting',
    description: 'Complete final alterations and fitting for wedding dress',
    category: 'attire',
    dueDate: subMonths(weddingDate, 1),
    estimatedDuration: 2,
    priority: 'high',
    dependencies: ['task_7'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 2 weeks before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Confirm all vendors',
    description: 'Contact all vendors to confirm details, timing, and logistics',
    category: 'vendors',
    dueDate: addDays(weddingDate, -14),
    estimatedDuration: 3,
    priority: 'critical',
    dependencies: ['task_9'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  // 1 week before
  tasks.push({
    id: `task_${taskId++}`,
    name: 'Rehearsal and rehearsal dinner',
    description: 'Conduct wedding rehearsal and host rehearsal dinner',
    category: 'planning',
    dueDate: addDays(weddingDate, -1),
    estimatedDuration: 4,
    priority: 'medium',
    dependencies: ['task_11'],
    completed: false,
    aiGenerated: true,
    sortOrder: 0
  })

  return tasks
}

function getSpecialRequirementTasks(weddingDate: Date, requirements: string[]): TimelineTask[] {
  const tasks: TimelineTask[] = []
  let taskId = 100

  requirements.forEach(requirement => {
    switch (requirement) {
      case 'Religious ceremony':
        tasks.push({
          id: `task_${taskId++}`,
          name: 'Meet with officiant',
          description: 'Schedule pre-marriage counseling and ceremony planning sessions',
          category: 'planning',
          dueDate: subMonths(weddingDate, 3),
          estimatedDuration: 2,
          priority: 'high',
          dependencies: [],
          completed: false,
          aiGenerated: true,
          sortOrder: 0
        })
        break
      case 'Live music/band':
        tasks.push({
          id: `task_${taskId++}`,
          name: 'Book wedding band',
          description: 'Research, audition, and book live music for ceremony and reception',
          category: 'vendors',
          dueDate: subMonths(weddingDate, 6),
          estimatedDuration: 4,
          priority: 'high',
          dependencies: [],
          completed: false,
          aiGenerated: true,
          sortOrder: 0
        })
        break
      case 'Destination wedding':
        tasks.push({
          id: `task_${taskId++}`,
          name: 'Send travel information',
          description: 'Provide guests with travel details, accommodation options, and itinerary',
          category: 'guests',
          dueDate: subMonths(weddingDate, 4),
          estimatedDuration: 3,
          priority: 'high',
          dependencies: [],
          completed: false,
          aiGenerated: true,
          sortOrder: 0
        })
        break
    }
  })

  return tasks
}

function generateMilestones(weddingDate: Date, tasks: TimelineTask[]): TimelineMilestone[] {
  return [
    {
      id: 'milestone_1',
      name: 'Planning Foundation',
      date: subMonths(weddingDate, 10),
      tasks: tasks.filter(t => t.category === 'planning' && t.dueDate <= subMonths(weddingDate, 8)).map(t => t.id),
      isCompleted: false,
      color: '#8B5CF6'
    },
    {
      id: 'milestone_2',
      name: 'Major Vendors Booked',
      date: subMonths(weddingDate, 6),
      tasks: tasks.filter(t => t.category === 'vendors' && t.priority === 'critical').map(t => t.id),
      isCompleted: false,
      color: '#10B981'
    },
    {
      id: 'milestone_3',
      name: 'Guest Communications',
      date: subMonths(weddingDate, 3),
      tasks: tasks.filter(t => t.category === 'guests').map(t => t.id),
      isCompleted: false,
      color: '#F59E0B'
    },
    {
      id: 'milestone_4',
      name: 'Final Preparations',
      date: addDays(weddingDate, -14),
      tasks: tasks.filter(t => t.dueDate >= addDays(weddingDate, -14)).map(t => t.id),
      isCompleted: false,
      color: '#EF4444'
    }
  ]
}

function identifyCriticalPath(tasks: TimelineTask[]): string[] {
  // Simplified critical path identification
  return tasks
    .filter(task => task.priority === 'critical')
    .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
    .map(task => task.id)
}

function generateRecommendations(formData: TimelineFormData, tasks: TimelineTask[]) {
  const recommendations = []
  const monthsUntilWedding = Math.ceil((formData.weddingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))

  if (monthsUntilWedding > 12) {
    recommendations.push({
      type: 'timing' as const,
      message: 'You have plenty of time! Start with venue booking and key vendor research.',
      urgency: 'low' as const,
      actionable: true
    })
  } else if (monthsUntilWedding < 6) {
    recommendations.push({
      type: 'timing' as const,
      message: 'Time is tight! Focus on critical tasks first and consider hiring professional help.',
      urgency: 'high' as const,
      actionable: true
    })
  }

  if (formData.venueType === 'outdoor') {
    recommendations.push({
      type: 'stress_management' as const,
      message: 'Have a backup plan for weather. Book a tent or indoor alternative.',
      urgency: 'medium' as const,
      actionable: true,
      dueDate: subMonths(formData.weddingDate, 2)
    })
  }

  if (formData.helpLevel < 4) {
    recommendations.push({
      type: 'stress_management' as const,
      message: 'Consider spreading tasks across more time to avoid last-minute stress.',
      urgency: 'medium' as const,
      actionable: false
    })
  }

  return recommendations
}

function getSeasonalFactors(weddingDate: Date, venueType: string) {
  const month = weddingDate.getMonth() // 0-11
  const isSpring = month >= 2 && month <= 4
  const isSummer = month >= 5 && month <= 7
  const isFall = month >= 8 && month <= 10
  const isWinter = month === 11 || month <= 1

  return {
    peakSeason: isSummer || (isSpring && month >= 3),
    weatherConsiderations: venueType === 'outdoor' ? 
      isWinter ? ['heating', 'weather_backup'] :
      isSummer ? ['cooling', 'rain_backup'] :
      ['mild_weather'] : [],
    vendorAvailability: isSummer ? 'limited' as const : 'medium' as const,
    bookingDeadlines: {
      venue: subMonths(weddingDate, isSummer ? 12 : 8),
      photographer: subMonths(weddingDate, isSummer ? 10 : 6),
      catering: subMonths(weddingDate, 6)
    }
  }
}
```

---

## 6. Guest Manager Micro-App

```markdown
Create the Guest Manager as the third micro-app for Wilma Mk2. This will be deployed to guests.wilma.com and help couples manage their guest lists, RSVPs, and seating arrangements.

## Create Guest Manager App (apps/guest-manager)

Initialize as Vite React app:

```bash
cd apps
npm create vite@latest guest-manager -- --template react-ts
cd guest-manager
```

### apps/guest-manager/package.json
```json
{
  "name": "wilma-guest-manager",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite --port 3003",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@wilma/ui": "workspace:*",
    "@wilma/api-client": "workspace:*",
    "@wilma/types": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "@tanstack/react-query": "^5.17.15",
    "react-hook-form": "^7.49.2",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "framer-motion": "^10.18.0",
    "@dnd-kit/core": "^6.0.8",
    "@dnd-kit/sortable": "^7.0.2",
    "papaparse": "^5.4.1",
    "react-table": "^7.8.0",
    "date-fns": "^3.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@types/papaparse": "^5.3.14",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.12",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0"
  }
}
```

### Guest Manager Structure
```
apps/guest-manager/src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── GuestImport.tsx
│   ├── GuestTable.tsx
│   ├── GuestCard.tsx
│   ├── RSVPDashboard.tsx
│   ├── SeatingChart.tsx
│   ├── SeatingOptimizer.tsx
│   ├── GuestFilters.tsx
│   ├── BulkActions.tsx
│   └── GuestExport.tsx
├── hooks/
│   ├── useGuestManagement.ts
│   ├── useCSVImport.ts
│   ├── useSeatingOptimization.ts
│   └── useRSVPTracking.ts
├── utils/
│   ├── csvHelpers.ts
│   ├── guestValidation.ts
│   └── seatingAlgorithm.ts
├── types/
│   └── guest.types.ts
└── data/
    └── mockGuests.ts
```

### Guest Types

**apps/guest-manager/src/types/guest.types.ts:**
```typescript
import { z } from 'zod'

export const GuestImportSchema = z.object({
  file: z.instanceof(File).optional(),
  manualEntry: z.boolean().default(false),
  guests: z.array(z.object({
    firstName: z.string().min(1),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    relationship: z.string().optional(),
    side: z.enum(['bride', 'groom', 'both']).optional()
  })).optional()
})

export const GuestSchema = z.object({
  id: z.string(),
  firstName: z.string().min(1),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  relationship: z.string().optional(),
  side: z.enum(['bride', 'groom', 'both']),
  rsvpStatus: z.enum(['pending', 'confirmed', 'declined', 'maybe']),
  rsvpDate: z.date().optional(),
  plusOneAllowed: z.boolean().default(false),
  plusOneName: z.string().optional(),
  plusOneRsvp: z.enum(['pending', 'confirmed', 'declined']).optional(),
  dietaryRestrictions: z.array(z.string()).default([]),
  specialRequirements: z.string().optional(),
  accommodationNeeded: z.boolean().default(false),
  tableAssignment: z.number().optional(),
  seatAssignment: z.string().optional(),
  invitationSent: z.boolean().default(false),
  invitationSentAt: z.date().optional(),
  thankYouSent: z.boolean().default(false),
  notes: z.string().optional()
})

export type Guest = z.infer<typeof GuestSchema>
export type GuestImportData = z.infer<typeof GuestImportSchema>

export interface GuestFilters {
  search: string
  rsvpStatus: string[]
  side: string[]
  plusOne: 'all' | 'allowed' | 'not_allowed'
  tableAssigned: 'all' | 'assigned' | 'unassigned'
  invitationSent: 'all' | 'sent' | 'not_sent'
}

export interface SeatingTable {
  id: string
  number: number
  capacity: number
  shape: 'round' | 'rectangular' | 'square'
  location: string
  assignments: string[] // guest IDs
}

export interface SeatingArrangement {
  id: string
  tables: SeatingTable[]
  unassignedGuests: string[]
  optimizationScore: number
  constraints: SeatingConstraints
}

export interface SeatingConstraints {
  separateExes: boolean
  groupFamilies: boolean
  mixSides: boolean
  priorityGuests: string[]
  keepTogether: string[][]
  keepApart: string[][]
}

export interface RSVPStats {
  totalInvited: number
  confirmed: number
  declined: number
  pending: number
  maybe: number
  plusOnes: number
  dietaryRestrictions: Record<string, number>
  tableAssignments: number
}
```

### Main App Component

**apps/guest-manager/src/App.tsx:**
```typescript
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { GuestImport } from './components/GuestImport'
import { GuestTable } from './components/GuestTable'
import { RSVPDashboard } from './components/RSVPDashboard'
import { SeatingChart } from './components/SeatingChart'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import type { Guest, GuestFilters } from './types/guest.types'
import { generateMockGuests } from './data/mockGuests'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

type AppView = 'import' | 'dashboard' | 'list' | 'seating'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('import')
  const [guests, setGuests] = useState<Guest[]>([])
  const [filters, setFilters] = useState<GuestFilters>({
    search: '',
    rsvpStatus: [],
    side: [],
    plusOne: 'all',
    tableAssigned: 'all',
    invitationSent: 'all'
  })

  const handleGuestImport = (importedGuests: Guest[]) => {
    setGuests(importedGuests)
    setCurrentView('dashboard')
  }

  const handleUseMockData = () => {
    const mockGuests = generateMockGuests()
    setGuests(mockGuests)
    setCurrentView('dashboard')
  }

  const handleGuestUpdate = (updatedGuest: Guest) => {
    setGuests(prev => prev.map(guest => 
      guest.id === updatedGuest.id ? updatedGuest : guest
    ))
  }

  const handleBulkUpdate = (guestIds: string[], updates: Partial<Guest>) => {
    setGuests(prev => prev.map(guest => 
      guestIds.includes(guest.id) ? { ...guest, ...updates } : guest
    ))
  }

  const filteredGuests = guests.filter(guest => {
    if (filters.search && !`${guest.firstName} ${guest.lastName}`.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.rsvpStatus.length > 0 && !filters.rsvpStatus.includes(guest.rsvpStatus)) {
      return false
    }
    if (filters.side.length > 0 && !filters.side.includes(guest.side)) {
      return false
    }
    if (filters.plusOne !== 'all') {
      if (filters.plusOne === 'allowed' && !guest.plusOneAllowed) return false
      if (filters.plusOne === 'not_allowed' && guest.plusOneAllowed) return false
    }
    if (filters.tableAssigned !== 'all') {
      if (filters.tableAssigned === 'assigned' && !guest.tableAssignment) return false
      if (filters.tableAssigned === 'unassigned' && guest.tableAssignment) return false
    }
    if (filters.invitationSent !== 'all') {
      if (filters.invitationSent === 'sent' && !guest.invitationSent) return false
      if (filters.invitationSent === 'not_sent' && guest.invitationSent) return false
    }
    return true
  })

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-wedding-cream via-wedding-rose/10 to-white">
        <Navigation 
          currentView={currentView}
          onViewChange={setCurrentView}
          hasGuests={guests.length > 0}
        />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <AnimatePresence mode="wait">
            {currentView === 'import' && (
              <motion.div
                key="import"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GuestImport 
                  onImport={handleGuestImport}
                  onUseMockData={handleUseMockData}
                />
              </motion.div>
            )}

            {currentView === 'dashboard' && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <RSVPDashboard 
                  guests={guests}
                  onViewChange={setCurrentView}
                />
              </motion.div>
            )}

            {currentView === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <GuestTable 
                  guests={filteredGuests}
                  allGuests={guests}
                  filters={filters}
                  onFiltersChange={setFilters}
                  onGuestUpdate={handleGuestUpdate}
                  onBulkUpdate={handleBulkUpdate}
                />
              </motion.div>
            )}

            {currentView === 'seating' && (
              <motion.div
                key="seating"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <SeatingChart 
                  guests={guests}
                  onGuestUpdate={handleGuestUpdate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
```

### Guest Import Component

**apps/guest-manager/src/components/GuestImport.tsx:**
```typescript
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@wilma/ui'
import { GuestImportSchema, type GuestImportData, type Guest } from '../types/guest.types'
import { Upload, Users, FileText, Download } from 'lucide-react'
import Papa from 'papaparse'

interface GuestImportProps {
  onImport: (guests: Guest[]) => void
  onUseMockData: () => void
}

export function GuestImport({ onImport, onUseMockData }: GuestImportProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [importPreview, setImportPreview] = useState<any[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<GuestImportData>({
    resolver: zodResolver(GuestImportSchema),
    defaultValues: {
      manualEntry: false
    }
  })

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploadError(null)
    setIsProcessing(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          if (results.errors.length > 0) {
            throw new Error(`CSV parsing error: ${results.errors[0].message}`)
          }

          const processedData = results.data.map((row: any, index: number) => ({
            id: `guest_${Date.now()}_${index}`,
            firstName: row['First Name'] || row.firstName || row.first_name || '',
            lastName: row['Last Name'] || row.lastName || row.last_name || '',
            email: row['Email'] || row.email || '',
            phone: row['Phone'] || row.phone || '',
            relationship: row['Relationship'] || row.relationship || '',
            side: row['Side'] || row.side || 'both',
            rsvpStatus: 'pending' as const,
            plusOneAllowed: row['Plus One'] === 'Yes' || row.plusOne === true || false,
            dietaryRestrictions: [],
            invitationSent: false,
            thankYouSent: false
          }))

          setImportPreview(processedData.slice(0, 5)) // Show first 5 for preview
          setValue('file', file)
          setIsProcessing(false)
        } catch (error) {
          setUploadError(error instanceof Error ? error.message : 'Failed to process file')
          setIsProcessing(false)
        }
      },
      error: (error) => {
        setUploadError(`File reading error: ${error.message}`)
        setIsProcessing(false)
      }
    })
  }

  const processImport = () => {
    if (importPreview.length > 0) {
      onImport(importPreview as Guest[])
    }
  }

  const downloadTemplate = () => {
    const template = `First Name,Last Name,Email,Phone,Relationship,Side,Plus One
John,Smith,john@email.com,555-0123,Friend,Groom,Yes
Jane,Doe,jane@email.com,555-0124,College Friend,Bride,No
Bob,Johnson,bob@email.com,555-0125,Family,Groom,Yes`

    const blob = new Blob([template], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'guest-list-template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Wedding Guest List Manager
        </h1>
        <p className="text-xl text-gray-600">
          Import your guest list and manage RSVPs, seating, and communications
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="wedding-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-wedding-serif text-center">
              How would you like to add your guests?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload" className="flex items-center space-x-2">
                  <Upload className="w-4 h-4" />
                  <span>Upload CSV</span>
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>Manual Entry</span>
                </TabsTrigger>
                <TabsTrigger value="demo" className="flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Try Demo</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload" className="space-y-6">
                <div className="text-center">
                  <div className="border-2 border-dashed border-wedding-rose/30 rounded-lg p-8 hover:border-wedding-rose/50 transition-colors">
                    <Upload className="w-12 h-12 text-wedding-rose mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Upload your guest list</h3>
                    <p className="text-gray-600 mb-4">
                      Upload a CSV file with your guest information
                    </p>
                    
                    <Input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="guest-csv-upload"
                    />
                    <Label htmlFor="guest-csv-upload">
                      <Button asChild className="wedding-button cursor-pointer">
                        <span>Choose CSV File</span>
                      </Button>
                    </Label>
                    
                    <div className="mt-4">
                      <Button
                        variant="outline"
                        onClick={downloadTemplate}
                        className="border-wedding-rose text-wedding-rose hover:bg-wedding-rose hover:text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Template
                      </Button>
                    </div>
                  </div>

                  {isProcessing && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-wedding-rose"></div>
                        <span>Processing file...</span>
                      </div>
                    </div>
                  )}

                  {uploadError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600">{uploadError}</p>
                    </div>
                  )}

                  {importPreview.length > 0 && (
                    <div className="mt-6 text-left">
                      <h4 className="font-semibold mb-3">Preview (first 5 guests):</h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        {importPreview.map((guest, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{guest.firstName} {guest.lastName}</span>
                            <span className="text-gray-500">{guest.email}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        onClick={processImport}
                        className="w-full mt-4 wedding-button"
                      >
                        Import {importPreview.length} Guests
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="manual" className="space-y-6">
                <div className="text-center">
                  <Users className="w-12 h-12 text-wedding-rose mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Manual entry coming soon</h3>
                  <p className="text-gray-600 mb-4">
                    Add guests one by one with our simple form interface
                  </p>
                  <Button variant="outline" disabled>
                    Start Adding Guests
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="demo" className="space-y-6">
                <div className="text-center">
                  <FileText className="w-12 h-12 text-wedding-rose mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Try with sample data</h3>
                  <p className="text-gray-600 mb-4">
                    Explore all features with our pre-loaded guest list
                  </p>
                  <Button
                    onClick={onUseMockData}
                    className="wedding-button"
                  >
                    Load Sample Guest List
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Feature Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-wedding-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-wedding-rose" />
          </div>
          <h3 className="font-semibold mb-2">RSVP Tracking</h3>
          <p className="text-sm text-gray-600">
            Track responses, dietary restrictions, and plus-ones automatically
          </p>
        </Card>

        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-wedding-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-wedding-gold" />
          </div>
          <h3 className="font-semibold mb-2">Smart Seating</h3>
          <p className="text-sm text-gray-600">
            AI-powered seating arrangements based on relationships and preferences
          </p>
        </Card>

        <Card className="text-center p-6">
          <div className="w-12 h-12 bg-wedding-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Download className="w-6 h-6 text-wedding-sage" />
          </div>
          <h3 className="font-semibold mb-2">Export & Share</h3>
          <p className="text-sm text-gray-600">
            Export guest lists, seating charts, and RSVP reports instantly
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
```

### RSVP Dashboard Component

**apps/guest-manager/src/components/RSVPDashboard.tsx:**
```typescript
import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button, Progress } from '@wilma/ui'
import type { Guest, RSVPStats } from '../types/guest.types'
import { Users, CheckCircle, XCircle, Clock, UserPlus, UtensilsCrossed } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'

interface RSVPDashboardProps {
  guests: Guest[]
  onViewChange: (view: 'dashboard' | 'list' | 'seating') => void
}

const COLORS = {
  confirmed: '#10B981',
  declined: '#EF4444', 
  pending: '#F59E0B',
  maybe: '#8B5CF6'
}

export function RSVPDashboard({ guests, onViewChange }: RSVPDashboardProps) {
  const stats: RSVPStats = useMemo(() => {
    const totalInvited = guests.length
    const confirmed = guests.filter(g => g.rsvpStatus === 'confirmed').length
    const declined = guests.filter(g => g.rsvpStatus === 'declined').length
    const pending = guests.filter(g => g.rsvpStatus === 'pending').length
    const maybe = guests.filter(g => g.rsvpStatus === 'maybe').length
    const plusOnes = guests.filter(g => g.plusOneAllowed && g.plusOneRsvp === 'confirmed').length
    const tableAssignments = guests.filter(g => g.tableAssignment).length

    // Dietary restrictions count
    const dietaryRestrictions: Record<string, number> = {}
    guests.forEach(guest => {
      guest.dietaryRestrictions.forEach(restriction => {
        dietaryRestrictions[restriction] = (dietaryRestrictions[restriction] || 0) + 1
      })
    })

    return {
      totalInvited,
      confirmed,
      declined,
      pending,
      maybe,
      plusOnes,
      dietaryRestrictions,
      tableAssignments
    }
  }, [guests])

  const rsvpData = [
    { name: 'Confirmed', value: stats.confirmed, color: COLORS.confirmed },
    { name: 'Declined', value: stats.declined, color: COLORS.declined },
    { name: 'Pending', value: stats.pending, color: COLORS.pending },
    { name: 'Maybe', value: stats.maybe, color: COLORS.maybe }
  ]

  const responseRate = Math.round(((stats.confirmed + stats.declined) / stats.totalInvited) * 100)
  const attendanceRate = Math.round((stats.confirmed / stats.totalInvited) * 100)

  const recentRSVPs = guests
    .filter(g => g.rsvpDate)
    .sort((a, b) => (b.rsvpDate?.getTime() || 0) - (a.rsvpDate?.getTime() || 0))
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Guest List Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Track RSVPs, manage seating, and monitor your guest list progress
        </p>
      </motion.div>

      {/* Key Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="wedding-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Invited</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalInvited}</p>
              </div>
              <div className="w-12 h-12 bg-wedding-rose/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-wedding-rose" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wedding-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-3xl font-bold text-green-600">{stats.confirmed}</p>
                <p className="text-xs text-gray-500">{attendanceRate}% attendance</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wedding-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-3xl font-bold text-wedding-gold">{responseRate}%</p>
                <Progress value={responseRate} className="mt-2" />
              </div>
              <div className="w-12 h-12 bg-wedding-gold/10 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-wedding-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="wedding-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Plus Ones</p>
                <p className="text-3xl font-bold text-wedding-sage">{stats.plusOnes}</p>
                <p className="text-xs text-gray-500">Confirmed attendees</p>
              </div>
              <div className="w-12 h-12 bg-wedding-sage/10 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-wedding-sage" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* RSVP Status Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="wedding-card h-full">
            <CardHeader>
              <CardTitle className="font-wedding-serif text-2xl">
                RSVP Status Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-8">
                <div className="w-48 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={rsvpData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        labelLine={false}
                      >
                        {rsvpData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {rsvpData.map((item) => (
                    <div key={item.name} className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-gray-600">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent RSVPs */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="wedding-card h-full">
            <CardHeader>
              <CardTitle className="font-wedding-serif text-2xl">
                Recent RSVPs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentRSVPs.length > 0 ? (
                  recentRSVPs.map((guest) => (
                    <div key={guest.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{guest.firstName} {guest.lastName}</p>
                        <p className="text-sm text-gray-600">{guest.relationship}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          guest.rsvpStatus === 'confirmed' ? 'bg-green-100 text-green-800' :
                          guest.rsvpStatus === 'declined' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.rsvpStatus}
                        </span>
                        {guest.rsvpDate && (
                          <p className="text-xs text-gray-500 mt-1">
                            {guest.rsvpDate.toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-8">No RSVPs received yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Dietary Restrictions */}
      {Object.keys(stats.dietaryRestrictions).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="wedding-card">
            <CardHeader>
              <CardTitle className="font-wedding-serif text-2xl flex items-center">
                <UtensilsCrossed className="w-6 h-6 mr-2" />
                Dietary Restrictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(stats.dietaryRestrictions).map(([restriction, count]) => (
                  <div key={restriction} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-wedding-rose">{count}</p>
                    <p className="text-sm text-gray-600 capitalize">{restriction}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
      >
        <Button
          onClick={() => onViewChange('list')}
          size="lg"
          className="wedding-button"
        >
          Manage Guest List
        </Button>
        
        <Button
          onClick={() => onViewChange('seating')}
          size="lg"
          variant="outline"
          className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white"
        >
          Create Seating Chart
        </Button>
        
        <Button
          onClick={() => window.open('https://timeline.wilma.com', '_blank')}
          size="lg"
          variant="outline"
          className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white"
        >
          Plan Timeline
        </Button>
      </motion.div>

      {/* Cross-promotion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="bg-gradient-to-r from-wedding-rose/20 to-wedding-mauve/20 rounded-xl p-6 text-center"
      >
        <h3 className="font-wedding-serif text-2xl font-semibold mb-2">
          Complete Your Wedding Planning
        </h3>
        <p className="text-gray-600 mb-4">
          Now that you're managing guests, set your budget and create your timeline
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            onClick={() => window.open('https://budget.wilma.com', '_blank')}
            className="wedding-button"
          >
            Budget Calculator
          </Button>
          <Button 
            onClick={() => window.open('https://timeline.wilma.com', '_blank')}
            variant="outline"
            className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white"
          >
            Timeline Generator
          </Button>
          <Button 
            onClick={() => window.open('https://venue.wilma.com', '_blank')}
            variant="outline"
            className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white"
          >
            Venue Analyzer
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
```

### Mock Guest Data

**apps/guest-manager/src/data/mockGuests.ts:**
```typescript
import type { Guest } from '../types/guest.types'

export function generateMockGuests(): Guest[] {
  return [
    {
      id: 'guest_1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@email.com',
      phone: '555-0101',
      relationship: 'Maid of Honor',
      side: 'bride',
      rsvpStatus: 'confirmed',
      rsvpDate: new Date('2025-05-15'),
      plusOneAllowed: true,
      plusOneName: 'Mike Wilson',
      plusOneRsvp: 'confirmed',
      dietaryRestrictions: ['vegetarian'],
      tableAssignment: 1,
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01'),
      notes: 'Childhood best friend'
    },
    {
      id: 'guest_2',
      firstName: 'David',
      lastName: 'Chen',
      email: 'david.chen@email.com',
      phone: '555-0102',
      relationship: 'Best Man',
      side: 'groom',
      rsvpStatus: 'confirmed',
      rsvpDate: new Date('2025-05-10'),
      plusOneAllowed: true,
      plusOneName: 'Lisa Chen',
      plusOneRsvp: 'confirmed',
      dietaryRestrictions: [],
      tableAssignment: 1,
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01')
    },
    {
      id: 'guest_3',
      firstName: 'Emily',
      lastName: 'Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '555-0103',
      relationship: 'Sister',
      side: 'bride',
      rsvpStatus: 'confirmed',
      rsvpDate: new Date('2025-05-20'),
      plusOneAllowed: false,
      dietaryRestrictions: ['gluten-free'],
      tableAssignment: 2,
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01'),
      notes: 'Needs gluten-free meal'
    },
    {
      id: 'guest_4',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@email.com',
      phone: '555-0104',
      relationship: 'College Friend',
      side: 'groom',
      rsvpStatus: 'pending',
      plusOneAllowed: true,
      dietaryRestrictions: [],
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01')
    },
    {
      id: 'guest_5',
      firstName: 'Jessica',
      lastName: 'Taylor',
      email: 'jessica.taylor@email.com',
      phone: '555-0105',
      relationship: 'Cousin',
      side: 'bride',
      rsvpStatus: 'maybe',
      rsvpDate: new Date('2025-05-18'),
      plusOneAllowed: true,
      dietaryRestrictions: ['dairy-free'],
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01'),
      notes: 'Travel dependent'
    },
    {
      id: 'guest_6',
      firstName: 'Robert',
      lastName: 'Davis',
      email: 'robert.davis@email.com',
      phone: '555-0106',
      relationship: 'Uncle',
      side: 'groom',
      rsvpStatus: 'declined',
      rsvpDate: new Date('2025-05-12'),
      plusOneAllowed: true,
      dietaryRestrictions: [],
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01'),
      notes: 'Scheduling conflict'
    },
    {
      id: 'guest_7',
      firstName: 'Amanda',
      lastName: 'Wilson',
      email: 'amanda.wilson@email.com',
      phone: '555-0107',
      relationship: 'Work Colleague',
      side: 'bride',
      rsvpStatus: 'confirmed',
      rsvpDate: new Date('2025-05-14'),
      plusOneAllowed: false,
      dietaryRestrictions: ['vegan'],
      tableAssignment: 4,
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01')
    },
    {
      id: 'guest_8',
      firstName: 'James',
      lastName: 'Garcia',
      email: 'james.garcia@email.com',
      phone: '555-0108',
      relationship: 'Childhood Friend',
      side: 'groom',
      rsvpStatus: 'confirmed',
      rsvpDate: new Date('2025-05-16'),
      plusOneAllowed: true,
      plusOneName: 'Maria Garcia',
      plusOneRsvp: 'confirmed',
      dietaryRestrictions: [],
      tableAssignment: 3,
      invitationSent: true,
      invitationSentAt: new Date('2025-03-01')
    }
  ]
}
```

---

## 7. Venue Analyzer Micro-App

```markdown
Create the Venue Analyzer as the fourth micro-app for Wilma Mk2. This will be deployed to venue.wilma.com and help couples analyze venue photos with AI computer vision.

## Create Venue Analyzer App (apps/venue-analyzer)

Initialize as Vite React app:

```bash
cd apps
npm create vite@latest venue-analyzer -- --template react-ts
cd venue-analyzer
```

### apps/venue-analyzer/package.json
```json
{
  "name": "wilma-venue-analyzer",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite --port 3004",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@wilma/ui": "workspace:*",
    "@wilma/api-client": "workspace:*",
    "@wilma/types": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "@tanstack/react-query": "^5.17.15",
    "react-hook-form": "^7.49.2",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "framer-motion": "^10.18.0",
    "react-dropzone": "^14.2.3",
    "react-image-gallery": "^1.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.12",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0"
  }
}
```

### Venue Analyzer Structure
```
apps/venue-analyzer/src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── VenueUpload.tsx
│   ├── VenueAnalysis.tsx
│   ├── AnalysisResults.tsx
│   ├── VenueComparison.tsx
│   ├── VenueGallery.tsx
│   ├── PreferencesForm.tsx
│   ├── CompatibilityScore.tsx
│   └── LoadingAnimation.tsx
├── hooks/
│   ├── useVenueAnalysis.ts
│   ├── useImageUpload.ts
│   └── useVenueComparison.ts
├── utils/
│   ├── imageHelpers.ts
│   ├── analysisHelpers.ts
│   └── venueValidation.ts
├── types/
│   └── venue.types.ts
└── data/
    └── mockVenues.ts
```

### Venue Types

**apps/venue-analyzer/src/types/venue.types.ts:**
```typescript
import { z } from 'zod'

export const VenuePreferencesSchema = z.object({
  style: z.array(z.enum(['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor', 'industrial'])),
  guestCount: z.number().min(1).max(1000),
  budget: z.number().min(1000).max(200000),
  location: z.string().min(2),
  requirements: z.array(z.string()).default([]),
  priorityFactors: z.array(z.enum(['cost', 'capacity', 'style', 'location', 'amenities'])).min(1)
})

export type VenuePreferences = z.infer<typeof VenuePreferencesSchema>

export interface VenueImage {
  id: string
  url: string
  file?: File
  name: string
  size: number
  type: string
  uploadedAt: Date
}

export interface VenueAnalysisResult {
  id: string
  imageId: string
  analysis: {
    capacityEstimate: {
      min: number
      max: number
      confidence: number
    }
    styleClassification: Array<{
      style: string
      confidence: number
    }>
    features: string[]
    accessibility: {
      wheelchairAccessible: boolean
      accessibilityScore: number
      notes: string[]
    }
    weatherDependency: {
      type: 'indoor' | 'outdoor' | 'mixed'
      covered: number // percentage
      backupPlanNeeded: boolean
    }
    decorationPotential: {
      score: number
      recommendations: string[]
      restrictions: string[]
    }
    lighting: {
      natural: number // percentage
      artificial: string[]
      photography: {
        score: number
        notes: string[]
      }
    }
    layout: {
      ceremonySpace: boolean
      receptionSpace: boolean
      separateSpaces: boolean
      flowScore: number
    }
  }
  compatibilityScore: number
  pros: string[]
  cons: string[]
  recommendations: string[]
  confidenceScore: number
  createdAt: string
}

export interface VenueComparisonData {
  venues: VenueAnalysisResult[]
  comparisonMatrix: ComparisonMatrix
  recommendations: VenueRecommendation[]
}

export interface ComparisonMatrix {
  categories: ComparisonCategory[]
  scores: Record<string, Record<string, number>>
}

export interface ComparisonCategory {
  id: string
  name: string
  weight: number
  subcategories: string[]
}

export interface VenueRecommendation {
  venueId: string
  type: 'best_overall' | 'best_value' | 'best_style_match' | 'most_flexible'
  reason: string
  score: number
}

export interface VenueSearchResult {
  id: string
  name: string
  type: string
  location: string
  priceRange: string
  capacity: {
    min: number
    max: number
  }
  images: string[]
  rating: number
  features: string[]
  availability: string[]
}
```

### Main App Component

**apps/venue-analyzer/src/App.tsx:**
```typescript
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { VenueUpload } from './components/VenueUpload'
import { VenueAnalysis } from './components/VenueAnalysis'
import { VenueComparison } from './components/VenueComparison'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import type { VenueImage, VenueAnalysisResult, VenuePreferences } from './types/venue.types'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

type AppView = 'upload' | 'analysis' | 'comparison' | 'search'

function App() {
  const [currentView, setCurrentView] = useState<AppView>('upload')
  const [uploadedImages, setUploadedImages] = useState<VenueImage[]>([])
  const [analyses, setAnalyses] = useState<VenueAnalysisResult[]>([])
  const [preferences, setPreferences] = useState<VenuePreferences | null>(null)

  const handleImagesUpload = (images: VenueImage[], userPreferences: VenuePreferences) => {
    setUploadedImages(images)
    setPreferences(userPreferences)
    setCurrentView('analysis')
  }

  const handleAnalysisComplete = (results: VenueAnalysisResult[]) => {
    setAnalyses(results)
    if (results.length > 1) {
      setCurrentView('comparison')
    }
  }

  const handleStartOver = () => {
    setCurrentView('upload')
    setUploadedImages([])
    setAnalyses([])
    setPreferences(null)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-wedding-cream via-wedding-mauve/10 to-white">
        <Navigation 
          currentView={currentView}
          onViewChange={setCurrentView}
          hasAnalyses={analyses.length > 0}
        />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <AnimatePresence mode="wait">
            {currentView === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <VenueUpload 
                  onImagesUpload={handleImagesUpload}
                />
              </motion.div>
            )}

            {currentView === 'analysis' && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <VenueAnalysis 
                  images={uploadedImages}
                  preferences={preferences!}
                  onAnalysisComplete={handleAnalysisComplete}
                  onStartOver={handleStartOver}
                />
              </motion.div>
            )}

            {currentView === 'comparison' && analyses.length > 1 && (
              <motion.div
                key="comparison"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <VenueComparison 
                  analyses={analyses}
                  preferences={preferences!}
                  onStartOver={handleStartOver}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
```

### Venue Upload Component

**apps/venue-analyzer/src/components/VenueUpload.tsx:**
```typescript
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Label, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox
} from '@wilma/ui'
import { VenuePreferencesSchema, type VenuePreferences, type VenueImage } from '../types/venue.types'
import { Upload, Camera, X, MapPin, Users, DollarSign, Heart } from 'lucide-react'

interface VenueUploadProps {
  onImagesUpload: (images: VenueImage[], preferences: VenuePreferences) => void
}

export function VenueUpload({ onImagesUpload }: VenueUploadProps) {
  const [uploadedImages, setUploadedImages] = useState<VenueImage[]>([])
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({})

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<VenuePreferences>({
    resolver: zodResolver(VenuePreferencesSchema),
    defaultValues: {
      style: [],
      guestCount: 100,
      budget: 25000,
      location: '',
      requirements: [],
      priorityFactors: ['style']
    }
  })

  const watchedBudget = watch('budget')

  const onDrop = (acceptedFiles: File[]) => {
    const newImages: VenueImage[] = acceptedFiles.map(file => ({
      id: `img_${Date.now()}_${Math.random()}`,
      url: '',
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date()
    }))

    // Create preview URLs
    const newPreviews: Record<string, string> = {}
    newImages.forEach(image => {
      if (image.file) {
        newPreviews[image.id] = URL.createObjectURL(image.file)
      }
    })

    setUploadedImages(prev => [...prev, ...newImages])
    setPreviewUrls(prev => ({ ...prev, ...newPreviews }))
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 10,
    maxSize: 10 * 1024 * 1024 // 10MB
  })

  const removeImage = (imageId: string) => {
    setUploadedImages(prev => prev.filter(img => img.id !== imageId))
    
    // Cleanup preview URL
    if (previewUrls[imageId]) {
      URL.revokeObjectURL(previewUrls[imageId])
      setPreviewUrls(prev => {
        const { [imageId]: removed, ...rest } = prev
        return rest
      })
    }
  }

  const handleStyleChange = (style: string, checked: boolean) => {
    const current = watch('style') || []
    if (checked) {
      setValue('style', [...current, style] as any)
    } else {
      setValue('style', current.filter(s => s !== style) as any)
    }
  }

  const handleRequirementChange = (requirement: string, checked: boolean) => {
    const current = watch('requirements') || []
    if (checked) {
      setValue('requirements', [...current, requirement])
    } else {
      setValue('requirements', current.filter(r => r !== requirement))
    }
  }

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const current = watch('priorityFactors') || []
    if (checked) {
      setValue('priorityFactors', [...current, priority] as any)
    } else {
      setValue('priorityFactors', current.filter(p => p !== priority) as any)
    }
  }

  const onSubmit = (data: VenuePreferences) => {
    if (uploadedImages.length === 0) return
    onImagesUpload(uploadedImages, data)
  }

  const styleOptions = [
    { value: 'modern', label: 'Modern & Contemporary' },
    { value: 'rustic', label: 'Rustic & Natural' },
    { value: 'classic', label: 'Classic & Elegant' },
    { value: 'boho', label: 'Boho & Free-spirited' },
    { value: 'vintage', label: 'Vintage & Romantic' },
    { value: 'outdoor', label: 'Outdoor & Garden' },
    { value: 'industrial', label: 'Industrial & Urban' }
  ]

  const requirementOptions = [
    'Wheelchair accessible',
    'Parking available',
    'Catering kitchen',
    'Bridal suite',
    'Outdoor ceremony space',
    'Dance floor',
    'Bar area',
    'Photo opportunities',
    'Weather backup plan',
    'Vendor flexibility'
  ]

  const priorityOptions = [
    { value: 'cost', label: 'Cost & Budget' },
    { value: 'capacity', label: 'Guest Capacity' },
    { value: 'style', label: 'Style & Aesthetics' },
    { value: 'location', label: 'Location & Accessibility' },
    { value: 'amenities', label: 'Amenities & Features' }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered Venue Analyzer
        </h1>
        <p className="text-xl text-gray-600">
          Upload venue photos and get intelligent analysis with compatibility scoring
        </p>
      </motion.div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Image Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="wedding-card shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-wedding-serif flex items-center">
                <Camera className="w-6 h-6 mr-2" />
                Upload Venue Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-wedding-mauve bg-wedding-mauve/10' 
                    : 'border-wedding-mauve/30 hover:border-wedding-mauve/50'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-wedding-mauve mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? 'Drop photos here...' : 'Upload venue photos'}
                </h3>
                <p className="text-gray-600 mb-4">
                  Drag & drop up to 10 photos, or click to select files
                </p>
                <p className="text-sm text-gray-500">
                  Supports JPEG, PNG, WebP • Max 10MB per file
                </p>
              </div>

              {/* Uploaded Images Preview */}
              {uploadedImages.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Uploaded Photos ({uploadedImages.length})</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {uploadedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <img
                          src={previewUrls[image.id]}
                          alt={image.name}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(image.id)}
                          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-500 mt-1 truncate">{image.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Wedding Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="wedding-card shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-wedding-serif flex items-center">
                <Heart className="w-6 h-6 mr-2" />
                Your Wedding Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="guestCount" className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Guest Count
                  </Label>
                  <Input
                    id="guestCount"
                    type="number"
                    placeholder="100"
                    className="wedding-input"
                    {...register('guestCount', { valueAsNumber: true })}
                  />
                  {errors.guestCount && (
                    <p className="text-red-500 text-sm">{errors.guestCount.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="Seattle, WA"
                    className="wedding-input"
                    {...register('location')}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-sm">{errors.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Venue Budget
                  </Label>
                  <div className="space-y-2">
                    <Input
                      id="budget"
                      type="range"
                      min="5000"
                      max="50000"
                      step="1000"
                      className="w-full"
                      {...register('budget', { valueAsNumber: true })}
                    />
                    <div className="text-center">
                      <span className="text-lg font-bold text-wedding-mauve">
                        ${watchedBudget?.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Style Preferences */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">
                  Wedding Style Preferences (select all that apply)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {styleOptions.map((style) => (
                    <div key={style.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={style.value}
                        onCheckedChange={(checked) => handleStyleChange(style.value, checked as boolean)}
                      />
                      <Label 
                        htmlFor={style.value}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {style.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.style && (
                  <p className="text-red-500 text-sm">{errors.style.message}</p>
                )}
              </div>

              {/* Requirements */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">
                  Must-Have Requirements
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {requirementOptions.map((requirement) => (
                    <div key={requirement} className="flex items-center space-x-2">
                      <Checkbox
                        id={requirement}
                        onCheckedChange={(checked) => handleRequirementChange(requirement, checked as boolean)}
                      />
                      <Label 
                        htmlFor={requirement}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {requirement}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Priority Factors */}
              <div className="space-y-3">
                <Label className="text-lg font-medium">
                  What's most important to you? (select top priorities)
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {priorityOptions.map((priority) => (
                    <div key={priority.value} className="flex items-center space-x-2">
                      <Checkbox
                        id={priority.value}
                        onCheckedChange={(checked) => handlePriorityChange(priority.value, checked as boolean)}
                      />
                      <Label 
                        htmlFor={priority.value}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {priority.label}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.priorityFactors && (
                  <p className="text-red-500 text-sm">{errors.priorityFactors.message}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            type="submit"
            disabled={isSubmitting || uploadedImages.length === 0}
            className="wedding-button text-lg px-8 py-4 font-semibold"
            size="lg"
          >
            {isSubmitting ? 'Analyzing Venues...' : `Analyze ${uploadedImages.length} Venue${uploadedImages.length !== 1 ? 's' : ''}`}
          </Button>
          
          {uploadedImages.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">
              Please upload at least one venue photo to continue
            </p>
          )}
        </motion.div>
      </form>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center mt-8 space-y-2"
      >
        <p className="text-sm text-gray-500">
          🤖 Powered by advanced AI • 📊 Instant analysis • 🔒 Your photos stay private
        </p>
        <p className="text-xs text-gray-400">
          Get detailed venue insights including capacity, style match, and compatibility scoring
        </p>
      </motion.div>
    </div>
  )
}
```

### Venue Analysis Component

**apps/venue-analyzer/src/components/VenueAnalysis.tsx:**
```typescript
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AnalysisResults } from './AnalysisResults'
import { LoadingAnimation } from './LoadingAnimation'
import type { VenueImage, VenueAnalysisResult, VenuePreferences } from '../types/venue.types'
import { generateMockAnalysis } from '../data/mockVenues'

interface VenueAnalysisProps {
  images: VenueImage[]
  preferences: VenuePreferences
  onAnalysisComplete: (results: VenueAnalysisResult[]) => void
  onStartOver: () => void
}

export function VenueAnalysis({ 
  images, 
  preferences, 
  onAnalysisComplete, 
  onStartOver 
}: VenueAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<VenueAnalysisResult[]>([])

  useEffect(() => {
    const analyzeImages = async () => {
      const results: VenueAnalysisResult[] = []
      
      for (let i = 0; i < images.length; i++) {
        setCurrentImageIndex(i)
        
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Generate mock analysis for each image
        const analysis = generateMockAnalysis(images[i], preferences)
        results.push(analysis)
      }
      
      setAnalysisResults(results)
      setIsAnalyzing(false)
      onAnalysisComplete(results)
    }

    analyzeImages()
  }, [images, preferences, onAnalysisComplete])

  if (isAnalyzing) {
    return (
      <LoadingAnimation 
        images={images}
        currentImageIndex={currentImageIndex}
        totalImages={images.length}
      />
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <AnalysisResults 
          results={analysisResults}
          preferences={preferences}
          onStartOver={onStartOver}
        />
      </motion.div>
    </AnimatePresence>
  )
}
```

### Loading Animation Component

**apps/venue-analyzer/src/components/LoadingAnimation.tsx:**
```typescript
import { motion } from 'framer-motion'
import { Card, CardContent } from '@wilma/ui'
import type { VenueImage } from '../types/venue.types'
import { Camera, Brain, Search, CheckCircle } from 'lucide-react'

interface LoadingAnimationProps {
  images: VenueImage[]
  currentImageIndex: number
  totalImages: number
}

export function LoadingAnimation({ images, currentImageIndex, totalImages }: LoadingAnimationProps) {
  const progress = ((currentImageIndex + 1) / totalImages) * 100
  
  const analysisSteps = [
    { icon: Camera, label: 'Processing images', active: true },
    { icon: Brain, label: 'AI analysis', active: currentImageIndex > 0 },
    { icon: Search, label: 'Style detection', active: currentImageIndex > 1 },
    { icon: CheckCircle, label: 'Generating insights', active: currentImageIndex === totalImages - 1 }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Analyzing Your Venues
        </h1>
        <p className="text-xl text-gray-600">
          Our AI is examining each photo for style, capacity, and compatibility
        </p>
      </motion.div>

      <Card className="wedding-card shadow-xl">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Analyzing venue {currentImageIndex + 1} of {totalImages}
              </span>
              <span className="text-sm font-medium text-wedding-mauve">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-wedding-mauve to-wedding-rose h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Current Image Preview */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              {images[currentImageIndex] && (
                <motion.img
                  key={currentImageIndex}
                  src={URL.createObjectURL(images[currentImageIndex].file!)}
                  alt={`Venue ${currentImageIndex + 1}`}
                  className="w-64 h-40 object-cover rounded-lg shadow-lg border-4 border-wedding-mauve/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}
              
              {/* Analysis overlay */}
              <motion.div
                className="absolute inset-0 bg-wedding-mauve/20 rounded-lg flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.7, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-white font-semibold text-lg">
                  <Brain className="w-8 h-8 mx-auto mb-2 animate-pulse" />
                  Analyzing...
                </div>
              </motion.div>
            </div>
            
            <p className="mt-4 text-lg font-medium text-gray-700">
              {images[currentImageIndex]?.name}
            </p>
          </div>

          {/* Analysis Steps */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={index}
                  className={`text-center p-4 rounded-lg transition-all duration-500 ${
                    step.active 
                      ? 'bg-wedding-mauve/10 border-2 border-wedding-mauve' 
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: step.active ? 1 : 0.5 }}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    step.active 
                      ? 'bg-wedding-mauve text-white' 
                      : 'bg-gray-300 text-gray-500'
                  }`}>
                    <Icon className={`w-6 h-6 ${step.active ? 'animate-pulse' : ''}`} />
                  </div>
                  <p className={`text-sm font-medium ${
                    step.active ? 'text-wedding-mauve' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Analysis Details */}
          <div className="mt-8 space-y-4">
            <motion.div
              className="bg-gradient-to-r from-wedding-mauve/5 to-wedding-rose/5 rounded-lg p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h3 className="font-semibold text-gray-900 mb-2">What we're analyzing:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm text-gray-600">
                <div>📐 Capacity estimation</div>
                <div>🎨 Style classification</div>
                <div>♿ Accessibility features</div>
                <div>🌟 Photo opportunities</div>
                <div>💡 Lighting analysis</div>
                <div>🏗️ Layout assessment</div>
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>

      {/* Fun Facts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="text-center mt-8 space-y-2"
      >
        <p className="text-sm text-gray-500">
          💡 Did you know? Our AI analyzes over 50 visual factors to assess venue compatibility
        </p>
        <p className="text-xs text-gray-400">
          This usually takes 2-3 minutes per venue for the most accurate results
        </p>
      </motion.div>
    </div>
  )
}
```

### Mock Venue Data Generator

**apps/venue-analyzer/src/data/mockVenues.ts:**
```typescript
import type { VenueImage, VenueAnalysisResult, VenuePreferences } from '../types/venue.types'

export function generateMockAnalysis(
  image: VenueImage, 
  preferences: VenuePreferences
): VenueAnalysisResult {
  // Generate realistic analysis based on preferences
  const styleMatch = calculateStyleMatch(preferences.style)
  const capacityMatch = generateCapacityEstimate(preferences.guestCount)
  const compatibilityScore = calculateCompatibilityScore(preferences, styleMatch, capacityMatch)
  
  return {
    id: `analysis_${Date.now()}_${image.id}`,
    imageId: image.id,
    analysis: {
      capacityEstimate: capacityMatch,
      styleClassification: styleMatch,
      features: generateFeatures(),
      accessibility: generateAccessibilityInfo(),
      weatherDependency: generateWeatherInfo(),
      decorationPotential: generateDecorationInfo(),
      lighting: generateLightingInfo(),
      layout: generateLayoutInfo()
    },
    compatibilityScore,
    pros: generatePros(styleMatch, preferences),
    cons: generateCons(capacityMatch, preferences),
    recommendations: generateRecommendations(preferences),
    confidenceScore: Math.random() * 0.2 + 0.8, // 80-100%
    createdAt: new Date().toISOString()
  }
}

function calculateStyleMatch(preferredStyles: string[]) {
  const allStyles = ['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor', 'industrial']
  
  return allStyles.map(style => ({
    style,
    confidence: preferredStyles.includes(style) 
      ? Math.random() * 0.3 + 0.7  // 70-100% for preferred styles
      : Math.random() * 0.5 + 0.1  // 10-60% for others
  })).sort((a, b) => b.confidence - a.confidence)
}

function generateCapacityEstimate(guestCount: number) {
  const variation = guestCount * 0.3
  return {
    min: Math.round(guestCount - variation),
    max: Math.round(guestCount + variation),
    confidence: Math.random() * 0.2 + 0.8
  }
}

function calculateCompatibilityScore(
  preferences: VenuePreferences,
  styleMatch: any[],
  capacityMatch: any
): number {
  let score = 0
  
  // Style match (40% weight)
  const topStyleConfidence = styleMatch[0]?.confidence || 0
  score += topStyleConfidence * 0.4
  
  // Capacity match (30% weight)
  const capacityScore = Math.min(capacityMatch.confidence, 1)
  score += capacityScore * 0.3
  
  // Budget compatibility (20% weight)
  score += 0.8 * 0.2 // Assume good budget match
  
  // Requirements (10% weight)
  score += 0.9 * 0.1 // Assume most requirements met
  
  return Math.round(score * 100) / 100
}

function generateFeatures(): string[] {
  const possibleFeatures = [
    'Bridal suite',
    'Getting ready room',
    'Catering kitchen',
    'Bar area',
    'Dance floor',
    'Parking lot',
    'Garden/outdoor space',
    'Photo opportunities',
    'Ceremony space',
    'Reception hall',
    'Sound system',
    'Lighting setup',
    'Tables and chairs',
    'Restroom facilities'
  ]
  
  // Return 6-10 random features
  const shuffled = possibleFeatures.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.floor(Math.random() * 5) + 6)
}

function generateAccessibilityInfo() {
  const isAccessible = Math.random() > 0.3
  return {
    wheelchairAccessible: isAccessible,
    accessibilityScore: isAccessible ? Math.floor(Math.random() * 3) + 8 : Math.floor(Math.random() * 4) + 4,
    notes: isAccessible 
      ? ['Ramp access available', 'Accessible restrooms', 'Wide doorways']
      : ['Limited accessibility', 'Steps at entrance', 'No accessible restrooms identified']
  }
}

function generateWeatherInfo() {
  const types = ['indoor', 'outdoor', 'mixed'] as const
  const type = types[Math.floor(Math.random() * types.length)]
  
  return {
    type,
    covered: type === 'indoor' ? 1 : type === 'outdoor' ? Math.random() * 0.3 : Math.random() * 0.7 + 0.3,
    backupPlanNeeded: type === 'outdoor' || (type === 'mixed' && Math.random() > 0.5)
  }
}

function generateDecorationInfo() {
  return {
    score: Math.floor(Math.random() * 3) + 8,
    recommendations: [
      'Beautiful natural lighting reduces decoration needs',
      'Exposed architecture provides built-in elegance',
      'Multiple focal points for ceremony and reception',
      'Ample space for personal touches'
    ].slice(0, Math.floor(Math.random() * 2) + 2),
    restrictions: Math.random() > 0.7 ? [
      'No candles allowed',
      'Décor must be removed same day',
      'Approved vendor list required'
    ].slice(0, Math.floor(Math.random() * 2) + 1) : []
  }
}

function generateLightingInfo() {
  return {
    natural: Math.random() * 0.6 + 0.2, // 20-80%
    artificial: ['String lights', 'Chandeliers', 'Spotlights', 'Ambient lighting'].slice(0, Math.floor(Math.random() * 3) + 1),
    photography: {
      score: Math.floor(Math.random() * 3) + 7,
      notes: [
        'Golden hour opportunities available',
        'Even lighting throughout space',
        'Beautiful backdrops for photos'
      ].slice(0, Math.floor(Math.random() * 2) + 1)
    }
  }
}

function generateLayoutInfo() {
  return {
    ceremonySpace: Math.random() > 0.3,
    receptionSpace: Math.random() > 0.1,
    separateSpaces: Math.random() > 0.5,
    flowScore: Math.floor(Math.random() * 3) + 7
  }
}

function generatePros(styleMatch: any[], preferences: VenuePreferences): string[] {
  const pros = [
    `Strong ${styleMatch[0]?.style || 'style'} aesthetic match`,
    'Excellent natural lighting for photography',
    'Spacious layout with good flow',
    'Beautiful architectural details',
    'Convenient parking and accessibility',
    'Flexible decoration policies',
    'Professional sound system included',
    'Multiple photo opportunity areas'
  ]
  
  return pros.slice(0, Math.floor(Math.random() * 3) + 4)
}

function generateCons(capacityMatch: any, preferences: VenuePreferences): string[] {
  const cons = [
    'Weather backup plan needed for outdoor elements',
    'Limited vendor kitchen facilities',
    'Parking may be tight for larger gatherings',
    'Additional lighting may be needed for evening events',
    'Décor restrictions on certain areas',
    'No on-site catering included',
    'Sound limitations for live music'
  ]
  
  return cons.slice(0, Math.floor(Math.random() * 2) + 2)
}

function generateRecommendations(preferences: VenuePreferences): string[] {
  const recommendations = [
    'Consider booking a site visit during your preferred ceremony time',
    'Ask about preferred vendor partnerships for catering',
    'Discuss decoration setup and breakdown timing',
    'Verify guest capacity for your final headcount',
    'Review weather contingency plans for outdoor elements',
    'Confirm accessibility features for all guests',
    'Inquire about sound system capabilities for your music needs'
  ]
  
  return recommendations.slice(0, Math.floor(Math.random() * 3) + 3)
}
```

Please create this complete Venue Analyzer micro-app with AI-powered photo analysis, compatibility scoring, and comprehensive venue insights. This will be the fourth major tool in the Wilma Mk2 micro-apps ecosystem.
                    <span className="text-2xl font-bold text-wedding-rose">
                      ${watchedBudget?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>$5,000</span>
                    <span>$100,000+</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full wedding-button text-lg py-6 font-semibold"
                >
                  {isSubmitting ? 'Calculating...' : 'Get My AI Budget Plan'}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8 space-y-2"
      >
        <p className="text-sm text-gray-500">
          ✨ Trusted by 10,000+ couples • 100% Free • No signup required
        </p>
        <p className="text-xs text-gray-400">
          Get instant results powered by AI and real wedding data
        </p>
      </motion.div>
    </div>
  )
}
```

### Budget Results Component

**apps/budget-calculator/src/components/BudgetResults.tsx:**
```typescript
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle, Button } from '@wilma/ui'
import { BudgetChart } from './BudgetChart'
import { CategoryBreakdown } from './CategoryBreakdown'
import { AIRecommendations } from './AIRecommendations'
import { ExportOptions } from './ExportOptions'
import { EmailCapture } from './EmailCapture'
import type { BudgetCalculationResult, BudgetFormData } from '@wilma/types'
import { Sparkles, ArrowLeft, Share2 } from 'lucide-react'

interface BudgetResultsProps {
  results: BudgetCalculationResult
  formData: BudgetFormData
  onStartOver: () => void
}

export function BudgetResults({ results, formData, onStartOver }: BudgetResultsProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header with Total Budget */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <Card className="wedding-card shadow-xl">
          <CardContent className="pt-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-wedding-rose to-wedding-mauve rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Personalized Wedding Budget
            </h1>
            <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-wedding-rose to-wedding-mauve bg-clip-text text-transparent mb-2">
              ${results.totalBudget.toLocaleString()}
            </div>
            <p className="text-xl text-gray-600">
              For {formData.guestCount} guests in {formData.location}
            </p>
            <div className="flex items-center justify-center mt-4 space-x-4 text-sm text-gray-500">
              <span>✨ AI Confidence: {Math.round(results.confidenceScore * 100)}%</span>
              <span>•</span>
              <span>📍 {results.regionalFactors.location}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Budget Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="wedding-card h-full">
            <CardHeader>
              <CardTitle className="font-wedding-serif text-2xl">
                Budget Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetChart breakdown={results.breakdown} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Details */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <CategoryBreakdown 
            breakdown={results.breakdown} 
            totalBudget={results.totalBudget}
          />
        </motion.div>
      </div>

      {/* AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <AIRecommendations 
          recommendations={results.aiRecommendations}
          regionalFactors={results.regionalFactors}
        />
      </motion.div>

      {/* Email Capture */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <EmailCapture 
          results={results}
          formData={formData}
        />
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <ExportOptions 
          results={results}
          formData={formData}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
      >
        <Button
          onClick={onStartOver}
          variant="outline"
          size="lg"
          className="border-wedding-rose text-wedding-rose hover:bg-wedding-rose hover:text-white"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Calculate Another Budget
        </Button>
        
        <Button
          onClick={() => window.open('https://timeline.wilma.com', '_blank')}
          size="lg"
          className="wedding-button"
        >
          Create Wedding Timeline
        </Button>
        
        <Button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My Wedding Budget Plan',
                text: `Check out my AI-generated wedding budget: $${results.totalBudget.toLocaleString()}`,
                url: window.location.href
              })
            }
          }}
          variant="outline"
          size="lg"
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share Results
        </Button>
      </motion.div>

      {/* Cross-promotion */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-gradient-to-r from-wedding-blush/20 to-wedding-gold/20 rounded-xl p-6 text-center"
      >
        <h3 className="font-wedding-serif text-2xl font-semibold mb-2">
          Continue Planning Your Perfect Wedding
        </h3>
        <p className="text-gray-600 mb-4">
          Now that you have your budget, let's create a timeline and manage your guest list
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button 
            onClick={() => window.open('https://timeline.wilma.com', '_blank')}
            className="wedding-button"
          >
            Timeline Generator
          </Button>
          <Button 
            onClick={() => window.open('https://guests.wilma.com', '_blank')}
            variant="outline"
            className="border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-white"
          >
            Guest Manager
          </Button>
          <Button 
            onClick={() => window.open('https://venue.wilma.com', '_blank')}
            variant="outline"
            className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white"
          >
            Venue Analyzer
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
```

### Vite Configuration

**apps/budget-calculator/vite.config.ts:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3001
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['recharts'],
          ui: ['@wilma/ui'],
          api: ['@wilma/api-client']
        }
      }
    }
  }
})
```

### Deployment Configuration

**apps/budget-calculator/vercel.json:**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "VITE_OPENAI_API_KEY": "@openai_api_key"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Please create this complete Budget Calculator micro-app with all components, proper form handling, beautiful UI, and the ability to calculate and display personalized wedding budgets with AI recommendations.
```

---

## 5. Timeline Generator Micro-App

```markdown
Create the Timeline Generator as the second micro-app for Wilma Mk2. This will be deployed to timeline.wilma.com and help couples create intelligent wedding planning timelines.

## Create Timeline Generator App (apps/timeline-generator)

Initialize as Vite React app:

```bash
cd apps
npm create vite@latest timeline-generator -- --template react-ts
cd timeline-generator
```

### apps/timeline-generator/package.json
```json
{
  "name": "wilma-timeline-generator",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "vite --port 3002",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .ts,.tsx",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@wilma/ui": "workspace:*",
    "@wilma/api-client": "workspace:*",
    "@wilma/types": "workspace:*",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "@tanstack/react-query": "^5.17.15",
    "react-hook-form": "^7.49.2",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "framer-motion": "^10.18.0",
    "@dnd-kit/core": "^6.0.8",
    "@dnd-kit/sortable": "^7.0.2",
    "@dnd-kit/utilities": "^3.2.1",
    "date-fns": "^3.2.0",
    "react-big-calendar": "^1.8.5"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@types/react-big-calendar": "^1.8.4",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.12",
    "typescript": "^5.3.3",
    "eslint": "^8.56.0"
  }
}
```

### Timeline Generator Structure
```
apps/timeline-generator/src/
├── App.tsx
├── main.tsx
├── index.css
├── components/
│   ├── TimelineForm.tsx
│   ├── TimelineDisplay.tsx
│   ├── TaskCard.tsx
│   ├── MilestoneMarker.tsx
│   ├── ProgressTracker.tsx
│   ├── TaskEditor.tsx
│   ├── TimelineExport.tsx
│   └── LoadingAnimation.tsx
├── hooks/
│   ├── useTimelineGeneration.ts
│   ├── useTaskManagement.ts
│   └── useDragAndDrop.ts
├── utils/
│   ├── timelineCalculations.ts
│   ├── taskDependencies.ts
│   └── dateHelpers.ts
├── types/
│   └── timeline.types.ts
└── data/
    └── mockTimeline.ts
```

### Timeline Types

**apps/timeline-generator/src/types/timeline.types.ts:**
```typescript
import { z } from 'zod'

export const TimelineFormSchema = z.object({
  weddingDate: z.date().min(new Date()),
  engagementDate: z.date().optional(),
  complexity: z.enum(['simple', 'medium', 'elaborate']),
  venueType: z.enum(['indoor', 'outdoor', 'destination', 'mixed']),
  helpLevel: z.number().min(1).max(10),
  specialRequirements: z.array(z.string()),
  guestCount: z.number().min(1).max(1000).optional(),
  budget: z.number().optional()
})

export type TimelineFormData = z.infer<typeof TimelineFormSchema>

export interface TimelineTask {
  id: string
  name: string
  description: string
  category: TaskCategory
  dueDate: Date
  estimatedDuration: number // hours
  priority: TaskPriority
  dependencies: string[] // task IDs
  completed: boolean
  assignedTo?: string
  notes?: string
  aiGenerated: boolean
  sortOrder: number
}

export interface TimelineMilestone {
  id: string
  name: string
  date: Date
  tasks: string[] // task IDs
  isCompleted: boolean
  color: string
}

export interface TimelineGeneration {
  id: string
  tasks: TimelineTask[]
  milestones: TimelineMilestone[]
  criticalPath: string[]
  recommendations: AIRecommendation[]
  seasonalFactors: SeasonalFactors
  confidenceScore: number
  createdAt: string
}

export type TaskCategory = 
  | 'venue' 
  | 'vendors' 
  | 'attire' 
  | 'legal' 
  | 'guests' 
  | 'decor' 
  | 'planning'

export type TaskPriority = 'low' | 'medium' | 'high' | 'critical'

export interface AIRecommendation {
  type: 'timing' | 'vendor' | 'stress_management' | 'cost_saving'
  message: string
  urgency: 'low' | 'medium' | 'high'
  actionable: boolean
  dueDate?: Date
}

export interface SeasonalFactors {
  peakSeason: boolean
  weatherConsiderations: string[]
  vendorAvailability: 'high' | 'medium' | 'limited'
  bookingDeadlines: Record<string, Date>
}
```

### Main App Component

**apps/timeline-generator/src/App.tsx:**
```typescript
import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { TimelineForm } from './components/TimelineForm'
import { TimelineDisplay } from './components/TimelineDisplay'
import { LoadingAnimation } from './components/LoadingAnimation'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import type { TimelineFormData, TimelineGeneration } from './types/timeline.types'
import { generateMockTimeline } from './data/mockTimeline'
import './index.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
})

type AppState = 'form' | 'loading' | 'timeline' | 'error'

function App() {
  const [appState, setAppState] = useState<AppState>('form')
  const [formData, setFormData] = useState<TimelineFormData | null>(null)
  const [timeline, setTimeline] = useState<TimelineGeneration | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFormSubmit = async (data: TimelineFormData) => {
    setFormData(data)
    setAppState('loading')
    
    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 4000))
      
      // Generate mock timeline
      const generatedTimeline = generateMockTimeline(data)
      
      setTimeline(generatedTimeline)
      setAppState('timeline')
    } catch (err) {
      setError('Failed to generate timeline. Please try again.')
      setAppState('error')
    }
  }

  const handleStartOver = () => {
    setAppState('form')
    setFormData(null)
    setTimeline(null)
    setError(null)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-wedding-cream via-wedding-sage/10 to-white">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8 pt-24">
          <AnimatePresence mode="wait">
            {appState === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TimelineForm onSubmit={handleFormSubmit} />
              </motion.div>
            )}

            {appState === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <LoadingAnimation formData={formData!} />
              </motion.div>
            )}

            {appState === 'timeline' && timeline && (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <TimelineDisplay 
                  timeline={timeline}
                  formData={formData!}
                  onStartOver={handleStartOver}
                />
              </motion.div>
            )}

            {appState === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold text-red-800 mb-2">
                    Something went wrong
                  </h2>
                  <p className="text-red-600 mb-4">{error}</p>
                  <button
                    onClick={handleStartOver}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Try Again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  )
}

export default App
```

### Timeline Form Component

**apps/timeline-generator/src/components/TimelineForm.tsx:**
```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Label, 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Checkbox
} from '@wilma/ui'
import { TimelineFormSchema, type TimelineFormData } from '../types/timeline.types'
import { Calendar, MapPin, Users, Settings, Heart } from 'lucide-react'
import { format, addMonths } from 'date-fns'

interface TimelineFormProps {
  onSubmit: (data: TimelineFormData) => void
}

export function TimelineForm({ onSubmit }: TimelineFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch
  } = useForm<TimelineFormData>({
    resolver: zodResolver(TimelineFormSchema),
    defaultValues: {
      complexity: 'medium',
      venueType: 'indoor',
      helpLevel: 5,
      specialRequirements: []
    }
  })

  const watchedHelpLevel = watch('helpLevel')
  const watchedWeddingDate = watch('weddingDate')

  const specialRequirementOptions = [
    'Religious ceremony',
    'Cultural traditions',
    'Destination wedding',
    'Weekend wedding',
    'Outdoor ceremony',
    'Live music/band',
    'Professional photography',
    'Videography',
    'Custom decorations'
  ]

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="font-wedding-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          AI-Powered Wedding Timeline Generator
        </h1>
        <p className="text-xl text-gray-600">
          Create a personalized wedding planning timeline with intelligent task scheduling
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Card className="wedding-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-wedding-serif text-center">
              Let's plan your perfect timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Wedding Date */}
              <div className="space-y-2">
                <Label htmlFor="weddingDate" className="flex items-center text-lg font-medium">
                  <Calendar className="w-5 h-5 mr-2 text-wedding-sage" />
                  When is your wedding date?
                </Label>
                <Input
                  id="weddingDate"
                  type="date"
                  min={format(new Date(), 'yyyy-MM-dd')}
                  className="wedding-input text-lg p-4"
                  {...register('weddingDate', { valueAsDate: true })}
                />
                {errors.weddingDate && (
                  <p className="text-red-500 text-sm">{errors.weddingDate.message}</p>
                )}
                {watchedWeddingDate && (
                  <p className="text-sm text-gray-600">
                    That's {Math.ceil((new Date(watchedWeddingDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24 * 30))} months away
                  </p>
                )}
              </div>

              {/* Engagement Date (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="engagementDate" className="flex items-center text-lg font-medium">
                  <Heart className="w-5 h-5 mr-2 text-wedding-sage" />
                  When did you get engaged? (Optional)
                </Label>
                <Input
                  id="engagementDate"
                  type="date"
                  className="wedding-input text-lg p-4"
                  {...register('engagementDate', { valueAsDate: true })}
                />
                <p className="text-sm text-gray-500">
                  This helps us create a more accurate timeline
                </p>
              </div>

              {/* Wedding Complexity */}
              <div className="space-y-2">
                <Label className="flex items-center text-lg font-medium">
                  <Settings className="w-5 h-5 mr-2 text-wedding-sage" />
                  How elaborate is your wedding?
                </Label>
                <Select onValueChange={(value) => setValue('complexity', value as any)}>
                  <SelectTrigger className="wedding-input text-lg p-4">
                    <SelectValue placeholder="Select complexity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">
                      <div>
                        <div className="font-medium">Simple & Intimate</div>
                        <div className="text-sm text-gray-500">Small gathering, minimal vendors</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div>
                        <div className="font-medium">Traditional Wedding</div>
                        <div className="text-sm text-gray-500">Standard ceremony & reception</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="elaborate">
                      <div>
                        <div className="font-medium">Elaborate Celebration</div>
                        <div className="text-sm text-gray-500">Large wedding, many vendors, custom details</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.complexity && (
                  <p className="text-red-500 text-sm">{errors.complexity.message}</p>
                )}
              </div>

              {/* Venue Type */}
              <div className="space-y-2">
                <Label className="flex items-center text-lg font-medium">
                  <MapPin className="w-5 h-5 mr-2 text-wedding-sage" />
                  What type of venue are you considering?
                </Label>
                <Select onValueChange={(value) => setValue('venueType', value as any)}>
                  <SelectTrigger className="wedding-input text-lg p-4">
                    <SelectValue placeholder="Select venue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor venue (ballroom, church, etc.)</SelectItem>
                    <SelectItem value="outdoor">Outdoor venue (garden, beach, etc.)</SelectItem>
                    <SelectItem value="destination">Destination wedding</SelectItem>
                    <SelectItem value="mixed">Mixed indoor/outdoor</SelectItem>
                  </SelectContent>
                </Select>
                {errors.venueType && (
                  <p className="text-red-500 text-sm">{errors.venueType.message}</p>
                )}
              </div>

              {/* Help Level */}
              <div className="space-y-2">
                <Label htmlFor="helpLevel" className="flex items-center text-lg font-medium">
                  <Users className="w-5 h-5 mr-2 text-wedding-sage" />
                  How much professional help do you plan to have?
                </Label>
                <div className="space-y-3">
                  <Input
                    id="helpLevel"
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    className="w-full"
                    {...register('helpLevel', { valueAsNumber: true })}
                  />
                  <div className="flex justify-between items-center">
                    <div className="text-center">