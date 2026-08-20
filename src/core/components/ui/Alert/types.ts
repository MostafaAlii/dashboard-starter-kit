/*
 * ========================================
 * ALERT TYPES
 * ========================================
 */

import { ReactNode } from "react";

export type AlertVariant = "success" | "warning" | "error" | "info";

export interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  title?: string;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
}

export interface AlertTitleProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDescriptionProps {
  children: ReactNode;
  className?: string;
}
