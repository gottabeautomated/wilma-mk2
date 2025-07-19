# Wilma Mk2 - Cline Development Prompts

Diese Datei enthält strukturierte Prompts für Cline, um Wilma Mk2 schrittweise zu entwickeln. Verwende diese Prompts in der angegebenen Reihenfolge für beste Ergebnisse.

---

## 1. Initial Project Setup

```markdown
I want to create a modern wedding planning platform called "Wilma Mk2" using React 19 + TypeScript + Vite. Please set up the complete project structure with the following specifications:

## Tech Stack
- React 19 + TypeScript 5.x + Vite (NOT Create React App)
- Jotai for state management
- TanStack React Query for server state
- React Router v6 for routing
- Tailwind CSS + shadcn/ui components
- React Hook Form + Zod for form validation
- Framer Motion for animations
- Lucide React for icons

## Project Structure
Create a feature-based architecture:

```
wilma-mk2/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/ (shadcn/ui components)
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Layout.tsx
│   │   └── shared/
│   │       ├── LoadingSpinner.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── EmailCapture.tsx
│   ├── features/
│   │   ├── budget-calculator/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── timeline-generator/
│   │   ├── guest-manager/
│   │   ├── venue-analyzer/
│   │   └── stress-planner/
│   ├── lib/
│   │   ├── supabase.ts
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   └── types.ts
│   ├── stores/ (Jotai atoms)
│   │   ├── wedding.ts
│   │   ├── user.ts
│   │   └── tools.ts
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useDebounce.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── ToolGallery.tsx
│   │   └── Dashboard.tsx
│   └── styles/
│       └── globals.css
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── .eslintrc.js
├── .prettierrc
└── README.md
```

## Dependencies to Install
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.1",
    "jotai": "^2.6.4",
    "@tanstack/react-query": "^5.17.15",
    "react-hook-form": "^7.49.2",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "framer-motion": "^10.18.0",
    "lucide-react": "^0.309.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0",
    "date-fns": "^3.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.48",
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1",
    "vite": "^5.0.12",
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.33",
    "eslint": "^8.56.0",
    "@typescript-eslint/eslint-plugin": "^6.19.0",
    "@typescript-eslint/parser": "^6.19.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.2.4",
    "eslint-config-prettier": "^9.1.0"
  }
}
```

## Configuration Requirements

### Vite Config (vite.config.ts)
- React plugin with Fast Refresh
- Path aliases for clean imports (@/ -> src/)
- Proper TypeScript support

### Tailwind Config (tailwind.config.js)
- Wedding-themed color palette (warm pinks, golds, pastels)
- Custom font families
- Extended spacing and border radius
- Dark mode support

### TypeScript Config (tsconfig.json)
- Strict mode enabled
- Path mapping for @/ alias
- Modern ES target

### ESLint + Prettier
- TypeScript rules
- React hooks rules
- Prettier integration
- Import sorting

## Core Setup Tasks

1. **Initialize Vite React TypeScript project**
2. **Install all dependencies**
3. **Set up Tailwind CSS with custom wedding theme**
4. **Configure path aliases (@/ for src/)**
5. **Set up ESLint + Prettier with proper rules**
6. **Create folder structure with placeholder files**
7. **Set up React Router with basic routes**
8. **Initialize Jotai store with basic atoms**
9. **Set up React Query with basic configuration**
10. **Create basic Layout component with Header/Footer**

## Basic Routes to Create
```typescript
const routes = [
  { path: '/', element: <Home /> },
  { path: '/tools', element: <ToolGallery /> },
  { path: '/budget-calculator', element: <BudgetCalculator /> },
  { path: '/timeline-generator', element: <TimelineGenerator /> },
  { path: '/guest-manager', element: <GuestManager /> },
  { path: '/venue-analyzer', element: <VenueAnalyzer /> },
  { path: '/stress-planner', element: <StressPlanner /> },
  { path: '/dashboard', element: <Dashboard /> }
]
```

## Initial Components to Create
- Basic Layout with responsive navigation
- Tool gallery with cards for each feature
- Placeholder components for all 5 tools
- Loading and error states
- Typography and button components

## Environment Setup
Create .env.example with:
```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-key
```

Please create this complete project structure with all configuration files and ensure everything works with `npm run dev`.
```

---

## 2. shadcn/ui Integration

```markdown
I need to integrate shadcn/ui into the Wilma Mk2 project with a wedding-themed design system. Please help me set this up:

