import type { BudgetBreakdown } from '@wilma/shared-types'
import { formatCurrency } from '@wilma/shared-utils'

interface CategoryBreakdownProps {
  breakdown: BudgetBreakdown
}

export function CategoryBreakdown({ breakdown }: CategoryBreakdownProps) {
  // Convert to array and sort by amount (descending)
  const categories = Object.entries(breakdown)
    .map(([name, amount]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      amount
    }))
    .sort((a, b) => b.amount - a.amount)
  
  const total = Object.values(breakdown).reduce((sum, amount) => sum + amount, 0)

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <div key={category.name} className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-800">{category.name}</span>
            <span className="font-semibold text-wedding-rose">{formatCurrency(category.amount)}</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-wedding-rose to-wedding-mauve"
              style={{ width: `${Math.round((category.amount / total) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{Math.round((category.amount / total) * 100)}% of total</span>
            {category.name === 'Venue' && (
              <span className="text-wedding-sage">Key investment</span>
            )}
            {category.name === 'Catering' && (
              <span className="text-wedding-sage">Guest experience</span>
            )}
          </div>
        </div>
      ))}
      
      <div className="border-t border-gray-200 pt-4 mt-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg text-gray-900">Total Budget</span>
          <span className="font-bold text-xl text-wedding-rose">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  )
}
