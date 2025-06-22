import { useState } from "react";
import { motion } from "framer-motion";
import { BrainCircuit, Lightbulb, Zap, TrendingUp, BarChart2 } from "lucide-react";
import type { AIRecommendationsProps, AIRecommendation, SavingsSuggestion } from "../types/budget.types";

export function AIRecommendations({
  recommendations,
  savingsSuggestions,
  confidenceScore,
  totalPotentialSavings
}: AIRecommendationsProps) {
  const [activeTab, setActiveTab] = useState<"recommendations" | "savings">("recommendations");
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get importance class (color) based on importance level
  const getImportanceClass = (importance: string) => {
    switch (importance) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };
  
  // Sort recommendations by importance (high -> medium -> low)
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const importanceOrder = { high: 0, medium: 1, low: 2 };
    return importanceOrder[a.importance as keyof typeof importanceOrder] - 
           importanceOrder[b.importance as keyof typeof importanceOrder];
  });
  
  // Sort savings suggestions by potential savings (high to low)
  const sortedSavings = [...savingsSuggestions].sort((a, b) => b.potentialSavings - a.potentialSavings);
  
  return (
    <div className="w-full">
      {/* Section Header with AI Badge */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-[hsl(var(--wedding-navy))]">
          <span className="inline-flex items-center bg-[hsla(var(--wedding-navy)/0.1)] text-[hsl(var(--wedding-navy))] text-xs px-2 py-1 rounded-full mr-2">
            <BrainCircuit className="w-3 h-3 mr-1" />
            AI-Powered
          </span>
          Smart Recommendations
        </h3>
        
        <div className="flex items-center bg-gray-100 p-1 rounded-lg">
          <div className="text-xs font-medium text-gray-500 mr-2">AI Confidence:</div>
          <div className="flex items-center">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-yellow-400 via-green-400 to-green-500 mr-1" 
              style={{ width: `${Math.max(20, confidenceScore)}px` }}
            />
            <span className="text-xs font-semibold">{confidenceScore}%</span>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === "recommendations" 
              ? "border-[hsl(var(--wedding-rose))] text-[hsl(var(--wedding-rose))]" 
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("recommendations")}
        >
          <Lightbulb className="w-4 h-4 inline-block mr-1" />
          AI Recommendations
        </button>
        
        <button
          className={`py-2 px-4 text-sm font-medium border-b-2 ${
            activeTab === "savings" 
              ? "border-[hsl(var(--wedding-rose))] text-[hsl(var(--wedding-rose))]" 
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("savings")}
        >
          <Zap className="w-4 h-4 inline-block mr-1" />
          Savings Opportunities
          {totalPotentialSavings > 0 && (
            <span className="ml-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
              {formatCurrency(totalPotentialSavings)}
            </span>
          )}
        </button>
      </div>
      
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === "recommendations" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {sortedRecommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.id} recommendation={recommendation} />
            ))}
            
            {sortedRecommendations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No recommendations available.
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Total Potential Savings Banner */}
            {totalPotentialSavings > 0 && (
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="w-5 h-5 text-green-500 mr-2" />
                    <h4 className="font-medium text-green-800">Total Potential Savings</h4>
                  </div>
                  <div className="text-lg font-semibold text-green-700">
                    {formatCurrency(totalPotentialSavings)}
                  </div>
                </div>
                <p className="text-sm text-green-600 mt-2">
                  By implementing these suggestions, you could save up to this amount from your wedding budget.
                </p>
              </div>
            )}
            
            {sortedSavings.map((suggestion) => (
              <SavingsCard key={suggestion.id} suggestion={suggestion} />
            ))}
            
            {sortedSavings.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No savings suggestions available.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Recommendation Card Component
function RecommendationCard({ recommendation }: { recommendation: AIRecommendation }) {
  const [expanded, setExpanded] = useState(false);
  
  const importanceClass = recommendation.importance === "high" 
    ? "bg-red-50 text-red-800" 
    : recommendation.importance === "medium" 
      ? "bg-yellow-50 text-yellow-800" 
      : "bg-green-50 text-green-800";
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-[hsl(var(--wedding-navy))]">
            {recommendation.title}
          </h4>
          <span className={`text-xs px-2 py-0.5 rounded-full ${importanceClass}`}>
            {recommendation.importance}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">
          {recommendation.description}
        </p>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
          <div className="text-sm">
            <p className="text-gray-500 mb-2">
              <strong>Rationale:</strong> {recommendation.rationale}
            </p>
            
            {recommendation.categoryImpacts.length > 0 && (
              <div>
                <strong className="text-gray-700">Category Impacts:</strong>
                <ul className="mt-1 list-disc list-inside space-y-1">
                  {recommendation.categoryImpacts.map((impact, index) => (
                    <li key={index} className="text-gray-600">
                      <span className="font-medium">{impact.category}:</span> {impact.effect}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Savings Card Component
function SavingsCard({ suggestion }: { suggestion: SavingsSuggestion }) {
  const [expanded, setExpanded] = useState(false);
  
  const importanceClass = suggestion.importance === "high" 
    ? "bg-red-50 text-red-800" 
    : suggestion.importance === "medium" 
      ? "bg-yellow-50 text-yellow-800" 
      : "bg-green-50 text-green-800";
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-[hsl(var(--wedding-navy))]">
            {suggestion.title}
          </h4>
          <span className="text-green-700 font-medium">
            {formatCurrency(suggestion.potentialSavings)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-1">
          {suggestion.description}
        </p>
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50">
          <div className="text-sm space-y-2">
            <p className="text-gray-500">
              <strong>How to implement:</strong> {suggestion.implementation}
            </p>
            
            <p className="text-gray-500">
              <strong>Tradeoffs to consider:</strong> {suggestion.tradeoffs}
            </p>
            
            <div className="flex items-center mt-3">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full">
                <div 
                  className={`h-full rounded-full ${
                    suggestion.importance === "high" 
                      ? "bg-red-500" 
                      : suggestion.importance === "medium" 
                        ? "bg-yellow-500" 
                        : "bg-green-500"
                  }`} 
                  style={{ width: suggestion.importance === "high" ? "90%" : suggestion.importance === "medium" ? "60%" : "30%" }}
                />
              </div>
              <span className={`ml-2 text-xs font-medium rounded-full px-2 py-0.5 ${importanceClass}`}>
                {suggestion.importance} impact
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
