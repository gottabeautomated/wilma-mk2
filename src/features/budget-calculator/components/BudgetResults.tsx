import { useState, useRef } from "react";
import { motion } from "framer-motion";
// Remove unused imports
import { BudgetChart } from "./BudgetChart";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { AIRecommendations } from "./AIRecommendations";
import type { BudgetFormData, BudgetResult } from "../types/budget.types";
import { useBudgetExport } from "../hooks/useBudgetExport";
import { useToast } from "@/hooks/use-toast";
import {
  WeddingCard,
  WeddingCardContent,
  WeddingCardHeader,
  WeddingCardTitle,
  WeddingCardDescription,
} from "@/components/ui/WeddingCard";

interface BudgetResultsProps {
  result: BudgetResult;
  formData: BudgetFormData;
}

export function BudgetResults({ result, formData }: BudgetResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { exportToPdf, isExporting } = useBudgetExport({ formData, result: result.result });
  const { toast } = useToast();
  const resultRef = useRef<HTMLDivElement>(null);
  
  const handleExportPDF = async () => {
    try {
      await exportToPdf();
      
      toast({
        title: "PDF Exported",
        description: "Your budget breakdown has been exported as a PDF.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "There was an error exporting your budget breakdown.",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveToAccount = () => {
    // In a real implementation, this would save to the user's account
    toast({
      title: "Budget Saved",
      description: "Your budget has been saved to your account.",
    });
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  };
  
  const getWeddingStyleLabel = () => {
    switch (formData.style) {
      case "modern":
        return "Modern";
      case "rustic":
        return "Rustic";
      case "classic":
        return "Classic";
      case "boho":
        return "Bohemian";
      case "vintage":
        return "Vintage";
      case "outdoor":
        return "Outdoor";
      default:
        return formData.style;
    }
  };
  
  const renderResultSummary = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <WeddingCard variant="elegant" decorative className="mb-8">
          <WeddingCardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-wedding-serif font-semibold mb-2">
              Your Wedding Budget Breakdown
            </h2>
            <p className="text-muted-foreground">
              Here's your personalized budget plan based on your preferences.
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-[hsl(var(--wedding-rose))]">
              ${result.result.totalBudget.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Budget</p>
          </div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-6">
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Wedding Date</p>
            <p className="font-medium">{formatDate(formData.weddingDate)}</p>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Location</p>
            <p className="font-medium">{formData.location}</p>
            <p className="text-xs text-muted-foreground">
              Regional factor: {result.result.regionalFactor.toFixed(2)}x
            </p>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Guest Count</p>
            <p className="font-medium">{formData.guestCount} Guests</p>
          </div>
          
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-1">Wedding Style</p>
            <p className="font-medium">{getWeddingStyleLabel()}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2">AI Confidence:</span>
            <span 
              className={`font-medium ${
                result.result.confidenceScore >= 85 ? "text-green-600" : 
                result.result.confidenceScore >= 70 ? "text-amber-600" : 
                "text-red-600"
              }`}
            >
              {result.result.confidenceScore}%
            </span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-muted hover:bg-muted/80 transition-colors flex items-center gap-1"
            >
              {isExporting ? (
                <>
                  <span className="animate-spin mr-1">⏳</span>
                  Exporting...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export PDF
                </>
              )}
            </button>
            
            <button 
              onClick={handleSaveToAccount}
              className="px-4 py-2 text-sm font-medium rounded-md bg-[hsl(var(--wedding-rose))] text-white hover:bg-[hsl(var(--wedding-rose)/0.9)] transition-colors flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17 21 17 13 7 13 7 21"></polyline>
                <polyline points="7 3 7 8 15 8"></polyline>
              </svg>
              Save to Account
            </button>
          </div>
        </div>
          </WeddingCardContent>
        </WeddingCard>
      </motion.div>
    );
  };
  
  const renderChartSection = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <WeddingCard variant="default" decorative className="mb-8">
          <WeddingCardHeader>
            <WeddingCardTitle>
              Budget Allocation
            </WeddingCardTitle>
          </WeddingCardHeader>
          <WeddingCardContent>
            <BudgetChart 
              categories={result.result.categories} 
              totalBudget={result.result.totalBudget}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </WeddingCardContent>
        </WeddingCard>
      </motion.div>
    );
  };
  
  const renderCategorySection = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <WeddingCard variant="default" decorative className="mb-8">
          <WeddingCardHeader>
            <WeddingCardTitle>
              Category Breakdown
            </WeddingCardTitle>
          </WeddingCardHeader>
          <WeddingCardContent>
            <CategoryBreakdown 
              categories={result.result.categories} 
              totalBudget={result.result.totalBudget}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </WeddingCardContent>
        </WeddingCard>
      </motion.div>
    );
  };
  
  const renderRecommendationsSection = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <WeddingCard variant="gradient" decorative>
          <WeddingCardHeader>
            <WeddingCardTitle className="text-white">
              AI Recommendations & Savings
            </WeddingCardTitle>
          </WeddingCardHeader>
          <WeddingCardContent>
            <AIRecommendations 
              recommendations={result.result.recommendations}
              savingsSuggestions={result.result.savingsSuggestions}
              confidenceScore={result.result.confidenceScore}
              totalPotentialSavings={result.result.totalPotentialSavings}
            />
          </WeddingCardContent>
        </WeddingCard>
      </motion.div>
    );
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6" ref={resultRef}>
      <div className="md:col-span-12">
        {renderResultSummary()}
      </div>
      
      <div className="md:col-span-6">
        {renderChartSection()}
      </div>
      
      <div className="md:col-span-6">
        {renderCategorySection()}
      </div>
      
      <div className="md:col-span-12">
        {renderRecommendationsSection()}
      </div>
    </div>
  );
}
