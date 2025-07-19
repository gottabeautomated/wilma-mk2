# Wilma Mk2 - Detailed Architecture Document

## Document Information
- **System**: Wilma Mk2 AI-Powered Wedding Planning Platform
- **Version**: 1.0
- **Date**: June 2025
- **Author**: Engineering Team
- **Status**: Technical Specification

---

## 1. Architecture Overview

### 1.1 System Architecture Philosophy

Wilma Mk2 follows a **modern microservices architecture** with **AI-first design principles**, built for **scalability, maintainability, and rapid feature development**. The system is designed as a **progressive web application** with **mobile-first responsive design** and **offline-capable functionality**.

**Core Architectural Principles:**
- **Separation of Concerns**: Clear boundaries between presentation, business logic, and data layers
- **Event-Driven Architecture**: Asynchronous processing for improved performance and scalability
- **API-First Design**: RESTful APIs with real-time capabilities for seamless frontend-backend communication
- **Security by Design**: Zero-trust security model with end-to-end encryption and GDPR compliance
- **Performance Optimization**: Edge computing, caching strategies, and optimized data loading patterns

### 1.2 High-Level Architecture Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   User Layer    │    │  Frontend App   │    │  Backend API    │
│                 │◄──►│                 │◄──►│                 │
│ Mobile/Desktop  │    │ React + TS      │    │ Supabase + AI   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                       │
                                ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  External APIs  │    │  Data Storage   │    │  Infrastructure │
│                 │    │                 │    │                 │
│ OpenAI, Stripe  │    │ PostgreSQL +    │    │ Vercel + CDN    │
│ Weather, etc.   │    │ File Storage    │    │ Monitoring      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

---

## 2. Frontend Architecture

### 2.1 Technology Stack

#### 2.1.1 Core Technologies
- **React 19**: Latest version with enhanced concurrent features and automatic batching
- **TypeScript 5.x**: Strict type checking with latest utility types and template literal improvements
- **Vite**: Ultra-fast build tool with Hot Module Replacement and optimized production builds
- **Progressive Web App**: Service Worker implementation for offline functionality and app-like experience

#### 2.1.2 State Management - Jotai
```typescript
// Atomic state architecture example
import { atom, useAtom } from 'jotai'

// Wedding planning atoms
export const weddingDateAtom = atom<Date | null>(null)
export const budgetAtom = atom<number>(0)
export const guestCountAtom = atom<number>(0)
export const venuePreferencesAtom = atom<VenuePreferences>({})

// Derived atoms for complex calculations
export const budgetPerGuestAtom = atom(
  (get) => {
    const budget = get(budgetAtom)
    const guests = get(guestCountAtom)
    return guests > 0 ? budget / guests : 0
  }
)

// Async atoms for API integration
export const venueRecommendationsAtom = atom(
  async (get) => {
    const preferences = get(venuePreferencesAtom)
    const budget = get(budgetAtom)
    const guests = get(guestCountAtom)
    
    return fetchVenueRecommendations({
      preferences,
      budget,
      guestCount: guests
    })
  }
)
```

**Why Jotai over Zustand:**
- **Fine-grained reactivity**: Only components using specific atoms re-render
- **Automatic optimization**: No manual optimization required for complex state dependencies
- **TypeScript integration**: Superior type inference and compile-time checking
- **Async-first design**: Built-in support for async state and suspense integration

#### 2.1.3 UI Component Library - shadcn/ui

```typescript
// Custom wedding-specific components built on shadcn/ui foundation
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export function BudgetCalculatorCard({ onBudgetCalculated }: Props) {
  return (
    <Card className="p-6 wedding-card">
      <CardHeader>
        <CardTitle className="wedding-title">AI Budget Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input 
            type="number" 
            placeholder="Guest count"
            className="wedding-input"
          />
          <Button 
            onClick={handleCalculate}
            className="wedding-button-primary"
          >
            Calculate Smart Budget
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

**Component Architecture:**
- **Base Components**: shadcn/ui foundation with wedding-specific theming
- **Composite Components**: Wedding-specific components combining multiple base components
- **Page Components**: Full-page layouts with integrated state management
- **Tool Components**: Specialized micro-app components for each wedding planning tool

### 2.2 Progressive Web App Implementation

#### 2.2.1 Service Worker Strategy
```typescript
// Service Worker for offline functionality
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// Cache API responses with stale-while-revalidate
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new StaleWhileRevalidate({
    cacheName: 'api-cache',
    plugins: [{
      cacheKeyWillBeUsed: async ({ request }) => {
        return `${request.url}?v=${Date.now()}`
      }
    }]
  })
)

// Cache wedding planning data with offline support
registerRoute(
  ({ url }) => url.pathname.includes('/wedding-data/'),
  new CacheFirst({
    cacheName: 'wedding-data-cache',
    plugins: [{
      cacheWillUpdate: async ({ response }) => {
        return response.status === 200 ? response : null
      }
    }]
  })
)
```

#### 2.2.2 Offline Functionality
- **Critical Path Caching**: Budget calculator and timeline tools work offline
- **Data Synchronization**: Automatic sync when connection restored
- **Offline Indicators**: Clear UI feedback for offline state
- **Background Sync**: Queue actions for execution when online

### 2.3 Performance Optimization

#### 2.3.1 Code Splitting and Lazy Loading
```typescript
import { lazy, Suspense } from 'react'

// Route-based code splitting
const BudgetCalculator = lazy(() => import('./tools/BudgetCalculator'))
const TimelineGenerator = lazy(() => import('./tools/TimelineGenerator'))
const GuestManager = lazy(() => import('./tools/GuestManager'))

export function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/budget" element={
          <Suspense fallback={<ToolLoadingSkeleton />}>
            <BudgetCalculator />
          </Suspense>
        } />
        {/* Additional routes */}
      </Routes>
    </Router>
  )
}
```

#### 2.3.2 Image Optimization and Loading
```typescript
// Optimized image component with lazy loading
import { useState, useRef, useEffect } from 'react'

