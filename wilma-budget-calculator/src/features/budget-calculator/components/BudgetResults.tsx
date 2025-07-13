import { useState, useRef } from "react";
import { BudgetChart } from "./BudgetChart";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { AIRecommendations } from "./AIRecommendations";
import type { BudgetFormData, BudgetBreakdown } from "../types/budget.types";
import { useBudgetExport } from "../hooks/useBudgetExport";

interface BudgetResultsProps {
  formData: BudgetFormData;
  result: BudgetBreakdown;
}

export function BudgetResults({ result, formData }: BudgetResultsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { exportToPdf, isExporting } = useBudgetExport({ formData, result });
  const resultRef = useRef<HTMLDivElement>(null);
  
  const handleExportPDF = async () => {
    try {
      await exportToPdf();
      alert("Your budget breakdown has been exported as a PDF.");
    } catch (error) {
      alert("There was an error exporting your budget breakdown.");
    }
  };
  
  const handleSaveToAccount = () => {
    // In the standalone app, we'll just show a placeholder message
    alert("In the full application, this would save to your account.");
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
      case "modern": return "Modern";
      case "rustic": return "Rustic";
      case "classic": return "Classic";
      case "boho": return "Bohemian";
      case "vintage": return "Vintage";
      case "outdoor": return "Outdoor";
      default: return formData.style;
    }
  };
  
  const renderResultSummary = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <h2 className="text-2xl font-serif font-semibold mb-2">
              Your Wedding Budget Breakdown
            </h2>
            <p className="text-gray-600">
              Here's your personalized budget plan based on your preferences.
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-indigo-600">
              ${result.totalBudget.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Budget</p>
          </div>
        </div>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-6">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Wedding Date</p>
            <p className="font-medium">{formatDate(formData.weddingDate)}</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Location</p>
            <p className="font-medium">{formData.location}</p>
            <p className="text-xs text-gray-500">
              Regional factor: {result.regionalFactor.toFixed(2)}x
            </p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Guest Count</p>
            <p className="font-medium">{formData.guestCount} Guests</p>
          </div>
          
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Wedding Style</p>
            <p className="font-medium">{getWeddingStyleLabel()}</p>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2">AI Confidence:</span>
            <span 
              className={`font-medium ${
                result.confidenceScore >= 85 ? "text-green-600" : 
                result.confidenceScore >= 70 ? "text-amber-600" : 
                "text-red-600"
              }`}
            >
              {result.confidenceScore}%
            </span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={handleExportPDF}
              disabled={isExporting}
              className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-300 transition-colors flex items-center gap-1"
            >
              {isExporting ? "Exporting..." : "Export PDF"}
            </button>
            
            <button 
              onClick={handleSaveToAccount}
              className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Save to Account
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const renderChartSection = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Budget Allocation</h3>
        </div>
        <div className="p-6">
          <BudgetChart 
            categories={result.categories} 
            totalBudget={result.totalBudget}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
    );
  };
  
  const renderCategorySection = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg mb-8">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Category Breakdown</h3>
        </div>
        <div className="p-6">
          <CategoryBreakdown 
            categories={result.categories} 
            totalBudget={result.totalBudget}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </div>
    );
  };
  
  const renderRecommendationsSection = () => {
    return (
      <div className="bg-white shadow-lg rounded-lg">
        <div className="p-4 border-b bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-t-lg">
          <h3 className="text-lg font-medium">AI Recommendations & Savings</h3>
        </div>
        <div className="p-6">
          <AIRecommendations 
            recommendations={result.recommendations}
            savingsSuggestions={result.savingsSuggestions}
            confidenceScore={result.confidenceScore}
            totalPotentialSavings={result.totalPotentialSavings}
          />
        </div>
      </div>
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
