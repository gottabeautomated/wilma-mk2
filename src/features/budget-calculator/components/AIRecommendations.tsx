import React from 'react';
import type { AIRecommendationsProps } from '../types/budget.types';

export const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  savingsSuggestions,
  confidenceScore,
  totalPotentialSavings
}) => {
  // Recommendations sorted by impact (high to low)
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    const impactOrder = { high: 0, medium: 1, low: 2 };
    return impactOrder[a.impact] - impactOrder[b.impact];
  });

  // Savings suggestions sorted by potential savings (high to low)
  const sortedSavings = [...savingsSuggestions].sort(
    (a, b) => b.potentialSavings - a.potentialSavings
  );

  // Get confidence color and description
  const getConfidenceInfo = (score: number) => {
    if (score >= 85) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        description: 'High confidence based on detailed inputs and regional data.'
      };
    } else if (score >= 75) {
      return {
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        description: 'Good confidence based on your inputs.'
      };
    } else {
      return {
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        description: 'Moderate confidence. Adding more details could improve accuracy.'
      };
    }
  };

  const confidenceInfo = getConfidenceInfo(confidenceScore);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-800">
            AI Recommendations
          </h3>
          <div className={`px-2 py-1 rounded-full text-sm ${confidenceInfo.bgColor} ${confidenceInfo.color}`}>
            {confidenceScore}% Confidence
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className={`p-3 rounded-lg ${confidenceInfo.bgColor} mb-4`}>
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full ${confidenceInfo.bgColor} flex items-center justify-center mr-3`}>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${confidenceInfo.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className={`text-sm ${confidenceInfo.color} font-medium`}>
                  AI Confidence Score: {confidenceScore}%
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {confidenceInfo.description}
                </p>
              </div>
            </div>
          </div>

          <h4 className="font-medium text-gray-800 mb-3">Top Recommendations</h4>
          <div className="space-y-3">
            {sortedRecommendations.slice(0, 3).map((recommendation, index) => (
              <div key={index} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    recommendation.impact === 'high'
                      ? 'bg-green-100 text-green-600'
                      : recommendation.impact === 'medium'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">{recommendation.title}</h5>
                    <p className="text-sm text-gray-600 mt-1">{recommendation.description}</p>
                    <div className="mt-2 flex items-center">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        recommendation.impact === 'high'
                          ? 'bg-green-100 text-green-700'
                          : recommendation.impact === 'medium'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {recommendation.impact === 'high'
                          ? 'High Impact'
                          : recommendation.impact === 'medium'
                          ? 'Medium Impact'
                          : 'Low Impact'}
                      </span>
                      <span className="ml-2 text-xs text-gray-500">{recommendation.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-medium text-gray-800">Potential Savings</h4>
            <span className="text-green-600 font-medium">
              Up to ${totalPotentialSavings.toLocaleString()}
            </span>
          </div>
          
          <div className="space-y-3">
            {sortedSavings.slice(0, 3).map((suggestion, index) => (
              <div key={index} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                <div className="flex justify-between">
                  <h5 className="font-medium text-gray-800">{suggestion.title}</h5>
                  <span className="text-green-600 font-medium">
                    ${suggestion.potentialSavings.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{suggestion.description}</p>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">{suggestion.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {recommendations.length > 3 && (
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View all {recommendations.length} recommendations
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
