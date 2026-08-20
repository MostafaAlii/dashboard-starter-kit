/*
 * ========================================
 * BADGE TYPES
 * ========================================
 */

import { ReactNode } from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "ghost"
  | "outline";

export type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  className?: string;
  dot?: boolean;
  dotColor?: string;
}
