/*
 * ========================================
 * MODAL FOOTER
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ModalFooterProps } from './types';

export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid var(--color-border, #e2e8f0)',
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

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;