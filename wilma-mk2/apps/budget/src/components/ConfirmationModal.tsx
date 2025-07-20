import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ElegantIcon from './ElegantIcon'
import { BudgetData } from '../types/budget'

interface ConfirmationModalProps {
  budgetData: BudgetData
  onViewResults: () => void
  isVisible: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  budgetData,
  onViewResults,
  isVisible
}) => {
  const [countdown, setCountdown] = useState(3)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setShowCelebration(true)
      setCountdown(3)
      
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            onViewResults()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isVisible, onViewResults])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      {/* Celebration Confetti Effect */}
      {showCelebration && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 1, 
                y: -100, 
                x: Math.random() * window.innerWidth,
                rotate: 0
              }}
              animate={{ 
                opacity: 0, 
                y: window.innerHeight + 100,
                rotate: 360
              }}
              transition={{ 
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut"
              }}
              className={`absolute w-3 h-3 ${
                ['bg-royal', 'bg-accent', 'bg-champagne', 'bg-gold'][i % 4]
              } rounded-full`}
            />
          ))}
        </div>
      )}

      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-primary-200/50 max-w-2xl mx-auto relative z-50">
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

        {/* Quick Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-royal/10 to-royal/5 rounded-2xl p-4 border border-royal/20">
            <div className="flex items-center space-x-2 mb-2">
              <ElegantIcon name="heart" size={20} className="text-royal" />
              <h4 className="font-semibold text-graphite">Brautpaar</h4>
            </div>
            <p className="text-sm text-accent">
              {budgetData.partner1Name} & {budgetData.partner2Name}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-4 border border-accent/20">
            <div className="flex items-center space-x-2 mb-2">
              <ElegantIcon name="calendar" size={20} className="text-accent" />
              <h4 className="font-semibold text-graphite">Datum</h4>
            </div>
            <p className="text-sm text-accent">
              {budgetData.weddingDate ? new Date(budgetData.weddingDate).toLocaleDateString('de-DE') : 'Flexibel'}
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-champagne/10 to-champagne/5 rounded-2xl p-4 border border-champagne/20">
            <div className="flex items-center space-x-2 mb-2">
              <ElegantIcon name="sparkles" size={20} className="text-champagne" />
              <h4 className="font-semibold text-graphite">Gäste</h4>
            </div>
            <p className="text-sm text-accent">
              {budgetData.guestCount} Personen
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-2xl p-4 border border-gold/20">
            <div className="flex items-center space-x-2 mb-2">
              <ElegantIcon name="gift" size={20} className="text-gold" />
              <h4 className="font-semibold text-graphite">Budget</h4>
            </div>
            <p className="text-sm text-accent">
              €{budgetData.totalBudget?.toLocaleString('de-DE')}
            </p>
          </div>
        </motion.div>

        {/* Action Buttons with Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="space-y-4"
        >
          <button
            onClick={onViewResults}
            className="w-full px-8 py-4 bg-gradient-to-r from-royal to-royal-dark text-white rounded-2xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <ElegantIcon name="sparkles" size={20} />
            <span>Ergebnisse jetzt anzeigen</span>
          </button>
          
          {/* Countdown Display */}
          <div className="flex items-center justify-center space-x-2 text-accent/70">
            <div className="w-8 h-8 rounded-full border-2 border-accent/30 flex items-center justify-center">
              <span className="text-sm font-bold">{countdown}</span>
            </div>
            <span className="text-sm">Automatische Weiterleitung...</span>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-accent/10 rounded-full h-2">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 3, ease: "linear" }}
              className="bg-gradient-to-r from-royal to-accent h-2 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ConfirmationModal 