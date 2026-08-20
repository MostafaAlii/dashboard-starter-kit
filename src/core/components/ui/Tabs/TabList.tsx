/*
 * ========================================
 * TAB LIST
 * ========================================
 */

import { forwardRef } from 'react';
import { useTabs } from './Tabs';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { TabListProps } from './types';

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className = '', ...props }, ref) => {
    const { orientation, variant, fullWidth } = useTabs();
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const isHorizontal = orientation === 'horizontal';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: isHorizontal ? 'row' : 'column',
          gap: '0.25rem',
          borderBottom: variant === 'default' ? '1px solid var(--color-border, #e2e8f0)' : 'none',
          paddingBottom: variant === 'default' ? '0.25rem' : 0,
          flexWrap: isHorizontal ? 'wrap' : 'nowrap',
          width: fullWidth ? '100%' : 'auto',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        role="tablist"
        {...props}
      >
        {children}
      </div>
    );
  }
);

TabList.displayName = 'TabList';

export default TabList;