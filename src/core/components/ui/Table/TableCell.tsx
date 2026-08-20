/*
 * ========================================
 * TABLE CELL
 * ========================================
 */

import { forwardRef } from 'react';
import type { TableCellProps } from './types';
import { useLanguage } from '../../../providers/LanguageProvider';

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      children,
      className = '',
      as = 'td',
      align,
      width,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const alignMap = {
      left: isRTL ? 'right' : 'left',
      center: 'center',
      right: isRTL ? 'left' : 'right',
    };

    const Component = as === 'th' ? 'th' : 'td';

    return (
      <Component
        ref={ref}
        style={{
          padding: '0.75rem 1rem',
          textAlign: align ? alignMap[align] : (isRTL ? 'right' : 'left'),
          width: width || 'auto',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TableCell.displayName = 'TableCell';

export default TableCell;