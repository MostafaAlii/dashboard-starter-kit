/*
 * ========================================
 * FORM ITEM
 * ========================================
 */

import { forwardRef, createContext, useContext, useId } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import type { FormItemProps, FormItemContextValue } from './types';

const FormItemContext = createContext<FormItemContextValue | null>(null);

export const useFormItem = () => {
  const context = useContext(FormItemContext);
  if (!context) {
    throw new Error('useFormItem must be used within FormItem');
  }
  return context;
};

export const FormItem = forwardRef<HTMLDivElement, FormItemProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const id = useId();

    const contextValue = { id };

    return (
      <FormItemContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            width: '100%',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          className={className}
          {...props}
        >
          {children}
        </div>
      </FormItemContext.Provider>
    );
  }
);

FormItem.displayName = 'FormItem';

export default FormItem;