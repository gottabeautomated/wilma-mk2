import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import type { BudgetChartProps } from '../types/budget.types';

export const BudgetChart: React.FC<BudgetChartProps & {
  selectedCategory?: string;
  onSelectCategory?: (id: string) => void;
}> = ({ 
  categories, 
  totalBudget,
  selectedCategory,
  onSelectCategory 
}) => {
  // Format data for the chart
  const chartData = categories.map(category => ({
    id: category.id,
    name: category.name,
    value: category.amount,
    percentage: category.percentage,
    color: category.color
  }));

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-gray-600">${data.value.toLocaleString()}</p>
          <p className="text-gray-500">{(data.percentage * 100).toFixed(1)}% of budget</p>
        </div>
      );
    }
    return null;
  };

  // Handle category selection
  const handlePieClick = (data: any) => {
    if (onSelectCategory) {
      onSelectCategory(data.id);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Budget Breakdown</h3>
      
      <div className="text-center mb-4">
        <div className="text-3xl font-serif text-gray-800">
          ${totalBudget.toLocaleString()}
        </div>
        <div className="text-sm text-gray-500">Total Wedding Budget</div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
              onClick={handlePieClick}
              isAnimationActive={true}
              animationDuration={800}
              animationBegin={200}
            >
              {chartData.map((entry) => (
                <Cell 
                  key={`cell-${entry.id}`} 
                  fill={entry.color} 
                  stroke={selectedCategory === entry.id ? '#ffffff' : 'transparent'}
                  strokeWidth={selectedCategory === entry.id ? 2 : 0}
                  style={{ 
                    filter: selectedCategory === entry.id 
                      ? 'drop-shadow(0px 0px 6px rgba(0, 0, 0, 0.3))' 
                      : 'none',
                    opacity: selectedCategory && selectedCategory !== entry.id ? 0.7 : 1,
                    cursor: 'pointer'
                  }}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              iconType="circle"
              formatter={(value: string) => (
                <span className="text-sm text-gray-600 cursor-pointer">{value}</span>
              )}
              onClick={(data: any) => {
                if (onSelectCategory) {
                  onSelectCategory(data.id);
                }
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        Click on a segment or legend item to see category details
      </div>
    </div>
  );
};
