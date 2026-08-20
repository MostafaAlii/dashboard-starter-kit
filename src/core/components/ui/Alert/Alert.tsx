/*
 * ========================================
 * ALERT COMPONENT
 * ========================================
 */

import { forwardRef, useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { AlertProps, AlertVariant } from './types';

const variantStyles: Record<
  AlertVariant,
  { bg: string; border: string; text: string; iconColor: string }
> = {
  success: {
    bg: 'var(--color-success-light, #f0fdf4)',
    border: 'var(--color-success, #22c55e)',
    text: 'var(--color-success, #22c55e)',
    iconColor: 'var(--color-success, #22c55e)',
  },
  warning: {
    bg: 'var(--color-warning-light, #fefce8)',
    border: 'var(--color-warning, #eab308)',
    text: 'var(--color-warning, #eab308)',
    iconColor: 'var(--color-warning, #eab308)',
  },
  error: {
    bg: 'var(--color-error-light, #fef2f2)',
    border: 'var(--color-error, #ef4444)',
    text: 'var(--color-error, #ef4444)',
    iconColor: 'var(--color-error, #ef4444)',
  },
  info: {
    bg: 'var(--color-info-light, #eff6ff)',
    border: 'var(--color-info, #3b82f6)',
    text: 'var(--color-info, #3b82f6)',
    iconColor: 'var(--color-info, #3b82f6)',
  },
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      variant = 'info',
      title,
      className = '',
      dismissible = false,
      onDismiss,
      icon,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const styles = variantStyles[variant];

    const handleDismiss = () => {
      setIsVisible(false);
      onDismiss?.();
    };

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '1rem',
          borderRadius: 'var(--radius-md, 8px)',
          background: styles.bg,
          borderLeft: `4px solid ${styles.border}`,
          borderRight: isRTL ? `4px solid ${styles.border}` : 'none',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        role="alert"
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              marginTop: '2px',
              color: styles.iconColor,
            }}
          >
            {icon}
          </span>
        )}

        {/* Content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
          }}
        >
          {title && (
            <div
              style={{
                fontWeight: 'var(--font-weight-semibold, 600)',
                color: 'var(--color-text, #0f172a)',
                marginBottom: '0.25rem',
              }}
            >
              {title}
            </div>
          )}
          <div
            style={{
              color: 'var(--color-text-secondary, #475569)',
              fontSize: 'var(--font-size-sm, 14px)',
            }}
          >
            {children}
          </div>
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss alert"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              padding: '0.25rem',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-muted, #94a3b8)',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm, 4px)',
              transition: 'background 0.2s ease',
              marginTop: '2px',
              marginLeft: isRTL ? 0 : '-0.25rem',
              marginRight: isRTL ? '-0.25rem' : 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-background-secondary, #f1f5f9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={18} />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export default Alert;