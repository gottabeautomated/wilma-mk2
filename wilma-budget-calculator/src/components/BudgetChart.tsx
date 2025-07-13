import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import type { BudgetBreakdown } from '@wilma/shared-types'
import { formatCurrency } from '@wilma/shared-utils'

interface BudgetChartProps {
  breakdown: BudgetBreakdown
}

const COLORS = [
  '#F9A8D4', // wedding-rose
  '#C084FC', // wedding-mauve
  '#A78BFA', // wedding-lavender
  '#60A5FA', // wedding-blue
  '#34D399', // wedding-sage
  '#FBBF24', // wedding-gold
  '#F87171', // wedding-coral
]

export function BudgetChart({ breakdown }: BudgetChartProps) {
  // Convert breakdown object to an array for the chart
  const data = Object.entries(breakdown).map(([name, amount], index) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value: amount,
    color: COLORS[index % COLORS.length]
  }))

  const total = Object.values(breakdown).reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
