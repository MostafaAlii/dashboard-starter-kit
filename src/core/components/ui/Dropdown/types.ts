/*
 * ========================================
 * DROPDOWN TYPES
 * ========================================
 */

import { ReactNode, ReactElement } from "react";

export type DropdownPosition =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";
export type DropdownSize = "sm" | "md" | "lg";

export interface DropdownProps {
  /** Trigger element that opens the dropdown */
  trigger: ReactElement;
  /** Dropdown content */
  children: ReactNode;
  /** Open state (controlled) */
  open?: boolean;
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Position of dropdown */
  position?: DropdownPosition;
  /** Size of dropdown */
  size?: DropdownSize;
  /** Close on click outside */
  closeOnClickOutside?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Close on item click */
  closeOnItemClick?: boolean;
  /** Custom className */
  className?: string;
  /** Custom style */
  style?: React.CSSProperties;
  /** Disabled state */
  disabled?: boolean;
}

export interface DropdownItemProps {
  /** Item content */
  children: ReactNode;
  /** Icon element */
  icon?: ReactElement;
  /** Shortcut text (e.g., "⌘K") */
  shortcut?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Danger style */
  danger?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom className */
  className?: string;
}

export interface DropdownMenuProps {
  /** Menu content */
  children: ReactNode;
  /** Custom className */
  className?: string;
}

export interface DropdownTriggerProps {
  /** Trigger content */
  children: ReactNode;
  /** As child render prop */
  asChild?: boolean;
  /** Custom className */
  className?: string;
}

export interface DropdownSeparatorProps {
  /** Custom className */
  className?: string;
}

export interface DropdownHeaderProps {
  /** Header content */
  children: ReactNode;
  /** Custom className */
  className?: string;
}
