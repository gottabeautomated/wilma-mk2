import { useState, useCallback } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from "recharts";
import type { BudgetChartProps, CategoryAllocation, ChartData } from "../types/budget.types";

// Wedding color palette
const COLORS = [
  "#FF5F9E", // rose
  "#B3005E", // deep rose
  "#060047", // navy
  "#FFF5E0", // cream
  "#E90064", // accent 
  "#FF9F29", // gold
  "#3C8654", // green
  "#7D5A50", // brown
  "#DB9D47", // mustard
  "#3A3042", // purple
  "#94A061"  // olive
];

// Active shape for the pie chart (when a segment is selected)
const renderActiveShape = (props: any) => {
  const {
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#333" fontSize={16} fontWeight={600}>
        {payload.name}
      </text>
      <text x={cx} y={cy + 20} textAnchor="middle" fill="#666" fontSize={14}>
        {formattedValue}
      </text>
      <text x={cx} y={cy + 40} textAnchor="middle" fill="#999" fontSize={12}>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 15}
        fill={fill}
      />
    </g>
  );
};

export function BudgetChart({ 
  categories, 
  totalBudget, 
  selectedCategory,
  onSelectCategory 
}: BudgetChartProps) {
  // State for active index (which segment is selected)
  const [activeIndex, setActiveIndex] = useState(-1);

  // Format the data for the pie chart
  const chartData: ChartData[] = categories.map((category, index) => ({
    name: category.category,
    value: category.percentage,
    amount: category.amount,
    color: COLORS[index % COLORS.length],
    isHighPriority: category.isHighPriority
  }));

  // Handler for when a segment is hovered
  const onPieEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
    if (onSelectCategory) {
      onSelectCategory(chartData[index].name);
    }
  }, [chartData, onSelectCategory]);

  // Handler for when mouse leaves the pie chart
  const onPieLeave = useCallback(() => {
    setActiveIndex(-1);
    if (onSelectCategory) {
      onSelectCategory("");
    }
  }, [onSelectCategory]);

  // Custom legend with priority indicator
  const renderLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-1 text-xs mt-4">
        {payload.map((entry: any, index: number) => {
          const category = categories.find(c => c.category === entry.value);
          return (
            <li 
              key={`item-${index}`} 
              className={`flex items-center cursor-pointer transition-opacity hover:opacity-75 ${
                selectedCategory && selectedCategory !== entry.value ? 'opacity-50' : ''
              }`}
              onClick={() => {
                if (onSelectCategory) {
                  onSelectCategory(entry.value);
                  setActiveIndex(payload.findIndex((p: any) => p.value === entry.value));
                }
              }}
            >
              <div className="w-3 h-3 mr-1" style={{ backgroundColor: entry.color }} />
              <span className="truncate">
                {entry.value}
                {category?.isHighPriority && (
                  <span className="ml-1 text-[hsl(var(--wedding-gold))]">★</span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="w-full h-80 sm:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            dataKey="amount"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke={entry.isHighPriority ? "#FFD700" : "#fff"}
                strokeWidth={entry.isHighPriority ? 2 : 1}
              />
            ))}
          </Pie>
          <Legend content={renderLegend} />
        </PieChart>
      </ResponsiveContainer>
      
      {/* Total budget display */}
      <div className="text-center mt-2">
        <div className="text-sm text-gray-500">Total Budget</div>
        <div className="text-xl font-semibold text-[hsl(var(--wedding-navy))]">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          }).format(totalBudget)}
        </div>
      </div>
    </div>
  );
}
