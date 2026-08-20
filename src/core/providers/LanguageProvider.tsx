/*
 * ========================================
 * LANGUAGE PROVIDER
 * ========================================
 *
 * Manages application language and direction.
 * Direction is derived from the selected language.
 *
 * This is the SINGLE SOURCE OF TRUTH for:
 * - Current language
 * - Current direction (LTR/RTL)
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  LANGUAGES,
  DEFAULT_LANGUAGE,
  getLanguageByCode,
  getLanguageDirection,
  type LanguageCode,
  type Language,
} from '../constants/languages';

import { languageConfig } from '../../config/language';

interface LanguageContextValue {
  language: LanguageCode;
  direction: 'ltr' | 'rtl';
  currentLanguage: Language;
  setLanguage: (code: LanguageCode) => void;
  toggleLanguage: () => void;
  getLanguage: (code: LanguageCode) => Language | undefined;
  languages: Language[];
  isRTL: boolean;
}

interface LanguageProviderProps {
  children: ReactNode;
  defaultLanguage?: LanguageCode;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const STORAGE_KEY = languageConfig.storageKey;

const getStoredLanguage = (): LanguageCode | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && LANGUAGES.some((lang) => lang.code === stored)) {
    return stored as LanguageCode;
  }

  return null;
};

export function LanguageProvider({
  children,
  defaultLanguage = DEFAULT_LANGUAGE,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    return getStoredLanguage() ?? defaultLanguage;
  });

  // ===== Direction is derived from language =====
  const direction = useMemo(() => getLanguageDirection(language), [language]);
  const isRTL = direction === 'rtl';

  const currentLanguage = useMemo(() => {
    return getLanguageByCode(language) || LANGUAGES[0];
  }, [language]);

  const setLanguage = useCallback((newLanguage: LanguageCode) => {
    const exists = LANGUAGES.some((lang) => lang.code === newLanguage);
    if (!exists) {
      console.warn(`Language "${newLanguage}" not found, using default`);
      return;
    }
    setLanguageState(newLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((current) => {
      const currentIndex = LANGUAGES.findIndex((lang) => lang.code === current);
      const nextIndex = (currentIndex + 1) % LANGUAGES.length;
      return LANGUAGES[nextIndex].code;
    });
  }, []);

  const getLanguage = useCallback((code: LanguageCode) => {
    return getLanguageByCode(code);
  }, []);

  // ===== Apply language and direction to <html> =====
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', direction);
    root.setAttribute('data-direction', direction);

    if (isRTL) {
      root.classList.add('rtl');
      root.classList.remove('ltr');
    } else {
      root.classList.add('ltr');
      root.classList.remove('rtl');
    }
  }, [language, direction, isRTL]);

  // ===== Save language to localStorage =====
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      direction,
      currentLanguage,
      setLanguage,
      toggleLanguage,
      getLanguage,
      languages: LANGUAGES as unknown as Language[],
      isRTL,
    }),
    [language, direction, currentLanguage, setLanguage, toggleLanguage, getLanguage, isRTL]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('useLanguage must be used inside a LanguageProvider');
  }

  return context;
}

export default LanguageProvider;