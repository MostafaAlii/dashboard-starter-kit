/*
 * ========================================
 * TABLE ROW
 * ========================================
 */

import { forwardRef } from 'react';
import type { TableRowProps } from './types';
import { useLanguage } from '../../../providers/LanguageProvider';

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ children, className = '', hoverable = true, ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <tr
        ref={ref}
        style={{
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
          transition: 'background 0.2s ease',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        onMouseEnter={(e) => {
          if (hoverable) {
            e.currentTarget.style.background = 'var(--color-background-secondary, #f1f5f9)';
          }
        }}
        onMouseLeave={(e) => {
          if (hoverable) {
            e.currentTarget.style.background = 'transparent';
          }
        }}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = 'TableRow';

export default TableRow;