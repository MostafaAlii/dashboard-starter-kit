import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themeConfig } from "../../config/theme";

export type Theme = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = localStorage.getItem(themeConfig.storageKey);

  if (
    storedTheme === "light" ||
    storedTheme === "dark" ||
    storedTheme === "system"
  ) {
    return storedTheme;
  }

  return null;
};

export function ThemeProvider({
  children,
  defaultTheme = themeConfig.defaultTheme,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return getStoredTheme() ?? defaultTheme;
  });

  const [systemTheme, setSystemTheme] =
    useState<ResolvedTheme>(getSystemTheme);

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme;

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      if (currentTheme === "system") {
        return systemTheme === "dark" ? "light" : "dark";
      }

      return currentTheme === "dark" ? "light" : "dark";
    });
  }, [systemTheme]);

  /**
   * Apply theme to <html>
   */
  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute("data-theme", resolvedTheme);
  }, [resolvedTheme]);

  /**
   * Save selected theme
   */
  useEffect(() => {
    localStorage.setItem(themeConfig.storageKey, theme);
  }, [theme]);

  /**
   * Listen for system theme changes
   */
  useEffect(() => {
    if (theme !== "system") {
      return;
    }

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme must be used inside a ThemeProvider"
    );
  }

  return context;
}

export default ThemeProvider;