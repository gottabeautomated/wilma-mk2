import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator } from "lucide-react";
import { BudgetForm } from "./BudgetForm";
import { BudgetResults } from "./BudgetResults";
import { LoadingAnimation } from "./LoadingAnimation";
import { EmailCaptureModal } from "./EmailCaptureModal";
import { useBudgetCalculation } from "../hooks/useBudgetCalculation";
import type { BudgetFormData } from "../types/budget.types";
import {
  WeddingCard,
  WeddingCardContent,
  WeddingCardDescription,
  WeddingCardHeader,
  WeddingCardTitle,
} from "@/components/ui/WeddingCard";

export function BudgetCalculator() {
  const [currentStep, setCurrentStep] = useState<"form" | "loading" | "email" | "results">("form");
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState<BudgetFormData>({
    guestCount: 100,
    location: "",
    weddingDate: new Date(),
    style: "modern",
    budgetRange: 25000,
    priorities: [],
    partnerNames: ["", ""]
  });
  const [email, setEmail] = useState("");
  
  const { calculateBudget, result, isCalculating } = useBudgetCalculation();
  
  const handleFormSubmit = async (data: BudgetFormData) => {
    setFormData(data);
    setCurrentStep("loading");
    
    try {
      await calculateBudget(data);
      
      // After calculation, show email capture modal
      setTimeout(() => {
        setCurrentStep("email");
      }, 3500); // Show loading for 3.5 seconds for a more realistic "AI calculation" experience
      
    } catch (error) {
      console.error("Budget calculation error:", error);
      setCurrentStep("form");
    }
  };
  
  const handleEmailSubmit = (submittedEmail: string) => {
    setEmail(submittedEmail);
    setCurrentStep("results");
    
    // In a real implementation, save the email to the database
    // Example: supabase.from('email_captures').insert({ email: submittedEmail })
  };
  
  const handleEmailSkip = () => {
    setCurrentStep("results");
  };
  
  const handleReset = () => {
    setCurrentStep("form");
  };
  
  return (
    <div className="wedding-section">
      <div className="wedding-container max-w-6xl">
        {/* Hero Section */}
        <div className="relative">
          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-[hsl(var(--wedding-rose))/0.03] blur-3xl"></div>
          <div className="absolute top-40 -right-20 w-72 h-72 rounded-full bg-[hsl(var(--wedding-blush))/0.07] blur-3xl"></div>
          
          <div className="text-center mb-16 relative z-10">
            <div className="flex justify-center mb-6">
              <div className="rounded-full p-4 bg-gradient-to-br from-[hsl(var(--wedding-rose))/0.15] to-[hsl(var(--wedding-rose))/0.05] shadow-md">
                <Calculator className="h-10 w-10 text-[hsl(var(--wedding-rose))]" />
              </div>
            </div>
            <h1 className="text-3xl md:text-5xl font-wedding-serif font-semibold mb-6 text-[hsl(var(--wedding-navy))]">
              Wedding Budget Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Plan your wedding finances with our AI-powered budget calculator. 
              Get personalized recommendations based on your style, location, and priorities.
            </p>
            
            {/* Decorative divider */}
            <div className="flex items-center justify-center mt-8">
              <div className="h-px w-12 bg-[hsl(var(--wedding-gold))/0.5]"></div>
              <div className="mx-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(var(--wedding-gold))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="h-px w-12 bg-[hsl(var(--wedding-gold))/0.5]"></div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="relative">
          <div className="absolute -top-6 -left-6 w-36 h-36 rounded-full bg-[hsl(var(--wedding-cream))] opacity-50 blur-2xl"></div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-[hsl(var(--wedding-blush))] opacity-40 blur-3xl"></div>
          
          {/* Additional decorative elements */}
          <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-[hsl(var(--wedding-gold))] opacity-10 blur-xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-24 h-24 rounded-full bg-[hsl(var(--wedding-navy))] opacity-5 blur-xl"></div>
        </div>
        
        <AnimatePresence mode="wait">
          {currentStep === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <WeddingCard variant="default" decorative className="border-[hsl(var(--wedding-rose))/20]">
                <WeddingCardContent className="pt-6">
                  <BudgetForm 
                    onSubmit={handleFormSubmit} 
                    initialData={formData} 
                    currentStep={formStep}
                    onNextStep={() => setFormStep(prev => prev + 1)}
                    onPrevStep={() => setFormStep(prev => Math.max(0, prev - 1))}
                  />
                </WeddingCardContent>
              </WeddingCard>
            </motion.div>
          )}
          
          {currentStep === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="my-16"
            >
              <WeddingCard variant="gradient" className="shadow-xl">
                <WeddingCardContent className="pt-6">
                  <LoadingAnimation />
                </WeddingCardContent>
              </WeddingCard>
            </motion.div>
          )}
          
          {currentStep === "email" && (
            <motion.div
              key="email"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="my-16 max-w-md mx-auto"
            >
              <WeddingCard variant="elegant" className="max-w-md mx-auto border-[hsl(var(--wedding-gold))]">
                <WeddingCardContent className="pt-6">
                  <EmailCaptureModal 
                    onSubmit={handleEmailSubmit} 
                    onSkip={handleEmailSkip}
                    isOpen={true}
                    formData={formData}
                  />
                </WeddingCardContent>
              </WeddingCard>
            </motion.div>
          )}
          
          {currentStep === "results" && result && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-8">
                <BudgetResults result={result.result} formData={formData} />
                
                <div className="mt-10 text-center">
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 rounded-md text-white bg-[hsl(var(--wedding-rose))] hover:bg-[hsl(var(--wedding-rose)/0.9)] transition-colors shadow-md hover:shadow-lg"
                  >
                    Create a New Budget
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer Info */}
        <div className="text-center mt-16 relative">
          {/* Decorative footer elements */}
          <div className="absolute -bottom-16 left-1/4 w-32 h-32 rounded-full bg-[hsl(var(--wedding-gold))/0.05] blur-2xl"></div>
          <div className="absolute -bottom-12 right-1/4 w-28 h-28 rounded-full bg-[hsl(var(--wedding-cream))/0.2] blur-2xl"></div>
          
          <WeddingCard variant="soft" className="max-w-3xl mx-auto relative z-10">
            <WeddingCardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="mb-3 p-2 rounded-full bg-gradient-to-r from-[hsl(var(--wedding-blush))/0.4] to-[hsl(var(--wedding-rose))/0.1]">
                  <Calculator className="h-5 w-5 text-[hsl(var(--wedding-rose))]" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Powered by Wilma MK2's advanced AI wedding planning engine.
                  <br />
                  Our algorithms analyze thousands of real weddings to create accurate budget recommendations.
                </p>
                
                {/* Small decorative elements */}
                <div className="flex items-center justify-center mt-4 opacity-50">
                  <div className="h-px w-8 bg-[hsl(var(--wedding-gold))/0.3]"></div>
                  <div className="mx-2">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="hsl(var(--wedding-gold))" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="h-px w-8 bg-[hsl(var(--wedding-gold))/0.3]"></div>
                </div>
              </div>
            </WeddingCardContent>
          </WeddingCard>
        </div>
      </div>
    </div>
  );
}
