/*
 * ========================================
 * SHADOWS SYSTEM
 * ========================================
 */

export const shadows = {
  // ===== Elevation Shadows =====
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  "3xl": "0 35px 60px -15px rgb(0 0 0 / 0.3)",

  // ===== Inner Shadows =====
  inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  innerLg: "inset 0 4px 6px 0 rgb(0 0 0 / 0.05)",

  // ===== Colored Shadows =====
  primary: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
  success: "0 4px 14px 0 rgba(34, 197, 94, 0.4)",
  warning: "0 4px 14px 0 rgba(234, 179, 8, 0.4)",
  error: "0 4px 14px 0 rgba(239, 68, 68, 0.4)",
  info: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",

  // ===== Component Shadows =====
  dropdown: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
  modal: "0 25px 60px -15px rgba(0, 0, 0, 0.3)",
  card: "0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)",
  cardHover: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
  toast: "0 10px 40px -10px rgba(0, 0, 0, 0.2)",
  toolbar: "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
  header: "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
  sidebar: "2px 0 8px 0 rgba(0, 0, 0, 0.05)",
  floating: "0 8px 30px rgba(0, 0, 0, 0.12)",
} as const;

export type ShadowKey = keyof typeof shadows;
