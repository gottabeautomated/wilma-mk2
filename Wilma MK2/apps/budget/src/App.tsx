import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import WeddingBudgetForm from './components/WeddingBudgetForm'
import BudgetResults from './components/BudgetResults'
import Toast from './components/Toast'
import { BudgetData } from './types/budget'
import { budgetService, BudgetCalculationResult } from './lib/budgetService'
import './styles/animations.css'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserBudgets from './components/UserBudgets'
import { ConsentDemo } from './components/ConsentDemo'

const App: React.FC = () => {
  const [view, setView] = useState<'form' | 'confirmation' | 'results'>('form')
  const [budgetData, setBudgetData] = useState<BudgetData | null>(null)
  const [calculationResult, setCalculationResult] = useState<BudgetCalculationResult | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [countdown, setCountdown] = useState(3)
  const [isCalculating, setIsCalculating] = useState(false)

  const handleFormComplete = async (data: BudgetData) => {
    setBudgetData(data)
    setIsCalculating(true)
    
    // Show success toast
    setToastMessage('🎉 Ihre Hochzeitsplanung wurde erfolgreich erstellt!')
    setShowToast(true)
    
    try {
      // Calculate budget using the service
      const result = await budgetService.calculateBudget(data)
      setCalculationResult(result)
      
      // Transition to confirmation
      setTimeout(() => {
        setView('confirmation')
        setCountdown(3) // Reset countdown
        setIsCalculating(false)
      }, 500)
      
      // Auto-transition to results after 3 seconds
      setTimeout(() => {
        setView('results')
      }, 3500)
    } catch (error) {
      console.error('Error calculating budget:', error)
      setToastMessage('❌ Fehler bei der Budget-Berechnung')
      setShowToast(true)
      setIsCalculating(false)
    }
  }

  // Countdown effect for confirmation view
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (view === 'confirmation' && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
    }
    return () => clearTimeout(timer)
  }, [view, countdown])

  const handleViewResults = () => {
    setView('results')
  }

  const handleBackToForm = () => {
    setView('form')
  }

  const renderConfirmationView = () => (
    <motion.div
      key="confirmation"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-primary-200/50 max-w-2xl mx-auto">
        {/* Success Icon Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <motion.svg
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-serif font-bold text-graphite mb-4">
            Perfekt! 🎉
          </h2>
          <p className="text-xl text-accent mb-6 font-light">
            Ihre Hochzeitsplanung wurde erfolgreich erstellt
          </p>
        </motion.div>

        {/* Confirmation Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-4 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div className="bg-primary-50 rounded-2xl p-4">
              <h4 className="font-semibold text-graphite mb-2">👰‍♀️ Brautpaar</h4>
              <p className="text-sm text-accent">
                {budgetData?.partner1Name} & {budgetData?.partner2Name}
              </p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4">
              <h4 className="font-semibold text-graphite mb-2">📅 Hochzeitsdatum</h4>
              <p className="text-sm text-accent">
                {budgetData?.weddingDate ? new Date(budgetData.weddingDate).toLocaleDateString('de-DE') : 'Nicht angegeben'}
              </p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4">
              <h4 className="font-semibold text-graphite mb-2">👥 Gäste</h4>
              <p className="text-sm text-accent">
                {budgetData?.guestCount} Personen
              </p>
            </div>
            <div className="bg-primary-50 rounded-2xl p-4">
              <h4 className="font-semibold text-graphite mb-2">💰 Budget</h4>
              <p className="text-sm text-accent">
                €{budgetData?.totalBudget?.toLocaleString('de-DE')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={handleViewResults}
            className="px-8 py-4 bg-royal text-white rounded-2xl font-medium transition-all shadow-lg hover:bg-royal-dark hover:shadow-xl transform hover:scale-105"
          >
            Ergebnisse jetzt anzeigen
          </button>
          <div className="text-sm text-accent/60 flex items-center justify-center">
            <span>Automatische Weiterleitung in {countdown} Sekunden...</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <Header />
        
        <main className="pt-20"> {/* Account for fixed header */}
          <Routes>
            <Route path="/" element={<WeddingBudgetForm />} />
            <Route path="/meine-budgets" element={<UserBudgets userEmail="demo@example.com" />} />
            <Route path="/consent-demo" element={<ConsentDemo />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App 