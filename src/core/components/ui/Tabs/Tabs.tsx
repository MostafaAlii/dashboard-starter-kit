/*
 * ========================================
 * TABS COMPONENT (Root)
 * ========================================
 */

import { forwardRef, useState, createContext, useContext, useMemo } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { TabsProps, TabsContextValue } from './types';

// ===== Tabs Context =====
const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within Tabs');
  }
  return context;
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      children,
      defaultValue,
      value: controlledValue,
      onChange,
      variant = 'default',
      orientation = 'horizontal',
      fullWidth = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const [internalValue, setInternalValue] = useState(defaultValue || '');

    const activeTab = controlledValue ?? internalValue;

    const setActiveTab = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const contextValue = useMemo<TabsContextValue>(
      () => ({
        activeTab,
        setActiveTab,
        variant,
        orientation,
        fullWidth,
      }),
      [activeTab, setActiveTab, variant, orientation, fullWidth]
    );

    const isHorizontal = orientation === 'horizontal';

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: isHorizontal ? 'column' : 'row',
            gap: '1.5rem',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          className={className}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';

export default Tabs;