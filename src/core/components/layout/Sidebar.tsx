import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Package,
  Settings,
} from "lucide-react";

import type { NavigationSection } from "../../types/navigation";
import { useDirection } from "../../providers/DirectionProvider";

interface SidebarProps {
  items?: NavigationSection[];
  collapsed?: boolean;
  onToggle?: () => void;
}

const navigation: NavigationSection[] = [
  {
    id: "main",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        path: "/",
      },
      {
        id: "users",
        label: "Users",
        icon: Users,
        path: "/users",
      },
      {
        id: "products",
        label: "Products",
        icon: Package,
        path: "/products",
      },
    ],
  },
  {
    id: "system",
    label: "System",
    items: [
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
        path: "/settings",
      },
    ],
  },
];

export function Sidebar({
  items = navigation,
  collapsed = false,
  onToggle,
}: SidebarProps) {
  const { direction } = useDirection();

  return (
    <aside
      dir={direction}
      style={{
        width: collapsed ? "72px" : "260px",
        minHeight: "100vh",
        background: "var(--color-card)",
        borderInlineEnd: "1px solid var(--color-border)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s ease",
        flexShrink: 0,
      }}
    >
      {/* Logo */}

      <div
        style={{
          height: "72px",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed
            ? "center"
            : "space-between",
          borderBottom:
            "1px solid var(--color-border)",
        }}
      >
        {!collapsed && (
          <strong
            style={{
              fontSize: "1.1rem",
              whiteSpace: "nowrap",
            }}
          >
            🚀 Dashboard
          </strong>
        )}

        {onToggle && (
          <button
            type="button"
            onClick={onToggle}
            aria-label="Toggle sidebar"
            style={{
              width: "40px",
              height: "40px",
              display: "grid",
              placeItems: "center",
              border: "none",
              background: "transparent",
              color: "var(--color-text)",
              cursor: "pointer",
              borderRadius:
                "var(--radius-md)",
            }}
          >
            {collapsed ? (
              <Menu size={20} />
            ) : (
              <X size={20} />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}

      <nav
        style={{
          flex: 1,
          padding: "1rem 0.75rem",
          overflowY: "auto",
        }}
      >
        {items.map((section) => (
          <div
            key={section.id}
            style={{
              marginBottom: "1.5rem",
            }}
          >
            {!collapsed && section.label && (
              <div
                style={{
                  padding: "0 0.75rem",
                  marginBottom: "0.5rem",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color:
                    "var(--color-text-secondary)",
                  textTransform: "uppercase",
                }}
              >
                {section.label}
              </div>
            )}

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.id}
                    to={item.path ?? "#"}
                    title={
                      collapsed
                        ? item.label
                        : undefined
                    }
                    style={({ isActive }) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: collapsed
                        ? "center"
                        : "flex-start",
                      gap: "0.75rem",
                      minHeight: "44px",
                      padding: collapsed
                        ? "0.5rem"
                        : "0.5rem 0.75rem",
                      color: isActive
                        ? "var(--color-primary)"
                        : "var(--color-text-secondary)",
                      background: isActive
                        ? "var(--color-primary-light)"
                        : "transparent",
                      textDecoration: "none",
                      borderRadius:
                        "var(--radius-md)",
                      transition:
                        "background 0.2s ease, color 0.2s ease",
                      opacity: item.disabled
                        ? 0.5
                        : 1,
                      pointerEvents:
                        item.disabled
                          ? "none"
                          : "auto",
                    })}
                  >
                    {Icon && <Icon size={20} />}

                    {!collapsed && (
                      <span
                        style={{
                          flex: 1,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </span>
                    )}

                    {!collapsed &&
                      item.badge !== undefined && (
                        <span>
                          {item.badge}
                        </span>
                      )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Menu */}

      {!collapsed && (
        <div
          style={{
            padding: "1rem",
            borderTop:
              "1px solid var(--color-border)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
            }}
          >
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

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Admin User
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  color:
                    "var(--color-text-secondary)",
                }}
              >
                Administrator
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;