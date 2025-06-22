import React from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  message?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  message = 'Calculating your personalized wedding budget...'
}) => {
  // Animation variants for the dots
  const dotsVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2
      }
    },
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const dotVariants = {
    initial: {
      y: 0,
      opacity: 0.5
    },
    animate: {
      y: [0, -10, 0],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  // Animation for the progress bar
  const progressVariants = {
    initial: { width: '0%' },
    animate: { 
      width: '100%',
      transition: { 
        duration: 3,
        ease: 'easeInOut'
      }
    }
  };

  // Array of AI processing messages to cycle through
  const processingMessages = [
    'Analyzing wedding style preferences...',
    'Calculating regional cost factors for your location...',
    'Optimizing budget allocations based on your priorities...',
    'Generating personalized savings recommendations...',
    'Preparing your custom budget breakdown...'
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mb-6 relative">
        <motion.div
          animate={{
            rotate: 360,
            transition: { duration: 3, repeat: Infinity, ease: 'linear' }
          }}
          className="absolute inset-0 rounded-full border-4 border-[hsl(var(--wedding-rose))] border-t-transparent"
        />
        <motion.div
          animate={{
            rotate: -360,
            transition: { duration: 5, repeat: Infinity, ease: 'linear' }
          }}
          className="absolute inset-3 rounded-full border-4 border-[hsl(var(--wedding-gold))] border-b-transparent"
        />
      </div>
      
      <h2 className="text-2xl font-serif font-semibold mb-2 text-gray-800">
        AI Budget Calculation
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      <motion.div
        variants={dotsVariants}
        initial="initial"
        animate="animate"
        className="flex space-x-2 mb-8"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-[hsl(var(--wedding-rose))]"
          />
        ))}
      </motion.div>
      
      <div className="w-full max-w-md bg-gray-100 h-2 rounded-full overflow-hidden mb-8">
        <motion.div
          variants={progressVariants}
          initial="initial"
          animate="animate"
          className="h-full bg-gradient-to-r from-[hsl(var(--wedding-rose))] to-[hsl(var(--wedding-gold))]"
        />
      </div>
      
      <div className="space-y-4 max-w-md">
        {processingMessages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                delay: index * 0.5,
                duration: 0.5
              }
            }}
            className="flex items-center"
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  delay: index * 0.5 + 0.2,
                  duration: 0.5,
                  repeat: 0
                }
              }}
              className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center mr-3"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="12" 
                height="12" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </motion.div>
            <span className="text-sm text-gray-600">{msg}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
