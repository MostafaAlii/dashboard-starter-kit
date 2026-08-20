/*
 * ========================================
 * TOAST TYPES
 * ========================================
 */

import { ReactNode } from "react";

export type ToastVariant = "success" | "warning" | "error" | "info";

export interface Toast {
  id: string;
  title?: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  icon?: ReactNode;
  onClose?: () => void;
}

export interface ToastProps extends Toast {
  onRemove: (id: string) => void;
}

export interface ToastContainerProps {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  className?: string;
}

export interface ToastContextValue {
  toast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}