## Tasks Required

1. **Initialize shadcn/ui**
   - Run the shadcn/ui init command
   - Configure components.json with wedding theme
   - Set up custom CSS variables

2. **Install Core Components**
   Install these shadcn/ui components:
   - Button (with wedding-themed variants)
   - Card (for tool containers)
   - Input & Label (for forms)
   - Select & Dropdown
   - Dialog & Modal
   - Sheet (for mobile navigation)
   - Toast (for notifications)
   - Tabs (for multi-step tools)
   - Progress (for completion tracking)
   - Badge (for status indicators)
   - Avatar (for user profiles)

3. **Custom Wedding Theme**
   Update the CSS variables in globals.css:
   ```css
   :root {
     /* Wedding Color Palette */
     --wedding-blush: 350 47% 88%;
     --wedding-rose: 346 77% 70%;
     --wedding-gold: 43 74% 66%;
     --wedding-sage: 120 13% 62%;
     --wedding-cream: 47 100% 97%;
     
     /* Primary Colors */
     --primary: var(--wedding-rose);
     --primary-foreground: 0 0% 98%;
     
     /* Secondary Colors */
     --secondary: var(--wedding-blush);
     --secondary-foreground: 0 0% 15%;
     
     /* Accent Colors */
     --accent: var(--wedding-gold);
     --accent-foreground: 0 0% 15%;
     
     /* Custom Wedding Variables */
     --wedding-gradient: linear-gradient(135deg, 
       hsl(var(--wedding-blush)), 
       hsl(var(--wedding-rose))
     );
   }
   ```

4. **Create Wedding-Specific Components**
   Create these custom components in components/ui/:
   - WeddingCard.tsx (enhanced Card with wedding styling)
   - ToolCard.tsx (for tool gallery)
   - StepIndicator.tsx (for multi-step forms)
   - ResultsCard.tsx (for tool results)
   - EmailCaptureCard.tsx (for lead generation)

5. **Update Button Variants**
   Add wedding-themed button variants:
   ```typescript
   const buttonVariants = cva(
     "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
     {
       variants: {
         variant: {
           default: "bg-primary text-primary-foreground hover:bg-primary/90",
           wedding: "bg-gradient-to-r from-wedding-blush to-wedding-rose text-white",
           elegant: "bg-wedding-gold text-wedding-cream hover:bg-wedding-gold/90",
           soft: "bg-wedding-cream text-wedding-rose border border-wedding-rose/20"
         }
       }
     }
   )
   ```

6. **Typography System**
   Set up wedding-appropriate typography:
   ```css
   /* Add to globals.css */
   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
   
   .font-wedding-serif {
     font-family: 'Playfair Display', serif;
   }
   
   .font-wedding-sans {
     font-family: 'Inter', sans-serif;
   }
   ```

7. **Component Examples**
   Create example usage of each component in the tool placeholders to ensure proper styling.

Please set up this complete shadcn/ui integration with the wedding theme and create all the custom components.
```

---

## 3. Budget Calculator Development

```markdown
I need to build the Budget Calculator feature for Wilma Mk2. This is the first and most important tool. Please create a complete, production-ready Budget Calculator with the following specifications:

## Feature Requirements

### Core Functionality
1. **Input Form**
   - Guest count (number input with validation)
   - Location (text input with suggestions)
   - Wedding date (date picker)
   - Wedding style (select: modern, rustic, classic, boho, vintage, outdoor)
   - Budget range (slider or input)
   - Priority categories (checkbox selection)

2. **AI-Powered Calculations**
   - Regional pricing integration
   - Smart budget allocation by category
   - Personalized recommendations
   - Cost optimization suggestions

3. **Results Display**
   - Interactive pie chart (use Recharts)
   - Category breakdown table
   - AI recommendations list
   - Savings suggestions

4. **Export & Sharing**
   - PDF export functionality
   - Email capture for results
   - Social sharing buttons
   - Save to account (if logged in)

## File Structure
```
src/features/budget-calculator/
├── components/
│   ├── BudgetForm.tsx
│   ├── BudgetResults.tsx
│   ├── BudgetChart.tsx
│   ├── CategoryBreakdown.tsx
│   ├── AIRecommendations.tsx
│   ├── ExportOptions.tsx
│   └── EmailCapture.tsx
├── hooks/
│   ├── useBudgetCalculation.ts
│   ├── useRegionalPricing.ts
│   └── useBudgetExport.ts
├── types/
│   └── budget.types.ts
├── utils/
│   ├── budgetCalculations.ts
│   └── budgetValidation.ts
└── index.ts
```

