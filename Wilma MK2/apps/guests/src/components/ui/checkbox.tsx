import React from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps {
  id?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export const Checkbox = ({ 
  id, 
  checked = false, 
  onCheckedChange, 
  disabled = false, 
  className = '' 
}: CheckboxProps) => {
  const handleClick = () => {
    if (!disabled && onCheckedChange) {
      onCheckedChange(!checked)
    }
  }

  return (
    <button
      id={id}
      type="button"
      role="checkbox"
      aria-checked={checked}
      disabled={disabled}
      onClick={handleClick}
      className={`
        peer h-4 w-4 shrink-0 rounded-sm border border-gray-300 
        ring-offset-background focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-royal focus-visible:ring-offset-2 
        disabled:cursor-not-allowed disabled:opacity-50 
        ${checked ? 'bg-royal text-white' : 'bg-white'}
        ${className}
      `}
    >
      {checked && (
        <Check className="h-3 w-3" />
      )}
    </button>
  )
} 