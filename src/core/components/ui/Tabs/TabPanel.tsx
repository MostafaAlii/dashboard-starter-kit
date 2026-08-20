/*
 * ========================================
 * TAB PANEL
 * ========================================
 */

import { forwardRef } from 'react';
import { useTabs } from './Tabs';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { TabPanelProps } from './types';

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ children, value, className = '', ...props }, ref) => {
    const { activeTab } = useTabs();
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const isActive = activeTab === value;

    if (!isActive) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        style={{
          animation: 'fadeIn 0.2s ease',
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

TabPanel.displayName = 'TabPanel';

export default TabPanel;