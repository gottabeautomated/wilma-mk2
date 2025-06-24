import React from 'react';
import type { BudgetChartProps } from '../types/budget.types';

export const BudgetChart: React.FC<BudgetChartProps> = ({ 
  categories, 
  totalBudget,
  selectedCategory,
  onSelectCategory 
}) => {
  // In the standalone version, we'll use a simplified chart implementation
  // This would normally use a charting library like Recharts, Chart.js, etc.
  
  // Format data for the chart
  const sortedCategories = [...categories].sort((a, b) => b.amount - a.amount);

  return (
    <div className="w-full rounded-lg p-4">
      <div className="text-center mb-6">
        <div className="text-3xl font-serif text-gray-800">
          ${totalBudget.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Wedding Budget</div>
      </div>
      
      <div className="space-y-4">
        {sortedCategories.map((category) => (
          <div
            key={category.id}
            className={`p-3 rounded-md transition-colors cursor-pointer ${
              selectedCategory === category.id 
                ? 'bg-indigo-50 border border-indigo-200' 
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => category.id && onSelectCategory?.(category.id)}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: category.color || '#' + Math.floor(Math.random()*16777215).toString(16) }}
                />
                <span className="font-medium">{category.name}</span>
              </div>
              <span className="font-medium">${category.amount.toLocaleString()}</span>
            </div>
            
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{ 
                  width: `${category.percentage * 100}%`,
                  backgroundColor: category.color || '#' + Math.floor(Math.random()*16777215).toString(16)
                }}
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{category.description?.split(',')[0] || ''}</span>
              <span>{(category.percentage * 100).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Click on a category to see more details
      </div>
    </div>
  );
};
