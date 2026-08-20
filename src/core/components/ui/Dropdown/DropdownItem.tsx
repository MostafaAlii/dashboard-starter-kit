/*
 * ========================================
 * DROPDOWN ITEM
 * ========================================
 */

import { forwardRef } from 'react';
import type { DropdownItemProps } from './types';
import { useLanguage } from '../../../providers/LanguageProvider';

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    { 
      children, 
      icon, 
      shortcut, 
      disabled = false, 
      danger = false, 
      onClick, 
      className = '',
      style = {},
      ...props 
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    const handleClick = (e: React.MouseEvent) => {
      if (disabled) return;
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        role="menuitem"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          width: '100%',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-sm, 4px)',
          fontSize: 'var(--font-size-sm, 14px)',
          fontWeight: 'var(--font-weight-normal, 400)',
          color: danger ? 'var(--color-error, #ef4444)' : 'var(--color-text, #0f172a)',
          background: 'transparent',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          transition: 'background 0.15s ease, color 0.15s ease',
          border: 'none',
          outline: 'none',
          textAlign: isRTL ? 'right' : 'left',
          direction: isRTL ? 'rtl' : 'ltr',
          ...style,
        }}
        className={className}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.background = 'var(--color-background-secondary, #f1f5f9)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
        {...props}
      >
        {icon && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: '20px',
              height: '20px',
              color: danger ? 'var(--color-error, #ef4444)' : 'var(--color-text-secondary, #475569)',
            }}
          >
            {icon}
          </span>
        )}

        <span
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textAlign: isRTL ? 'right' : 'left',
          }}
        >
          {children}
        </span>

        {shortcut && (
          <span
            style={{
              fontSize: 'var(--font-size-xs, 12px)',
              color: 'var(--color-text-muted, #94a3b8)',
              flexShrink: 0,
            }}
          >
            {shortcut}
          </span>
        )}
      </button>
    );
  }
);

DropdownItem.displayName = 'DropdownItem';