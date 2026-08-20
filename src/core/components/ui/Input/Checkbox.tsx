/*
 * ========================================
 * CHECKBOX COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { CheckboxProps, InputSize, InputState } from './types';

const sizeStyles: Record<InputSize, { boxSize: string; fontSize: string }> = {
  sm: { boxSize: '16px', fontSize: '0.8125rem' },
  md: { boxSize: '20px', fontSize: '0.875rem' },
  lg: { boxSize: '24px', fontSize: '1rem' },
};

const stateStyles: Record<InputState, { border: string; focus: string }> = {
  default: {
    border: 'var(--color-input-border, #e2e8f0)',
    focus: 'var(--color-primary, #3b82f6)',
  },
  error: {
    border: 'var(--color-error, #ef4444)',
    focus: 'var(--color-error, #ef4444)',
  },
  success: {
    border: 'var(--color-success, #22c55e)',
    focus: 'var(--color-success, #22c55e)',
  },
  warning: {
    border: 'var(--color-warning, #eab308)',
    focus: 'var(--color-warning, #eab308)',
  },
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const sizeStyle = sizeStyles[size];
    const stateStyle = stateStyles[state];

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
            gap: '0.5rem',
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
              justifyContent: 'center',
              flexShrink: 0,
              width: sizeStyle.boxSize,
              height: sizeStyle.boxSize,
              borderRadius: 'var(--radius-sm, 4px)',
              border: `2px solid ${hasError ? stateStyle.border : 'var(--color-input-border, #e2e8f0)'}`,
              background: checked || defaultChecked ? 'var(--color-primary, #3b82f6)' : 'var(--color-input, #ffffff)',
              transition: 'background 0.2s ease, border-color 0.2s ease',
              ...(checked || defaultChecked ? {
                borderColor: 'var(--color-primary, #3b82f6)',
              } : {}),
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
            {(checked || defaultChecked) && (
              <Check
                size={size === 'sm' ? 12 : size === 'md' ? 14 : 18}
                color="#ffffff"
                style={{
                  pointerEvents: 'none',
                }}
              />
            )}
          </div>
          {label && <span>{label}</span>}
        </label>

        {(error || hint) && (
          <div
            style={{
              fontSize: 'var(--font-size-xs, 12px)',
              color: hasError ? 'var(--color-error, #ef4444)' : 'var(--color-text-muted, #94a3b8)',
              marginLeft: isRTL ? 0 : 'calc(0.5rem + 16px)',
              marginRight: isRTL ? 'calc(0.5rem + 16px)' : 0,
            }}
          >
            {error || hint}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;