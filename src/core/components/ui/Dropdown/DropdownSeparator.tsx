/*
 * ========================================
 * DROPDOWN SEPARATOR
 * ========================================
 */

import { forwardRef } from 'react';
import type { DropdownSeparatorProps } from './types';

export const DropdownSeparator = forwardRef<HTMLHRElement, DropdownSeparatorProps>(
  ({ className = '' }, ref) => {
    return (
      <hr
        ref={ref}
        style={{
          margin: 'var(--spacing-2, 8px) var(--spacing-1, 4px)',
          border: 'none',
          borderTop: '1px solid var(--color-border, #e2e8f0)',
        }}
        className={className}
      />
    );
  }
);

DropdownSeparator.displayName = 'DropdownSeparator';