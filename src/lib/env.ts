import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const envSafety = createEnv({
  server: {
    GITHUB_CLIENT_ID: z.string().min(1, "GITHUB_CLIENT_ID is required"),
    GITHUB_CLIENT_SECRET: z.string().min(1, "GITHUB_CLIENT_SECRET is required"),
    GOOGLE_CLIENT_ID: z.string().min(1, "GOOGLE_CLIENT_ID is required"),
    GOOGLE_CLIENT_SECRET: z.string().min(1, "GOOGLE_CLIENT_SECRET is required"),
    GOOGLE_GENERATIVE_AI_API_KEY: z
      .string()
      .min(1, "GOOGLE_GENERATIVE_AI_API_KEY is required"),
  },

  experimental__runtimeEnv: process.env,
});
