/*
 * ========================================
 * LANGUAGES CONSTANTS
 * ========================================
 */

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
  flag?: string;
  locale: string;
}

export const LANGUAGES: Language[] = [
  {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    dir: "rtl",
    flag: "🇸🇦",
    locale: "ar-SA",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    flag: "🇬🇧",
    locale: "en-US",
  },
  {
    code: "fr",
    name: "French",
    nativeName: "Français",
    dir: "ltr",
    flag: "🇫🇷",
    locale: "fr-FR",
  },
  {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    dir: "ltr",
    flag: "🇪🇸",
    locale: "es-ES",
  },
  {
    code: "de",
    name: "German",
    nativeName: "Deutsch",
    dir: "ltr",
    flag: "🇩🇪",
    locale: "de-DE",
  },
  {
    code: "tr",
    name: "Turkish",
    nativeName: "Türkçe",
    dir: "ltr",
    flag: "🇹🇷",
    locale: "tr-TR",
  },
  {
    code: "ur",
    name: "Urdu",
    nativeName: "اردو",
    dir: "rtl",
    flag: "🇵🇰",
    locale: "ur-PK",
  },
  {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    dir: "rtl",
    flag: "🇮🇷",
    locale: "fa-IR",
  },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

export const DEFAULT_LANGUAGE: LanguageCode = "ar"; // العربية هي الافتراضية

export const getLanguageByCode = (code: string): Language | undefined => {
  return LANGUAGES.find((lang) => lang.code === code);
};

export const getLanguageDirection = (code: string): "ltr" | "rtl" => {
  const lang = getLanguageByCode(code);
  return lang?.dir || "ltr";
};

export const isRTL = (code: string): boolean => {
  return getLanguageDirection(code) === "rtl";
};
