import React from 'react'
import { motion } from 'framer-motion'
import ElegantIcon from './ElegantIcon'

interface Step {
  id: number
  title: string
  description: string
  icon: string
}

interface ProgressStepperProps {
  steps: Step[]
  currentStep: number
  completedSteps: number[]
  onStepClick?: (step: number) => void
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick
}) => {
  const getStepIcon = (stepIcon: string) => {
    const iconMap: { [key: string]: string } = {
      '👫': 'heart',
      '🏰': 'castle', 
      '🎨': 'flower',
      '⭐': 'sparkles',
      '💰': 'gift',
      '📍': 'calendar',
      '💝': 'rings'
    }
    return iconMap[stepIcon] || 'heart'
  }

  const stepAccents = ['royal', 'gold', 'moss', 'royal'] // Cycling through accent colors

  return (
    <div className="w-full max-w-5xl mx-auto mb-12">
      {/* Mobile Progress Bar */}
      <div className="block lg:hidden mb-8">
        <div className="card-elegant">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-medium text-accent">
              Schritt {currentStep} von {steps.length}
            </span>
            <span className="text-sm font-medium text-royal">
              {Math.round(((currentStep - 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-undertone rounded-elegant h-3 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-royal via-royal-light to-accent h-3 rounded-elegant shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep - 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <div className="mt-6 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-royal via-royal-light to-accent rounded-elegant flex items-center justify-center shadow-elegant">
              <ElegantIcon 
                name={getStepIcon(steps[currentStep - 1]?.icon)} 
                className="text-white" 
                size={24} 
              />
            </div>
            <h3 className="text-xl font-serif font-semibold text-graphite mb-2">
              {steps[currentStep - 1]?.title}
            </h3>
            <p className="text-sm text-accent font-light">
              {steps[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Elegant Stepper */}
      <div className="hidden lg:block">
        <div className="section-elegant">
          <div className="flex items-center justify-between relative">
            {/* Elegant Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-royal/20 transform -translate-y-1/2 z-0">
              <motion.div
                className="h-full bg-gradient-to-r from-royal-light to-royal rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` 
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
            </div>

            {steps.map((step, index) => {
              const stepNumber = index + 1
              const isActive = stepNumber === currentStep
              const isCompleted = completedSteps.includes(stepNumber)
              const isClickable = stepNumber <= currentStep
              const accent = stepAccents[index % stepAccents.length]
              
              return (
                <motion.div
                  key={step.id}
                  className="relative z-10 flex flex-col items-center cursor-pointer group"
                  onClick={() => isClickable && onStepClick?.(stepNumber)}
                  whileHover={isClickable ? { scale: 1.05 } : {}}
                  whileTap={isClickable ? { scale: 0.95 } : {}}
                >
                  {/* Step Circle */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center shadow-elegant transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-br from-royal to-royal-dark text-white shadow-royal'
                        : isCompleted
                        ? 'bg-gradient-to-br from-royal-light to-royal text-white shadow-royal'
                        : 'bg-white border-2 border-undertone text-royal/60 hover:border-royal/40'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                  >
                    {isCompleted && !isActive ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <ElegantIcon name="heart" size={20} />
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ElegantIcon 
                          name={getStepIcon(step.icon)} 
                          size={20}
                          className={isActive || isCompleted ? 'text-white' : 'text-royal/60'}
                        />
                        <span className="text-xs font-bold mt-1">
                          {stepNumber}
                        </span>
                      </div>
                    )}
                  </motion.div>

                  {/* Step Label */}
                  <motion.div
                    className="mt-4 text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className={`font-serif font-semibold text-sm transition-colors ${
                      isActive ? 'text-royal' : 'text-graphite/70'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-accent/60 font-light mt-1 max-w-24">
                      {step.description}
                    </p>
                  </motion.div>

                  {/* Active Step Indicator */}
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-2 w-2 h-2 bg-royal rounded-full shadow-royal"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Elegant Completion Message */}
      {completedSteps.length === steps.length && (
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="card-elegant inline-flex items-center space-x-3 bg-gradient-to-r from-royal/10 via-royal-light/10 to-accent/10 border-royal/20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <ElegantIcon name="sparkles" className="text-royal" size={24} />
            </motion.div>
            <div className="text-left">
              <h4 className="font-serif font-semibold text-graphite">Alle Schritte abgeschlossen!</h4>
              <p className="text-sm text-accent font-light">Bereit für die Budgetberechnung</p>
            </div>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ElegantIcon name="heart" className="text-royal-light" size={20} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default ProgressStepper 