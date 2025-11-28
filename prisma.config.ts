import "dotenv/config"; // <-- loads .env automatically
import { defineConfig, type PrismaConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    provider: "postgresql",
    url: process.env.DATABASE_URL,
  },
} as PrismaConfig);
