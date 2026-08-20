/*
 * ========================================
 * BREADCRUMBS TYPES
 * ========================================
 */

import { ReactNode } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
  maxItems?: number;
}

export interface BreadcrumbItemProps {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
  className?: string;
}
