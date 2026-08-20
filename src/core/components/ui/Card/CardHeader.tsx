/*
 * ========================================
 * CARD HEADER
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { CardHeaderProps } from './types';

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: 'var(--spacing-3, 12px)',
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
          marginBottom: 'var(--spacing-3, 12px)',
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

CardHeader.displayName = 'CardHeader';

export default CardHeader;