/*
 * ========================================
 * TABS TYPES
 * ========================================
 */

import { ReactNode } from "react";

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  variant: "default" | "pills" | "underline";
  orientation: "horizontal" | "vertical";
  fullWidth: boolean;
}

export interface TabsProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  variant?: "default" | "pills" | "underline";
  orientation?: "horizontal" | "vertical";
  fullWidth?: boolean;
  className?: string;
}

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

export interface TabTriggerProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  icon?: ReactNode;
  className?: string;
}

export interface TabPanelProps {
  children: ReactNode;
  value: string;
  className?: string;
}
