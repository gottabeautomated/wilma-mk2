import React from 'react';
export const Alert = ({ variant = 'default', children, className = '' }) => {
    const baseStyles = 'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground';
    const variantStyles = {
        default: 'bg-background text-foreground',
        destructive: 'border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive'
    };
    return (<div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>);
};
export const AlertDescription = ({ children, className = '' }) => {
    return (<div className={`text-sm [&_p]:leading-relaxed ${className}`}>
      {children}
    </div>);
};