export function OptimizedImage({ 
  src, 
  alt, 
  className,
  priority = false 
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (priority) {
      // Preload critical images
      const img = new Image()
      img.src = src
      img.onload = () => setLoaded(true)
    }
  }, [src, priority])

  return (
    <div className={`image-container ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  )
}
```

---

## 3. Backend Architecture

### 3.1 Supabase Backend Implementation

#### 3.1.1 Database Schema Design
```sql
-- Core wedding planning tables
CREATE TABLE weddings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  wedding_date DATE,
  venue_name TEXT,
  budget DECIMAL(10,2),
  guest_count INTEGER,
  style_preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Guest management
CREATE TABLE guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  rsvp_status TEXT CHECK (rsvp_status IN ('pending', 'confirmed', 'declined')),
  dietary_restrictions TEXT[],
  plus_one BOOLEAN DEFAULT FALSE,
  relationship TEXT,
  table_assignment INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor management
CREATE TABLE vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  location POINT,
  price_range TEXT,
  rating DECIMAL(3,2),
  portfolio_images TEXT[],
  contact_info JSONB,
  availability_calendar JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Budget tracking
CREATE TABLE budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  item_name TEXT NOT NULL,
  estimated_cost DECIMAL(10,2),
  actual_cost DECIMAL(10,2),
  vendor_id UUID REFERENCES vendors(id),
  paid BOOLEAN DEFAULT FALSE,
  due_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline and tasks
CREATE TABLE timeline_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID NOT NULL REFERENCES weddings(id) ON DELETE CASCADE,
  task_name TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'critical')),
  assigned_to UUID REFERENCES auth.users(id),
  dependencies UUID[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### 3.1.2 Row Level Security (RLS) Policies
```sql
-- Wedding data access control
CREATE POLICY "Users can only access their own weddings"
ON weddings FOR ALL
USING (user_id = auth.uid());

-- Guest access with collaboration
CREATE POLICY "Wedding participants can view guests"
ON guests FOR SELECT
USING (
  wedding_id IN (
    SELECT id FROM weddings 
    WHERE user_id = auth.uid() 
    OR id IN (
      SELECT wedding_id FROM wedding_collaborators 
      WHERE user_id = auth.uid()
    )
  )
);

-- Vendor data is publicly readable but not modifiable
CREATE POLICY "Public vendor read access"
ON vendors FOR SELECT
USING (true);

CREATE POLICY "Only admin vendor modifications"
ON vendors FOR ALL
USING (auth.jwt() ->> 'role' = 'admin');
```

#### 3.1.3 Real-time Subscriptions
```typescript
// Real-time guest RSVP updates
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(supabaseUrl, supabaseKey)

export function useGuestRSVPUpdates(weddingId: string) {
  const [guests, setGuests] = useState<Guest[]>([])

  useEffect(() => {
    // Subscribe to real-time changes
    const subscription = supabase
      .channel(`wedding-${weddingId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'guests',
          filter: `wedding_id=eq.${weddingId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setGuests(prev => [...prev, payload.new as Guest])
          } else if (payload.eventType === 'UPDATE') {
            setGuests(prev => 
              prev.map(guest => 
                guest.id === payload.new.id ? payload.new as Guest : guest
              )
            )
          } else if (payload.eventType === 'DELETE') {
            setGuests(prev => 
              prev.filter(guest => guest.id !== payload.old.id)
            )
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [weddingId])

  return guests
}
```

### 3.2 Edge Functions for AI Integration

#### 3.2.1 Budget Recommendation Engine
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
  try {
    const { weddingData } = await req.json()
    
    // Fetch regional pricing data
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    const { data: regionalData } = await supabase
      .from('regional_pricing')
      .select('*')
      .eq('location', weddingData.location)
    
    // AI budget optimization
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [{
          role: 'system',
          content: `You are a wedding budget optimization expert. Analyze the provided wedding data and regional pricing to suggest an optimal budget allocation.`
        }, {
          role: 'user',
          content: `Wedding details: ${JSON.stringify(weddingData)}
                   Regional pricing: ${JSON.stringify(regionalData)}
                   
                   Provide a detailed budget breakdown with optimization suggestions.`
        }],
        temperature: 0.3
      })
    })
    
    const aiRecommendation = await openaiResponse.json()
    
    return new Response(
      JSON.stringify({
        success: true,
        budgetRecommendation: aiRecommendation.choices[0].message.content,
        regionalData
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

#### 3.2.2 Venue Analysis with Computer Vision
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

serve(async (req) => {
  try {
    const { imageUrl, weddingPreferences } = await req.json()
    
    // Computer vision analysis
    const visionResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [{
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Analyze this wedding venue image for:
                     1. Capacity estimate (guest count)
                     2. Style classification (modern, rustic, classic, etc.)
                     3. Indoor/outdoor assessment
                     4. Accessibility features
                     5. Decoration potential
                     6. Weather dependency
                     
                     Wedding preferences: ${JSON.stringify(weddingPreferences)}
                     
                     Provide detailed analysis and compatibility score (1-10).`
            },
            {
              type: 'image_url',
              image_url: {
                url: imageUrl,
                detail: 'high'
              }
            }
          ]
        }],
        max_tokens: 1000
      })
    })
    
    const analysis = await visionResponse.json()
    
    // Parse AI response and structure data
    const venueAnalysis = {
      capacityEstimate: extractCapacity(analysis.choices[0].message.content),
      styleClassification: extractStyle(analysis.choices[0].message.content),
      compatibilityScore: extractScore(analysis.choices[0].message.content),
      detailedAnalysis: analysis.choices[0].message.content,
      timestamp: new Date().toISOString()
    }
    
    return new Response(
      JSON.stringify({ success: true, venueAnalysis }),
      { headers: { 'Content-Type': 'application/json' } }
    )
    
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

