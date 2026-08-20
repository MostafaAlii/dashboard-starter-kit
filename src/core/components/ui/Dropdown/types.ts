import type { CSSProperties, ReactNode } from "react";

export type DropdownPosition =
  | "bottom-start"
  | "bottom-end"
  | "top-start"
  | "top-end";

export type DropdownSize = "sm" | "md" | "lg";

export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;

  open?: boolean;
  defaultOpen?: boolean;

  onOpenChange?: (open: boolean) => void;

  position?: DropdownPosition;
  size?: DropdownSize;

  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  closeOnItemClick?: boolean;

  className?: string;
  style?: CSSProperties;

  disabled?: boolean;
}
