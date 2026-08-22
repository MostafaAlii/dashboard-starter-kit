/*
 * ========================================
 * LOGIN PAGE
 * ========================================
 */

import { Link } from 'react-router-dom';
import { useLanguage } from '../../../core/providers/LanguageProvider';
import AuthBackground from '../components/AuthBackground';
import AuthCard from '../components/AuthCard';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <AuthBackground>
      <AuthCard
        title={isRTL ? 'مرحباً بعودتك! 👋' : 'Welcome back! 👋'}
        subtitle={isRTL ? 'سجل الدخول إلى حسابك' : 'Log in to your account'}
      >
        <LoginForm />

        {/* ===== Extra Links ===== */}
        <div
          style={{
            marginTop: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: 'var(--font-size-sm, 14px)',
          }}
        >
          <Link
            to="/auth/forgot-password"
            style={{
              color: 'var(--color-primary, #3b82f6)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-primary-hover, #2563eb)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-primary, #3b82f6)';
            }}
          >
            {isRTL ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
          </Link>

          <Link
            to="/auth/lock-screen"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: 'var(--color-text-secondary, #475569)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              fontSize: 'var(--font-size-xs, 12px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--color-text, #0f172a)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--color-text-secondary, #475569)';
            }}
          >
            <span>🔒</span>
            {isRTL ? 'قفل الشاشة' : 'Lock Screen'}
          </Link>
        </div>
      </AuthCard>
    </AuthBackground>
  );
};

export default LoginPage;