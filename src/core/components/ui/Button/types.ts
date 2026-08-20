/*
 * ========================================
 * BUTTON TYPES
 * ========================================
 */

import { ReactNode, ButtonHTMLAttributes } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "ghost"
  | "outline";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button content */
  children: ReactNode;
  /** Visual variant */
  variant?: ButtonVariant;
  /** Size of the button */
  size?: ButtonSize;
  /** Is button disabled */
  disabled?: boolean;
  /** Is button loading */
  loading?: boolean;
  /** Full width button */
  fullWidth?: boolean;
  /** Icon before text */
  leftIcon?: ReactNode;
  /** Icon after text */
  rightIcon?: ReactNode;
  /** Additional className */
  className?: string;
  /** As child render prop */
  asChild?: boolean;
}

export interface ButtonGroupProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  orientation?: "horizontal" | "vertical";
  className?: string;
}
