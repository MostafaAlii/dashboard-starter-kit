/*
 * ========================================
 * AVATAR TYPES
 * ========================================
 */

import { ReactNode } from "react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square" | "rounded";
export type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

export interface AvatarProps {
  /** Image source URL */
  src?: string;
  /** Alt text for image */
  alt?: string;
  /** Fallback text (usually initials) */
  fallback?: string;
  /** Size of avatar */
  size?: AvatarSize;
  /** Shape of avatar */
  shape?: AvatarShape;
  /** Status indicator */
  status?: AvatarStatus;
  /** Custom className */
  className?: string;
  /** Children (for custom content) */
  children?: ReactNode;
  /** Click handler */
  onClick?: () => void;
}

export interface AvatarGroupProps {
  /** Array of avatar props */
  avatars: AvatarProps[];
  /** Maximum number of avatars to show */
  max?: number;
  /** Size for all avatars */
  size?: AvatarSize;
  /** Shape for all avatars */
  shape?: AvatarShape;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Custom className */
  className?: string;
}

export interface AvatarFallbackProps {
  /** Fallback content (text or node) */
  children: ReactNode;
  /** Delay before showing fallback (ms) */
  delayMs?: number;
  /** Custom className */
  className?: string;
}

export interface AvatarImageProps {
  /** Image source URL */
  src: string;
  /** Alt text */
  alt?: string;
  /** Custom className */
  className?: string;
  /** On error handler */
  onError?: () => void;
}
