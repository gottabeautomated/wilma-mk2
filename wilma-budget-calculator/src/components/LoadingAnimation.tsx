import { motion } from 'framer-motion'
import type { BudgetFormData } from '@wilma/shared-types'

interface LoadingAnimationProps {
  formData: BudgetFormData
}

export function LoadingAnimation({ formData }: LoadingAnimationProps) {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h2 className="font-wedding-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Creating Your Personalized Budget Plan
        </h2>
        <p className="text-xl text-gray-600 max-w-lg mx-auto">
          Our AI is analyzing your wedding details to build a customized budget breakdown...
        </p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Processing Steps */}
        <div className="w-full max-w-md">
          <ProcessingStep 
            delay={0.5} 
            text={`Analyzing typical costs for ${formData.location || 'your area'}`}
          />
          <ProcessingStep 
            delay={1.8} 
            text={`Calculating guest-based expenses for ${formData.guestCount} attendees`}
          />
          <ProcessingStep 
            delay={3.0} 
            text="Generating venue and catering recommendations"
          />
          <ProcessingStep 
            delay={4.2} 
            text="Optimizing budget allocations"
          />
          <ProcessingStep 
            delay={5.4} 
            text="Finalizing your personalized budget plan"
          />
        </div>

        {/* Animation */}
        <div className="flex justify-center mt-8">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 rounded-full bg-gradient-to-r from-wedding-rose to-wedding-mauve flex items-center justify-center text-white"
          >
            <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="white" strokeWidth="2" />
              <path d="M12 8V16" stroke="white" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function ProcessingStep({ delay, text }: { delay: number; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center space-x-3 mb-4"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          backgroundColor: ["#F9A8D4", "#C084FC", "#F9A8D4"]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: delay * 0.5
        }}
        className="w-5 h-5 rounded-full bg-wedding-rose"
      />
      <span className="text-gray-700">{text}</span>
    </motion.div>
  )
}
