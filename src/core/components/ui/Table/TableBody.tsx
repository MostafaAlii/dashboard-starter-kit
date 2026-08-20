/*
 * ========================================
 * TABLE BODY
 * ========================================
 */

import { forwardRef } from 'react';
import type { TableBodyProps } from './types';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <tbody
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = 'TableBody';

export default TableBody;