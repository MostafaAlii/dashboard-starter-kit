/*
 * ========================================
 * FORM FIELD
 * ========================================
 */

import { forwardRef, createContext, useContext, useMemo } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { useLanguage } from '../../providers/LanguageProvider';
import type { FormFieldProps, FormFieldContextValue } from './types';

const FormFieldContext = createContext<FormFieldContextValue | null>(null);

export const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error('useFormField must be used within FormField');
  }
  return context;
};

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const form = useFormContext();
    const { errors } = useFormState({ control: form.control });

    // ===== استخراج الخطأ بالطريقة الصحيحة =====
    const error = errors[name] as any;

    const contextValue = useMemo(
      () => ({
        name: String(name),
        error,
      }),
      [name, error]
    );

    return (
      <FormFieldContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.375rem',
            width: '100%',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          className={className}
          {...props}
        >
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);

FormField.displayName = 'FormField';

export default FormField;