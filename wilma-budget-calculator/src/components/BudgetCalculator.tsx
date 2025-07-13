import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BudgetForm } from './BudgetForm'
import { BudgetResults } from './BudgetResults'
import { LoadingAnimation } from './LoadingAnimation'
import type { BudgetFormData, BudgetResult } from '@wilma/shared-types'

type CalculatorState = 'form' | 'loading' | 'results'

export function BudgetCalculator() {
  const [state, setState] = useState<CalculatorState>('form')
  const [formData, setFormData] = useState<BudgetFormData | null>(null)
  const [results, setResults] = useState<BudgetResult | null>(null)

  const handleFormSubmit = async (data: BudgetFormData) => {
    setFormData(data)
    setState('loading')
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Mock calculation
    const mockResults: BudgetResult = {
      totalBudget: data.budgetRange,
      breakdown: {
        venue: Math.round(data.budgetRange * 0.35),
        catering: Math.round(data.budgetRange * 0.30),
        photography: Math.round(data.budgetRange * 0.10),
        flowers: Math.round(data.budgetRange * 0.08),
        music: Math.round(data.budgetRange * 0.05),
        attire: Math.round(data.budgetRange * 0.05),
        other: Math.round(data.budgetRange * 0.07)
      },
      recommendations: [
        `For ${data.location}, consider booking venues 12-18 months ahead`,
        'Buffet style can save 20-30% compared to plated dinner',
        'Consider weekday ceremonies for significant savings'
      ],
      confidenceScore: 0.87
    }
    
    setResults(mockResults)
    setState('results')
  }

  const handleStartOver = () => {
    setState('form')
    setFormData(null)
    setResults(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatePresence mode="wait">
        {state === 'form' && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BudgetForm onSubmit={handleFormSubmit} />
          </motion.div>
        )}

        {state === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingAnimation formData={formData!} />
          </motion.div>
        )}

        {state === 'results' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BudgetResults 
              results={results}
              formData={formData!}
              onStartOver={handleStartOver}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
