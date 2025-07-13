import React from 'react'

interface AlertProps {
  children: React.ReactNode
  variant?: 'default' | 'destructive'
  className?: string
}

interface AlertDescriptionProps {
  children: React.ReactNode
  className?: string
}

export const Alert = ({ children, variant = 'default', className = '' }: AlertProps) => {
  const variantStyles = {
    default: 'bg-blue-50 border-blue-200 text-blue-800',
    destructive: 'bg-red-50 border-red-200 text-red-800'
  }
  
  return (
    <div className={`relative w-full rounded-lg border p-4 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  )
}

export const AlertDescription = ({ children, className = '' }: AlertDescriptionProps) => {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  )
} 