## Technical Requirements

### Dependencies to Add
```bash
npm install recharts jspdf html2canvas react-to-print
```

### Form Validation with Zod
```typescript
const budgetFormSchema = z.object({
  guestCount: z.number().min(1).max(1000),
  location: z.string().min(2),
  weddingDate: z.date().min(new Date()),
  style: z.enum(['modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor']),
  budgetRange: z.number().min(1000).max(200000),
  priorities: z.array(z.string()).min(1)
})
```

### State Management with Jotai
```typescript
// Create these atoms in stores/budget.ts
export const budgetFormAtom = atom<BudgetFormData>({})
export const budgetResultsAtom = atom<BudgetResults | null>(null)
export const calculationLoadingAtom = atom<boolean>(false)
```

### Component Specifications

1. **BudgetForm.tsx**
   - Multi-step form with progress indicator
   - Real-time validation feedback
   - Beautiful wedding-themed styling
   - Responsive design for mobile
   - Guest count affects venue suggestions
   - Location triggers regional pricing lookup

2. **BudgetResults.tsx**
   - Animated result reveal
   - Confidence score display
   - Interactive budget breakdown
   - Action buttons (export, email, save)

3. **BudgetChart.tsx**
   - Pie chart with hover effects
   - Clickable segments for details
   - Responsive sizing
   - Wedding color palette

4. **AIRecommendations.tsx**
   - Prioritized recommendation list
   - Savings potential indicators
   - Expandable details
   - Implementation tips

5. **EmailCapture.tsx**
   - Compelling value proposition
   - Single-field email input
   - Privacy reassurance
   - Conversion tracking

## Mock Data & API Integration

Since we don't have the backend yet, create:

1. **Mock regional pricing data**
2. **Mock AI responses** (structured JSON)
3. **API service functions** ready for real backend integration

## User Experience Flow

1. User lands on /budget-calculator
2. Sees compelling hero section with tool preview
3. Fills out form step-by-step
4. Sees loading animation during "AI processing"
5. Results reveal with celebration animation
6. Can explore, export, or share results
7. Email capture before PDF download
8. Option to create account to save

## Performance Requirements

- Form validation on every input change
- Debounced API calls for location suggestions
- Lazy loading for chart components
- Optimistic UI updates
- Error boundaries for robust UX

## Testing Setup

Create basic tests for:
- Form validation
- Budget calculations
- Component rendering
- User interactions

Please build this complete Budget Calculator feature with all components, proper TypeScript types, and excellent UX. Focus on making it feel magical and valuable to users.
```

---

## 4. Database Integration & Supabase Setup

```markdown
I need to integrate Supabase with the Wilma Mk2 project and connect it to our budget calculator. Please help me set up the complete database integration:

## Supabase Setup Tasks

1. **Install Supabase Dependencies**
   ```bash
   npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared
   ```

2. **Create Supabase Client**
   Update `src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'
   import { Database } from './database.types'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
   ```

3. **Generate TypeScript Types**
   Create `src/lib/database.types.ts` with types for:
   - weddings table
   - guests table  
   - budget_items table
   - budget_calculations table
   - users table

4. **Authentication Setup**
   Create `src/features/auth/` with:
   - Login component
   - Signup component  
   - Auth context/provider
   - Protected route wrapper
   - Social login options (Google, Apple)

5. **Budget Calculator Database Integration**
   
   Update budget calculator to:
   - Save calculations to `budget_calculations` table
   - Load user's previous calculations
   - Store email captures in `email_captures` table
   - Track tool usage in `tool_sessions` table

   Create these API functions in `src/lib/api/budget.ts`:
   ```typescript
   export const saveBudgetCalculation = async (data: BudgetCalculationData) => {
     // Save to budget_calculations table
   }

   export const getUserCalculations = async (userId: string) => {
     // Fetch user's previous calculations
   }

   export const captureEmail = async (email: string, source: string, data: any) => {
     // Save email capture
   }
   ```

6. **Real-time Subscriptions**
   Set up real-time updates for:
   - Budget calculations
   - Wedding data changes
   - Collaboration updates

