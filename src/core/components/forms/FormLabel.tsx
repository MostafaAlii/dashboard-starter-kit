/*
 * ========================================
 * FORM LABEL
 * ========================================
 */

import { forwardRef, LabelHTMLAttributes } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { useFormField } from './FormField';
import { useFormItem } from './FormItem';
import type { FormLabelProps } from './types';

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  (
    {
      children,
      required = false,
      className = '',
      htmlFor,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const { error } = useFormField();
    const { id } = useFormItem();

    const hasError = !!error;

    return (
      <label
        ref={ref}
        htmlFor={htmlFor || id}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          fontSize: 'var(--font-size-sm, 14px)',
          fontWeight: 'var(--font-weight-medium, 500)',
          color: hasError
            ? 'var(--color-error, #ef4444)'
            : 'var(--color-text, #0f172a)',
          direction: isRTL ? 'rtl' : 'ltr',
          cursor: 'pointer',
        }}
        className={className}
        {...props}
      >
        {children}
        {required && (
          <span
            style={{
              color: 'var(--color-error, #ef4444)',
              fontSize: 'var(--font-size-sm, 14px)',
            }}
          >
            *
          </span>
        )}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';

export default FormLabel;