---

## 4. AI Integration Architecture

### 4.1 OpenAI Integration Strategy

#### 4.1.1 API Key Management
```typescript
// Hierarchical API key strategy
export class OpenAIManager {
  private platformKey: string
  private userKeys: Map<string, string> = new Map()
  
  constructor() {
    this.platformKey = process.env.OPENAI_PLATFORM_KEY!
  }
  
  async makeRequest(
    userId: string, 
    request: OpenAIRequest,
    tier: 'basic' | 'premium' = 'basic'
  ) {
    const apiKey = tier === 'premium' 
      ? this.userKeys.get(userId) || this.platformKey
      : this.platformKey
    
    // Rate limiting based on tier
    const rateLimit = tier === 'premium' ? 100 : 10 // requests per hour
    
    if (!this.checkRateLimit(userId, rateLimit)) {
      throw new Error('Rate limit exceeded')
    }
    
    return await this.executeRequest(request, apiKey)
  }
  
  private async executeRequest(request: OpenAIRequest, apiKey: string) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request)
    })
    
    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }
    
    return response.json()
  }
}
```

#### 4.1.2 Prompt Engineering Framework
```typescript
// Structured prompt templates for consistent AI responses
export class WeddingPromptTemplates {
  static budgetOptimization(weddingData: WeddingData, regionalData: RegionalData) {
    return {
      system: `You are an expert wedding budget planner with 20+ years of experience. 
               You provide practical, realistic budget recommendations based on:
               - Regional pricing variations
               - Seasonal factors
               - Guest count optimization
               - Value-focused vendor selection
               
               Always provide:
               1. Detailed category breakdown
               2. Cost-saving opportunities
               3. Priority recommendations
               4. Realistic timeline for bookings`,
      
      user: `Wedding Details:
             - Date: ${weddingData.date}
             - Location: ${weddingData.location}
             - Guest Count: ${weddingData.guestCount}
             - Style: ${weddingData.style}
             - Budget Range: ${weddingData.budgetRange}
             
             Regional Pricing Data:
             ${JSON.stringify(regionalData, null, 2)}
             
             Provide an optimized budget allocation with specific recommendations.`
    }
  }
  
  static timelineGeneration(weddingData: WeddingData) {
    return {
      system: `You are a professional wedding planner creating optimal timelines.
               Consider:
               - Vendor booking deadlines
               - Seasonal variations
               - Budget allocation timing
               - Guest coordination needs
               - Stress management for couples
               
               Provide milestone-based timeline with:
               1. Critical path identification
               2. Buffer time for delays
               3. Seasonal considerations
               4. Vendor coordination points`,
      
      user: `Create a detailed wedding planning timeline for:
             ${JSON.stringify(weddingData, null, 2)}`
    }
  }
  
  static venueRecommendations(preferences: VenuePreferences, budget: number) {
    return {
      system: `You are a venue specialist with comprehensive knowledge of wedding venues.
               Analyze preferences and budget to provide tailored recommendations.
               
               Consider:
               - Style compatibility
               - Budget alignment
               - Guest count capacity
               - Seasonal availability
               - Location accessibility`,
      
      user: `Venue Preferences: ${JSON.stringify(preferences)}
             Budget: $${budget}
             
             Recommend 5 venue types with specific features to look for.`
    }
  }
}
```

### 4.2 AI Response Processing

#### 4.2.1 Structured Data Extraction
```typescript
// AI response parsing with validation
export class AIResponseProcessor {
  static parseBudgetRecommendation(aiResponse: string): BudgetRecommendation {
    try {
      // Extract structured data from AI response
      const budgetMatches = aiResponse.match(/\$[\d,]+/g) || []
      const categories = this.extractCategories(aiResponse)
      const recommendations = this.extractRecommendations(aiResponse)
      
      return {
        totalBudget: this.parseAmount(budgetMatches[0]),
        categoryBreakdown: categories,
        recommendations,
        confidenceScore: this.calculateConfidenceScore(aiResponse),
        generatedAt: new Date().toISOString()
      }
    } catch (error) {
      throw new Error(`Failed to parse AI budget recommendation: ${error.message}`)
    }
  }
  
  static parseTimelineItems(aiResponse: string): TimelineItem[] {
    const timelinePattern = /(\d+)\s+(weeks?|months?)\s+before[:\s]+(.+?)(?=\n|$)/gi
    const matches = [...aiResponse.matchAll(timelinePattern)]
    
    return matches.map(match => ({
      id: generateId(),
      timeframe: match[1] + ' ' + match[2],
      task: match[3].trim(),
      priority: this.extractPriority(match[3]),
      category: this.categorizeTask(match[3]),
      estimatedDuration: this.estimateDuration(match[3])
    }))
  }
  
  static parseVenueAnalysis(aiResponse: string): VenueAnalysis {
    return {
      capacityEstimate: this.extractCapacity(aiResponse),
      styleClassification: this.extractStyle(aiResponse),
      features: this.extractFeatures(aiResponse),
      pros: this.extractPros(aiResponse),
      cons: this.extractCons(aiResponse),
      compatibilityScore: this.extractScore(aiResponse),
      recommendations: this.extractVenueRecommendations(aiResponse)
    }
  }
}
```

---

## 5. Data Architecture & Storage

### 5.1 Database Design Principles

