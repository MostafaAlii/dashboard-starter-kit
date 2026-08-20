/*
 * ========================================
 * ALERT DESCRIPTION
 * ========================================
 */

import { forwardRef } from 'react';
import type { AlertDescriptionProps } from './types';

export const AlertDescription = forwardRef<HTMLDivElement, AlertDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          color: 'var(--color-text-secondary, #475569)',
          fontSize: 'var(--font-size-sm, 14px)',
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertDescription.displayName = 'AlertDescription';

export default AlertDescription;