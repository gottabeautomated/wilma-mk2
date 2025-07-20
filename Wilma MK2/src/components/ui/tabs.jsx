import React, { createContext, useContext, useState } from 'react';
const TabsContext = createContext(undefined);
export const Tabs = ({ defaultValue, children, className = '' }) => {
    const [value, setValue] = useState(defaultValue);
    return (<TabsContext.Provider value={{ value, onValueChange: setValue }}>
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </TabsContext.Provider>);
};
export const TabsList = ({ children, className = '' }) => {
    return (<div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
      {children}
    </div>);
};
export const TabsTrigger = ({ value, children, className = '' }) => {
    const context = useContext(TabsContext);
    if (!context)
        throw new Error('TabsTrigger must be used within Tabs');
    const isActive = context.value === value;
    return (<button className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${isActive
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'} ${className}`} onClick={() => context.onValueChange(value)}>
      {children}
    </button>);
};
export const TabsContent = ({ value, children, className = '' }) => {
    const context = useContext(TabsContext);
    if (!context)
        throw new Error('TabsContent must be used within Tabs');
    if (context.value !== value)
        return null;
    return (<div className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}>
      {children}
    </div>);
};