#### 5.1.1 Normalization Strategy
```sql
-- Optimized for read performance with selective denormalization
-- Normalized core entities
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Denormalized for performance-critical queries
CREATE TABLE wedding_dashboard_view AS
SELECT 
  w.id,
  w.wedding_date,
  w.budget,
  w.guest_count,
  COUNT(g.id) as confirmed_guests,
  COUNT(b.id) as budget_items_count,
  SUM(b.actual_cost) as spent_amount,
  COUNT(t.id) FILTER (WHERE t.completed = false) as pending_tasks
FROM weddings w
LEFT JOIN guests g ON w.id = g.wedding_id AND g.rsvp_status = 'confirmed'
LEFT JOIN budget_items b ON w.id = b.wedding_id
LEFT JOIN timeline_items t ON w.id = t.wedding_id
GROUP BY w.id, w.wedding_date, w.budget, w.guest_count;

-- Materialized view refresh strategy
CREATE OR REPLACE FUNCTION refresh_wedding_dashboard()
RETURNS TRIGGER AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY wedding_dashboard_view;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;
```

#### 5.1.2 Performance Optimization
```sql
-- Strategic indexing for common query patterns
CREATE INDEX CONCURRENTLY idx_weddings_user_date 
ON weddings(user_id, wedding_date);

CREATE INDEX CONCURRENTLY idx_guests_wedding_rsvp 
ON guests(wedding_id, rsvp_status);

CREATE INDEX CONCURRENTLY idx_vendors_location_category 
ON vendors USING GIST(location, category);

CREATE INDEX CONCURRENTLY idx_timeline_due_date 
ON timeline_items(wedding_id, due_date) 
WHERE completed = false;

-- Partial indexes for frequently filtered data
CREATE INDEX CONCURRENTLY idx_budget_items_unpaid 
ON budget_items(wedding_id, due_date) 
WHERE paid = false;
```

### 5.2 Caching Strategy

#### 5.2.1 Multi-Layer Caching
```typescript
// Redis caching implementation
import Redis from 'ioredis'

export class WeddingCacheManager {
  private redis: Redis
  
  constructor() {
    this.redis = new Redis(process.env.REDIS_URL!)
  }
  
  // User session caching
  async cacheUserSession(userId: string, sessionData: UserSession) {
    await this.redis.setex(
      `session:${userId}`, 
      3600, // 1 hour
      JSON.stringify(sessionData)
    )
  }
  
  // Vendor data caching with geo-based keys
  async cacheVendorResults(location: string, category: string, vendors: Vendor[]) {
    const key = `vendors:${location}:${category}`
    await this.redis.setex(
      key,
      7200, // 2 hours
      JSON.stringify(vendors)
    )
  }
  
  // AI response caching to reduce API costs
  async cacheAIResponse(promptHash: string, response: any) {
    const key = `ai:${promptHash}`
    await this.redis.setex(
      key,
      86400, // 24 hours
      JSON.stringify(response)
    )
  }
  
  // Wedding planning data with invalidation strategy
  async cacheWeddingData(weddingId: string, data: WeddingData) {
    const key = `wedding:${weddingId}`
    await this.redis.setex(key, 1800, JSON.stringify(data)) // 30 minutes
    
    // Set up invalidation tags
    await this.redis.sadd(`wedding_tags:${weddingId}`, key)
  }
  
  async invalidateWeddingCache(weddingId: string) {
    const tags = await this.redis.smembers(`wedding_tags:${weddingId}`)
    if (tags.length > 0) {
      await this.redis.del(...tags)
      await this.redis.del(`wedding_tags:${weddingId}`)
    }
  }
}
```

#### 5.2.2 Client-Side Caching
```typescript
// React Query implementation for client-side caching
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useWeddingData(weddingId: string) {
  return useQuery({
    queryKey: ['wedding', weddingId],
    queryFn: () => fetchWeddingData(weddingId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      if (error.status === 404) return false
      return failureCount < 3
    }
  })
}

export function useUpdateWedding() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: updateWeddingData,
    onSuccess: (data, variables) => {
      // Optimistic updates
      queryClient.setQueryData(['wedding', variables.id], data)
      
      // Invalidate related queries
      queryClient.invalidateQueries(['wedding-dashboard'])
      queryClient.invalidateQueries(['budget-summary'])
    },
    onError: (error, variables) => {
      // Rollback optimistic updates
      queryClient.invalidateQueries(['wedding', variables.id])
    }
  })
}
```

---

## 6. Security Architecture

### 6.1 Authentication & Authorization

#### 6.1.1 Multi-Factor Authentication
```typescript
// Enhanced authentication with MFA support
export class AuthenticationService {
  async signInWithMFA(email: string, password: string, mfaToken?: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error?.message === 'MFA_CHALLENGE_REQUIRED') {
      // Prompt for MFA token
      return { requiresMFA: true, challengeId: error.challengeId }
    }
    
    if (mfaToken && error?.challengeId) {
      // Verify MFA token
      const { data: mfaData, error: mfaError } = await supabase.auth.verifyOtp({
        token: mfaToken,
        type: 'totp'
      })
      
      if (mfaError) {
        throw new Error('Invalid MFA token')
      }
      
      return { success: true, user: mfaData.user }
    }
    
    if (error) {
      throw new Error(error.message)
    }
    
    return { success: true, user: data.user }
  }
  
  async enableMFA(userId: string) {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Wilma Wedding Planner'
    })
    
    if (error) {
      throw new Error('Failed to enable MFA')
    }
    
    return {
      qrCode: data.totp.qr_code,
      secret: data.totp.secret,
      uri: data.totp.uri
    }
  }
}
```

