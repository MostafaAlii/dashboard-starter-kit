/*
 * ========================================
 * DROPDOWN ITEM
 * ========================================
 */

import { forwardRef } from 'react';
import type { DropdownItemProps } from './types';

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  (
    { children, icon, shortcut, disabled = false, danger = false, onClick, className = '' },
    ref
  ) => {
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
          gap: 'var(--spacing-3, 12px)',
          width: '100%',
          padding: 'var(--spacing-2, 8px) var(--spacing-3, 12px)',
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
          textAlign: 'left',
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
      >
        {icon && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              width: '20px',
              height: '20px',
              fontSize: '18px',
              color: danger ? 'var(--color-error, #ef4444)' : 'var(--color-text-secondary, #475569)',
            }}
          >
            {icon}
          </span>
        )}

        <span style={{ flex: 1 }}>{children}</span>

        {shortcut && (
          <span
            style={{
              fontSize: 'var(--font-size-xs, 12px)',
              color: 'var(--color-text-muted, #94a3b8)',
              marginLeft: 'var(--spacing-4, 16px)',
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