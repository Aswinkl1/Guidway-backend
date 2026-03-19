import { z } from 'zod';
import 'dotenv/config';
const envSchema = z.object({
  DATABASE_URL: z.url('DATABASE_URL must be a valid connection string'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  JWT_ACCESSTOKEN_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required in .env'),
  JWT_ACCESSTOKEN_EXPIRES_IN: z.string().default('15m'),
  JWT_VERIFYTOKEN_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required in .env'),
  JWT_VERIFYTOKEN_EXPIRES_IN: z.string().default('15m'),

  BASE_URL: z.url('BASE_URL must be a valid URL'),
  CLIENT_BASE_URL: z.url('CLIENT_BASE_URL must be a valid URL'),
  API_VERSION: z.string().default('/api/v1'),
  NODEMAIL_EMAIL: z.email('NODEMAIL_EMAIL must be a valid email address'),
  NODEMAIL_PASSWORD: z.string().min(1, 'NODEMAIL_PASSWORD is required'),
});

const parsedEnv = envSchema.parse(process.env);

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
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
}
