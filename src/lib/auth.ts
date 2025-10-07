import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db"; // Import the Prisma client instance
import { envSafety } from "./env";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  socialProviders: {
    github: {
      clientId: envSafety.GITHUB_CLIENT_ID,
      clientSecret: envSafety.GITHUB_CLIENT_SECRET,
    },

    google: {
      clientId: envSafety.GOOGLE_CLIENT_ID,
      clientSecret: envSafety.GOOGLE_CLIENT_SECRET,
    },
  },
});
