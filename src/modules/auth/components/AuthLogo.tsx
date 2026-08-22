/*
 * ========================================
 * AUTH LOGO
 * ========================================
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../../../core/providers/LanguageProvider';

interface AuthLogoProps {
  className?: string;
}

const AuthLogo = ({ className = '' }: AuthLogoProps) => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <Link
      to="/"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        textDecoration: 'none',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
      className={className}
    >
      {/* ===== Logo Icon ===== */}
      <div
        style={{
          width: '36px',
          height: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-lg, 12px)',
          background: 'var(--color-primary, #3b82f6)',
          color: '#ffffff',
          fontSize: 'var(--font-size-md, 16px)',
          fontWeight: 'var(--font-weight-bold, 700)',
          flexShrink: 0,
        }}
      >
        🚀
      </div>

      {/* ===== Logo Text ===== */}
      <div>
        <span
          style={{
            fontSize: 'var(--font-size-lg, 18px)',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--color-text, #0f172a)',
            letterSpacing: '-0.02em',
          }}
        >
          Dashboard
        </span>
        <span
          style={{
            fontSize: 'var(--font-size-xs, 11px)',
            fontWeight: 'var(--font-weight-medium, 500)',
            color: 'var(--color-text-secondary, #475569)',
            display: 'block',
            marginTop: '-0.15rem',
            letterSpacing: '0.02em',
          }}
        >
          Starter Kit
        </span>
      </div>
    </Link>
  );
};

export default AuthLogo;