#### 6.1.2 Role-Based Access Control (RBAC)
```sql
-- User roles and permissions
CREATE TYPE user_role AS ENUM ('couple', 'planner', 'vendor', 'admin');

CREATE TABLE user_roles (
  user_id UUID REFERENCES auth.users(id),
  role user_role NOT NULL,
  wedding_id UUID REFERENCES weddings(id),
  permissions JSONB DEFAULT '{}',
  granted_by UUID REFERENCES auth.users(id),
  granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, role, wedding_id)
);

-- Permission checking function
CREATE OR REPLACE FUNCTION check_wedding_permission(
  p_user_id UUID,
  p_wedding_id UUID,
  p_permission TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  user_permissions JSONB;
BEGIN
  -- Check if user is the wedding owner
  IF EXISTS (SELECT 1 FROM weddings WHERE id = p_wedding_id AND user_id = p_user_id) THEN
    RETURN TRUE;
  END IF;
  
  -- Check role-based permissions
  SELECT permissions INTO user_permissions
  FROM user_roles
  WHERE user_id = p_user_id AND wedding_id = p_wedding_id;
  
  IF user_permissions IS NULL THEN
    RETURN FALSE;
  END IF;
  
  RETURN (user_permissions->p_permission)::BOOLEAN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 6.2 Data Encryption & Privacy

#### 6.2.1 Field-Level Encryption
```typescript
// Sensitive data encryption
import crypto from 'crypto'

export class DataEncryption {
  private static readonly algorithm = 'aes-256-gcm'
  private static readonly keyDerivationSalt = process.env.ENCRYPTION_SALT!
  
  static encrypt(data: string, userKey: string): EncryptedData {
    const key = crypto.pbkdf2Sync(userKey, this.keyDerivationSalt, 100000, 32, 'sha256')
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipher(this.algorithm, key)
    
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    const authTag = cipher.getAuthTag()
    
    return {
      encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex')
    }
  }
  
  static decrypt(encryptedData: EncryptedData, userKey: string): string {
    const key = crypto.pbkdf2Sync(userKey, this.keyDerivationSalt, 100000, 32, 'sha256')
    const decipher = crypto.createDecipher(this.algorithm, key)
    
    decipher.setAuthTag(Buffer.from(encryptedData.authTag, 'hex'))
    
    let decrypted = decipher.update(encryptedData.encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    
    return decrypted
  }
}

// Database integration with automatic encryption
export class SecureWeddingData {
  async saveGuestData(weddingId: string, guestData: GuestData, userKey: string) {
    const encryptedPhone = DataEncryption.encrypt(guestData.phone, userKey)
    const encryptedEmail = DataEncryption.encrypt(guestData.email, userKey)
    
    return await supabase
      .from('guests')
      .insert({
        wedding_id: weddingId,
        name: guestData.name, // Not encrypted - needed for search
        encrypted_phone: encryptedPhone,
        encrypted_email: encryptedEmail,
        rsvp_status: guestData.rsvpStatus
      })
  }
}
```

#### 6.2.2 GDPR Compliance Implementation
```typescript
// GDPR compliance utilities
export class GDPRCompliance {
  // Right to access
  async exportUserData(userId: string): Promise<UserDataExport> {
    const [weddings, guests, budgetItems, timeline] = await Promise.all([
      this.getUserWeddings(userId),
      this.getUserGuests(userId),
      this.getUserBudgetItems(userId),
      this.getUserTimeline(userId)
    ])
    
    return {
      personal_data: {
        user_id: userId,
        exported_at: new Date().toISOString(),
        data_retention_period: '7 years'
      },
      wedding_data: weddings,
      guest_data: guests,
      budget_data: budgetItems,
      timeline_data: timeline
    }
  }
  
  // Right to be forgotten
  async deleteUserData(userId: string): Promise<DeletionReport> {
    const deletionLog: DeletionReport = {
      user_id: userId,
      deletion_started: new Date().toISOString(),
      deleted_tables: [],
      preserved_data: []
    }
    
    // Anonymize instead of delete for legal/financial records
    await this.anonymizeFinancialRecords(userId)
    deletionLog.preserved_data.push('anonymized_financial_records')
    
    // Complete deletion of personal data
    const tables = ['weddings', 'guests', 'budget_items', 'timeline_items']
    for (const table of tables) {
      await supabase
        .from(table)
        .delete()
        .eq('user_id', userId)
      deletionLog.deleted_tables.push(table)
    }
    
    deletionLog.deletion_completed = new Date().toISOString()
    return deletionLog
  }
  
  // Consent management
  async updateConsent(userId: string, consentData: ConsentData) {
    return await supabase
      .from('user_consent')
      .upsert({
        user_id: userId,
        analytics_consent: consentData.analytics,
        marketing_consent: consentData.marketing,
        ai_processing_consent: consentData.aiProcessing,
        data_sharing_consent: consentData.dataSharing,
        consent_timestamp: new Date().toISOString()
      })
  }
}
```

---

## 7. Scalability & Performance

### 7.1 Horizontal Scaling Strategy

#### 7.1.1 Microservices Architecture
```typescript
// Service separation for independent scaling
export class ServiceRegistry {
  private services: Map<string, ServiceInstance> = new Map()
  
  async registerService(name: string, instance: ServiceInstance) {
    this.services.set(name, {
      ...instance,
      registeredAt: new Date(),
      healthCheck: this.createHealthCheck(instance.url)
    })
  }
  
  async getService(name: string): Promise<ServiceInstance | null> {
    const service = this.services.get(name)
    if (!service) return null
    
    // Health check before returning service
    const isHealthy = await service.healthCheck()
    if (!isHealthy) {
      this.services.delete(name)
      return null
    }
    
    return service
  }
  
  // Load balancing for high-traffic services
  async getBalancedService(serviceName: string): Promise<ServiceInstance> {
    const instances = Array.from(this.services.values())
      .filter(s => s.name === serviceName && s.status === 'healthy')
    
    if (instances.length === 0) {
      throw new Error(`No healthy instances of ${serviceName} available`)
    }
    
    // Round-robin load balancing
    const selectedInstance = instances[Math.floor(Math.random() * instances.length)]
    return selectedInstance
  }
}

// Individual service implementations
export class BudgetCalculationService {
  private rateLimiter: RateLimiter
  
