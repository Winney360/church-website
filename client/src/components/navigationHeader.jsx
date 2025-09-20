import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/lib/theme-provider";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Church, 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  User, 
  LogOut, 
  Settings,
  Calendar,
  Mic,
  Users,
  Images,
  Mail
} from "lucide-react";

export default function NavigationHeader() {
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: "Home", icon: Church },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/sermons", label: "Sermons", icon: Mic },
    { href: "/community", label: "Community", icon: Users },
    { href: "/gallery", label: "Gallery", icon: Images },
    { href: "/contact", label: "Contact", icon: Mail },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            {/* Church Logo and Name */}
            <Link href="/" className="flex items-center space-x-3" data-testid="link-home-logo">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Church className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-semibold text-lg">Grace Community</h1>
                <p className="text-xs text-muted-foreground -mt-1">Church</p>
              </div>
            </Link>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex space-x-8">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors font-medium ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-muted"
              data-testid="button-search"
            >
              <Search className="h-5 w-5 text-muted-foreground hover:text-foreground" />
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-muted"
              data-testid="button-theme-toggle"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              ) : (
                <Moon className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              )}
            </Button>

            {/* User Menu / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center space-x-2"
                    data-testid="button-user-menu"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm font-medium">
                    {user.username}
                  </div>
                  <div className="px-2 py-1.5 text-xs text-muted-foreground capitalize">
                    {user.role}
                  </div>
                  <div className="h-px bg-border my-1" />
                  
                  {user.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin" data-testid="link-admin-dashboard">
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    data-testid="button-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button 
                  className="flex items-center space-x-2"
                  data-testid="button-login"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Login</span>
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                  data-testid="button-mobile-menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  {navigationLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                          location === link.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                      >
                        <IconComponent className="h-5 w-5" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
