/*
 * ========================================
 * ENVIRONMENT VARIABLES CONFIGURATION
 * ========================================
 */

import { z } from "zod";

/**
 * Environment Variables Schema
 */
const envSchema = z.object({
  // ===== App =====
  VITE_APP_NAME: z.string().default("Dashboard Starter Kit"),
  VITE_APP_URL: z.string().url().default("http://localhost:5173"),
  VITE_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),

  // ===== API =====
  VITE_API_URL: z.string().url().default("http://localhost:3000/api"),
  VITE_API_TIMEOUT: z.coerce.number().default(30000),

  // ===== Auth =====
  VITE_AUTH_TOKEN_KEY: z.string().default("auth_token"),
  VITE_REFRESH_TOKEN_KEY: z.string().default("refresh_token"),
  VITE_AUTH_COOKIE_NAME: z.string().default("auth"),

  // ===== Features (باستخدام pipe) =====
  VITE_ENABLE_ANALYTICS: z.string().default("false").pipe(z.coerce.boolean()),
  VITE_ENABLE_DEBUG: z.string().default("true").pipe(z.coerce.boolean()),

  // ===== Sentry =====
  VITE_SENTRY_DSN: z.string().optional(),

  // ===== Google Analytics =====
  VITE_GA_TRACKING_ID: z.string().optional(),

  // ===== Defaults =====
  VITE_DEFAULT_THEME: z.enum(["light", "dark", "system"]).default("system"),
  VITE_DEFAULT_LANGUAGE: z.string().default("en"),
});

/**
 * Validate Environment Variables
 */
export function validateEnv() {
  try {
    const parsed = envSchema.parse(import.meta.env);
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join(".")}: ${err.message}`);
      });
      throw new Error("Invalid environment variables");
    }
    throw error;
  }
}

/**
 * Environment Variables
 */
export const env = validateEnv();

/**
 * Environment Helper Functions
 */
export const isDev = env.VITE_APP_ENV === "development";
export const isStaging = env.VITE_APP_ENV === "staging";
export const isProd = env.VITE_APP_ENV === "production";

export const isServer = typeof window === "undefined";
export const isClient = !isServer;

export default env;
