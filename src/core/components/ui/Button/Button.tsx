/*
 * ========================================
 * BUTTON COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ButtonProps, ButtonVariant, ButtonSize } from './types';

const variantStyles: Record<ButtonVariant, { bg: string; hover: string; text: string; border: string }> = {
  primary: {
    bg: 'var(--color-primary, #3b82f6)',
    hover: 'var(--color-primary-hover, #2563eb)',
    text: '#ffffff',
    border: 'var(--color-primary, #3b82f6)',
  },
  secondary: {
    bg: 'var(--color-secondary, #8b5cf6)',
    hover: 'var(--color-secondary-hover, #7c3aed)',
    text: '#ffffff',
    border: 'var(--color-secondary, #8b5cf6)',
  },
  success: {
    bg: 'var(--color-success, #22c55e)',
    hover: 'var(--color-success-hover, #16a34a)',
    text: '#ffffff',
    border: 'var(--color-success, #22c55e)',
  },
  danger: {
    bg: 'var(--color-error, #ef4444)',
    hover: 'var(--color-error-hover, #dc2626)',
    text: '#ffffff',
    border: 'var(--color-error, #ef4444)',
  },
  warning: {
    bg: 'var(--color-warning, #eab308)',
    hover: 'var(--color-warning-hover, #ca8a04)',
    text: '#0f172a',
    border: 'var(--color-warning, #eab308)',
  },
  info: {
    bg: 'var(--color-info, #3b82f6)',
    hover: 'var(--color-info-hover, #2563eb)',
    text: '#ffffff',
    border: 'var(--color-info, #3b82f6)',
  },
  ghost: {
    bg: 'transparent',
    hover: 'var(--color-background-secondary, #f1f5f9)',
    text: 'var(--color-text, #0f172a)',
    border: 'transparent',
  },
  outline: {
    bg: 'transparent',
    hover: 'var(--color-background-secondary, #f1f5f9)',
    text: 'var(--color-text, #0f172a)',
    border: 'var(--color-border, #e2e8f0)',
  },
};

const sizeStyles: Record<ButtonSize, { padding: string; fontSize: string; height: string; gap: string }> = {
  xs: { padding: '0.25rem 0.5rem', fontSize: '0.75rem', height: '28px', gap: '0.25rem' },
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.8125rem', height: '36px', gap: '0.375rem' },
  md: { padding: '0.5rem 1rem', fontSize: '0.875rem', height: '44px', gap: '0.5rem' },
  lg: { padding: '0.625rem 1.25rem', fontSize: '1rem', height: '52px', gap: '0.5rem' },
  xl: { padding: '0.75rem 1.5rem', fontSize: '1.125rem', height: '60px', gap: '0.625rem' },
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      type = 'button',
      onClick,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const variantStyle = variantStyles[variant];
    const sizeStyle = sizeStyles[size];

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || loading) return;
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        onClick={handleClick}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: sizeStyle.gap,
          padding: sizeStyle.padding,
          height: sizeStyle.height,
          fontSize: sizeStyle.fontSize,
          fontWeight: 'var(--font-weight-medium, 500)',
          borderRadius: 'var(--radius-md, 8px)',
          background: variant === 'ghost' || variant === 'outline' ? 'transparent' : variantStyle.bg,
          color: variant === 'ghost' || variant === 'outline' ? variantStyle.text : variantStyle.text,
          border: `1px solid ${variant === 'ghost' ? 'transparent' : variantStyle.border}`,
          cursor: disabled || loading ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : loading ? 0.7 : 1,
          width: fullWidth ? '100%' : 'auto',
          transition: 'background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease, color 0.2s ease',
          textDecoration: 'none',
          direction: isRTL ? 'rtl' : 'ltr',
          userSelect: 'none',
          position: 'relative',
          ...(variant === 'outline' && {
            background: 'transparent',
            border: `1px solid ${variantStyle.border}`,
          }),
          ...(variant === 'ghost' && {
            background: 'transparent',
            border: '1px solid transparent',
          }),
          // ===== في Dark Mode، النصوص تفضل بيضاء على الأزرار الأساسية =====
          ...((variant === 'primary' || variant === 'secondary' || variant === 'success' || variant === 'danger' || variant === 'info') && {
            color: '#ffffff',
          }),
        }}
        className={className}
        onMouseEnter={(e) => {
          if (disabled || loading) return;
          
          // ===== Hover Styles =====
          if (variant === 'ghost' || variant === 'outline') {
            e.currentTarget.style.background = variantStyle.hover;
            e.currentTarget.style.color = 'var(--color-text, #0f172a)';
          } else {
            e.currentTarget.style.background = variantStyle.hover;
            // ===== في primary/secondary/etc اللون يفضل أبيض =====
            if (variant === 'primary' || variant === 'secondary' || variant === 'success' || variant === 'danger' || variant === 'info') {
              e.currentTarget.style.color = '#ffffff';
            }
          }
        }}
        onMouseLeave={(e) => {
          if (variant === 'ghost' || variant === 'outline') {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = variantStyle.text;
          } else {
            e.currentTarget.style.background = variantStyle.bg;
            // ===== إعادة اللون الأصلي =====
            if (variant === 'primary' || variant === 'secondary' || variant === 'success' || variant === 'danger' || variant === 'info') {
              e.currentTarget.style.color = '#ffffff';
            } else if (variant === 'warning') {
              e.currentTarget.style.color = '#0f172a';
            }
          }
        }}
        {...props}
      >
        {/* Loading Spinner */}
        {loading && (
          <span
            style={{
              display: 'inline-block',
              width: '16px',
              height: '16px',
              border: '2px solid currentColor',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 0.6s linear infinite',
              marginRight: isRTL ? 0 : '0.5rem',
              marginLeft: isRTL ? '0.5rem' : 0,
            }}
          />
        )}

        {/* Left Icon */}
        {!loading && leftIcon && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              order: isRTL ? 2 : 0,
            }}
          >
            {leftIcon}
          </span>
        )}

        {/* Children */}
        <span
          style={{
            order: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
          }}
        >
          {children}
        </span>

        {/* Right Icon */}
        {!loading && rightIcon && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              order: isRTL ? 0 : 2,
            }}
          >
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;