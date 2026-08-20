/*
 * ========================================
 * TOAST COMPONENT
 * ========================================
 */

import { forwardRef, useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ToastProps, ToastVariant } from './types';

const variantStyles: Record<
  ToastVariant,
  { bg: string; border: string; icon: React.ReactNode; iconColor: string }
> = {
  success: {
    bg: 'var(--color-success-light, #f0fdf4)',
    border: 'var(--color-success, #22c55e)',
    icon: <CheckCircle size={20} />,
    iconColor: 'var(--color-success, #22c55e)',
  },
  warning: {
    bg: 'var(--color-warning-light, #fefce8)',
    border: 'var(--color-warning, #eab308)',
    icon: <AlertTriangle size={20} />,
    iconColor: 'var(--color-warning, #eab308)',
  },
  error: {
    bg: 'var(--color-error-light, #fef2f2)',
    border: 'var(--color-error, #ef4444)',
    icon: <AlertCircle size={20} />,
    iconColor: 'var(--color-error, #ef4444)',
  },
  info: {
    bg: 'var(--color-info-light, #eff6ff)',
    border: 'var(--color-info, #3b82f6)',
    icon: <Info size={20} />,
    iconColor: 'var(--color-info, #3b82f6)',
  },
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      id,
      title,
      message,
      variant = 'info',
      duration = 5000,
      icon: customIcon,
      onClose,
      onRemove,
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(true);
    const [isLeaving, setIsLeaving] = useState(false);
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const styles = variantStyles[variant];

    const handleClose = () => {
      setIsLeaving(true);
      setTimeout(() => {
        setIsVisible(false);
        onRemove(id);
        onClose?.();
      }, 300);
    };

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(handleClose, duration);
        return () => clearTimeout(timer);
      }
    }, [duration]);

    if (!isVisible) return null;

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '1rem',
          minWidth: '320px',
          maxWidth: '480px',
          borderRadius: 'var(--radius-md, 8px)',
          background: styles.bg,
          borderLeft: `4px solid ${styles.border}`,
          borderRight: isRTL ? `4px solid ${styles.border}` : 'none',
          boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
          direction: isRTL ? 'rtl' : 'ltr',
          transform: isLeaving ? (isRTL ? 'translateX(-100%)' : 'translateX(100%)') : 'translateX(0)',
          opacity: isLeaving ? 0 : 1,
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        }}
        role="alert"
      >
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            marginTop: '2px',
            color: styles.iconColor,
          }}
        >
          {customIcon || styles.icon}
        </span>

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
            {message}
          </div>
        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close toast"
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
            marginTop: '-0.25rem',
            marginRight: isRTL ? '-0.25rem' : 0,
            marginLeft: isRTL ? 0 : '-0.25rem',
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
      </div>
    );
  }
);

Toast.displayName = 'Toast';

export default Toast;