import React from 'react';
export const Progress = ({ value, max = 100, className = '' }) => {
    const percentage = value !== undefined ? (value / max) * 100 : 0;
    return (<div className={`relative w-full overflow-hidden rounded-full bg-secondary ${className}`}>
      <div className="h-2 w-full flex-1 bg-primary transition-all duration-300 ease-in-out" style={{
            transform: `translateX(-${100 - percentage}%)`,
            ...(value === undefined && { animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' })
        }}/>
    </div>);
};
