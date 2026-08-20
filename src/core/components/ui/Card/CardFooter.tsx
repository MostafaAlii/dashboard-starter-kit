/*
 * ========================================
 * CARD FOOTER
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { CardFooterProps } from './types';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
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
          paddingTop: 'var(--spacing-3, 12px)',
          borderTop: '1px solid var(--color-border, #e2e8f0)',
          marginTop: 'var(--spacing-3, 12px)',
          gap: 'var(--spacing-2, 8px)',
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

CardFooter.displayName = 'CardFooter';

export default CardFooter;