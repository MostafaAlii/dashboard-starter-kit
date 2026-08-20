/*
 * ========================================
 * TEXTAREA COMPONENT
 * ========================================
 */

import { forwardRef, useState } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { TextareaProps, InputSize, InputVariant, InputState } from './types';

const sizeStyles: Record<InputSize, { padding: string; fontSize: string }> = {
  sm: { padding: '0.375rem 0.75rem', fontSize: '0.8125rem' },
  md: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
  lg: { padding: '0.625rem 1.25rem', fontSize: '1rem' },
};

const variantStyles: Record<InputVariant, { bg: string; border: string; focus: string }> = {
  default: {
    bg: 'var(--color-input, #ffffff)',
    border: 'var(--color-input-border, #e2e8f0)',
    focus: 'var(--color-primary, #3b82f6)',
  },
  filled: {
    bg: 'var(--color-background-secondary, #f1f5f9)',
    border: 'transparent',
    focus: 'var(--color-primary, #3b82f6)',
  },
  outline: {
    bg: 'transparent',
    border: 'var(--color-input-border, #e2e8f0)',
    focus: 'var(--color-primary, #3b82f6)',
  },
};

const stateStyles: Record<InputState, { border: string; focus: string; text: string }> = {
  default: {
    border: 'var(--color-input-border, #e2e8f0)',
    focus: 'var(--color-primary, #3b82f6)',
    text: 'var(--color-text, #0f172a)',
  },
  error: {
    border: 'var(--color-error, #ef4444)',
    focus: 'var(--color-error, #ef4444)',
    text: 'var(--color-error, #ef4444)',
  },
  success: {
    border: 'var(--color-success, #22c55e)',
    focus: 'var(--color-success, #22c55e)',
    text: 'var(--color-success, #22c55e)',
  },
  warning: {
    border: 'var(--color-warning, #eab308)',
    focus: 'var(--color-warning, #eab308)',
    text: 'var(--color-warning, #eab308)',
  },
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      success,
      warning,
      hint,
      size = 'md',
      variant = 'default',
      state = 'default',
      fullWidth = false,
      className = '',
      containerClassName = '',
      disabled = false,
      placeholder,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const [isFocused, setIsFocused] = useState(false);

    const sizeStyle = sizeStyles[size];
    const variantStyle = variantStyles[variant];
    const stateStyle = stateStyles[state];

    const hasError = state === 'error';
    const hasSuccess = state === 'success';
    const hasWarning = state === 'warning';
    const hasState = hasError || hasSuccess || hasWarning;

    const borderColor = hasState
      ? stateStyle.border
      : isFocused
      ? variantStyle.focus
      : variantStyle.border;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          width: fullWidth ? '100%' : 'auto',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={containerClassName}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={props.id}
            style={{
              fontSize: 'var(--font-size-sm, 14px)',
              fontWeight: 'var(--font-weight-medium, 500)',
              color: 'var(--color-text, #0f172a)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            {label}
            {props.required && (
              <span style={{ color: 'var(--color-error, #ef4444)' }}>*</span>
            )}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          disabled={disabled}
          placeholder={placeholder}
          rows={rows}
          style={{
            width: '100%',
            padding: sizeStyle.padding,
            fontSize: sizeStyle.fontSize,
            fontWeight: 'var(--font-weight-normal, 400)',
            color: 'var(--color-text, #0f172a)',
            background: disabled ? 'var(--color-background-secondary, #f1f5f9)' : variantStyle.bg,
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--radius-md, 8px)',
            outline: 'none',
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            resize: 'vertical',
            minHeight: '80px',
            fontFamily: 'inherit',
            ...(isFocused && !hasState && {
              boxShadow: `0 0 0 3px ${variantStyle.focus}33`,
            }),
            ...(hasError && {
              boxShadow: `0 0 0 3px ${stateStyle.border}33`,
            }),
            ...(hasSuccess && {
              boxShadow: `0 0 0 3px ${stateStyle.border}33`,
            }),
            ...(hasWarning && {
              boxShadow: `0 0 0 3px ${stateStyle.border}33`,
            }),
            ...(disabled && {
              cursor: 'not-allowed',
              opacity: 0.5,
            }),
          }}
          className={className}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />

        {/* Hint / Error / Success / Warning */}
        {(hint || error || success || warning) && (
          <div
            style={{
              fontSize: 'var(--font-size-xs, 12px)',
              color: hasError
                ? 'var(--color-error, #ef4444)'
                : hasSuccess
                ? 'var(--color-success, #22c55e)'
                : hasWarning
                ? 'var(--color-warning, #eab308)'
                : 'var(--color-text-muted, #94a3b8)',
              marginTop: '0.125rem',
            }}
          >
            {error || success || warning || hint}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;