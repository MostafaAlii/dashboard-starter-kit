/*
 * ========================================
 * SCROLL TO TOP
 * ========================================
 */

import { useEffect, useState, useCallback } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '../../providers/LanguageProvider';

interface ScrollToTopProps {
  threshold?: number;
  className?: string;
  showWhen?: 'always' | 'scroll';
}

const ScrollToTop = ({
  threshold = 300,
  className = '',
  showWhen = 'scroll',
}: ScrollToTopProps) => {
  const [isVisible, setIsVisible] = useState(showWhen === 'always');
  const { direction } = useLanguage();
  const isRTL = direction === 'rtl';

  const handleScroll = useCallback(() => {
    if (showWhen === 'always') return;

    const scrollY = window.scrollY;
    setIsVisible(scrollY > threshold);
  }, [threshold, showWhen]);

  const handleScrollTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    if (showWhen === 'always') {
      setIsVisible(true);
      return;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, showWhen]);

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={handleScrollTop}
      aria-label={isRTL ? 'العودة للأعلى' : 'Scroll to top'}
      title={isRTL ? 'العودة للأعلى' : 'Scroll to top'}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: isRTL ? 'auto' : '2rem',
        left: isRTL ? '2rem' : 'auto',
        zIndex: 'var(--z-fixed, 1030)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        border: 'none',
        borderRadius: 'var(--radius-full, 9999px)',
        background: 'var(--color-primary, #3b82f6)',
        color: '#ffffff',
        boxShadow: 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: 'scale(1)',
        opacity: 0.9,
        animation: 'fadeInUp 0.3s ease',
      }}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.opacity = '1';
        e.currentTarget.style.boxShadow = 'var(--shadow-xl, 0 20px 25px -5px rgb(0 0 0 / 0.1))';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.opacity = '0.9';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.1))';
      }}
    >
      <ChevronUp size={22} strokeWidth={2.5} />
    </button>
  );
};

export default ScrollToTop;