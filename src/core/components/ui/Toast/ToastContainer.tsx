/*
 * ========================================
 * TOAST CONTAINER
 * ========================================
 */

import { forwardRef, useState, useCallback, createContext, useContext, useMemo, type ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../../providers/LanguageProvider';
import { Toast } from './Toast';
import type { ToastContainerProps, Toast as ToastType, ToastContextValue } from './types';

// ===== Toast Context =====
const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastContainer');
  }
  return context;
};

// ===== Position styles =====
const getPositionStyles = (position: string, isRTL: boolean) => {
  const baseStyles = {
    'top-right': { top: '1rem', right: '1rem', left: 'auto' },
    'top-left': { top: '1rem', left: '1rem', right: 'auto' },
    'bottom-right': { bottom: '1rem', right: '1rem', left: 'auto' },
    'bottom-left': { bottom: '1rem', left: '1rem', right: 'auto' },
    'top-center': { top: '1rem', left: '50%', right: 'auto', transform: 'translateX(-50%)' },
    'bottom-center': { bottom: '1rem', left: '50%', right: 'auto', transform: 'translateX(-50%)' },
  };

  // ===== في RTL: نقلب الـ positions =====
  if (isRTL) {
    const rtlMap: Record<string, string> = {
      'top-right': 'top-left',
      'top-left': 'top-right',
      'bottom-right': 'bottom-left',
      'bottom-left': 'bottom-right',
    };
    const mappedPosition = rtlMap[position] || position;
    return baseStyles[mappedPosition as keyof typeof baseStyles] || baseStyles['top-right'];
  }

  return baseStyles[position as keyof typeof baseStyles] || baseStyles['top-right'];
};

export const ToastContainer = forwardRef<HTMLDivElement, ToastContainerProps & { children?: ReactNode }>(
  ({ position = 'top-right', className = '', children }, ref) => {
    const [toasts, setToasts] = useState<ToastType[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';

    useEffect(() => {
      setIsMounted(true);
      return () => setIsMounted(false);
    }, []);

    const removeToast = useCallback((id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const clearToasts = useCallback(() => {
      setToasts([]);
    }, []);

    const toast = useCallback(
      (toastData: Omit<ToastType, 'id'>) => {
        const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const newToast: ToastType = {
          id,
          ...toastData,
          variant: toastData.variant || 'info',
          duration: toastData.duration || 5000,
        };
        setToasts((prev) => [...prev, newToast]);
        return id;
      },
      []
    );

    const contextValue = useMemo<ToastContextValue>(
      () => ({
        toast,
        removeToast,
        clearToasts,
      }),
      [toast, removeToast, clearToasts]
    );

    const positionStyle = getPositionStyles(position, isRTL);

    // ===== منع الـ hydration mismatch =====
    if (!isMounted) {
      return <ToastContext.Provider value={contextValue}>{children}</ToastContext.Provider>;
    }

    return (
      <ToastContext.Provider value={contextValue}>
        {/* ===== Children ===== */}
        {children}

        {/* ===== Toast Portal ===== */}
        {createPortal(
          <div
            ref={ref}
            style={{
              position: 'fixed',
              zIndex: 'var(--z-toast, 1080)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              ...positionStyle,
              direction: isRTL ? 'rtl' : 'ltr',
              maxWidth: '100%',
              pointerEvents: 'none',
            }}
            className={className}
          >
            {toasts.map((toastData) => (
              <div
                key={toastData.id}
                style={{
                  pointerEvents: 'auto',
                  animation: isRTL ? 'slideInLeft 0.3s ease' : 'slideInRight 0.3s ease',
                }}
              >
                <Toast
                  {...toastData}
                  onRemove={removeToast}
                />
              </div>
            ))}
          </div>,
          document.body
        )}
      </ToastContext.Provider>
    );
  }
);

ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;