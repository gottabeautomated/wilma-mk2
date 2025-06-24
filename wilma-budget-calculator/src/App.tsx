import { Navigation } from '@wilma/shared-ui'
import { BudgetCalculator } from './components/BudgetCalculator'
import './globals.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-wedding-cream via-wedding-blush/20 to-white">
      <Navigation currentApp="budget" />
      <main className="pt-16">
        <BudgetCalculator />
      </main>
    </div>
  )
}

export default App
