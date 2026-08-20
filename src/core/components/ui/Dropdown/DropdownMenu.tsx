/*
 * ========================================
 * DROPDOWN MENU
 * ========================================
 */

import { forwardRef } from 'react';
import type { DropdownMenuProps } from './types';

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div ref={ref} role="menu" className={className}>
        {children}
      </div>
    );
  }
);

DropdownMenu.displayName = 'DropdownMenu';