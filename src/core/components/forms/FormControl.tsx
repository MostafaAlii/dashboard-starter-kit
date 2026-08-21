/*
 * ========================================
 * FORM CONTROL
 * ========================================
 */

import { forwardRef, cloneElement, isValidElement } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { useFormField } from './FormField';
import { useFormItem } from './FormItem';
import type { FormControlProps } from './types';

export const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const { error } = useFormField();
    const { id } = useFormItem();

    const hasError = !!error;

    // ===== Clone child to pass props =====
    const child = isValidElement(children)
      ? cloneElement(children as any, {
          id,
          'aria-describedby': error ? `${id}-error` : undefined,
          'aria-invalid': hasError,
          state: hasError ? 'error' : undefined,
        })
      : children;

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {child}
      </div>
    );
  }
);

FormControl.displayName = 'FormControl';

export default FormControl;