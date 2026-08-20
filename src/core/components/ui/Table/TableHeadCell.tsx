/*
 * ========================================
 * TABLE HEAD CELL
 * ========================================
 */

import { forwardRef } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import type { TableHeadCellProps } from './types';
import { useLanguage } from '../../../providers/LanguageProvider';

export const TableHeadCell = forwardRef<HTMLTableCellElement, TableHeadCellProps>(
  (
    {
      children,
      className = '',
      align,
      width,
      sortable = false,
      sorted = null,
      onSort,
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

    const handleClick = () => {
      if (sortable && onSort) {
        onSort();
      }
    };

    return (
      <th
        ref={ref}
        style={{
          padding: '0.75rem 1rem',
          textAlign: align ? alignMap[align] : (isRTL ? 'right' : 'left'),
          width: width || 'auto',
          whiteSpace: 'nowrap',
          verticalAlign: 'middle',
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-text, #0f172a)',
          cursor: sortable ? 'pointer' : 'default',
          userSelect: 'none',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        onClick={handleClick}
        {...props}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            justifyContent: align ? alignMap[align] : (isRTL ? 'flex-end' : 'flex-start'),
          }}
        >
          <span>{children}</span>

          {sortable && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                color: 'var(--color-text-muted, #94a3b8)',
              }}
            >
              {sorted === 'asc' && <ChevronUp size={14} />}
              {sorted === 'desc' && <ChevronDown size={14} />}
              {!sorted && <ChevronsUpDown size={14} />}
            </span>
          )}
        </div>
      </th>
    );
  }
);

TableHeadCell.displayName = 'TableHeadCell';

export default TableHeadCell;