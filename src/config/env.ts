import { z } from "zod";
import "dotenv/config";
const envSchema = z.object({
  DATABASE_URL: z.url("DATABASE_URL must be a valid connection string"),
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.coerce.number().default(3000),
  JWT_ACCESSTOKEN_SECRET: z
    .string()
    .min(1, "JWT_ACCESS_SECRET is required in .env"),
  JWT_ACCESSTOKEN_EXPIRES_IN: z.string().default("15m"),
  JWT_VERIFYTOKEN_SECRET: z
    .string()
    .min(1, "JWT_ACCESS_SECRET is required in .env"),
  JWT_VERIFYTOKEN_EXPIRES_IN: z.string().default("15m"),

  BASE_URL: z.url("BASE_URL must be a valid URL"),
  CLIENT_BASE_URL: z.url("CLIENT_BASE_URL must be a valid URL"),
  API_VERSION: z.string().default("/api/v1"),
  NODEMAIL_EMAIL: z.email("NODEMAIL_EMAIL must be a valid email address"),
  NODEMAIL_PASSWORD: z.string().min(1, "NODEMAIL_PASSWORD is required"),
  AWS_S3_BUCKET_NAME: z.string().min(1, "S3_BUCKET_NAME is required in .env"),
  AWS_ACCESS_KEY_ID: z.string().min(1, "AWS_ACCESS_KEY_ID is required in .env"),
  AWS_SECRET_ACCESS_KEY: z
    .string()
    .min(1, "AWS_SECRET_ACCESS_KEY is required in .env"),
  AWS_REGION: z.string().min(1, "AWS_REGION is required in .env"),
  GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required in .env"),
  GOOGLE_CLIENT_SECRET: z
    .string()
    .min(1, "GOOGLE_CLIENT_SECRET is required in .env"),
  LINKEDIN_CLIENT_ID: z
    .string()
    .min(1, "LINKEDIN_CLIENT_ID is required in .env"),
  LINKEDIN_CLIENT_SECRET: z
    .string()
    .min(1, "LINKEDIN_CLIENT_SECRET is required in .env"),
  COOKIE_MAX_AGE: z.coerce.number("Cookie max age is required "),
});

const parsedEnv = envSchema.parse(process.env);

export class EnvConfig {
  // --- Core Server ---
  static get NODE_ENV(): string {
    return parsedEnv.NODE_ENV;
  }

  static get PORT(): number {
    return parsedEnv.PORT;
  }

  static get BASE_URL(): string {
    return parsedEnv.BASE_URL;
  }

  static get API_VERSION(): string {
    return parsedEnv.API_VERSION;
  }

  // --- Database ---
  static get DATABASE_URL(): string {
    return parsedEnv.DATABASE_URL;
  }

  // --- Email ---
  static get NODEMAIL_EMAIL(): string {
    return parsedEnv.NODEMAIL_EMAIL;
  }

  static get NODEMAIL_PASSWORD(): string {
    return parsedEnv.NODEMAIL_PASSWORD;
  }

  // --- JWT Auth ---
  static get JWT_ACCESSTOKEN_SECRET(): string {
    return parsedEnv.JWT_ACCESSTOKEN_SECRET;
  }

  static get JWT_ACCESSTOKEN_EXPIRES_IN(): string {
    return parsedEnv.JWT_ACCESSTOKEN_EXPIRES_IN;
  }
  static get JWT_VERIFYTOKEN_SECRET(): string {
    return parsedEnv.JWT_VERIFYTOKEN_SECRET;
  }

  static get JWT_VERIFYTOKEN_EXPIRES_IN(): string {
    return parsedEnv.JWT_VERIFYTOKEN_EXPIRES_IN;
  }

  static get CLIENT_BASE_URL(): string {
    return parsedEnv.CLIENT_BASE_URL;
  }

  static get S3_BUCKET_NAME(): string {
    return parsedEnv.AWS_S3_BUCKET_NAME;
  }

  static get AWS_ACCESS_KEY_ID(): string {
    return parsedEnv.AWS_ACCESS_KEY_ID;
  }

  static get AWS_SECRET_ACCESS_KEY(): string {
    return parsedEnv.AWS_SECRET_ACCESS_KEY;
  }

  static get AWS_REGION(): string {
    return parsedEnv.AWS_REGION;
  }

  static get GOOGLE_CLIENT_ID(): string {
    return parsedEnv.GOOGLE_CLIENT_ID;
  }

  static get GOOGLE_CLIENT_SECRET(): string {
    return parsedEnv.GOOGLE_CLIENT_SECRET;
  }

  static get LINKEDIN_CLIENT_ID(): string {
    return parsedEnv.LINKEDIN_CLIENT_ID;
  }

  static get LINKEDIN_CLIENT_SECRET(): string {
    return parsedEnv.LINKEDIN_CLIENT_SECRET;
  }

  static get COOKIE_MAX_AGE(): number {
    return parsedEnv.COOKIE_MAX_AGE;
  }
}
