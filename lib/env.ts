import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().min(1),
  NEXT_PUBLIC_ENV: z.enum(["dev", "preview", "prod"]),
});

const envObj = {
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,
};

export const env = envSchema.parse(envObj);
