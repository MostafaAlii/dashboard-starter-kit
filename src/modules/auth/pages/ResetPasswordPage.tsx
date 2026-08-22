/*
 * ========================================
 * RESET PASSWORD PAGE
 * ========================================
 */

import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../../../core/providers/LanguageProvider';
import AuthBackground from '../components/AuthBackground';
import AuthCard from '../components/AuthCard';
import ResetPasswordForm from '../components/ResetPasswordForm';

const ResetPasswordPage = () => {
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  return (
    <AuthBackground>
      <AuthCard
        title={isRTL ? '🔑 إعادة تعيين كلمة المرور' : '🔑 Reset Password'}
        subtitle={isRTL ? 'أدخل كلمة المرور الجديدة' : 'Enter your new password'}
      >
        <ResetPasswordForm token={token} />

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

export default ResetPasswordPage;