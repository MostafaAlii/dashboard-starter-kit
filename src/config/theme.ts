import { theme } from "../theme";

interface ThemeConfig {
  defaultTheme: "light" | "dark" | "system";
  themes: {
    light: {
      name: string;
      className: string;
      background: string;
      text: string;
    };
    dark: {
      name: string;
      className: string;
      background: string;
      text: string;
    };
  };
  storageKey: string;
  colors: typeof theme.colors;
  spacing: typeof theme.spacing;
  radius: typeof theme.radius;
  shadows: typeof theme.shadows;
  typography: typeof theme.typography;
  breakpoints: typeof theme.breakpoints;
  transitions: typeof theme.transitions;
  zIndex: typeof theme.zIndex;
}

export const themeConfig: ThemeConfig = {
  defaultTheme: "system",
  themes: {
    light: {
      name: "Light",
      className: "light",
      background: "#f8fafc",
      text: "#0f172a",
    },
    dark: {
      name: "Dark",
      className: "dark",
      background: "#0f172a",
      text: "#f1f5f9",
    },
  },
  storageKey: "app-theme",
  colors: theme.colors,
  spacing: theme.spacing,
  radius: theme.radius,
  shadows: theme.shadows,
  typography: theme.typography,
  breakpoints: theme.breakpoints,
  transitions: theme.transitions,
  zIndex: theme.zIndex,
};

export default themeConfig;