7. **Row Level Security (RLS)**
   Implement RLS policies for:
   - Users can only access their own data
   - Wedding collaborators can view shared data
   - Public access for tools (when not logged in)

8. **Error Handling**
   Create robust error handling for:
   - Network failures
   - Authentication errors
   - Permission denied
   - Rate limiting

## Database Schema Implementation

Create these tables in Supabase:

1. **budget_calculations table**
   ```sql
   CREATE TABLE budget_calculations (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     session_id TEXT, -- For anonymous users
     input_data JSONB NOT NULL,
     total_budget DECIMAL(12,2),
     category_breakdown JSONB,
     ai_recommendations JSONB,
     regional_factors JSONB,
     confidence_score DECIMAL(3,2),
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

2. **email_captures table**
   ```sql
   CREATE TABLE email_captures (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT NOT NULL,
     source TEXT NOT NULL,
     capture_data JSONB,
     consent_marketing BOOLEAN DEFAULT FALSE,
     converted_to_signup BOOLEAN DEFAULT FALSE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

3. **tool_sessions table**
   ```sql
   CREATE TABLE tool_sessions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id),
     tool_name TEXT NOT NULL,
     session_data JSONB,
     started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     completed_at TIMESTAMP WITH TIME ZONE,
     completion_percentage DECIMAL(5,2)
   );
   ```

## React Query Integration

Set up React Query for:
- Caching budget calculations
- Optimistic updates
- Background refetching
- Error handling

Create hooks:
```typescript
// src/hooks/useBudgetCalculations.ts
export const useBudgetCalculations = () => {
  return useQuery({
    queryKey: ['budget-calculations'],
    queryFn: fetchBudgetCalculations
  })
}

export const useSaveBudgetCalculation = () => {
  return useMutation({
    mutationFn: saveBudgetCalculation,
    onSuccess: () => {
      queryClient.invalidateQueries(['budget-calculations'])
    }
  })
}
```

## Environment Variables

Update `.env.example` and create proper environment setup:
```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_OPENAI_API_KEY=your-openai-api-key
```

## User Journey Integration

Connect the database to these user flows:
1. Anonymous user uses tool → session tracking
2. User enters email → email capture
3. User signs up → data migration from session
4. User saves calculation → authenticated storage
5. User returns → load previous data

Please implement this complete Supabase integration with proper TypeScript types, error handling, and user experience flows.
```

---

## 5. Timeline Generator Development

```markdown
Now I need to build the Timeline Generator - the second major tool for Wilma Mk2. This should be as polished as the Budget Calculator but focused on wedding planning timeline and task management.

## Feature Requirements

### Core Functionality
1. **Input Form**
   - Wedding date (date picker with validation)
   - Engagement date (optional, affects timeline length)
   - Wedding complexity (simple, medium, elaborate)
   - Venue type (indoor, outdoor, destination)
   - DIY vs professional help level
   - Special requirements (religious ceremony, cultural traditions)

2. **AI Timeline Generation**
   - Intelligent task scheduling based on wedding date
   - Seasonal considerations (vendor availability, weather)
   - Critical path identification
   - Buffer time for stress management
   - Vendor booking deadlines

3. **Interactive Timeline Display**
   - Visual timeline with milestones
   - Drag-and-drop task rearrangement
   - Progress tracking
   - Dependency visualization
   - Mobile-optimized view

4. **Task Management**
   - Mark tasks as complete
   - Add custom tasks
   - Set reminders
   - Assign to wedding party members
   - Notes and attachments

## File Structure
```
src/features/timeline-generator/
├── components/
│   ├── TimelineForm.tsx
│   ├── TimelineDisplay.tsx
│   ├── TaskCard.tsx
│   ├── MilestoneMarker.tsx
│   ├── ProgressTracker.tsx
│   ├── TaskEditor.tsx
│   └── TimelineExport.tsx
├── hooks/
│   ├── useTimelineGeneration.ts
│   ├── useTaskManagement.ts
│   └── useTimelineExport.ts
├── types/
│   └── timeline.types.ts
├── utils/
│   ├── timelineCalculations.ts
│   ├── taskDependencies.ts
│   └── timelineValidation.ts
└── index.ts
```

## Technical Requirements

### Additional Dependencies
```bash
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities react-big-calendar
```

### TypeScript Types
```typescript
interface TimelineTask {
  id: string
  name: string
  description: string
  category: TaskCategory
  dueDate: Date
  estimatedDuration: number // hours
  priority: 'low' | 'medium' | 'high' | 'critical'
  dependencies: string[] // task IDs
  completed: boolean
  assignedTo?: string
  notes?: string
}

interface TimelineMilestone {
  id: string
  name: string
  date: Date
  tasks: string[] // task IDs
  isCompleted: boolean
}
```

### Form Validation
```typescript
const timelineFormSchema = z.object({
  weddingDate: z.date().min(new Date()),
  engagementDate: z.date().optional(),
  complexity: z.enum(['simple', 'medium', 'elaborate']),
  venueType: z.enum(['indoor', 'outdoor', 'destination', 'mixed']),
  helpLevel: z.number().min(1).max(10), // 1 = full DIY, 10 = full professional
  specialRequirements: z.array(z.string()),
  guestCount: z.number().min(1).max(1000).optional(),
  budget: z.number().optional()
})
```

### Component Specifications

1. **TimelineForm.tsx**
   - Multi-step form with wedding details
   - Complexity affects number of tasks generated
   - Integration with budget calculator data (if available)
   - Smart defaults based on wedding date

2. **TimelineDisplay.tsx**
   - Visual timeline with scrollable months
   - Color-coded tasks by category
   - Milestone markers
   - Zoom in/out functionality
   - Mobile swipe navigation

3. **TaskCard.tsx**
   - Draggable task component
   - Quick complete/incomplete toggle
   - Due date with urgency indicators
   - Expandable details view
   - Assignment and reminder options

4. **ProgressTracker.tsx**
   - Overall completion percentage
   - Category-wise progress
   - Upcoming deadlines
   - Stress level indicator

5. **TaskEditor.tsx**
   - Add/edit custom tasks
   - Set dependencies
   - Assign to wedding party
   - Attach notes and files

## AI Integration

Create mock AI service for timeline generation:

```typescript
// Mock AI timeline generation
export const generateWeddingTimeline = async (input: TimelineInput): Promise<TimelineResponse> => {
  // Simulate AI processing
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  return {
    tasks: generateTasksBasedOnInput(input),
    milestones: generateMilestones(input),
    criticalPath: identifyCriticalPath(tasks),
    recommendations: generateRecommendations(input)
  }
}
```

## Database Integration

Update Supabase schema:

```sql
-- Timeline generations table
CREATE TABLE timeline_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  wedding_id UUID REFERENCES weddings(id),
  input_data JSONB NOT NULL,
  generated_timeline JSONB,
  ai_recommendations JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timeline items table
CREATE TABLE timeline_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  timeline_generation_id UUID REFERENCES timeline_generations(id),
  wedding_id UUID REFERENCES weddings(id),
  task_name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  due_date DATE NOT NULL,
  estimated_duration INTEGER,
  priority TEXT,
  dependencies UUID[],
  is_completed BOOLEAN DEFAULT FALSE,
  assigned_to UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## User Experience Features

1. **Smart Timeline Suggestions**
   - Based on wedding date and complexity
   - Regional considerations (weather, vendor availability)
   - Stress management recommendations

2. **Progress Gamification**
   - Achievement badges for milestones
   - Progress celebration animations
   - Stress level monitoring

3. **Collaboration Features**
   - Share timeline with wedding party
   - Task assignment notifications
   - Comment system for tasks

4. **Export Options**
   - PDF timeline
   - Calendar integration (Google, Apple, Outlook)
   - Excel task list
   - Print-friendly version

## Integration with Other Tools

- Import data from Budget Calculator
- Suggest Guest Manager setup at appropriate timeline point
- Recommend Venue Analyzer when venue booking tasks appear
- Trigger Stress Planner when timeline shows high-pressure periods

Please build this complete Timeline Generator with all the interactive features, proper drag-and-drop functionality, and seamless integration with the existing app architecture.
```

---

## 6. Testing Setup

```markdown
I need to set up comprehensive testing for the Wilma Mk2 project. Please create a complete testing infrastructure with unit tests, integration tests, and E2E tests.

## Testing Stack Setup

### Dependencies to Install
```bash
# Testing framework
npm install -D vitest @vitest/ui jsdom

# Testing utilities
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# E2E testing
npm install -D playwright @playwright/test

# Mocking
npm install -D msw

# Coverage
npm install -D @vitest/coverage-v8
```

### Configuration Files

1. **vitest.config.ts**
   ```typescript
   import { defineConfig } from 'vitest/config'
   import react from '@vitejs/plugin-react'
   import path from 'path'

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./src/test/setup.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html']
       }
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src')
       }
     }
   })
   ```

2. **playwright.config.ts**
   ```typescript
   import { defineConfig, devices } from '@playwright/test'

   export default defineConfig({
     testDir: './e2e',
     fullyParallel: true,
     forbidOnly: !!process.env.CI,
     retries: process.env.CI ? 2 : 0,
     workers: process.env.CI ? 1 : undefined,
     reporter: 'html',
     use: {
       baseURL: 'http://localhost:5173',
       trace: 'on-first-retry'
     },
     projects: [
       {
         name: 'chromium',
         use: { ...devices['Desktop Chrome'] }
       },
       {
         name: 'webkit',
         use: { ...devices['Desktop Safari'] }
       },
       {
         name: 'Mobile Chrome',
         use: { ...devices['Pixel 5'] }
       }
     ],
     webServer: {
       command: 'npm run dev',
       url: 'http://localhost:5173',
       reuseExistingServer: !process.env.CI
     }
   })
   ```

## Test Structure

Create these test directories:
```
src/
├── test/
│   ├── setup.ts
│   ├── utils.tsx
│   └── mocks/
│       ├── handlers.ts
│       └── server.ts
├── __tests__/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   └── utils/
└── e2e/
    ├── budget-calculator.spec.ts
    ├── timeline-generator.spec.ts
    └── user-journey.spec.ts
