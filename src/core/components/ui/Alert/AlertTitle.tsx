/*
 * ========================================
 * ALERT TITLE
 * ========================================
 */

import { forwardRef } from 'react';
import type { AlertTitleProps } from './types';

export const AlertTitle = forwardRef<HTMLDivElement, AlertTitleProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-text, #0f172a)',
          marginBottom: '0.25rem',
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;