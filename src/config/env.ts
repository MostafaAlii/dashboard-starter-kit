/*
 * ========================================
 * ENVIRONMENT VARIABLES CONFIGURATION
 * ========================================
 */

import { z } from "zod";

/**
 * ========================================
 * Environment Helpers
 * ========================================
 */

/**
 * Parse environment boolean values safely.
 *
 * Example:
 * "true"  -> true
 * "false" -> false
 */
const booleanFromEnv = z
  .string()
  .default("false")
  .transform((value) => value.toLowerCase() === "true");

/**
 * ========================================
 * Environment Variables Schema
 * ========================================
 */

const envSchema = z.object({
  // ======================================
  // App
  // ======================================

  VITE_APP_NAME: z.string().default("Dashboard Starter Kit"),

  VITE_APP_URL: z.string().url().default("http://localhost:5173"),

  VITE_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),

  // ======================================
  // API
  // ======================================

  VITE_API_URL: z.string().url().default("http://localhost:3000/api"),

  VITE_API_TIMEOUT: z.coerce.number().default(30000),

  // ======================================
  // Auth
  // ======================================

  VITE_AUTH_TOKEN_KEY: z.string().default("auth_token"),

  VITE_REFRESH_TOKEN_KEY: z.string().default("refresh_token"),

  VITE_AUTH_COOKIE_NAME: z.string().default("auth"),

  // ======================================
  // Features
  // ======================================

  VITE_ENABLE_ANALYTICS: booleanFromEnv,

  VITE_ENABLE_DEBUG: booleanFromEnv,

  // ======================================
  // Sentry
  // ======================================

  VITE_SENTRY_DSN: z.string().optional(),

  // ======================================
  // Google Analytics
  // ======================================

  VITE_GA_TRACKING_ID: z.string().optional(),

  // ======================================
  // Defaults
  // ======================================

  VITE_DEFAULT_THEME: z.enum(["light", "dark", "system"]).default("system"),

  VITE_DEFAULT_LANGUAGE: z.string().default("en"),
});

/**
 * ========================================
 * Validate Environment Variables
 * ========================================
 */

export function validateEnv() {
  try {
    return envSchema.parse(import.meta.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:");

      error.issues.forEach((issue) => {
        console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
      });

      throw new Error("Invalid environment variables");
    }

    throw error;
  }
}

/**
 * ========================================
 * Environment Variables
 * ========================================
 */

export const env = validateEnv();

/**
 * ========================================
 * Environment Helpers
 * ========================================
 */

export const isDev = env.VITE_APP_ENV === "development";

export const isStaging = env.VITE_APP_ENV === "staging";

export const isProd = env.VITE_APP_ENV === "production";

export const isServer = typeof window === "undefined";

export const isClient = !isServer;

export default env;
