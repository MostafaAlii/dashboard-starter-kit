/*
 * ========================================
 * FORM DESCRIPTION
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { useFormField } from './FormField';
import type { FormDescriptionProps } from './types';

export const FormDescription = forwardRef<HTMLDivElement, FormDescriptionProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        ref={ref}
        style={{
          fontSize: 'var(--font-size-xs, 12px)',
          color: 'var(--color-text-muted, #94a3b8)',
          marginTop: '0.125rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FormDescription.displayName = 'FormDescription';

export default FormDescription;