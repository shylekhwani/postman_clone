import { PrismaClient } from "@prisma/client"; // Import the PrismaClient class from the Prisma package

// Declare a global variable type definition for PrismaClient
declare global {
  var prisma: PrismaClient | undefined;
}

// Create or reuse an existing PrismaClient instance
const db =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
/**
 Explanation:
    --  globalThis.prisma — checks if we already have a Prisma client stored globally (to reuse it).
    --  If not, new PrismaClient({...}) creates one.
    --  The log option lets Prisma print out queries and other details in the console — useful for debugging.
 */

// In development mode, store the Prisma client globally
if (process.env.NODE_ENV === "development") {
  globalThis.prisma = db;
}

export default db;
