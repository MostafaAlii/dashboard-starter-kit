/*
 * ========================================
 * FORM STEP
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';

interface FormStepProps {
  children: React.ReactNode;
  className?: string;
}

export const FormStep = forwardRef<HTMLDivElement, FormStepProps>(
  ({ children, className = '' }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
      >
        {children}
      </div>
    );
  }
);

FormStep.displayName = 'FormStep';

export default FormStep;