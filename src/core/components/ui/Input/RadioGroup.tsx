/*
 * ========================================
 * RADIO GROUP COMPONENT
 * ========================================
 */

import { forwardRef, Children, cloneElement, isValidElement, useState, useEffect } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { RadioGroupProps } from './types';

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      name,
      value: controlledValue,
      defaultValue,
      onChange,
      children,
      label,
      error,
      hint,
      orientation = 'vertical',
      className = '',
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = (value: string) => {
      if (!isControlled) {
        setInternalValue(value);
      }
      onChange?.(value);
    };

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.375rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {label && (
          <div
            style={{
              fontSize: 'var(--font-size-sm, 14px)',
              fontWeight: 'var(--font-weight-medium, 500)',
              color: 'var(--color-text, #0f172a)',
            }}
          >
            {label}
          </div>
        )}

        <div
          style={{
            display: 'flex',
            flexDirection: orientation === 'horizontal' ? 'row' : 'column',
            gap: orientation === 'horizontal' ? '1rem' : '0.25rem',
            flexWrap: 'wrap',
          }}
        >
          {Children.map(children, (child) => {
            if (!isValidElement(child)) return child;

            return cloneElement(child, {
              name,
              checked: child.props.value === currentValue,
              onChange: () => handleChange(child.props.value),
            });
          })}
        </div>

        {(error || hint) && (
          <div
            style={{
              fontSize: 'var(--font-size-xs, 12px)',
              color: error ? 'var(--color-error, #ef4444)' : 'var(--color-text-muted, #94a3b8)',
            }}
          >
            {error || hint}
          </div>
        )}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;