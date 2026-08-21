/*
 * ========================================
 * SERVER ERROR PAGE (500)
 * ========================================
 */

import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../providers/LanguageProvider';
import { Button } from '../ui/Button';

interface ServerErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

const ServerError = ({ error, onRetry }: ServerErrorProps) => {
  const navigate = useNavigate();
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

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
        {/* ===== Icon ===== */}
        <div
          style={{
            fontSize: '6rem',
            lineHeight: 1,
            marginBottom: '1rem',
          }}
        >
          ⚙️
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
          {isRTL ? 'خطأ في الخادم' : 'Server Error'}
        </h1>

        {/* ===== Description ===== */}
        <p
          style={{
            color: 'var(--color-text-secondary, #475569)',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}
        >
          {isRTL
            ? 'عذراً، حدث خطأ في الخادم. يرجى المحاولة مرة أخرى لاحقاً.'
            : 'Sorry, something went wrong on our server. Please try again later.'}
        </p>

        {/* ===== Error Details (if available) ===== */}
        {error && (
          <div
            style={{
              marginBottom: '1.5rem',
              textAlign: isRTL ? 'right' : 'left',
            }}
          >
            <p
              style={{
                fontSize: 'var(--font-size-xs, 12px)',
                color: 'var(--color-text-muted, #94a3b8)',
                marginBottom: '0.25rem',
              }}
            >
              {isRTL ? 'تفاصيل الخطأ:' : 'Error details:'}
            </p>
            <pre
              style={{
                padding: '0.75rem',
                fontSize: 'var(--font-size-xs, 12px)',
                color: 'var(--color-text-secondary, #475569)',
                background: 'var(--color-background-secondary, #f1f5f9)',
                borderRadius: 'var(--radius-sm, 4px)',
                overflow: 'auto',
                maxHeight: '100px',
                border: '1px solid var(--color-border, #e2e8f0)',
                direction: isRTL ? 'rtl' : 'ltr',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}
            >
              {error.message}
            </pre>
          </div>
        )}

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
            onClick={handleRetry}
            leftIcon={<span>🔄</span>}
          >
            {isRTL ? 'إعادة المحاولة' : 'Retry'}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            leftIcon={<span>🏠</span>}
          >
            {isRTL ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;