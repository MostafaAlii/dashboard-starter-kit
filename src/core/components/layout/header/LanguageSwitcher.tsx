/*
 * ========================================
 * LANGUAGE SWITCHER
 * ========================================
 */

import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../../providers/LanguageProvider';

import {
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownSeparator,
} from '../../ui/Dropdown';

import type { Language } from '../../../constants/languages';

interface LanguageSwitcherProps {
  showLabel?: boolean;
  showFlags?: boolean;
  showNativeName?: boolean;
}

const LanguageSwitcher = ({
  showLabel = true,
  showFlags = true,
  showNativeName = true,
}: LanguageSwitcherProps) => {
  const {
    language,
    currentLanguage,
    setLanguage,
    languages,
    direction,
  } = useLanguage();

  const isRTL = direction === 'rtl';

  const getLanguageLabel = (lang: Language) => {
    return isRTL ? lang.nativeName : lang.name;
  };

  const getTriggerLabel = () => {
    return isRTL ? currentLanguage.nativeName : currentLanguage.name;
  };

  return (
    <Dropdown
      trigger={
        <button
          type="button"
          aria-label="Switch language"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.25rem 0.75rem',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text)',
            cursor: 'pointer',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color 0.2s ease',
            minHeight: '40px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              'var(--color-background-secondary, #f1f5f9)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Globe size={20} />

          {showLabel && (
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--color-text)',
              }}
            >
              {getTriggerLabel()}
            </span>
          )}
        </button>
      }
      position="bottom-end"
      size="lg"
      closeOnClickOutside
      closeOnEscape
      closeOnItemClick
    >
      <DropdownHeader>
        <div
          style={{
            padding: '0.25rem 0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <Globe size={16} />
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Language
          </span>
        </div>
      </DropdownHeader>

      <DropdownSeparator />

      {languages.map((lang) => {
        const isActive = language === lang.code;

        return (
          <DropdownItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as any)}
            style={{
              background: isActive ? 'var(--color-primary-light)' : 'transparent',
              padding: '0.5rem 0.75rem',
              minHeight: '44px',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            {/* العلم + النص */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flex: 1,
              }}
            >
              {showFlags && lang.flag && (
                <span style={{ 
                  fontSize: '1.1rem', 
                  flexShrink: 0,
                  width: '28px',
                  textAlign: 'center',
                }}>
                  {lang.flag}
                </span>
              )}
              
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                }}
              >
                {getLanguageLabel(lang)}
              </span>
            </div>

            {/* علامة الصح */}
            {isActive && (
              <Check 
                size={18} 
                color="var(--color-primary)" 
                style={{ flexShrink: 0 }}
              />
            )}
          </DropdownItem>
        );
      })}
    </Dropdown>
  );
};

export default LanguageSwitcher;