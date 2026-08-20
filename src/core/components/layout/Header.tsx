import { Menu, Sun, Moon } from "lucide-react";

import { useTheme } from "../../providers/ThemeProvider";
import { useLanguage } from "../../providers/LanguageProvider";
import UserMenu from "./header/UserMenu";
import LanguageSwitcher from "./header/LanguageSwitcher";

interface HeaderProps {
  onSidebarToggle?: () => void;
  title?: string;
  subtitle?: string;
}

const Header = ({
  onSidebarToggle,
  title = "Dashboard",
  subtitle = "Overview",
}: HeaderProps) => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const { direction } = useLanguage();

  return (
    <header
      dir={direction}
      style={{
        height: "72px",
        paddingInline: "1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--color-card)",
        borderBlockEnd: "1px solid var(--color-border)",
        position: "sticky",
        insetBlockStart: 0,
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Header Start */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          minWidth: 0,
        }}
      >
        {/* Sidebar Toggle */}
        <button
          type="button"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
          style={{
            width: "40px",
            height: "40px",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
            border: "none",
            background: "transparent",
            color: "var(--color-text)",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          <Menu size={20} />
        </button>

        {/* Page Title */}
        <div style={{ minWidth: 0 }}>
          <h2
            style={{
              margin: 0,
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "var(--color-text)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {title}
          </h2>

          {subtitle && (
            <span
              style={{
                display: "block",
                marginBlockStart: "0.15rem",
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {/* Header End */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          flexShrink: 0,
        }}
      >
        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            resolvedTheme === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
          }
          title={
            resolvedTheme === "dark"
              ? "Switch to light theme"
              : "Switch to dark theme"
          }
          style={{
            width: "40px",
            height: "40px",
            display: "grid",
            placeItems: "center",
            border: "none",
            background: "var(--color-background)",
            color: "var(--color-text)",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            transition: "background-color 0.2s ease, color 0.2s ease",
          }}
        >
          {resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Language Switcher */}
        <LanguageSwitcher showLabel showFlags showNativeName />

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;