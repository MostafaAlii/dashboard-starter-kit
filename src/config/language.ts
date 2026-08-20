/*
 * ========================================
 * LANGUAGE CONFIG
 * ========================================
 */

import {
  DEFAULT_LANGUAGE,
  type LanguageCode,
} from "../core/constants/languages";

export interface LanguageConfig {
  defaultLanguage: LanguageCode;
  storageKey: string;
  supportedLanguages: LanguageCode[];
  fallbackLanguage: LanguageCode;
}

export const languageConfig: LanguageConfig = {
  defaultLanguage: DEFAULT_LANGUAGE,
  storageKey: "app-language",
  supportedLanguages: ["en", "ar", "fr", "es", "de", "tr", "ur", "fa"],
  fallbackLanguage: "en",
};

export default languageConfig;
