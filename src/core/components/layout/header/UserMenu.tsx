/*
 * ========================================
 * USER MENU
 * ========================================
 */

import {
  ChevronDown,
  HelpCircle,
  LogOut,
  Settings,
  UserPlus,
  UserRound,
} from "lucide-react";

import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownSeparator,
} from "../../ui/Dropdown";

import { Avatar } from "../../ui/Avatar";

import { useLanguage } from "../../../providers/LanguageProvider";
import { useState } from "react";

interface UserMenuProps {
  name?: string;
  email?: string;
  role?: string;
  initials?: string;
  avatar?: string | null;

  onProfile?: () => void;
  onSettings?: () => void;
  onLogout?: () => void;
  onHelp?: () => void;
  onSwitchAccount?: () => void;
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
  onHelp,
  onSwitchAccount,
}: UserMenuProps) => {
  const { direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const isRTL = direction === 'rtl';

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          aria-label="Open user menu"
          aria-haspopup="menu"
          style={{
            display: "flex",
            flexDirection: "row", // ← مهم: العناصر في صف واحد
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.25rem 0.5rem",
            border: "none",
            background: "transparent",
            color: "var(--color-text)",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            transition: "background-color 0.2s ease",
            direction: isRTL ? "rtl" : "ltr",
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.background =
              "var(--color-background-secondary, #f1f5f9)";
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.background =
              "transparent";
          }}
        >
          {/* ===== الصورة ===== */}
          <Avatar
            src={avatar || undefined}
            alt={name}
            fallback={initials}
            size="md"
            status="online"
          />

          {/* ===== البيانات ===== */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: isRTL ? "flex-end" : "flex-start",
              minWidth: 0,
              flex: 1,
            }}
          >
            <span
              style={{
                maxWidth: "120px",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--color-text)",
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
                marginBlockStart: "0.1rem",
                fontSize: "0.7rem",
                color: "var(--color-text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {role}
            </span>
          </div>

          {/* ===== السهم ===== */}
          <ChevronDown
            size={16}
            style={{
              flexShrink: 0,
              transition:
                "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
              transform: isOpen
                ? "rotate(180deg)"
                : "rotate(0deg)",
            }}
          />
        </button>
      }

      position="bottom-end"
      size="md"
      closeOnClickOutside
      closeOnEscape
      closeOnItemClick
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DropdownHeader>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            padding: "0.5rem 0.25rem",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          <Avatar
            src={avatar || undefined}
            alt={name}
            fallback={initials}
            size="lg"
            status="online"
          />

          <div
            style={{
              minWidth: 0,
              flex: 1,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <div
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--color-text)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {name}
            </div>

            <div
              style={{
                marginBlockStart: "0.2rem",
                fontSize: "0.75rem",
                color: "var(--color-text-secondary)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {email}
            </div>

            <span
              style={{
                display: "inline-block",
                marginBlockStart: "0.3rem",
                padding: "0.15rem 0.5rem",
                borderRadius: "var(--radius-full)",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                fontSize: "0.6rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {role}
            </span>
          </div>
        </div>
      </DropdownHeader>

      <DropdownSeparator />

      <DropdownItem icon={<UserRound size={18} />} onClick={onProfile}>
        Profile
      </DropdownItem>

      <DropdownItem icon={<Settings size={18} />} onClick={onSettings}>
        Settings
      </DropdownItem>

      {onHelp && (
        <DropdownItem icon={<HelpCircle size={18} />} onClick={onHelp}>
          Help & Support
        </DropdownItem>
      )}

      {onSwitchAccount && (
        <>
          <DropdownSeparator />
          <DropdownItem icon={<UserPlus size={18} />} onClick={onSwitchAccount}>
            Switch Account
          </DropdownItem>
        </>
      )}

      <DropdownSeparator />

      <DropdownItem icon={<LogOut size={18} />} danger onClick={onLogout}>
        Logout
      </DropdownItem>
    </Dropdown>
  );
};

export default UserMenu;