  constructor() {
    this.rateLimiter = new RateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })
  }
  
  async calculateBudget(req: BudgetRequest): Promise<BudgetResponse> {
    // Rate limiting
    await this.rateLimiter.consume(req.userId)
    
    // Input validation
    const validatedInput = await this.validateBudgetInput(req)
    
    // AI-powered calculation
    const aiRecommendation = await this.getAIRecommendation(validatedInput)
    
    // Regional pricing adjustment
    const regionalAdjustment = await this.getRegionalPricing(validatedInput.location)
    
    return {
      recommendation: aiRecommendation,
      regionalFactors: regionalAdjustment,
      calculatedAt: new Date().toISOString(),
      confidence: this.calculateConfidence(validatedInput, aiRecommendation)
    }
  }
}
```

#### 7.1.2 Database Scaling Strategy
```sql
-- Read replica configuration
-- Primary database for writes
CREATE DATABASE wilma_primary;

-- Read replicas for improved read performance
CREATE DATABASE wilma_read_replica_1;
CREATE DATABASE wilma_read_replica_2;

-- Partitioning strategy for large tables
CREATE TABLE weddings_partitioned (
  id UUID NOT NULL,
  user_id UUID NOT NULL,
  wedding_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  -- other columns
  PRIMARY KEY (id, created_at)
) PARTITION BY RANGE (created_at);

-- Partition by year for better query performance
CREATE TABLE weddings_2024 PARTITION OF weddings_partitioned
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

CREATE TABLE weddings_2025 PARTITION OF weddings_partitioned
FOR VALUES FROM ('2025-01-01') TO ('2026-01-01');

-- Automatic partition creation
CREATE OR REPLACE FUNCTION create_yearly_partition()
RETURNS TRIGGER AS $$
DECLARE
  year_start DATE;
  year_end DATE;
  partition_name TEXT;
BEGIN
  year_start := DATE_TRUNC('year', NEW.created_at);
  year_end := year_start + INTERVAL '1 year';
  partition_name := 'weddings_' || EXTRACT(YEAR FROM year_start);
  
  -- Create partition if it doesn't exist
  EXECUTE format('CREATE TABLE IF NOT EXISTS %I PARTITION OF weddings_partitioned
                  FOR VALUES FROM (%L) TO (%L)',
                  partition_name, year_start, year_end);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### 7.2 Performance Monitoring

#### 7.2.1 Application Performance Monitoring (APM)
```typescript
// Custom performance monitoring
export class PerformanceMonitor {
  private metrics: Map<string, MetricData> = new Map()
  
  startTimer(operation: string): PerformanceTimer {
    const startTime = performance.now()
    
    return {
      end: () => {
        const duration = performance.now() - startTime
        this.recordMetric(operation, duration)
        return duration
      }
    }
  }
  
  recordMetric(name: string, value: number, tags?: Record<string, string>) {
    const metric = this.metrics.get(name) || {
      name,
      values: [],
      min: Infinity,
      max: -Infinity,
      sum: 0,
      count: 0
    }
    
    metric.values.push(value)
    metric.min = Math.min(metric.min, value)
    metric.max = Math.max(metric.max, value)
    metric.sum += value
    metric.count++
    
    this.metrics.set(name, metric)
    
    // Send to external monitoring service
    this.sendToMonitoring(name, value, tags)
  }
  
  async sendToMonitoring(name: string, value: number, tags?: Record<string, string>) {
    // Integration with monitoring services (DataDog, New Relic, etc.)
    try {
      await fetch(process.env.MONITORING_ENDPOINT!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          metric: name,
          value,
          timestamp: Date.now(),
          tags
        })
      })
    } catch (error) {
      console.error('Failed to send metric:', error)
    }
  }
  
  getMetricSummary(name: string): MetricSummary {
    const metric = this.metrics.get(name)
    if (!metric) return null
    
    return {
      average: metric.sum / metric.count,
      min: metric.min,
      max: metric.max,
      count: metric.count,
      p95: this.calculatePercentile(metric.values, 0.95),
      p99: this.calculatePercentile(metric.values, 0.99)
    }
  }
}

// Usage in API endpoints
export async function handleBudgetCalculation(req: Request) {
  const timer = performanceMonitor.startTimer('budget_calculation')
  
  try {
    const result = await calculateWeddingBudget(req.body)
    
    performanceMonitor.recordMetric('budget_calculation_success', 1, {
      user_tier: req.user.tier,
      location: req.body.location
    })
    
    return { success: true, data: result }
  } catch (error) {
    performanceMonitor.recordMetric('budget_calculation_error', 1, {
      error_type: error.constructor.name
    })
    throw error
  } finally {
    timer.end()
  }
}
```

---

## 8. Deployment & Infrastructure

### 8.1 Cloud Infrastructure

#### 8.1.1 Vercel Deployment Configuration
```typescript
// vercel.json configuration
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
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x",
      "maxDuration": 30
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "s-maxage=86400"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/api/:path*"
    }
  ]
}
```

#### 8.1.2 CDN and Edge Configuration
```typescript
// Edge function for regional optimization
export default async function handler(req: Request) {
  const country = req.geo?.country || 'US'
  const region = req.geo?.region || 'default'
  
  // Regional pricing and vendor data
  const regionalConfig = await getRegionalConfig(country, region)
  
  // Cached response with regional optimization
  return new Response(JSON.stringify({
    config: regionalConfig,
    currency: getCurrencyForCountry(country),
    language: getLanguageForRegion(region),
    vendors: await getCachedVendors(region),
    pricing: await getCachedPricing(region)
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=3600',
      'Vary': 'Accept-Encoding'
    }
  })
}

// Service Worker for offline functionality
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('wilma-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/budget-calculator',
        '/timeline-generator',
        '/guest-manager',
        '/static/js/bundle.js',
        '/static/css/main.css',
        '/manifest.json'
      ])
    })
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request)
    })
  )
})
```

