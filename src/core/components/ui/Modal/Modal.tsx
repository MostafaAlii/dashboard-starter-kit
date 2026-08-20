/*
 * ========================================
 * MODAL COMPONENT
 * ========================================
 */

import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';
import type { ModalProps } from './types';

const sizeStyles = {
  sm: { maxWidth: '400px' },
  md: { maxWidth: '560px' },
  lg: { maxWidth: '720px' },
  xl: { maxWidth: '960px' },
  full: { maxWidth: 'calc(100% - 2rem)', maxHeight: 'calc(100% - 2rem)' },
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      children,
      isOpen,
      onClose,
      className = '',
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showOverlay = true,
      overlayClassName = '',
      initialFocus,
      ...props
    },
    ref
  ) => {
    const { direction } = useLanguage();
    const isRTL = direction === 'rtl';
    const modalRef = useRef<HTMLDivElement>(null);
    const previousFocus = useRef<HTMLElement | null>(null);

    // ===== Focus management =====
    useLayoutEffect(() => {
      if (isOpen) {
        previousFocus.current = document.activeElement as HTMLElement;
        const focusTarget = initialFocus?.current || modalRef.current;
        focusTarget?.focus();
      } else {
        previousFocus.current?.focus();
      }
    }, [isOpen, initialFocus]);

    // ===== Escape key handler =====
    useEffect(() => {
      if (!isOpen || !closeOnEscape) return;

      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, closeOnEscape, onClose]);

    // ===== Body scroll lock =====
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // ===== Handle overlay click =====
    const handleOverlayClick = useCallback(
      (event: React.MouseEvent) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
          onClose();
        }
      },
      [closeOnOverlayClick, onClose]
    );

    if (!isOpen) return null;

    return createPortal(
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 'var(--z-modal, 1050)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          background: showOverlay ? 'var(--color-overlay, rgba(0,0,0,0.5))' : 'transparent',
          animation: 'fadeIn 0.2s ease',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        className={overlayClassName}
        onClick={handleOverlayClick}
      >
        <div
          ref={modalRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: sizeStyles[size].maxWidth,
            maxHeight: size === 'full' ? 'calc(100% - 2rem)' : '90vh',
            background: 'var(--color-card, #ffffff)',
            borderRadius: 'var(--radius-lg, 12px)',
            boxShadow: 'var(--shadow-2xl, 0 25px 50px -12px rgb(0 0 0 / 0.25))',
            overflow: 'auto',
            animation: 'scaleIn 0.2s ease',
            direction: isRTL ? 'rtl' : 'ltr',
          }}
          className={className}
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          {...props}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

Modal.displayName = 'Modal';

export default Modal;