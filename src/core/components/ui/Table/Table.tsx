/*
 * ========================================
 * TABLE COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { TableProps } from './types';

export const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      className = '',
      striped = false,
      hoverable = false,
      bordered = false,
      compact = false,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        style={{
          overflow: 'auto',
          width: '100%',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <table
          ref={ref}
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text, #0f172a)',
            direction: isRTL ? 'rtl' : 'ltr',
            ...(bordered && {
              border: '1px solid var(--color-border, #e2e8f0)',
            }),
          }}
          className={className}
          {...props}
        >
          {children}
        </table>
      </div>
    );
  }
);

Table.displayName = 'Table';

export default Table;