### 8.2 CI/CD Pipeline

#### 8.2.1 GitHub Actions Workflow
```yaml
name: Deploy Wilma Mk2

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:unit
      
      - name: Run integration tests
        run: npm run test:integration
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
      
      - name: Build application
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          PLAYWRIGHT_BROWSERS_PATH: 0

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Run security audit
        run: npm audit --audit-level high
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}

  deploy-staging:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/staging'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.VERCEL_ORG_ID }}
      
      - name: Run smoke tests
        run: npm run test:smoke
        env:
          BASE_URL: https://wilma-mk2.vercel.app
```

#### 8.2.2 Database Migration Strategy
```typescript
// Automated database migrations
export class MigrationManager {
  private supabase: SupabaseClient
  
  async runMigrations() {
    const pendingMigrations = await this.getPendingMigrations()
    
    for (const migration of pendingMigrations) {
      try {
        console.log(`Running migration: ${migration.name}`)
        await this.executeMigration(migration)
        await this.recordMigration(migration)
        console.log(`Completed migration: ${migration.name}`)
      } catch (error) {
        console.error(`Failed migration: ${migration.name}`, error)
        throw new Error(`Migration failed: ${migration.name}`)
      }
    }
  }
  
  private async executeMigration(migration: Migration) {
    // Execute in transaction for atomicity
    const { error } = await this.supabase.rpc('execute_migration', {
      migration_sql: migration.sql,
      migration_name: migration.name
    })
    
    if (error) {
      throw new Error(`SQL Error: ${error.message}`)
    }
  }
  
  async rollbackMigration(migrationName: string) {
    const migration = await this.getMigration(migrationName)
    if (!migration.rollback_sql) {
      throw new Error('No rollback SQL available for this migration')
    }
    
    await this.supabase.rpc('execute_migration', {
      migration_sql: migration.rollback_sql,
      migration_name: `rollback_${migrationName}`
    })
  }
}
```

---

## 9. Monitoring & Analytics

### 9.1 Application Monitoring

#### 9.1.1 Real-time Error Tracking
```typescript
// Error boundary with monitoring integration
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true }
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to monitoring service
    this.logErrorToService(error, errorInfo)
    
    // Track user impact
    analytics.track('Application Error', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      user_id: this.props.userId,
      timestamp: new Date().toISOString()
    })
  }
  
  private async logErrorToService(error: Error, errorInfo: ErrorInfo) {
    try {
      await fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          url: window.location.href,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString()
        })
      })
    } catch (logError) {
      console.error('Failed to log error to service:', logError)
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong</h2>
          <p>We've been notified and are working on a fix.</p>
          <Button onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

#### 9.1.2 Performance Analytics
```typescript
// Custom analytics for wedding planning metrics
export class WeddingAnalytics {
  private analytics: Analytics
  
  // Tool usage tracking
  trackToolUsage(toolName: string, userId: string, sessionData: any) {
    this.analytics.track('Tool Used', {
      tool_name: toolName,
      user_id: userId,
      session_duration: sessionData.duration,
      completion_rate: sessionData.completionRate,
      features_used: sessionData.featuresUsed,
      timestamp: new Date().toISOString()
    })
  }
  
  // Conversion funnel tracking
  trackConversionStep(step: string, userId: string, metadata?: any) {
    this.analytics.track('Conversion Step', {
      step,
      user_id: userId,
      metadata,
      timestamp: new Date().toISOString()
    })
  }
  
  // AI interaction tracking
  trackAIInteraction(interaction: AIInteraction) {
    this.analytics.track('AI Interaction', {
      interaction_type: interaction.type,
      user_id: interaction.userId,
      prompt_category: interaction.category,
      response_time: interaction.responseTime,
      user_satisfaction: interaction.satisfaction,
      timestamp: new Date().toISOString()
    })
  }
  
  // Wedding planning progress tracking
  trackPlanningProgress(userId: string, weddingId: string, progress: PlanningProgress) {
    this.analytics.track('Planning Progress', {
      user_id: userId,
      wedding_id: weddingId,
      completion_percentage: progress.completionPercentage,
      active_tools: progress.activeTools,
      milestone_reached: progress.milestoneReached,
      stress_level: progress.stressLevel,
      timestamp: new Date().toISOString()
    })
  }
}
```

---

## 10. Testing Strategy

### 10.1 Testing Architecture

#### 10.1.1 Unit Testing with Jest and React Testing Library
```typescript
// Component testing example
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BudgetCalculator from '../BudgetCalculator'

describe('BudgetCalculator', () => {
  let queryClient: QueryClient
  
  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false }
      }
    })
  })
  
  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    )
  }
  
  test('calculates budget correctly with valid inputs', async () => {
    const mockCalculation = {
      totalBudget: 25000,
      categoryBreakdown: {
        venue: 10000,
        catering: 8000,
        photography: 3000,
        flowers: 2000,
        other: 2000
      }
    }
    
    // Mock API response
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockCalculation
    })
    
    renderWithProviders(<BudgetCalculator />)
    
    // Fill in form inputs
    fireEvent.change(screen.getByLabelText(/guest count/i), {
      target: { value: '100' }
    })
    fireEvent.change(screen.getByLabelText(/location/i), {
      target: { value: 'New York, NY' }
    })
    fireEvent.change(screen.getByLabelText(/budget range/i), {
      target: { value: '25000' }
    })
    
    // Submit form
    fireEvent.click(screen.getByRole('button', { name: /calculate budget/i }))
    
    // Wait for results
    await waitFor(() => {
      expect(screen.getByText('$25,000')).toBeInTheDocument()
      expect(screen.getByText('Venue: $10,000')).toBeInTheDocument()
    })
    
    // Verify API call
    expect(fetch).toHaveBeenCalledWith('/api/budget/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        guestCount: 100,
        location: 'New York, NY',
        budgetRange: 25000
      })
    })
  })
  
  test('handles API errors gracefully', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API Error'))
    
    renderWithProviders(<BudgetCalculator />)
    
    fireEvent.change(screen.getByLabelText(/guest count/i), {
      target: { value: '100' }
    })
    fireEvent.click(screen.getByRole('button', { name: /calculate budget/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    })
  })
})
```

#### 10.1.2 Integration Testing
```typescript
// API integration testing
import { createClient } from '@supabase/supabase-js'
import { BudgetCalculationService } from '../services/BudgetCalculationService'

