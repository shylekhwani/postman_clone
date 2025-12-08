"use client";
// 👆 This tells Next.js that this file MUST run in the browser
// Because React Query uses browser memory, state, and effects

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

// This component will wrap your entire app and provide React Query support
export function QueryProvider({ children }: { children: React.ReactNode }) {
  // ✅ We use lazy initialization here:
  // - useState gets a CALLBACK FUNCTION
  // - That function runs ONLY ONCE when the component mounts
  // - It creates ONE single QueryClient instance
  // - That same instance is reused on every re-render
  const [client] = useState(() => new QueryClient());

  // ✅ QueryClientProvider makes the "client" available globally
  // ✅ Now any component inside can use:
  //    useQuery(), useMutation(), useInfiniteQuery(), etc.
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