```

## Unit Tests to Create

### 1. Budget Calculator Tests
```typescript
// src/__tests__/features/budget-calculator/BudgetForm.test.tsx
describe('BudgetForm', () => {
  test('validates guest count input')
  test('shows regional pricing when location entered')
  test('calculates budget correctly')
  test('displays AI recommendations')
  test('handles form submission errors')
})

// src/__tests__/features/budget-calculator/hooks/useBudgetCalculation.test.ts
describe('useBudgetCalculation', () => {
  test('calls API with correct parameters')
  test('handles loading states')
  test('caches results properly')
  test('handles API errors gracefully')
})
```

### 2. Timeline Generator Tests
```typescript
// src/__tests__/features/timeline-generator/TimelineDisplay.test.tsx
describe('TimelineDisplay', () => {
  test('renders timeline tasks correctly')
  test('handles drag and drop')
  test('marks tasks as complete')
  test('shows progress correctly')
})
```

### 3. Component Tests
```typescript
// src/__tests__/components/ui/WeddingCard.test.tsx
describe('WeddingCard', () => {
  test('renders with wedding theme')
  test('handles click events')
  test('displays content properly')
})
```

### 4. Utility Tests
```typescript
// src/__tests__/utils/budgetCalculations.test.ts
describe('budgetCalculations', () => {
  test('allocates budget correctly by category')
  test('applies regional pricing adjustments')
  test('calculates savings opportunities')
})
```

## Integration Tests

### 1. API Integration
```typescript
// src/__tests__/integration/budget-api.test.ts
describe('Budget API Integration', () => {
  test('saves calculation to database')
  test('retrieves user calculations')
  test('handles authentication')
})
```

### 2. User Flows
```typescript
// src/__tests__/integration/user-flows.test.ts
describe('User Flows', () => {
  test('complete budget calculation flow')
  test('email capture and signup flow')
  test('tool-to-tool navigation')
})
```

## E2E Tests

### 1. Budget Calculator E2E
```typescript
// e2e/budget-calculator.spec.ts
test('complete budget calculator workflow', async ({ page }) => {
  await page.goto('/budget-calculator')
  
  // Fill form
  await page.fill('[data-testid="guest-count"]', '120')
  await page.fill('[data-testid="location"]', 'Seattle, WA')
  await page.selectOption('[data-testid="style"]', 'rustic')
  
  // Submit and check results
  await page.click('[data-testid="calculate-budget"]')
  await expect(page.locator('[data-testid="budget-results"]')).toBeVisible()
  
  // Test email capture
  await page.fill('[data-testid="email-input"]', 'test@example.com')
  await page.click('[data-testid="send-results"]')
  await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
})
```

### 2. User Journey E2E
```typescript
// e2e/user-journey.spec.ts
test('new user complete journey', async ({ page }) => {
  // Land on homepage
  await page.goto('/')
  
  // Navigate to budget calculator
  await page.click('text=Budget Calculator')
  
  // Complete budget calculation
  // ... (budget calculation steps)
  
  // Navigate to timeline generator
  await page.click('text=Create Timeline')
  
  // Complete timeline generation
  // ... (timeline steps)
  
  // Sign up for account
  await page.click('text=Save Progress')
  await page.fill('[data-testid="email"]', 'newuser@example.com')
  await page.fill('[data-testid="password"]', 'password123')
  await page.click('[data-testid="signup"]')
  
  // Verify dashboard access
  await expect(page.locator('[data-testid="dashboard"]')).toBeVisible()
})
```

## Mock Service Worker Setup

```typescript
// src/test/mocks/handlers.ts
export const handlers = [
  rest.post('/api/v1/budget/calculate', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          totalBudget: 35000,
          breakdown: {
            venue: 12000,
            catering: 10000,
            photography: 3500
          }
        }
      })
    )
  }),
  
  rest.post('/api/v1/timeline/generate', (req, res, ctx) => {
    return res(
      ctx.json({
        success: true,
        data: {
          timelineId: 'timeline_123',
          milestones: [...]
        }
      })
    )
  })
]
```

## Test Utilities

```typescript
// src/test/utils.tsx
export const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  })
  
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  )
}

