/*
 * ========================================
 * TABLE HEADER
 * ========================================
 */

import { forwardRef } from 'react';
import type { TableHeaderProps } from './types';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <thead
        ref={ref}
        style={{
          background: 'var(--color-background-secondary, #f1f5f9)',
          borderBottom: '2px solid var(--color-border, #e2e8f0)',
        }}
        className={className}
        {...props}
      >
        {children}
      </thead>
    );
  }
);

TableHeader.displayName = 'TableHeader';

export default TableHeader;