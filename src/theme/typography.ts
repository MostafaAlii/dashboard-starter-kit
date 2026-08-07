/*
 * ========================================
 * TYPOGRAPHY SYSTEM
 * ========================================
 */

export const typography = {
  // ===== Font Families =====
  fontFamily: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', Arial, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Source Code Pro', Menlo, Monaco, Consolas, 'Courier New', monospace",
    serif: "'Merriweather', 'Georgia', 'Times New Roman', serif",
  },

  // ===== Font Sizes =====
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px",
    "6xl": "60px",
    "7xl": "72px",
    "8xl": "96px",
    "9xl": "128px",
  },

  // ===== Font Weights =====
  fontWeight: {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
  },

  // ===== Line Heights =====
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // ===== Letter Spacing =====
  letterSpacing: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },

  // ===== Text Sizes (Semantic) =====
  textSize: {
    caption: "var(--font-size-xs)",
    body: "var(--font-size-md)",
    bodyLarge: "var(--font-size-lg)",
    subtitle: "var(--font-size-xl)",
    title: "var(--font-size-2xl)",
    heading: "var(--font-size-3xl)",
    display: "var(--font-size-4xl)",
  },
} as const;

export type TypographyKey = keyof typeof typography;
export type FontSizeKey = keyof typeof typography.fontSize;
export type FontWeightKey = keyof typeof typography.fontWeight;
export type LineHeightKey = keyof typeof typography.lineHeight;
export type LetterSpacingKey = keyof typeof typography.letterSpacing;
