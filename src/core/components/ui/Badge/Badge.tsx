/*
 * ========================================
 * BADGE COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { BadgeProps, BadgeVariant, BadgeSize } from './types';

const variantStyles: Record<
  BadgeVariant,
  { bg: string; text: string; border: string }
> = {
  primary: {
    bg: 'var(--color-primary-light, #eff6ff)',
    text: 'var(--color-primary, #3b82f6)',
    border: 'var(--color-primary, #3b82f6)',
  },
  secondary: {
    bg: 'var(--color-secondary-light, #f5f3ff)',
    text: 'var(--color-secondary, #8b5cf6)',
    border: 'var(--color-secondary, #8b5cf6)',
  },
  success: {
    bg: 'var(--color-success-light, #f0fdf4)',
    text: 'var(--color-success, #22c55e)',
    border: 'var(--color-success, #22c55e)',
  },
  danger: {
    bg: 'var(--color-error-light, #fef2f2)',
    text: 'var(--color-error, #ef4444)',
    border: 'var(--color-error, #ef4444)',
  },
  warning: {
    bg: 'var(--color-warning-light, #fefce8)',
    text: 'var(--color-warning, #eab308)',
    border: 'var(--color-warning, #eab308)',
  },
  info: {
    bg: 'var(--color-info-light, #eff6ff)',
    text: 'var(--color-info, #3b82f6)',
    border: 'var(--color-info, #3b82f6)',
  },
  ghost: {
    bg: 'transparent',
    text: 'var(--color-text-secondary, #475569)',
    border: 'transparent',
  },
  outline: {
    bg: 'transparent',
    text: 'var(--color-text, #0f172a)',
    border: 'var(--color-border, #e2e8f0)',
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string }> = {
  xs: { padding: '0.05rem 0.4rem', fontSize: '0.6rem' },
  sm: { padding: '0.1rem 0.5rem', fontSize: '0.65rem' },
  md: { padding: '0.15rem 0.6rem', fontSize: '0.75rem' },
  lg: { padding: '0.2rem 0.8rem', fontSize: '0.85rem' },
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      rounded = false,
      className = '',
      dot = false,
      dotColor,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    return (
      <span
        ref={ref}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          padding: sizeStyle.padding,
          fontSize: sizeStyle.fontSize,
          fontWeight: 'var(--font-weight-medium, 500)',
          borderRadius: rounded ? 'var(--radius-full, 9999px)' : 'var(--radius-sm, 4px)',
          background: variantStyle.bg,
          color: variantStyle.text,
          border:
            variant === 'outline' ? `1px solid ${variantStyle.border}` : 'none',
          direction: isRTL ? 'rtl' : 'ltr',
          whiteSpace: 'nowrap',
        }}
        className={className}
        {...props}
      >
        {dot && (
          <span
            style={{
              display: 'inline-block',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: dotColor || variantStyle.text,
              flexShrink: 0,
            }}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export default Badge;