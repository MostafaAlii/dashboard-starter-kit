/*
 * ========================================
 * MODAL TYPES
 * ========================================
 */

import { ReactNode } from "react";

export interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showOverlay?: boolean;
  overlayClassName?: string;
  initialFocus?: React.MutableRefObject<HTMLElement | null>;
}

export interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}
