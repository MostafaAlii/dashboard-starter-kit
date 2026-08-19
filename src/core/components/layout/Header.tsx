import {
  Menu,
  Sun,
  Moon,
} from "lucide-react";

import { useTheme } from "../../providers/ThemeProvider";
import { useDirection } from "../../providers/DirectionProvider";

interface HeaderProps {
  onSidebarToggle?: () => void;
}

const Header = ({
  onSidebarToggle,
}: HeaderProps) => {
  const {
    resolvedTheme,
    toggleTheme,
  } = useTheme();

  const {
    direction,
    toggleDirection,
  } = useDirection();

  return (
    <header
      dir={direction}
      style={{
        height: "72px",
        padding: "0 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent:
          "space-between",
        background:
          "var(--color-card)",
        borderBottom:
          "1px solid var(--color-border)",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <button
          type="button"
          onClick={onSidebarToggle}
          aria-label="Toggle sidebar"
          style={{
            width: "40px",
            height: "40px",
            display: "grid",
            placeItems: "center",
            border: "none",
            background: "transparent",
            color:
              "var(--color-text)",
            cursor: "pointer",
            borderRadius:
              "var(--radius-md)",
          }}
        >
          <Menu size={20} />
        </button>

        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "1.1rem",
            }}
          >
            Dashboard
          </h2>

          <span
            style={{
              fontSize: "0.75rem",
              color:
                "var(--color-text-secondary)",
            }}
          >
            Overview
          </span>
        </div>
      </div>

      {/* Right */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <button
          type="button"
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            width: "40px",
            height: "40px",
            display: "grid",
            placeItems: "center",
            border: "none",
            background:
              "var(--color-background)",
            color:
              "var(--color-text)",
            cursor: "pointer",
            borderRadius:
              "var(--radius-md)",
          }}
        >
          {resolvedTheme === "dark" ? (
            <Sun size={20} />
          ) : (
            <Moon size={20} />
          )}
        </button>

        <button
          type="button"
          onClick={toggleDirection}
          title="Toggle direction"
          style={{
            minWidth: "40px",
            height: "40px",
            padding: "0 0.5rem",
            border: "none",
            background:
              "var(--color-background)",
            color:
              "var(--color-text)",
            cursor: "pointer",
            borderRadius:
              "var(--radius-md)",
          }}
        >
          {direction === "ltr"
            ? "RTL"
            : "LTR"}
        </button>

        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            background:
              "var(--color-primary-light)",
            color:
              "var(--color-primary)",
            fontWeight: 700,
          }}
        >
          MA
        </div>
      </div>
    </header>
  );
};

export default Header;