import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function LoadingAnimation() {
  const [loadingText, setLoadingText] = useState("Analyzing your wedding details");
  const [dots, setDots] = useState(".");
  
  // Update dots animation
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return ".";
        return prev + ".";
      });
    }, 500);
    
    return () => clearInterval(dotsInterval);
  }, []);
  
  // Update loading text for different stages
  useEffect(() => {
    const messages = [
      "Analyzing your wedding details",
      "Calculating regional pricing factors",
      "Optimizing budget allocations",
      "Generating AI recommendations",
      "Finding savings opportunities",
      "Finalizing your personalized budget"
    ];
    
    let currentIndex = 0;
    
    const textInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length;
      setLoadingText(messages[currentIndex]);
    }, 3000);
    
    return () => clearInterval(textInterval);
  }, []);
  
  return (
    <div className="text-center py-16">
      <div className="mb-8 relative">
        <div className="w-24 h-24 mx-auto">
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 border-4 border-[hsl(var(--wedding-rose)/0.3)] rounded-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.div
            className="absolute top-0 left-0 right-0 bottom-0 border-4 border-t-[hsl(var(--wedding-rose))] border-r-transparent border-b-transparent border-l-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
      
      <h3 className="text-xl font-wedding-serif text-[hsl(var(--wedding-navy))] mb-3">
        AI Budget Calculator Working
      </h3>
      
      <p className="text-gray-600 mb-4">
        {loadingText}{dots}
      </p>
      
      <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-4 mt-8">
        <p className="text-sm text-gray-500">
          Our AI is analyzing thousands of real wedding budgets from your region to create the most accurate recommendations for your style and priorities.
        </p>
      </div>
    </div>
  );
}
