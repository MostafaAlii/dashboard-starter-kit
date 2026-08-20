/*
 * ========================================
 * BREADCRUMB ITEM
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { BreadcrumbItemProps } from './types';

export const BreadcrumbItem = forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  (
    {
      children,
      href,
      icon,
      active = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    return (
      <li
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.375rem',
          color: active
            ? 'var(--color-primary, #3b82f6)'
            : 'var(--color-text-secondary, #475569)',
          fontWeight: active ? 'var(--font-weight-medium, 500)' : 'var(--font-weight-normal, 400)',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={className}
        {...props}
      >
        {icon && (
          <span style={{ display: 'flex', alignItems: 'center' }}>
            {icon}
          </span>
        )}
        {href && !active ? (
          <a
            href={href}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text, #0f172a)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary, #475569)';
            }}
          >
            {children}
          </a>
        ) : (
          <span>{children}</span>
        )}
      </li>
    );
  }
);

BreadcrumbItem.displayName = 'BreadcrumbItem';

export default BreadcrumbItem;