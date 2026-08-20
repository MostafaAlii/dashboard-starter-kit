/*
 * ========================================
 * SWITCH COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { SwitchProps, InputSize, InputState } from './types';

const sizeStyles: Record<InputSize, { width: string; height: string; thumbSize: string; fontSize: string }> = {
  sm: { width: '34px', height: '18px', thumbSize: '14px', fontSize: '0.8125rem' },
  md: { width: '42px', height: '22px', thumbSize: '18px', fontSize: '0.875rem' },
  lg: { width: '50px', height: '26px', thumbSize: '22px', fontSize: '1rem' },
};

const stateStyles: Record<InputState, { color: string }> = {
  default: {
    color: 'var(--color-primary, #3b82f6)',
  },
  error: {
    color: 'var(--color-error, #ef4444)',
  },
  success: {
    color: 'var(--color-success, #22c55e)',
  },
  warning: {
    color: 'var(--color-warning, #eab308)',
  },
};

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      label,
      error,
      hint,
      size = 'md',
      state = 'default',
      className = '',
      containerClassName = '',
      disabled = false,
      checked,
      defaultChecked,
      thumbIcon,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const sizeStyle = sizeStyles[size];
    const stateStyle = stateStyles[state];

    const isChecked = checked || defaultChecked;
    const hasError = state === 'error';

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.25rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={containerClassName}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: sizeStyle.fontSize,
            color: disabled ? 'var(--color-text-muted, #94a3b8)' : 'var(--color-text, #0f172a)',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              width: sizeStyle.width,
              height: sizeStyle.height,
              borderRadius: 'var(--radius-full, 9999px)',
              background: isChecked
                ? hasError
                  ? 'var(--color-error, #ef4444)'
                  : stateStyle.color
                : 'var(--color-background-secondary, #f1f5f9)',
              transition: 'background 0.2s ease',
              ...(disabled && {
                opacity: 0.5,
              }),
            }}
          >
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              defaultChecked={defaultChecked}
              disabled={disabled}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: disabled ? 'not-allowed' : 'pointer',
                zIndex: 1,
              }}
              className={className}
              {...props}
            />

            {/* Thumb */}
            <div
              style={{
                position: 'absolute',
                top: '2px',
                left: isChecked
                  ? isRTL
                    ? '2px'
                    : `calc(100% - ${sizeStyle.thumbSize} - 2px)`
                  : isRTL
                  ? `calc(100% - ${sizeStyle.thumbSize} - 2px)`
                  : '2px',
                width: sizeStyle.thumbSize,
                height: sizeStyle.thumbSize,
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.2)',
                transition: 'left 0.2s ease, right 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {thumbIcon && isChecked && thumbIcon}
            </div>
          </div>

          {label && <span>{label}</span>}
        </label>

        {(error || hint) && (
          <div
            style={{
              fontSize: 'var(--font-size-xs, 12px)',
              color: hasError ? 'var(--color-error, #ef4444)' : 'var(--color-text-muted, #94a3b8)',
              marginLeft: isRTL ? 0 : 'calc(0.75rem + 42px)',
              marginRight: isRTL ? 'calc(0.75rem + 42px)' : 0,
            }}
          >
            {error || hint}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';

export default Switch;