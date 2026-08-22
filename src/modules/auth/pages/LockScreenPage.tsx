/*
 * ========================================
 * LOCK SCREEN PAGE
 * ========================================
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../../../core/providers/LanguageProvider';
import AuthBackground from '../components/AuthBackground';
import AuthCard from '../components/AuthCard';
import LockScreenForm from '../components/LockScreenForm';

const LockScreenPage = () => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <AuthBackground>
      <AuthCard
        title={isRTL ? '🔒 الشاشة مقفلة' : '🔒 Locked'}
        subtitle={isRTL ? 'أدخل كلمة المرور لفتح الشاشة' : 'Enter your password to unlock'}
      >
        <LockScreenForm />

        {/* ===== Back to Login ===== */}
        <div
          style={{
            marginTop: '1.5rem',
            textAlign: 'center',
            fontSize: 'var(--font-size-sm, 14px)',
          }}
        >
          <Link
            to="/auth/login"
            style={{
              color: 'var(--color-text-secondary, #475569)',
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
            {isRTL ? '← العودة إلى تسجيل الدخول' : '← Back to Login'}
          </Link>
        </div>
      </AuthCard>
    </AuthBackground>
  );
};

export default LockScreenPage;