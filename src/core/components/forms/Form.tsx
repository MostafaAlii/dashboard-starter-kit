/*
 * ========================================
 * FORM COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLanguage } from '../../providers/LanguageProvider';
import type { FormProps } from './types';

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      children,
      form,
      onSubmit,
      className = '',
      schema,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    // ===== Apply Zod schema if provided =====
    const formWithSchema = schema
      ? {
          ...form,
          resolver: zodResolver(schema),
        }
      : form;

    const handleSubmit = (data: any) => {
      onSubmit(data);
    };

    return (
      <FormProvider {...formWithSchema}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(handleSubmit)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            width: '100%',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          className={className}
          {...props}
        >
          {children}
        </form>
      </FormProvider>
    );
  }
);

Form.displayName = 'Form';

export default Form;