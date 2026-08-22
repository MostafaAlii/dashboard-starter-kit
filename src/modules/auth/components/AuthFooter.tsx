/*
 * ========================================
 * AUTH FOOTER
 * ========================================
 */

import { useLanguage } from '../../../core/providers/LanguageProvider';

const AuthFooter = () => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const currentYear = new Date().getFullYear();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontSize: 'var(--font-size-xs, 12px)',
        color: 'var(--color-text-muted, #94a3b8)',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <span>© {currentYear}</span>
      <span
        style={{
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-text-secondary, #475569)',
        }}
      >
        Dashboard Starter Kit
      </span>
      <span>•</span>
      <span>{isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</span>
    </div>
  );
};

export default AuthFooter;