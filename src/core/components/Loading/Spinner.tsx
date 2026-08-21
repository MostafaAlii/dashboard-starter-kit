/*
 * ========================================
 * SPINNER COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'primary' | 'secondary' | 'white';
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: { width: '20px', height: '20px', borderWidth: '2px' },
  md: { width: '32px', height: '32px', borderWidth: '3px' },
  lg: { width: '44px', height: '44px', borderWidth: '3px' },
  xl: { width: '56px', height: '56px', borderWidth: '4px' },
};

const variantMap = {
  primary: 'var(--color-primary, #3b82f6)',
  secondary: 'var(--color-text-secondary, #475569)',
  white: '#ffffff',
};

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      className = '',
      label,
      ...props
    },
    ref
  ) => {
    const color = variantMap[variant];
    const sizeStyle = sizeMap[size];

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.75rem',
        }}
        className={className}
        {...props}
      >
        <div
          style={{
            width: sizeStyle.width,
            height: sizeStyle.height,
            border: `${sizeStyle.borderWidth} solid ${color}33`,
            borderTopColor: color,
            borderRadius: '50%',
            animation: 'spin 0.7s linear infinite',
          }}
        />

        {label && (
          <span
            style={{
              fontSize: 'var(--font-size-sm, 14px)',
              color: 'var(--color-text-secondary, #475569)',
            }}
          >
            {label}
          </span>
        )}
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export default Spinner;