import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { z } from "zod";
import { Loader2, Church, Heart, Users } from "lucide-react";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema.extend({
      confirmPassword: z.string(),
    })),
    defaultValues: {
      username: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      role: "member",
    },
  });

  // Redirect if already logged in (after hooks)
  if (user) {
    return <Redirect to="/" />;
  }

  const onLogin = (data) => {
    loginMutation.mutate({
      username: data.username,
      password: data.password,
    });
  };

  const onRegister = (data) => {
    if (data.password !== data.confirmPassword) {
      registerForm.setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    const { confirmPassword, ...registerData } = data;
    registerMutation.mutate(registerData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side - Forms */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Church className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-serif font-semibold text-lg">Grace Community</h1>
                <p className="text-xs text-muted-foreground -mt-1">Church</p>
              </div>
            </div>
            <h2 className="text-2xl font-serif font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">Join our community of faith</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" data-testid="tab-login">Login</TabsTrigger>
              <TabsTrigger value="register" data-testid="tab-register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                    <div>
                      <Label htmlFor="login-username">Username or Email</Label>
                      <Input
                        id="login-username"
                        data-testid="input-login-username"
                        {...loginForm.register("username")}
                        className="mt-1"
                      />
                      {loginForm.formState.errors.username && (
                        <p className="text-sm text-destructive mt-1">
                          {loginForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        data-testid="input-login-password"
                        type="password"
                        {...loginForm.register("password")}
                        className="mt-1"
                      />
                      {loginForm.formState.errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {loginForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      data-testid="button-login"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Sign In
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-4">
                    <div>
                      <Label htmlFor="register-username">Username</Label>
                      <Input
                        id="register-username"
                        data-testid="input-register-username"
                        {...registerForm.register("username")}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.username && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.username.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="register-email">Email Address</Label>
                      <Input
                        id="register-email"
                        data-testid="input-register-email"
                        type="email"
                        {...registerForm.register("email")}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.email && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="register-mobile">Mobile Number (Optional)</Label>
                      <Input
                        id="register-mobile"
                        data-testid="input-register-mobile"
                        type="tel"
                        {...registerForm.register("mobile")}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.mobile && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.mobile.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="register-password">Password</Label>
                      <Input
                        id="register-password"
                        data-testid="input-register-password"
                        type="password"
                        {...registerForm.register("password")}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.password && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="register-confirm-password">Confirm Password</Label>
                      <Input
                        id="register-confirm-password"
                        data-testid="input-register-confirm-password"
                        type="password"
                        {...registerForm.register("confirmPassword")}
                        className="mt-1"
                      />
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-sm text-destructive mt-1">
                          {registerForm.formState.errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      data-testid="button-register"
                      disabled={registerMutation.isPending}
                    >
                      {registerMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Create Account
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Right side - Hero */}
      <div className="gradient-hero flex items-center justify-center p-8">
        <div className="text-center text-white">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Church className="h-12 w-12 text-white" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold leading-tight mb-6">
            Welcome to Our
            <br />
            <span className="text-yellow-200">Community</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-lg">
            Join us in worship, fellowship, and service as we grow together in faith and love. 
            Everyone is welcome in God's house.
          </p>
          
          <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
            <div className="flex items-center space-x-3 text-white/90">
              <Heart className="h-5 w-5" />
              <span>Faith-centered community</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Users className="h-5 w-5" />
              <span>All ages welcome</span>
            </div>
            <div className="flex items-center space-x-3 text-white/90">
              <Church className="h-5 w-5" />
              <span>Weekly worship services</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
