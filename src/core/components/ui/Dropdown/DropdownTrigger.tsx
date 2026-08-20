/*
 * ========================================
 * DROPDOWN TRIGGER
 * ========================================
 */

import { forwardRef } from 'react';
import type { DropdownTriggerProps } from './types';

export const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, className = '' }, ref) => {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';