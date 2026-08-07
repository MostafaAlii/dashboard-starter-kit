/*
 * ========================================
 * BORDER RADIUS SYSTEM
 * ========================================
 */

export const radius = {
  none: "0",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  "2xl": "24px",
  "3xl": "32px",
  full: "9999px",
} as const;

export type RadiusKey = keyof typeof radius;

// ===== Radius Helpers =====
export const radiusScale = {
  button: radius.md,
  card: radius.lg,
  modal: radius.xl,
  input: radius.md,
  badge: radius.full,
  avatar: radius.full,
  dropdown: radius.md,
  tooltip: radius.sm,
} as const;
