import { Routes, Route } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./hooks/use-auth";
import { ThemeProvider } from "./lib/themeProvider";
import { ProtectedRoute } from "./lib/protectedRoute";

import HomePage from "@/pages/homePage";
import AuthPage from "@/pages/authPage";
import AdminDashboard from "@/pages/adminDashboard";
import EventsPage from "@/pages/eventsPage";
import SermonsPage from "@/pages/sermonsPage";
import CommunityPage from "@/pages/communityPage";
import GalleryPage from "@/pages/galleryPage";
import ContactPage from "@/pages/contactPage";
import NotFound from "@/pages/notFound";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Routes>
              {/* Public pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/sermons" element={<SermonsPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Auth route */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Admin-only route */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