export const createMockWedding = (): Wedding => ({
  id: 'wedding_123',
  userId: 'user_123',
  weddingDate: new Date('2025-09-15'),
  guestCount: 120,
  budget: 35000
})
```

## NPM Scripts

Add these scripts to package.json:
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui"
  }
}
```

## CI/CD Integration

Create GitHub Actions workflow for testing:
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test:coverage
      - run: npm run test:e2e
```

Please set up this complete testing infrastructure with all the example tests and ensure everything runs properly with the existing codebase.
```

---

## 7. Deployment & Production Setup

```markdown
I need to deploy Wilma Mk2 to production with proper CI/CD, monitoring, and optimization. Please set up the complete deployment infrastructure.

## Deployment Stack

### Vercel Deployment
1. **Vercel Configuration**
   Create `vercel.json`:
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
             "key": "X-Content-Type-Options",
             "value": "nosniff"
           },
           {
             "key": "X-Frame-Options",
             "value": "DENY"
           },
           {
             "key": "X-XSS-Protection",
             "value": "1; mode=block"
           }
         ]
       }
     ],
     "rewrites": [
       {
         "source": "/api/(.*)",
         "destination": "/api/$1"
       }
     ]
   }
   ```

2. **Build Optimization**
   Update `vite.config.ts` for production:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
             charts: ['recharts'],
             utils: ['date-fns', 'clsx', 'tailwind-merge']
           }
         }
       },
       sourcemap: true,
       minify: 'terser',
       terserOptions: {
         compress: {
           drop_console: true,
           drop_debugger: true
         }
       }
     }
   })
   ```

### Supabase Production Setup
1. **Database Migration Scripts**
   Create `supabase/migrations/` folder with:
   - Initial schema migration
   - RLS policies migration
   - Sample data migration
   - Index optimization migration

2. **Environment Configuration**
   Set up production environment variables:
   ```bash
   # Production Supabase
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key

   # OpenAI
   VITE_OPENAI_API_KEY=your-openai-key

   # Analytics
   VITE_POSTHOG_KEY=your-posthog-key
   VITE_GA_MEASUREMENT_ID=your-ga-id
   ```

### CI/CD Pipeline

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    name: Test & Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run type checking
        run: npm run type-check
      
      - name: Run linting
        run: npm run lint
      
      - name: Run unit tests
        run: npm run test:coverage
      
      - name: Build application
        run: npm run build
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

  e2e-test:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: test
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run E2E tests
        run: npm run test:e2e
        env:
          VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL_TEST }}
          VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY_TEST }}

  deploy-staging:
    name: Deploy to Staging
    runs-on: ubuntu-latest
    needs: [test, e2e-test]
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          scope: ${{ secrets.VERCEL_ORG_ID }}

  deploy-production:
    name: Deploy to Production
    runs-on: ubuntu-latest
    needs: [test, e2e-test]
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

  notify:
    name: Notify Team
    runs-on: ubuntu-latest
    needs: [deploy-production]
    if: always()
    steps:
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

## Performance Optimization

### 1. Code Splitting & Lazy Loading
```typescript
// Lazy load route components
const BudgetCalculator = lazy(() => import('@/features/budget-calculator'))
const TimelineGenerator = lazy(() => import('@/features/timeline-generator'))
const GuestManager = lazy(() => import('@/features/guest-manager'))

