import { Switch, Route } from "wouter";
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

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} requiredRole="admin" />
      <ProtectedRoute path="/events" component={EventsPage} />
      <ProtectedRoute path="/sermons" component={SermonsPage} />
      <ProtectedRoute path="/community" component={CommunityPage} />
      <ProtectedRoute path="/gallery" component={GalleryPage} />
      <ProtectedRoute path="/contact" component={ContactPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
