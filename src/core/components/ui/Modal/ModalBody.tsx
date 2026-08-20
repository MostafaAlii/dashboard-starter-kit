/*
 * ========================================
 * MODAL BODY
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ModalBodyProps } from './types';

export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        ref={ref}
        style={{
          padding: '1.5rem',
          color: 'var(--color-text-secondary, #475569)',
          direction: isRTL ? 'rtl' : 'ltr',
          maxHeight: 'calc(90vh - 130px)',
          overflowY: 'auto',
        }}
        className={className}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ModalBody.displayName = 'ModalBody';

export default ModalBody;