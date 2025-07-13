import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import budgetService from '../lib/budgetService'
import ElegantIcon from './ElegantIcon'

interface UserBudgetsProps {
  userEmail: string
}

interface SavedBudget {
  id: string
  partner1_name: string
  partner2_name: string
  wedding_date: string
  guest_count: number
  total_budget: number
  wedding_style: string
  created_at: string
}

const UserBudgets: React.FC<UserBudgetsProps> = ({ userEmail }) => {
  const [budgets, setBudgets] = useState<SavedBudget[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBudget, setSelectedBudget] = useState<SavedBudget | null>(null)

  useEffect(() => {
    loadUserBudgets()
  }, [userEmail])

  const loadUserBudgets = async () => {
    try {
      setLoading(true)
      const userBudgets = await budgetService.getUserBudgets(userEmail)
      setBudgets(userBudgets)
    } catch (error) {
      console.error('Fehler beim Laden der Budgets:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  const getStyleIcon = (style: string) => {
    const styleIcons: Record<string, string> = {
      elegant: 'sparkles',
      rustic: 'flower',
      modern: 'star',
      vintage: 'heart',
      boho: 'flower'
    }
    return styleIcons[style] || 'heart'
  }

  if (loading) {
    return (
      <div className="card-elegant">
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <ElegantIcon name="sparkles" className="text-royal" size={32} />
          </motion.div>
          <span className="ml-3 text-graphite font-medium">Lade deine Budgets...</span>
        </div>
      </div>
    )
  }

  if (budgets.length === 0) {
    return (
      <div className="card-elegant text-center">
        <ElegantIcon name="heart" className="text-royal mx-auto mb-4" size={48} />
        <h3 className="text-xl font-serif font-semibold text-graphite mb-2">
          Noch keine Budgets erstellt
        </h3>
        <p className="text-accent">
          Erstelle dein erstes Hochzeitsbudget, um es hier zu sehen.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-graphite">
          Deine Hochzeitsbudgets
        </h2>
        <span className="bg-royal/10 text-royal px-3 py-1 rounded-elegant text-sm font-medium">
          {budgets.length} {budgets.length === 1 ? 'Budget' : 'Budgets'}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget, index) => (
          <motion.div
            key={budget.id}
            className="card-elegant hover:shadow-royal cursor-pointer transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedBudget(budget)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-royal to-royal-dark rounded-elegant flex items-center justify-center">
                  <ElegantIcon 
                    name={getStyleIcon(budget.wedding_style)} 
                    className="text-white" 
                    size={20} 
                  />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-graphite">
                    {budget.partner1_name} & {budget.partner2_name}
                  </h3>
                  <p className="text-sm text-accent capitalize">
                    {budget.wedding_style} Stil
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-accent">Hochzeitsdatum:</span>
                <span className="text-graphite font-medium">
                  {budget.wedding_date ? formatDate(budget.wedding_date) : 'Nicht angegeben'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-accent">Gäste:</span>
                <span className="text-graphite font-medium">{budget.guest_count}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-accent">Budget:</span>
                <span className="text-royal font-bold">
                  {formatCurrency(budget.total_budget)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-accent">Pro Gast:</span>
                <span className="text-graphite font-medium">
                  {formatCurrency(budget.total_budget / budget.guest_count)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-undertone">
              <p className="text-xs text-accent">
                Erstellt am {formatDate(budget.created_at)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Budget Details Modal */}
      {selectedBudget && (
        <motion.div
          className="fixed inset-0 bg-graphite/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedBudget(null)}
        >
          <motion.div
            className="card-elegant max-w-md w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-serif font-bold text-graphite">
                Budget Details
              </h3>
              <button
                onClick={() => setSelectedBudget(null)}
                className="w-8 h-8 bg-undertone hover:bg-royal/20 rounded-elegant flex items-center justify-center transition-colors"
              >
                <ElegantIcon name="x" size={16} className="text-graphite" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center py-4 bg-gradient-to-r from-royal/10 to-royal-light/10 rounded-elegant">
                <h4 className="text-lg font-serif font-semibold text-graphite">
                  {selectedBudget.partner1_name} & {selectedBudget.partner2_name}
                </h4>
                <p className="text-royal font-bold text-2xl">
                  {formatCurrency(selectedBudget.total_budget)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-accent mb-1">Hochzeitsdatum</span>
                  <span className="text-graphite font-medium">
                    {selectedBudget.wedding_date ? formatDate(selectedBudget.wedding_date) : 'Nicht angegeben'}
                  </span>
                </div>
                
                <div>
                  <span className="block text-accent mb-1">Stil</span>
                  <span className="text-graphite font-medium capitalize">
                    {selectedBudget.wedding_style}
                  </span>
                </div>
                
                <div>
                  <span className="block text-accent mb-1">Gästeanzahl</span>
                  <span className="text-graphite font-medium">
                    {selectedBudget.guest_count} Personen
                  </span>
                </div>
                
                <div>
                  <span className="block text-accent mb-1">Pro Gast</span>
                  <span className="text-graphite font-medium">
                    {formatCurrency(selectedBudget.total_budget / selectedBudget.guest_count)}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-undertone">
                <p className="text-xs text-accent text-center">
                  Erstellt am {formatDate(selectedBudget.created_at)}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default UserBudgets 