import React from 'react';
export const Card = ({ children, className = '', onClick }) => {
    return (<div className={`rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md transition-shadow' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>);
};
export const CardHeader = ({ children, className = '' }) => {
    return (<div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>);
};
export const CardTitle = ({ children, className = '' }) => {
    return (<h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h3>);
};
export const CardContent = ({ children, className = '' }) => {
    return (<div className={`p-6 pt-0 ${className}`}>
      {children}
    </div>);
};
