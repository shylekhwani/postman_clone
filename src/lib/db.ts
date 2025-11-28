import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// Create a PG pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Global type declaration (for next.js hot reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Create or reuse existing Prisma client
const db =
  globalThis.prisma ??
  new PrismaClient({
    adapter, // ✅ MUST include adapter ONLY in Prisma 6+
    log: ["query", "info", "warn", "error"],
  });

// Cache Prisma instance in dev mode
if (process.env.NODE_ENV === "development") {
  globalThis.prisma = db;
}

export default db;
