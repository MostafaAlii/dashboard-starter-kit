export * from "./colors";
export * from "./spacing";
export * from "./radius";
export * from "./shadows";
export * from "./typography";
export * from "./breakpoints";
export * from "./transitions";
export * from "./z-index";
export * from "./rtl";

// Theme object for easy access
import { colors } from "./colors";
import { spacing } from "./spacing";
import { radius } from "./radius";
import { shadows } from "./shadows";
import { typography } from "./typography";
import { breakpoints, mediaQueries } from "./breakpoints";
import { transitions } from "./transitions";
import { zIndex } from "./z-index";
import { rtlSupport } from "./rtl";

export const theme = {
  colors,
  spacing,
  radius,
  shadows,
  typography,
  breakpoints,
  mediaQueries,
  transitions,
  zIndex,
  rtlSupport,
} as const;

export default theme;
