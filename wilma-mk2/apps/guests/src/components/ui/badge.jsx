import React from 'react';
export const Badge = ({ children, variant = 'default', className = '' }) => {
    const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
    const variantStyles = {
        default: 'border-transparent bg-royal text-white hover:bg-royal/80',
        secondary: 'border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-gray-900'
    };
    return (<div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>);
};
