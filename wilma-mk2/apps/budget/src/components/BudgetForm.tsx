import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BudgetData, LocationOption, WeddingStyleOption, SeasonOption } from '../types/budget'

interface BudgetFormProps {
  onSubmit: (data: BudgetData) => void
  onStepChange?: (step: number) => void
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onSubmit, onStepChange }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Partial<BudgetData>>({
    guestCount: 80,
    totalBudget: 15000,
    venueType: '',
    weddingStyle: 'elegant',
    season: 'summer'
  })

  const totalSteps = 5

  // Location Options
  const locationOptions: LocationOption[] = [
    { id: 'hotel', name: 'Hotel', icon: '🏨', multiplier: 1.2, description: 'Elegante Hotelballsäle' },
    { id: 'castle', name: 'Schloss', icon: '🏰', multiplier: 1.8, description: 'Märchenhafte Atmosphäre' },
    { id: 'garden', name: 'Garten', icon: '🌸', multiplier: 0.9, description: 'Romantisch im Freien' },
    { id: 'vineyard', name: 'Weingut', icon: '🍇', multiplier: 1.1, description: 'Rustikaler Charme' },
    { id: 'church', name: 'Kirche', icon: '⛪', multiplier: 0.8, description: 'Traditionell & klassisch' },
    { id: 'beach', name: 'Strand', icon: '🏖️', multiplier: 1.3, description: 'Exotisch & entspannt' }
  ]

  // Wedding Style Options
  const styleOptions: WeddingStyleOption[] = [
    { id: 'elegant', name: 'Elegant', icon: '✨', description: 'Klassisch & zeitlos', multiplier: 1.2 },
    { id: 'rustic', name: 'Rustikal', icon: '🌿', description: 'Natürlich & gemütlich', multiplier: 0.9 },
    { id: 'modern', name: 'Modern', icon: '🔷', description: 'Minimalistisch & clean', multiplier: 1.1 },
    { id: 'vintage', name: 'Vintage', icon: '🌹', description: 'Nostalgisch & romantisch', multiplier: 1.0 },
    { id: 'boho', name: 'Boho', icon: '🦋', description: 'Frei & kreativ', multiplier: 0.95 }
  ]

  // Season Options
  const seasonOptions: SeasonOption[] = [
    { id: 'spring', name: 'Frühling', icon: '🌸', description: 'März - Mai', multiplier: 0.9 },
    { id: 'summer', name: 'Sommer', icon: '☀️', description: 'Juni - August', multiplier: 1.2 },
    { id: 'autumn', name: 'Herbst', icon: '🍂', description: 'September - November', multiplier: 1.0 },
    { id: 'winter', name: 'Winter', icon: '❄️', description: 'Dezember - Februar', multiplier: 0.8 }
  ]

  const budgetSuggestions = [
    { amount: 8000, label: 'Sparsam', description: 'Basis-Ausstattung' },
    { amount: 15000, label: 'Standard', description: 'Beliebte Wahl' },
    { amount: 25000, label: 'Komfort', description: 'Mehr Extras' },
    { amount: 40000, label: 'Luxus', description: 'Keine Kompromisse' }
  ]

  useEffect(() => {
    onStepChange?.(currentStep)
  }, [currentStep, onStepChange])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('budgetFormData', JSON.stringify(formData))
  }, [formData])

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (isFormValid()) {
      onSubmit(formData as BudgetData)
    }
  }

  const isFormValid = () => {
    return formData.guestCount && 
           formData.totalBudget && 
           formData.venueType && 
           formData.weddingStyle && 
           formData.season
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return formData.guestCount && formData.guestCount >= 20
      case 2: return formData.totalBudget && formData.totalBudget >= 5000
      case 3: return formData.venueType
      case 4: return formData.weddingStyle
      case 5: return formData.season
      default: return false
    }
  }

  const progressPercentage = (currentStep / totalSteps) * 100

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Schritt {currentStep} von {totalSteps}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {Math.round(progressPercentage)}% abgeschlossen
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        {/* Step 1: Guest Count */}
        {currentStep === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                👥
              </motion.div>
              <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
                Wie viele Gäste erwartet ihr?
              </h2>
              <p className="text-gray-600">
                Die Gästezahl ist der wichtigste Faktor für euer Budget
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <motion.div 
                  className="text-4xl font-bold text-rose-500 mb-2"
                  key={formData.guestCount}
                  initial={{ scale: 1.2, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {formData.guestCount} Gäste
                </motion.div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>20</span>
                  <span>300</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { count: 50, label: 'Intim' },
                  { count: 80, label: 'Standard' },
                  { count: 120, label: 'Groß' },
                  { count: 200, label: 'Sehr groß' }
                ].map((option) => (
                  <motion.button
                    key={option.count}
                    onClick={() => setFormData({ ...formData, guestCount: option.count })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.guestCount === option.count
                        ? 'border-rose-400 bg-rose-50 text-rose-600'
                        : 'border-gray-200 hover:border-rose-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="font-semibold">{option.count}</div>
                    <div className="text-sm text-gray-500">{option.label}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Total Budget */}
        {currentStep === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💰
              </motion.div>
              <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
                Wie hoch ist euer Gesamtbudget?
              </h2>
              <p className="text-gray-600">
                Seid ehrlich - wir helfen euch, das Beste daraus zu machen
              </p>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="relative mb-4">
                  <input
                    type="number"
                    value={formData.totalBudget}
                    onChange={(e) => setFormData({ ...formData, totalBudget: parseInt(e.target.value) })}
                    className="text-4xl font-bold text-center border-none outline-none bg-transparent text-rose-500 w-full"
                    min="5000"
                    max="100000"
                    step="1000"
                  />
                  <span className="text-2xl text-gray-400">€</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {budgetSuggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion.amount}
                    onClick={() => setFormData({ ...formData, totalBudget: suggestion.amount })}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      formData.totalBudget === suggestion.amount
                        ? 'border-rose-400 bg-rose-50 text-rose-600'
                        : 'border-gray-200 hover:border-rose-200'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="font-semibold">€{suggestion.amount.toLocaleString()}</div>
                    <div className="text-sm font-medium">{suggestion.label}</div>
                    <div className="text-xs text-gray-500">{suggestion.description}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Location */}
        {currentStep === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                📍
              </motion.div>
              <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
                Wo möchtet ihr feiern?
              </h2>
              <p className="text-gray-600">
                Die Location bestimmt maßgeblich euer Budget
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {locationOptions.map((location, index) => (
                <motion.button
                  key={location.id}
                  onClick={() => setFormData({ ...formData, venueType: location.id })}
                  className={`p-6 rounded-xl border-2 transition-all card-hover ${
                    formData.venueType === location.id
                      ? 'border-rose-400 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-200'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">{location.icon}</div>
                  <div className="font-semibold text-lg mb-1">{location.name}</div>
                  <div className="text-sm text-gray-500">{location.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 4: Wedding Style */}
        {currentStep === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                💍
              </motion.div>
              <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
                Welcher Stil gefällt euch?
              </h2>
              <p className="text-gray-600">
                Euer Stil beeinflusst alle Entscheidungen
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {styleOptions.map((style, index) => (
                <motion.button
                  key={style.id}
                  onClick={() => setFormData({ ...formData, weddingStyle: style.id as any })}
                  className={`p-6 rounded-xl border-2 transition-all card-hover ${
                    formData.weddingStyle === style.id
                      ? 'border-rose-400 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-200'
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">{style.icon}</div>
                  <div className="font-semibold text-lg mb-1">{style.name}</div>
                  <div className="text-sm text-gray-500">{style.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 5: Season */}
        {currentStep === 5 && (
          <motion.div
            key="step5"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-rose-100"
          >
            <div className="text-center mb-8">
              <motion.div
                className="text-6xl mb-4"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                🗓️
              </motion.div>
              <h2 className="text-3xl font-serif font-bold gradient-text mb-2">
                In welcher Jahreszeit heiratet ihr?
              </h2>
              <p className="text-gray-600">
                Die Saison beeinflusst Preise und Verfügbarkeit
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {seasonOptions.map((season, index) => (
                <motion.button
                  key={season.id}
                  onClick={() => setFormData({ ...formData, season: season.id as any })}
                  className={`p-6 rounded-xl border-2 transition-all card-hover ${
                    formData.season === season.id
                      ? 'border-rose-400 bg-rose-50 text-rose-600'
                      : 'border-gray-200 hover:border-rose-200'
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-4xl mb-3">{season.icon}</div>
                  <div className="font-semibold text-lg mb-1">{season.name}</div>
                  <div className="text-sm text-gray-500">{season.description}</div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mt-8">
        <motion.button
          onClick={prevStep}
          disabled={currentStep === 1}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            currentStep === 1
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
          }`}
          whileHover={currentStep > 1 ? { scale: 1.05 } : {}}
          whileTap={currentStep > 1 ? { scale: 0.95 } : {}}
        >
          ← Zurück
        </motion.button>

        <div className="flex space-x-2">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i + 1 === currentStep
                  ? 'bg-rose-500 scale-125'
                  : i + 1 < currentStep
                  ? 'bg-rose-300'
                  : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {currentStep < totalSteps ? (
          <motion.button
            onClick={nextStep}
            disabled={!isStepValid(currentStep)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              isStepValid(currentStep)
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isStepValid(currentStep) ? { scale: 1.05 } : {}}
            whileTap={isStepValid(currentStep) ? { scale: 0.95 } : {}}
          >
            Weiter →
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-8 py-3 rounded-lg font-medium transition-all ${
              isFormValid()
                ? 'bg-gradient-to-r from-rose-400 to-pink-500 text-white hover:shadow-xl'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            whileHover={isFormValid() ? { scale: 1.05 } : {}}
            whileTap={isFormValid() ? { scale: 0.95 } : {}}
          >
            Budget berechnen 🎉
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default BudgetForm 