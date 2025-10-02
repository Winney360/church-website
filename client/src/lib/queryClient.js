import { QueryClient } from "@tanstack/react-query";

const API_BASE = import.meta.env.VITE_API_URL; // e.g. http://localhost:5000 or Render URL

async function throwIfResNotOk(res) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Generic API request with method, path, and optional JSON body.
 */
export async function apiRequest(method, url, data) {
  const res = await fetch(`${API_BASE}${url}`, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include", // include cookies for JWT auth if needed
  });

  await throwIfResNotOk(res);
  return res;
}

/**
 * Query function factory for React Query.
 * Supports optional handling for 401 unauthorized (return null).
 */
export const getQueryFn = ({ on401 }) => async ({ queryKey }) => {
  const path = queryKey.join("/"); // e.g. "/api/user"
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
  });

  if (on401 === "returnNull" && res.status === 401) return null;

  await throwIfResNotOk(res);
  return await res.json();
};

/**
 * React Query client with default options.
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
