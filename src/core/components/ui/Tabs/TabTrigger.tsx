/*
 * ========================================
 * TAB TRIGGER
 * ========================================
 */

import { forwardRef } from 'react';
import { useTabs } from './Tabs';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { TabTriggerProps } from './types';

export const TabTrigger = forwardRef<HTMLButtonElement, TabTriggerProps>(
  (
    {
      children,
      value,
      disabled = false,
      icon,
      className = '',
      ...props
    },
    ref
  ) => {
    const { activeTab, setActiveTab, variant } = useTabs();
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const isActive = activeTab === value;

    const getVariantStyles = () => {
      switch (variant) {
        case 'pills':
          return {
            background: isActive ? 'var(--color-primary, #3b82f6)' : 'transparent',
            color: isActive ? '#ffffff' : 'var(--color-text-secondary, #475569)',
            borderRadius: 'var(--radius-full, 9999px)',
            padding: '0.5rem 1.25rem',
            border: 'none',
          };
        case 'underline':
          return {
            background: 'transparent',
            color: isActive ? 'var(--color-primary, #3b82f6)' : 'var(--color-text-secondary, #475569)',
            borderBottom: isActive ? `2px solid var(--color-primary, #3b82f6)` : '2px solid transparent',
            padding: '0.5rem 1rem',
            borderRadius: 0,
          };
        default:
          return {
            background: isActive ? 'var(--color-background-secondary, #f1f5f9)' : 'transparent',
            color: isActive ? 'var(--color-text, #0f172a)' : 'var(--color-text-secondary, #475569)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '0.5rem 1rem',
            border: 'none',
          };
      }
    };

    const variantStyles = getVariantStyles();

    const handleClick = () => {
      if (!disabled) {
        setActiveTab(value);
      }
    };

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: 'var(--font-size-sm, 14px)',
          fontWeight: isActive ? 'var(--font-weight-medium, 500)' : 'var(--font-weight-normal, 400)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'all 0.2s ease',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          direction: isRTL ? 'rtl' : 'ltr',
          ...variantStyles,
        }}
        className={className}
        onMouseEnter={(e) => {
          if (!isActive && !disabled && variant !== 'underline') {
            e.currentTarget.style.background = 'var(--color-background-secondary, #f1f5f9)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive && !disabled && variant !== 'underline') {
            e.currentTarget.style.background = 'transparent';
          }
        }}
        {...props}
      >
        {icon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}
        {children}
      </button>
    );
  }
);

TabTrigger.displayName = 'TabTrigger';

export default TabTrigger;