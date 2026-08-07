/*
 * ========================================
 * BREAKPOINTS SYSTEM (Responsive)
 * ========================================
 */

export const breakpoints = {
  xs: "480px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

// ===== Media Queries =====
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  "2xl": `(min-width: ${breakpoints["2xl"]})`,

  // ===== Max Width Queries =====
  xsMax: `(max-width: calc(${breakpoints.xs} - 1px))`,
  smMax: `(max-width: calc(${breakpoints.sm} - 1px))`,
  mdMax: `(max-width: calc(${breakpoints.md} - 1px))`,
  lgMax: `(max-width: calc(${breakpoints.lg} - 1px))`,
  xlMax: `(max-width: calc(${breakpoints.xl} - 1px))`,
  "2xlMax": `(max-width: calc(${breakpoints["2xl"]} - 1px))`,
} as const;

// ===== Container Widths =====
export const containerWidths = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;

export type BreakpointKey = keyof typeof breakpoints;
export type MediaQueryKey = keyof typeof mediaQueries;