// Lazy load heavy components
const BudgetChart = lazy(() => import('@/features/budget-calculator/components/BudgetChart'))
```

### 2. Image Optimization
```typescript
// Create optimized image component
const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  )
}
```

### 3. Bundle Analysis
Add bundle analyzer:
```bash
npm install -D rollup-plugin-visualizer
```

## Monitoring & Analytics

### 1. Error Tracking (Sentry)
```bash
npm install @sentry/react
```

```typescript
// src/lib/monitoring.ts
import * as Sentry from '@sentry/react'

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
  integrations: [
    new Sentry.BrowserTracing()
  ]
})
```

### 2. User Analytics (PostHog)
```bash
npm install posthog-js
```

```typescript
// src/lib/analytics.ts
import posthog from 'posthog-js'

export const initializeAnalytics = () => {
  if (import.meta.env.PROD) {
    posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: 'https://app.posthog.com'
    })
  }
}

export const trackEvent = (eventName: string, properties?: any) => {
  posthog.capture(eventName, properties)
}
```

### 3. Performance Monitoring
```typescript
// src/lib/performance.ts
export const trackWebVitals = () => {
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log)
    getFID(console.log)
    getFCP(console.log)
    getLCP(console.log)
    getTTFB(console.log)
  })
}
```

## SEO Optimization

### 1. Meta Tags & Structured Data
```typescript
// src/components/SEO.tsx
interface SEOProps {
  title: string
  description: string
  image?: string
  url?: string
}

