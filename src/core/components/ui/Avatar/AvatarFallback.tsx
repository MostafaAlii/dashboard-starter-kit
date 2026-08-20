/*
 * ========================================
 * AVATAR FALLBACK
 * ========================================
 */

import { useState, useEffect, forwardRef } from 'react';
import type { AvatarFallbackProps } from './types';

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ children, delayMs = 0, className = '', ...props }, ref) => {
    const [show, setShow] = useState(delayMs === 0);

    useEffect(() => {
      if (delayMs > 0) {
        const timer = setTimeout(() => setShow(true), delayMs);
        return () => clearTimeout(timer);
      }
    }, [delayMs]);

    if (!show) return null;

    return (
      <span
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          fontSize: 'inherit',
          fontWeight: 'var(--font-weight-medium, 500)',
          color: 'var(--color-text-secondary, #475569)',
          background: 'var(--color-background-secondary, #f1f5f9)',
          textTransform: 'uppercase',
          userSelect: 'none',
        }}
        className={className}
        {...props}
      >
        {typeof children === 'string'
          ? children
              .split(' ')
              .map((word) => word[0])
              .join('')
              .slice(0, 2)
          : children}
      </span>
    );
  }
);

AvatarFallback.displayName = 'AvatarFallback';