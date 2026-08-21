/*
 * ========================================
 * NOT FOUND PAGE (404)
 * ========================================
 */

import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../providers/LanguageProvider';
import { Button } from '../ui/Button';

const NotFound = () => {
  const navigate = useNavigate();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center',
        background: 'var(--color-background)',
        direction: isRTL ? 'rtl' : 'ltr',
      }}
    >
      <div
        style={{
          maxWidth: '480px',
        }}
      >
        {/* ===== 404 Number ===== */}
        <div
          style={{
            fontSize: '8rem',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--color-primary, #3b82f6)',
            lineHeight: 1,
            marginBottom: '0.5rem',
            textShadow: '0 4px 6px rgba(0,0,0,0.05)',
          }}
        >
          404
        </div>

        {/* ===== Icon ===== */}
        <div
          style={{
            fontSize: '4rem',
            marginBottom: '1rem',
          }}
        >
          🔍
        </div>

        {/* ===== Title ===== */}
        <h1
          style={{
            fontSize: 'var(--font-size-2xl, 24px)',
            fontWeight: 'var(--font-weight-bold, 700)',
            color: 'var(--color-text, #0f172a)',
            marginBottom: '0.5rem',
          }}
        >
          {isRTL ? 'الصفحة غير موجودة' : 'Page Not Found'}
        </h1>

        {/* ===== Description ===== */}
        <p
          style={{
            color: 'var(--color-text-secondary, #475569)',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          {isRTL
            ? 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : 'Sorry, the page you are looking for does not exist or has been moved.'}
        </p>

        {/* ===== Actions ===== */}
        <div
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button
            variant="primary"
            onClick={() => navigate('/')}
            leftIcon={<span>🏠</span>}
          >
            {isRTL ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            leftIcon={<span>⬅️</span>}
          >
            {isRTL ? 'العودة للخلف' : 'Go Back'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;