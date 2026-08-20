import {
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";

import {
  useEffect,
  useRef,
  useState,
} from "react";

interface UserMenuProps {
  name?: string;
  email?: string;
  role?: string;
  initials?: string;
  avatar?: string | null;

  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const UserMenu = ({
  name = "Admin User",
  email = "admin@example.com",
  role = "Administrator",
  initials = "MA",
  avatar = null,
  onProfile,
  onSettings,
  onLogout,
}: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  /**
   * Close menu when clicking outside
   */
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /**
   * Close menu with Escape
   */
  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, []);

  /**
   * Menu handlers
   */

  const handleProfile = () => {
    setIsOpen(false);
    onProfile?.();
  };

  const handleSettings = () => {
    setIsOpen(false);
    onSettings?.();
  };

  const handleLogout = () => {
    setIsOpen(false);
    onLogout?.();
  };

  /**
   * Avatar component
   */

  const Avatar = ({
    size = 40,
  }: {
    size?: number;
  }) => {
    return (
      <div
        style={{
          width: `${size}px`,
          height: `${size}px`,

          display: "grid",
          placeItems: "center",

          flexShrink: 0,

          overflow: "hidden",

          borderRadius: "50%",

          background:
            "var(--color-primary-light)",

          color:
            "var(--color-primary)",

          fontWeight: 700,

          fontSize:
            size >= 40
              ? "0.875rem"
              : "0.75rem",
        }}
      >
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            style={{
              width: "100%",
              height: "100%",

              objectFit: "cover",

              display: "block",
            }}
          />
        ) : (
          initials
        )}
      </div>
    );
  };

  return (
    <div
      ref={menuRef}
      style={{
        position: "relative",
      }}
    >
      {/* ================================
          User Trigger
          ================================ */}

      <button
        type="button"
        onClick={() =>
          setIsOpen(
            (current) => !current
          )
        }
        aria-label="Open user menu"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        style={{
          display: "flex",
          alignItems: "center",

          gap: "0.5rem",

          padding: "0.25rem",

          border: "none",

          background: "transparent",

          color:
            "var(--color-text)",

          cursor: "pointer",

          borderRadius:
            "var(--radius-md)",

          transition:
            "background-color 0.2s ease",
        }}
      >
        {/* Avatar */}

        <Avatar />

        {/* User Info */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",

            alignItems: "flex-start",

            minWidth: 0,

            textAlign: "start",
          }}
        >
          <span
            style={{
              maxWidth: "120px",

              fontSize: "0.8rem",

              fontWeight: 600,

              color:
                "var(--color-text)",

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
          >
            {name}
          </span>

          <span
            style={{
              maxWidth: "120px",

              marginBlockStart:
                "0.1rem",

              fontSize: "0.7rem",

              color:
                "var(--color-text-secondary)",

              whiteSpace: "nowrap",

              overflow: "hidden",

              textOverflow: "ellipsis",
            }}
          >
            {role}
          </span>
        </div>

        {/* Arrow */}

        <ChevronDown
          size={16}
          style={{
            flexShrink: 0,

            transform: isOpen
              ? "rotate(180deg)"
              : "rotate(0deg)",

            transition:
              "transform 0.2s ease",
          }}
        />
      </button>

      {/* ================================
          Dropdown
          ================================ */}

      {isOpen && (
        <div
          role="menu"
          style={{
            position: "absolute",

            insetBlockStart:
              "calc(100% + 0.5rem)",

            insetInlineEnd: 0,

            width: "280px",

            padding: "0.5rem",

            background:
              "var(--color-card)",

            border:
              "1px solid var(--color-border)",

            borderRadius:
              "var(--radius-lg)",

            boxShadow:
              "var(--shadow-lg)",

            zIndex: 100,
          }}
        >
          {/* ================================
              User Header
              ================================ */}

          <div
            style={{
              display: "flex",

              alignItems: "center",

              gap: "0.75rem",

              padding: "0.75rem",

              marginBlockEnd:
                "0.5rem",

              borderBlockEnd:
                "1px solid var(--color-border)",
            }}
          >
            <Avatar size={48} />

            <div
              style={{
                minWidth: 0,
              }}
            >
              <div
                style={{
                  fontSize: "0.875rem",

                  fontWeight: 600,

                  color:
                    "var(--color-text)",

                  whiteSpace:
                    "nowrap",

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",
                }}
              >
                {name}
              </div>

              <div
                style={{
                  marginBlockStart:
                    "0.2rem",

                  fontSize: "0.75rem",

                  color:
                    "var(--color-text-secondary)",

                  whiteSpace:
                    "nowrap",

                  overflow:
                    "hidden",

                  textOverflow:
                    "ellipsis",
                }}
              >
                {email}
              </div>

              <span
                style={{
                  display:
                    "inline-block",

                  marginBlockStart:
                    "0.4rem",

                  padding:
                    "0.15rem 0.5rem",

                  borderRadius:
                    "var(--radius-full)",

                  background:
                    "var(--color-primary-light)",

                  color:
                    "var(--color-primary)",

                  fontSize:
                    "0.65rem",

                  fontWeight: 600,
                }}
              >
                {role}
              </span>
            </div>
          </div>

          {/* ================================
              Profile
              ================================ */}

          <button
            type="button"
            role="menuitem"
            onClick={
              handleProfile
            }
            style={{
              width: "100%",

              display: "flex",

              alignItems: "center",

              gap: "0.75rem",

              padding:
                "0.7rem 0.75rem",

              border: "none",

              background:
                "transparent",

              color:
                "var(--color-text)",

              cursor: "pointer",

              borderRadius:
                "var(--radius-md)",

              textAlign: "start",

              fontSize:
                "0.875rem",

              transition:
                "background-color 0.2s ease",
            }}
          >
            <UserRound size={18} />

            <span>
              Profile
            </span>
          </button>

          {/* ================================
              Settings
              ================================ */}

          <button
            type="button"
            role="menuitem"
            onClick={
              handleSettings
            }
            style={{
              width: "100%",

              display: "flex",

              alignItems: "center",

              gap: "0.75rem",

              padding:
                "0.7rem 0.75rem",

              border: "none",

              background:
                "transparent",

              color:
                "var(--color-text)",

              cursor: "pointer",

              borderRadius:
                "var(--radius-md)",

              textAlign: "start",

              fontSize:
                "0.875rem",

              transition:
                "background-color 0.2s ease",
            }}
          >
            <Settings size={18} />

            <span>
              Settings
            </span>
          </button>

          {/* ================================
              Logout
              ================================ */}

          <div
            style={{
              marginBlock:
                "0.35rem",

              borderBlockStart:
                "1px solid var(--color-border)",
            }}
          />

          <button
            type="button"
            role="menuitem"
            onClick={
              handleLogout
            }
            style={{
              width: "100%",

              display: "flex",

              alignItems: "center",

              gap: "0.75rem",

              padding:
                "0.7rem 0.75rem",

              border: "none",

              background:
                "transparent",

              color:
                "var(--color-danger)",

              cursor: "pointer",

              borderRadius:
                "var(--radius-md)",

              textAlign: "start",

              fontSize:
                "0.875rem",

              transition:
                "background-color 0.2s ease",
            }}
          >
            <LogOut size={18} />

            <span>
              Logout
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;