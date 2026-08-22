/*
 * ========================================
 * AUTH CARD - Premium Card
 * ========================================
 */

import { ReactNode } from 'react';
import { useLanguage } from '../../../core/providers/LanguageProvider';
import AuthLogo from './AuthLogo';
import AuthFooter from './AuthFooter';

interface AuthCardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
  showFooter?: boolean;
  className?: string;
}

const AuthCard = ({
  children,
  title,
  subtitle,
  showLogo = true,
  showFooter = true,
  className = '',
}: AuthCardProps) => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxHeight: '90vh',
      }}
    >
      {/* ===== Logo ===== */}
      {showLogo && (
        <div
          style={{
            marginBottom: '1.5rem',
            textAlign: 'center',
            flexShrink: 0,
          }}
        >
          <AuthLogo />
        </div>
      )}

      {/* ===== Card ===== */}
      <div
        style={{
          padding: '2rem 2rem',
          background: 'var(--color-card, #ffffff)',
          borderRadius: '24px',
          boxShadow: `
            0 4px 24px var(--color-shadow, rgba(0,0,0,0.04)),
            0 1px 2px var(--color-shadow-light, rgba(0,0,0,0.02))
          `,
          border: '1px solid var(--color-border-light, rgba(0,0,0,0.04))',
          direction: isRTL ? 'rtl' : 'ltr',
          transition: 'all 0.3s ease',
          flex: 1,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        className={className}
      >
        {/* ===== Title ===== */}
        {title && (
          <div
            style={{
              marginBottom: subtitle ? '0.15rem' : '1rem',
              flexShrink: 0,
            }}
          >
            <h2
              style={{
                fontSize: 'var(--font-size-2xl, 24px)',
                fontWeight: 'var(--font-weight-bold, 700)',
                color: 'var(--color-text, #0f172a)',
                textAlign: 'center',
                lineHeight: 1.2,
              }}
            >
              {title}
            </h2>
          </div>
        )}

        {/* ===== Subtitle ===== */}
        {subtitle && (
          <p
            style={{
              marginBottom: '1.25rem',
              fontSize: 'var(--font-size-sm, 14px)',
              color: 'var(--color-text-secondary, #475569)',
              textAlign: 'center',
              lineHeight: 1.5,
              flexShrink: 0,
            }}
          >
            {subtitle}
          </p>
        )}

        {/* ===== Children ===== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            flex: 1,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>

        {/* ===== Footer ===== */}
        {showFooter && (
          <div
            style={{
              marginTop: '1.25rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--color-border, #e2e8f0)',
              flexShrink: 0,
            }}
          >
            <AuthFooter />
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;