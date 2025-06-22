import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { ToolGallery } from '@/pages/ToolGallery'
import { Dashboard } from '@/pages/Dashboard'
import { BudgetCalculator } from '@/features/budget-calculator/components/BudgetCalculator'
import { TimelineGenerator } from '@/features/timeline-generator/components/TimelineGenerator'
import { GuestManager } from '@/features/guest-manager/components/GuestManager'
import { VenueAnalyzer } from '@/features/venue-analyzer/components/VenueAnalyzer'
import { StressPlanner } from '@/features/stress-planner/components/StressPlanner'
import { Toaster } from '@/components/ui/toaster'

// Create React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools" element={<ToolGallery />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/budget-calculator" element={<BudgetCalculator />} />
            <Route path="/timeline-generator" element={<TimelineGenerator />} />
            <Route path="/guest-manager" element={<GuestManager />} />
            <Route path="/venue-analyzer" element={<VenueAnalyzer />} />
            <Route path="/stress-planner" element={<StressPlanner />} />
          </Routes>
        </Layout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
