/*
 * ========================================
 * FORM MESSAGE
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { useFormField } from './FormField';
import type { FormMessageProps } from './types';

export const FormMessage = forwardRef<HTMLDivElement, FormMessageProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const { error, name } = useFormField();

    if (!error && !children) return null;

    const message = children || error?.message;

    return (
      <div
        ref={ref}
        style={{
          fontSize: 'var(--font-size-xs, 12px)',
          color: 'var(--color-error, #ef4444)',
          marginTop: '0.125rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        id={`${name}-error`}
        role="alert"
        {...props}
      >
        {message}
      </div>
    );
  }
);

FormMessage.displayName = 'FormMessage';

export default FormMessage;