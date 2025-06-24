import React from 'react';
import type { CategoryBreakdownProps } from '../types/budget.types';

export const CategoryBreakdown: React.FC<CategoryBreakdownProps> = ({
  categories,
  totalBudget,
  selectedCategory,
  onSelectCategory
}) => {
  // Filter for selected category or show all
  const categoriesToShow = selectedCategory 
    ? categories.filter(cat => cat.id === selectedCategory)
    : categories;
  
  // Sort by amount, higher first
  const sortedCategories = [...categoriesToShow].sort((a, b) => b.amount - a.amount);
  
  // Clear selected category
  const handleClearSelection = () => {
    if (onSelectCategory) {
      onSelectCategory(undefined);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.name} Details`
              : 'Category Breakdown'
            }
          </h3>
          
          {selectedCategory && (
            <button
              onClick={handleClearSelection}
              className="text-sm text-indigo-600 hover:text-indigo-800"
            >
              View All Categories
            </button>
          )}
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {sortedCategories.map(category => (
          <div 
            key={category.id || category.name}
            className={`p-4 transition-colors cursor-pointer hover:bg-gray-50 ${
              selectedCategory === category.id ? 'bg-indigo-50' : ''
            }`}
            onClick={() => category.id && onSelectCategory && onSelectCategory(category.id)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: category.color || '#' + Math.floor(Math.random()*16777215).toString(16) }}
                />
                <h4 className="font-medium text-gray-800">
                  {category.name}
                </h4>
                {category.isPriority && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full">
                    Priority
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-800">
                  ${category.amount.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500">
                  {Math.round(category.percentage * 100)}% of budget
                </div>
              </div>
            </div>
            
            {selectedCategory && (
              <div className="mt-4 space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-1">Description</h5>
                  <p className="text-sm text-gray-600">{category.description || 'No description available'}</p>
                </div>
                
                {category.recommendations && category.recommendations.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Recommendations</h5>
                    <ul className="space-y-1">
                      {category.recommendations.map((recommendation, i) => (
                        <li key={i} className="text-sm text-gray-600 flex">
                          <span className="text-green-500 mr-2">•</span>
                          {recommendation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {category.savingTips && category.savingTips.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-gray-700 mb-1">Savings Tips</h5>
                    <ul className="space-y-1">
                      {category.savingTips.map((tip, i) => (
                        <li key={i} className="text-sm text-gray-600 flex">
                          <span className="text-blue-500 mr-2">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
            
            {!selectedCategory && (
              <div className="mt-1">
                <p className="text-sm text-gray-600 truncate">{category.description || 'No description available'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!selectedCategory && (
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">Total Budget</span>
            <span className="font-medium text-gray-800">
              ${totalBudget.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
