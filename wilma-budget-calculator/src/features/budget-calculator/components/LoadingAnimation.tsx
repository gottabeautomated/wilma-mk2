import React, { useState, useEffect } from 'react';

interface LoadingAnimationProps {
  message?: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({
  message = 'Calculating your personalized wedding budget...'
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  // Array of AI processing messages to cycle through
  const processingMessages = [
    'Analyzing wedding style preferences...',
    'Calculating regional cost factors for your location...',
    'Optimizing budget allocations based on your priorities...',
    'Generating personalized savings recommendations...',
    'Preparing your custom budget breakdown...'
  ];

  // Advance through the steps with a timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < processingMessages.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [processingMessages.length]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mb-6 relative">
        <div className="absolute inset-0 rounded-full border-4 border-indigo-300 border-t-transparent animate-spin"></div>
        <div className="absolute inset-3 rounded-full border-4 border-indigo-500 border-b-transparent animate-spin animate-duration-3000"></div>
      </div>
      
      <h2 className="text-2xl font-serif font-semibold mb-2 text-gray-800">
        AI Budget Calculation
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      <div className="flex space-x-2 mb-8">
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce animation-delay-200"></div>
        <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce animation-delay-400"></div>
      </div>
      
      <div className="w-full max-w-md bg-gray-100 h-2 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
          style={{ width: `${Math.min(100, (currentStep + 1) * 20)}%` }}
        ></div>
      </div>
      
      <div className="space-y-4 max-w-md">
        {processingMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center transition-opacity duration-500 ${
              index <= currentStep ? 'opacity-100' : 'opacity-30'
            }`}
          >
            <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
              index <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-100'
            }`}>
              {index < currentStep ? (
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
              ) : index === currentStep ? (
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
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              ) : (
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
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
              )}
            </div>
            <span className="text-sm text-gray-600">{msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
