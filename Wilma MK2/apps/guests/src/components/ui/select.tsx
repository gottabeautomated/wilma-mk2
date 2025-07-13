import React, { createContext, useContext, useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectContextType {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = createContext<SelectContextType | undefined>(undefined)

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
  className?: string
}

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
}

interface SelectContentProps {
  children: React.ReactNode
  className?: string
}

interface SelectItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface SelectValueProps {
  placeholder?: string
  className?: string
}

export const Select = ({ value, onValueChange, children, className = '' }: SelectProps) => {
  const [open, setOpen] = useState(false)
  
  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className={`relative ${className}`}>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export const SelectTrigger = ({ children, className = '' }: SelectTriggerProps) => {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectTrigger must be used within Select')
  
  return (
    <button
      className={`flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-royal focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => context.setOpen(!context.open)}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
}

export const SelectValue = ({ placeholder = '', className = '' }: SelectValueProps) => {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectValue must be used within Select')
  
  return (
    <span className={className}>
      {context.value || placeholder}
    </span>
  )
}

export const SelectContent = ({ children, className = '' }: SelectContentProps) => {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectContent must be used within Select')
  
  if (!context.open) return null
  
  return (
    <div className={`absolute top-full left-0 z-50 w-full min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 text-gray-900 shadow-md ${className}`}>
      {children}
    </div>
  )
}

export const SelectItem = ({ value, children, className = '' }: SelectItemProps) => {
  const context = useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within Select')
  
  return (
    <div
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 hover:text-gray-900 ${className}`}
      onClick={() => {
        context.onValueChange(value)
        context.setOpen(false)
      }}
    >
      {children}
    </div>
  )
} 