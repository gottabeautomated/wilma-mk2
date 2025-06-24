import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button 
} from '@wilma/shared-ui'
import { formatCurrency } from '@wilma/shared-utils'
import type { BudgetFormData, BudgetResult } from '@wilma/shared-types'
import { BudgetChart } from './BudgetChart'
import { CategoryBreakdown } from './CategoryBreakdown'
import { Share, ArrowLeft, Download, Mail, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BudgetResultsProps {
  results: BudgetResult
  formData: BudgetFormData
  onStartOver: () => void
}

export function BudgetResults({ results, formData, onStartOver }: BudgetResultsProps) {
  const [showRecommendations, setShowRecommendations] = useState(false)

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="font-wedding-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Your Personalized Budget Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          Based on your wedding details, here's how we recommend allocating your budget of {formatCurrency(results.totalBudget)}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Budget Chart */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-wedding-serif">
                Budget Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-8">
              <BudgetChart breakdown={results.breakdown} />
            </CardContent>
          </Card>
        </div>

        {/* Category Breakdown */}
        <div className="lg:col-span-7">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-wedding-serif">
                Detailed Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CategoryBreakdown breakdown={results.breakdown} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recommendations */}
      <Card className="mt-8">
        <CardHeader className="cursor-pointer" onClick={() => setShowRecommendations(!showRecommendations)}>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-wedding-serif">
              Smart Recommendations
            </CardTitle>
            <Button variant="ghost" size="sm" className="p-1">
              {showRecommendations ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </div>
        </CardHeader>
        <AnimatePresence>
          {showRecommendations && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent>
                <ul className="space-y-4">
                  {results.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-wedding-rose/20 flex items-center justify-center text-wedding-rose mr-3 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-gray-700">{rec}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-8">
        <Button 
          variant="outline" 
          onClick={onStartOver}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Start Over
        </Button>
        
        <Button className="flex items-center wedding-button">
          <Download className="w-4 h-4 mr-2" />
          Download PDF
        </Button>
        
        <Button className="flex items-center wedding-button">
          <Mail className="w-4 h-4 mr-2" />
          Email Results
        </Button>
        
        <Button className="flex items-center wedding-button">
          <Share className="w-4 h-4 mr-2" />
          Share
        </Button>
      </div>
      
      {/* Back to Wilma link */}
      <div className="text-center mt-8">
        <Button
          variant="outline"
          onClick={() => window.location.href = 'https://wilma-wedding.com'}
          className="border-wedding-sage text-wedding-sage hover:bg-wedding-sage hover:text-white"
        >
          ← Back to Wilma Tools
        </Button>
      </div>
    </div>
  )
}
