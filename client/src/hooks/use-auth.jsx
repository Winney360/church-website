import { createContext, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "@/hooks/useToast";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { toast } = useToast();

  // ✅ Fetch logged-in user
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  // ✅ Login (admins + coordinators only)
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const res = await apiRequest("POST", "/api/auth/login", credentials);
      return await res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/user"], user);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    },
    onError: (error) => {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // ✅ Create coordinator (admin only)
  const createCoordinatorMutation = useMutation({
    mutationFn: async (newCoordinator) => {
      const res = await apiRequest("POST", "/api/auth/coordinators", newCoordinator);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Coordinator created!",
        description: "The new coordinator can now log in.",
      });
    },
    onError: (error) => {
      toast({
        title: "Failed to create coordinator",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // ✅ Logout
  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      toast({
        title: "Goodbye!",
        description: "You have been successfully logged out.",
      });
    },
    onError: (error) => {
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        createCoordinatorMutation, // 👈 only admins will see/use this
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