describe('BudgetCalculationService Integration', () => {
  let service: BudgetCalculationService
  let supabase: SupabaseClient
  
  beforeAll(async () => {
    supabase = createClient(
      process.env.SUPABASE_TEST_URL!,
      process.env.SUPABASE_TEST_KEY!
    )
    service = new BudgetCalculationService(supabase)
  })
  
  afterEach(async () => {
    // Clean up test data
    await supabase.from('test_weddings').delete().neq('id', '')
  })
  
  test('creates wedding budget with AI recommendations', async () => {
    const weddingData = {
      userId: 'test-user-id',
      guestCount: 150,
      location: 'Los Angeles, CA',
      weddingDate: '2025-09-15',
      style: 'modern',
      budgetRange: 40000
    }
    
    const result = await service.calculateWeddingBudget(weddingData)
    
    expect(result).toMatchObject({
      totalBudget: expect.any(Number),
      categoryBreakdown: expect.objectContaining({
        venue: expect.any(Number),
        catering: expect.any(Number),
        photography: expect.any(Number)
      }),
      aiRecommendations: expect.arrayContaining([
        expect.objectContaining({
          category: expect.any(String),
          suggestion: expect.any(String),
          potentialSavings: expect.any(Number)
        })
      ])
    })
    
    // Verify data persistence
    const { data: savedWedding } = await supabase
      .from('weddings')
      .select('*')
      .eq('user_id', weddingData.userId)
      .single()
    
    expect(savedWedding).toBeTruthy()
    expect(savedWedding.budget).toBe(result.totalBudget)
  })
})
```

#### 10.1.3 End-to-End Testing with Playwright
```typescript
// E2E testing for complete user workflows
import { test, expect } from '@playwright/test'

test.describe('Wedding Planning Workflow', () => {
  test('complete budget calculator to signup flow', async ({ page }) => {
    // Navigate to budget calculator
    await page.goto('/budget-calculator')
    
    // Fill out budget calculator form
    await page.fill('[data-testid="guest-count"]', '120')
    await page.fill('[data-testid="location"]', 'Seattle, WA')
    await page.selectOption('[data-testid="style"]', 'rustic')
    await page.fill('[data-testid="budget-range"]', '35000')
    
    // Submit calculation
    await page.click('[data-testid="calculate-budget"]')
    
    // Wait for AI recommendation
    await expect(page.locator('[data-testid="budget-results"]')).toBeVisible()
    await expect(page.locator('[data-testid="total-budget"]')).toContainText('$')
    
    // Export functionality
    await page.click('[data-testid="export-budget"]')
    await expect(page.locator('[data-testid="export-modal"]')).toBeVisible()
    
    // Email capture
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.click('[data-testid="send-results"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toContainText('sent')
    
    // Navigate to signup
    await page.click('[data-testid="create-account"]')
    await expect(page).toHaveURL(/.*signup/)
    
    // Pre-filled email
    await expect(page.locator('[data-testid="signup-email"]')).toHaveValue('test@example.com')
  })
  
  test('mobile responsive budget calculator', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    
    await page.goto('/budget-calculator')
    
    // Verify mobile layout
    await expect(page.locator('[data-testid="mobile-header"]')).toBeVisible()
    await expect(page.locator('[data-testid="desktop-sidebar"]')).not.toBeVisible()
    
    // Mobile-optimized form interactions
    await page.tap('[data-testid="guest-count"]')
    await page.fill('[data-testid="guest-count"]', '80')
    
    await page.tap('[data-testid="calculate-budget"]')
    
    // Mobile results layout
    await expect(page.locator('[data-testid="mobile-results"]')).toBeVisible()
    await expect(page.locator('[data-testid="category-cards"]')).toHaveCount(5)
  })
  
  test('offline functionality', async ({ page }) => {
    await page.goto('/budget-calculator')
    
    // Go offline
    await page.context().setOffline(true)
    
    // Fill form while offline
    await page.fill('[data-testid="guest-count"]', '100')
    await page.fill('[data-testid="location"]', 'Portland, OR')
    
    // Offline calculation should use cached data
    await page.click('[data-testid="calculate-budget"]')
    
    // Should show offline indicator
    await expect(page.locator('[data-testid="offline-indicator"]')).toBeVisible()
    
    // Basic calculation should still work
    await expect(page.locator('[data-testid="basic-budget"]')).toBeVisible()
    
    // Go back online
    await page.context().setOffline(false)
    
    // Should sync and get AI recommendations
    await page.reload()
    await expect(page.locator('[data-testid="ai-recommendations"]')).toBeVisible()
  })
})
```

---

Diese drei Dokumente bilden die vollständige technische Grundlage für Wilma Mk2. Das PRD definiert die Produktanforderungen und Geschäftsziele, das Mermaid-Diagramm visualisiert die Systemarchitektur, und das Architektur-Dokument liefert die detaillierten technischen Spezifikationen für die Implementierung.

Die Architektur ist bewusst modular und skalierbar gestaltet, um schnelle Iteration und Wachstum zu ermöglichen, während gleichzeitig moderne Best Practices für Performance, Sicherheit und Benutzererfahrung befolgt werden.