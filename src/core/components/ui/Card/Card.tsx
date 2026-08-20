/*
 * ========================================
 * CARD COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { CardProps } from './types';

const paddingStyles = {
  none: '0',
  sm: 'var(--spacing-3, 12px)',
  md: 'var(--spacing-4, 16px)',
  lg: 'var(--spacing-6, 24px)',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className = '',
      variant = 'default',
      padding = 'md',
      hoverable = false,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const variantStyles = {
      default: {
        background: 'var(--color-card, #ffffff)',
        border: '1px solid var(--color-border, #e2e8f0)',
        boxShadow: 'var(--shadow-sm, 0 1px 2px 0 rgb(0 0 0 / 0.05))',
      },
      outline: {
        background: 'transparent',
        border: '1px solid var(--color-border, #e2e8f0)',
        boxShadow: 'none',
      },
      ghost: {
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
      },
    };

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: paddingStyles[padding],
          borderRadius: 'var(--radius-lg, 12px)',
          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
          direction: isRTL ? 'rtl' : 'ltr',
          ...variantStyles[variant],
          ...(hoverable && {
            cursor: 'pointer',
            '&:hover': {
              boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
              transform: 'translateY(-2px)',
            },
          }),
        }}
        className={className}
        {...props}
        onMouseEnter={(e) => {
          if (hoverable) {
            e.currentTarget.style.boxShadow = 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }
        }}
        onMouseLeave={(e) => {
          if (hoverable) {
            e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || 'none';
            e.currentTarget.style.transform = 'translateY(0)';
          }
        }}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;