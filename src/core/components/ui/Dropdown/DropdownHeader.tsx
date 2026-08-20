/*
 * ========================================
 * DROPDOWN HEADER
 * ========================================
 */

import { forwardRef } from 'react';
import type { DropdownHeaderProps } from './types';

export const DropdownHeader = forwardRef<HTMLDivElement, DropdownHeaderProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          padding: 'var(--spacing-2, 8px) var(--spacing-3, 12px)',
          fontSize: 'var(--font-size-xs, 12px)',
          fontWeight: 'var(--font-weight-medium, 500)',
          color: 'var(--color-text-muted, #94a3b8)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          textAlign: 'var(--start, left)' as any,
        }}
        className={className}
        role="menuitem"
      >
        {children}
      </div>
    );
  }
);

DropdownHeader.displayName = 'DropdownHeader';