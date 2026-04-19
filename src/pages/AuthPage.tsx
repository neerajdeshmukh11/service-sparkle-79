import React, { useState } from "react";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Home, Shield, Wrench, User } from "lucide-react";

const roleConfig: { role: UserRole; label: string; icon: React.ReactNode; color: string; demo: { email: string; password: string } }[] = [
  { role: "admin", label: "Admin", icon: <Shield className="w-5 h-5" />, color: "from-primary to-primary/80", demo: { email: "admin@homegenie.com", password: "admin123" } },
  { role: "provider", label: "Provider", icon: <Wrench className="w-5 h-5" />, color: "from-success to-success/80", demo: { email: "provider@homegenie.com", password: "provider123" } },
  { role: "customer", label: "Customer", icon: <User className="w-5 h-5" />, color: "from-info to-info/80", demo: { email: "customer@homegenie.com", password: "customer123" } },
];

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>("admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let success = false;
    if (isLogin) {
      success = login(email, password, selectedRole);
    } else {
      success = register(name, email, password, selectedRole);
    }
    if (success) {
      if (selectedRole === "admin") navigate("/admin");
      else if (selectedRole === "provider") navigate("/provider");
      else navigate("/customer");
    }
  };

  const fillDemo = (role: UserRole) => {
    const cfg = roleConfig.find(r => r.role === role);
    if (cfg) {
      setEmail(cfg.demo.email);
      setPassword(cfg.demo.password);
      setSelectedRole(role);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-primary items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        </div>
        <div className="relative text-primary-foreground max-w-lg animate-fade-in">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary-foreground/20 rounded-xl">
              <Home className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold">HomeGenie</h1>
          </div>
          <h2 className="text-4xl font-bold mb-6 leading-tight">
            Smart Home Services Platform
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Connect with trusted service providers for all your home needs. From plumbing to cleaning, we've got you covered.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <div className="p-2 gradient-primary rounded-lg">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold gradient-text">HomeGenie</h1>
          </div>

          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Create Account"}</CardTitle>
              <CardDescription>{isLogin ? "Sign in to your account" : "Get started with HomeGenie"}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Role Tabs */}
              <Tabs value={selectedRole} onValueChange={(v) => { setSelectedRole(v as UserRole); fillDemo(v as UserRole); }} className="mb-6">
                <TabsList className="grid grid-cols-3 w-full">
                  {roleConfig.map((r) => (
                    <TabsTrigger key={r.role} value={r.role} className="flex items-center gap-1.5 text-xs sm:text-sm">
                      {r.icon}
                      {r.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</label>
                    <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                  <Input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground h-11 text-base">
                  {isLogin ? "Sign In" : "Create Account"}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>

              {isLogin && (
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground text-center mb-3">Quick Demo Login</p>
                  <div className="flex gap-2">
                    {roleConfig.map((r) => (
                      <Button key={r.role} variant="outline" size="sm" className="flex-1 text-xs" onClick={() => fillDemo(r.role)}>
                        {r.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
