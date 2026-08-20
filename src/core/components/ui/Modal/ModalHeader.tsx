/*
 * ========================================
 * MODAL HEADER
 * ========================================
 */

import { forwardRef } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ModalHeaderProps } from './types';

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ children, className = '', onClose, ...props }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--color-border, #e2e8f0)',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        <div
          style={{
            fontSize: 'var(--font-size-lg, 18px)',
            fontWeight: 'var(--font-weight-semibold, 600)',
            color: 'var(--color-text, #0f172a)',
          }}
        >
          {children}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              border: 'none',
              background: 'transparent',
              color: 'var(--color-text-muted, #94a3b8)',
              cursor: 'pointer',
              borderRadius: 'var(--radius-sm, 4px)',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--color-background-secondary, #f1f5f9)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  }
);

ModalHeader.displayName = 'ModalHeader';

export default ModalHeader;