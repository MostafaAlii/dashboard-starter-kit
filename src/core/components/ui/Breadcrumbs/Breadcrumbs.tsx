/*
 * ========================================
 * BREADCRUMBS COMPONENT
 * ========================================
 */

import { forwardRef, Fragment } from 'react';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { BreadcrumbsProps } from './types';

export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    {
      items,
      separator,
      className = '',
      maxItems = 0,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    // ===== Default separator based on direction =====
    const defaultSeparator = isRTL ? (
      <ChevronLeft size={16} />
    ) : (
      <ChevronRight size={16} />
    );

    const Separator = separator || defaultSeparator;

    // ===== Apply maxItems =====
    let displayItems = items;
    let hiddenItems = 0;

    if (maxItems > 0 && items.length > maxItems) {
      const first = items.slice(0, 1);
      const last = items.slice(-(maxItems - 1));
      hiddenItems = items.length - first.length - last.length;
      displayItems = [...first, { label: '...', active: false } as any, ...last];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumbs"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 0',
          fontSize: 'var(--font-size-sm, 14px)',
          color: 'var(--color-text-secondary, #475569)',
          direction: isRTL ? 'rtl' : 'ltr',
          flexWrap: 'wrap',
        }}
        className={className}
        {...props}
      >
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const isHidden = item.label === '...';

          return (
            <Fragment key={index}>
              {/* Breadcrumb Item */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                {item.href && !isLast && !isHidden ? (
                  <a
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: item.active
                        ? 'var(--color-primary, #3b82f6)'
                        : 'var(--color-text-secondary, #475569)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      fontWeight: item.active ? 'var(--font-weight-medium, 500)' : 'var(--font-weight-normal, 400)',
                    }}
                    onMouseEnter={(e) => {
                      if (!item.active) {
                        e.currentTarget.style.color = 'var(--color-text, #0f172a)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!item.active) {
                        e.currentTarget.style.color = 'var(--color-text-secondary, #475569)';
                      }
                    }}
                  >
                    {item.icon && (
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                      </span>
                    )}
                    {item.label}
                  </a>
                ) : (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      color: isHidden
                        ? 'var(--color-text-muted, #94a3b8)'
                        : isLast
                        ? 'var(--color-text, #0f172a)'
                        : 'var(--color-text-secondary, #475569)',
                      fontWeight: isLast ? 'var(--font-weight-medium, 500)' : 'var(--font-weight-normal, 400)',
                    }}
                  >
                    {item.icon && (
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        {item.icon}
                      </span>
                    )}
                    {isHidden ? '…' : item.label}
                  </span>
                )}

                {/* Hidden items indicator */}
                {index === 0 && hiddenItems > 0 && (
                  <span
                    style={{
                      color: 'var(--color-text-muted, #94a3b8)',
                      fontSize: 'var(--font-size-xs, 12px)',
                    }}
                  >
                    (+{hiddenItems})
                  </span>
                )}
              </div>

              {/* Separator */}
              {!isLast && (
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--color-text-muted, #94a3b8)',
                    flexShrink: 0,
                  }}
                >
                  {Separator}
                </span>
              )}
            </Fragment>
          );
        })}
      </nav>
    );
  }
);

Breadcrumbs.displayName = 'Breadcrumbs';

export default Breadcrumbs;