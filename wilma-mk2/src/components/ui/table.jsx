import React from 'react';
export const Table = ({ children, className = '' }) => {
    return (<div className="relative w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`}>
        {children}
      </table>
    </div>);
};
export const TableHeader = ({ children, className = '' }) => {
    return (<thead className={`[&_tr]:border-b ${className}`}>
      {children}
    </thead>);
};
export const TableBody = ({ children, className = '' }) => {
    return (<tbody className={`[&_tr:last-child]:border-0 ${className}`}>
      {children}
    </tbody>);
};
export const TableRow = ({ children, className = '' }) => {
    return (<tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
      {children}
    </tr>);
};
export const TableHead = ({ children, className = '' }) => {
    return (<th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </th>);
};
export const TableCell = ({ children, className = '' }) => {
    return (<td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
      {children}
    </td>);
};
