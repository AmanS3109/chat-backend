import { z } from "zod";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const envSchema = z.object({
  PORT: z.string().optional().default("5000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DB_HOST: z.string(),
  DB_PORT: z.string(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = {
  ...parsedEnv.data,
  DATABASE_URL: `postgres://${parsedEnv.data.DB_USER}:${parsedEnv.data.DB_PASS}@${parsedEnv.data.DB_HOST}:${parsedEnv.data.DB_PORT}/${parsedEnv.data.DB_NAME}`,
};

