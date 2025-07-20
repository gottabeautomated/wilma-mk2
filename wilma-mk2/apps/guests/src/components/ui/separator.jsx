import React from 'react';
export const Separator = ({ orientation = 'horizontal', className = '' }) => {
    return (<div className={`shrink-0 bg-gray-200 ${orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'} ${className}`}/>);
};
