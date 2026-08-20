/*
 * ========================================
 * FOOTER COMPONENT
 * ========================================
 */

import { forwardRef } from 'react';
import { useLanguage } from '../../providers/LanguageProvider';
import { Heart, ChevronUp } from 'lucide-react';

interface FooterProps {
  showScrollTop?: boolean;
  className?: string;
}

const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ showScrollTop = true, className = '' }, ref) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const currentYear = new Date().getFullYear();

    const handleScrollTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };

    return (
      <footer
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          padding: '1rem 1.5rem',
          background: 'var(--color-card, #ffffff)',
          borderTop: '1px solid var(--color-border, #e2e8f0)',
          direction: isRTL ? 'rtl' : 'ltr',
          flexShrink: 0,
        }}
        className={className}
      >
        {/* ===== Copyright ===== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-secondary, #475569)',
          }}
        >
          <span>© {currentYear}</span>
          <span
            style={{
              fontWeight: 'var(--font-weight-semibold, 600)',
              color: 'var(--color-text, #0f172a)',
            }}
          >
            Dashboard Starter Kit
          </span>
          <span>•</span>
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            {isRTL ? 'صنع بـ' : 'Built with'}
            <Heart
              size={14}
              style={{
                color: 'var(--color-error, #ef4444)',
                fill: 'var(--color-error, #ef4444)',
                display: 'inline-block',
              }}
            />
            {isRTL ? '❤️' : ''}
          </span>
        </div>

        {/* ===== Version + Scroll Top ===== */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: 'var(--font-size-sm, 14px)',
            color: 'var(--color-text-muted, #94a3b8)',
          }}
        >
          <span>v1.0.0</span>

          {showScrollTop && (
            <button
              type="button"
              onClick={handleScrollTop}
              aria-label={isRTL ? 'العودة للأعلى' : 'Scroll to top'}
              title={isRTL ? 'العودة للأعلى' : 'Scroll to top'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                border: 'none',
                background: 'var(--color-background-secondary, #f1f5f9)',
                color: 'var(--color-text, #0f172a)',
                borderRadius: 'var(--radius-full, 9999px)',
                cursor: 'pointer',
                transition: 'background 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary, #3b82f6)';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-background-secondary, #f1f5f9)';
                e.currentTarget.style.color = 'var(--color-text, #0f172a)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <ChevronUp size={18} />
            </button>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';

export default Footer;