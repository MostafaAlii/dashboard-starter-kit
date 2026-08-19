import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  path?: string;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
}

export interface NavigationSection {
  id: string;
  label?: string;
  items: NavigationItem[];
}
