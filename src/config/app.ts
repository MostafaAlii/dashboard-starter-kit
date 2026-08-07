interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  website: string;
  supportEmail: string;
  apiBaseUrl: string;
  appEnv: "development" | "staging" | "production";
  isDev: boolean;
  isProd: boolean;
  isStaging: boolean;
  defaultLanguage: string;
  supportedLanguages: string[];
  defaultTheme: "light" | "dark" | "system";
  dateFormat: string;
  timeFormat: string;
  dateTimeFormat: string;
  currency: string;
  currencySymbol: string;
  perPage: number;
  maxFileSize: number;
  pagination: {
    defaultPage: number;
    defaultPerPage: number;
    perPageOptions: number[];
  };
  meta: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    ogImage: string;
    ogUrl: string;
  };
}

export const appConfig: AppConfig = {
  name: import.meta.env.VITE_APP_NAME || "Dashboard Starter Kit",
  version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  description: "Modern React Dashboard Starter Kit with Modular Architecture",
  author: "Your Name",
  website: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  supportEmail: import.meta.env.VITE_SUPPORT_EMAIL || "support@example.com",
  apiBaseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  appEnv:
    (import.meta.env.VITE_APP_ENV as
      | "development"
      | "staging"
      | "production") || "development",
  isDev: import.meta.env.VITE_APP_ENV === "development",
  isProd: import.meta.env.VITE_APP_ENV === "production",
  isStaging: import.meta.env.VITE_APP_ENV === "staging",
  defaultLanguage: "en",
  supportedLanguages: ["en", "ar"],
  defaultTheme: "system",
  dateFormat: "MMM DD, YYYY",
  timeFormat: "HH:mm",
  dateTimeFormat: "MMM DD, YYYY HH:mm",
  currency: "USD",
  currencySymbol: "$",
  perPage: 10,
  maxFileSize: 5 * 1024 * 1024, // 5MB
  pagination: {
    defaultPage: 1,
    defaultPerPage: 10,
    perPageOptions: [10, 25, 50, 100],
  },
  meta: {
    title: "Dashboard Starter Kit",
    description: "Modern React Dashboard Starter Kit with Modular Architecture",
    keywords: ["react", "dashboard", "starter-kit", "modular", "typescript"],
    author: "Your Name",
    ogImage: "/og-image.png",
    ogUrl: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  },
};

export default appConfig;
