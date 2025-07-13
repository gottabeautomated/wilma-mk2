import React from 'react'

interface ProgressProps {
  value?: number
  max?: number
  className?: string
}

export const Progress = ({ value = 0, max = 100, className = '' }: ProgressProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <div className={`relative h-4 w-full overflow-hidden rounded-full bg-gray-100 ${className}`}>
      <div
        className="h-full w-full flex-1 bg-royal transition-all"
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
} 