export const SEO = ({ title, description, image, url }: SEOProps) => {
  return (
    <Helmet>
      <title>{title} | Wilma Wedding Planner</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Wilma Wedding Planner",
          "description": description,
          "url": url
        })}
      </script>
    </Helmet>
  )
}
```

### 2. Sitemap Generation
Create `public/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://wilma-mk2.vercel.app/</loc>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://wilma-mk2.vercel.app/budget-calculator</loc>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://wilma-mk2.vercel.app/timeline-generator</loc>
    <priority>0.9</priority>
  </url>
</urlset>
```

## Security Hardening

### 1. Content Security Policy
```typescript
// Add to index.html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
               font-src 'self' https://fonts.gstatic.com;
               img-src 'self' data: https:;
               connect-src 'self' https://*.supabase.co https://api.openai.com;">
```

### 2. Environment Validation
```typescript
// src/lib/env.ts
import { z } from 'zod'

const envSchema = z.object({
  VITE_SUPABASE_URL: z.string().url(),
  VITE_SUPABASE_ANON_KEY: z.string().min(1),
  VITE_OPENAI_API_KEY: z.string().min(1).optional()
})

export const env = envSchema.parse(import.meta.env)
```

## Documentation

Create production documentation:
1. **README.md** with setup instructions
2. **DEPLOYMENT.md** with deployment guide
3. **API.md** with API documentation
4. **CONTRIBUTING.md** with contribution guidelines

Please implement this complete production deployment setup with all monitoring, optimization, and security features.
```

---

## Usage Instructions

1. **Start with Project Setup** - Use the first prompt to create the basic project structure
2. **Add shadcn/ui** - Use the second prompt to integrate the UI library
3. **Build Budget Calculator** - Use the third prompt for the first major feature
4. **Integrate Database** - Use the fourth prompt for Supabase integration
5. **Add Timeline Generator** - Use the fifth prompt for the second major tool
6. **Set Up Testing** - Use the sixth prompt for comprehensive testing
7. **Deploy to Production** - Use the final prompt for deployment setup

Each prompt builds on the previous ones, so follow them in order for best results. Copy and paste each prompt directly into Cline when you're ready for that phase of development.

---

## Tips for Using These Prompts

- **Be specific** when modifying prompts for your needs
- **One prompt at a time** - let Cline complete each phase before moving to the next
- **Review the output** before proceeding to ensure quality
- **Test frequently** as you build each component
- **Customize** the wedding theme colors and styling to your preferences

Good luck building Wilma Mk2! 🎉💍