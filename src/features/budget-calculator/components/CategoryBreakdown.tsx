import { useState } from "react";
import { Lightbulb, AlertCircle, DollarSign, Percent } from "lucide-react";
import type { CategoryBreakdownProps } from "../types/budget.types";

export function CategoryBreakdown({ 
  categories, 
  totalBudget,
  selectedCategory,
  onSelectCategory
}: CategoryBreakdownProps) {
  const [showBreakdown, setShowBreakdown] = useState(true);
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Sort categories by amount (high to low)
  const sortedCategories = [...categories].sort((a, b) => b.amount - a.amount);
  
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-[hsl(var(--wedding-navy))]">
          Budget Breakdown
        </h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              showBreakdown ? 'bg-[hsl(var(--wedding-rose))] text-white' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setShowBreakdown(true)}
          >
            <DollarSign className="inline-block w-3 h-3 mr-1" />
            Amount
          </button>
          <button
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              !showBreakdown ? 'bg-[hsl(var(--wedding-rose))] text-white' : 'bg-gray-100 text-gray-500'
            }`}
            onClick={() => setShowBreakdown(false)}
          >
            <Percent className="inline-block w-3 h-3 mr-1" />
            Percent
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        {sortedCategories.map((category) => (
          <div 
            key={category.category}
            className={`p-4 border rounded-lg transition-all cursor-pointer ${
              selectedCategory === category.category 
                ? 'border-[hsl(var(--wedding-rose))] bg-[hsla(var(--wedding-rose)/0.05)]' 
                : 'border-gray-100 hover:border-gray-200'
            }`}
            onClick={() => onSelectCategory?.(category.category)}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-[hsl(var(--wedding-navy))]">
                {category.category}
                {category.isHighPriority && (
                  <span className="ml-1 text-[hsl(var(--wedding-gold))]">★</span>
                )}
              </h4>
              <div className="text-right">
                <div className="font-semibold">
                  {showBreakdown 
                    ? formatCurrency(category.amount) 
                    : `${category.percentage}%`
                  }
                </div>
                <div className="text-xs text-gray-500">
                  {showBreakdown 
                    ? `${category.percentage}% of budget` 
                    : formatCurrency(category.amount)
                  }
                </div>
              </div>
            </div>
            
            {category.description && (
              <p className="text-sm text-gray-600 mb-2">
                {category.description}
              </p>
            )}
            
            {category.recommendation && (
              <div className="flex items-start mt-3 p-2 bg-blue-50 rounded text-sm">
                <Lightbulb className="text-blue-500 w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-blue-800">{category.recommendation}</p>
              </div>
            )}
            
            {category.savingsTip && (
              <div className="flex items-start mt-3 p-2 bg-green-50 rounded text-sm">
                <AlertCircle className="text-green-500 w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-green-800">{category.savingsTip.description}</p>
                  <p className="text-green-600 font-medium mt-1">
                    Potential savings: {formatCurrency(category.savingsTip.potentialSavings)}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
