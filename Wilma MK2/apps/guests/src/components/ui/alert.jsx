import React from 'react';
export const Alert = ({ children, variant = 'default', className = '' }) => {
    const variantStyles = {
        default: 'bg-blue-50 border-blue-200 text-blue-800',
        destructive: 'bg-red-50 border-red-200 text-red-800'
    };
    return (<div className={`relative w-full rounded-lg border p-4 ${variantStyles[variant]} ${className}`}>
      {children}
    </div>);
};
export const AlertDescription = ({ children, className = '' }) => {
    return (<div className={`text-sm ${className}`}>
      {children}
    </div>);
};
