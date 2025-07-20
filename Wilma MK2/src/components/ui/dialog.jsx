import React from 'react';
export const Dialog = ({ open, onOpenChange, children }) => {
    if (!open)
        return null;
    return (<div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => onOpenChange(false)}/>
      <div className="relative">{children}</div>
    </div>);
};
export const DialogContent = ({ children, className = '' }) => {
    return (<div className={`
      bg-white rounded-lg shadow-xl border 
      max-w-md w-full mx-4 p-6 
      ${className}
    `}>
      {children}
    </div>);
};
export const DialogHeader = ({ children }) => {
    return (<div className="flex flex-col space-y-1.5 mb-4">
      {children}
    </div>);
};
export const DialogTitle = ({ children, className = '' }) => {
    return (<h2 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>
      {children}
    </h2>);
};
export const DialogFooter = ({ children }) => {
    return (<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6">
      {children}
    </div>);
};
