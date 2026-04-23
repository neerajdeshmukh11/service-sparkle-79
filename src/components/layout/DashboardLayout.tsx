import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Wrench, FolderTree, BookOpen, CreditCard,
  AlertTriangle, MessageSquare, Bell, BarChart3, DollarSign, Tag,
  Ticket, Shield, ChevronLeft, ChevronRight, LogOut, Home,
  Briefcase, Star, Wallet, Clock, MapPin, Camera, Settings, User,
  Search, Calendar, FileText, MessageCircle, Bot, Menu, X, ShoppingCart
} from "lucide-react";
import { useAppState } from "@/contexts/AppStateContext";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Users", path: "/admin/users", icon: <Users className="w-5 h-5" /> },
  { label: "Providers", path: "/admin/providers", icon: <Wrench className="w-5 h-5" /> },
  { label: "Categories", path: "/admin/categories", icon: <FolderTree className="w-5 h-5" /> },
  { label: "Bookings", path: "/admin/bookings", icon: <BookOpen className="w-5 h-5" /> },
  { label: "Transactions", path: "/admin/transactions", icon: <CreditCard className="w-5 h-5" /> },
  { label: "Complaints", path: "/admin/complaints", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Notifications", path: "/admin/notifications", icon: <Bell className="w-5 h-5" /> },
  { label: "Reports", path: "/admin/reports", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Earnings", path: "/admin/earnings", icon: <DollarSign className="w-5 h-5" /> },
  { label: "Promotions", path: "/admin/promotions", icon: <Tag className="w-5 h-5" /> },
  { label: "Coupons", path: "/admin/coupons", icon: <Ticket className="w-5 h-5" /> },
];

const providerNav: NavItem[] = [
  { label: "Dashboard", path: "/provider", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "My Profile", path: "/provider/profile", icon: <User className="w-5 h-5" /> },
  { label: "Jobs", path: "/provider/jobs", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Job History", path: "/provider/history", icon: <Clock className="w-5 h-5" /> },
  { label: "Wallet", path: "/provider/wallet", icon: <Wallet className="w-5 h-5" /> },
  { label: "Ratings", path: "/provider/ratings", icon: <Star className="w-5 h-5" /> },
  { label: "Services", path: "/provider/services", icon: <FolderTree className="w-5 h-5" /> },
  { label: "Chat", path: "/provider/chat", icon: <MessageCircle className="w-5 h-5" /> },
  { label: "Complaints", path: "/provider/complaints", icon: <MessageSquare className="w-5 h-5" /> },
];

const customerNav: NavItem[] = [
  { label: "Home", path: "/customer", icon: <Home className="w-5 h-5" /> },
  { label: "Browse Services", path: "/customer/services", icon: <Search className="w-5 h-5" /> },
  { label: "My Cart", path: "/customer/cart", icon: <ShoppingCart className="w-5 h-5" /> },
  { label: "My Bookings", path: "/customer/bookings", icon: <Calendar className="w-5 h-5" /> },
  { label: "Wallet", path: "/customer/wallet", icon: <Wallet className="w-5 h-5" /> },
  { label: "Invoices", path: "/customer/invoices", icon: <FileText className="w-5 h-5" /> },
  { label: "Chat", path: "/customer/chat", icon: <MessageCircle className="w-5 h-5" /> },
  { label: "Support", path: "/customer/support", icon: <Bot className="w-5 h-5" /> },
  { label: "My Profile", path: "/customer/profile", icon: <User className="w-5 h-5" /> },
];

const getNav = (role: UserRole) => {
  if (role === "admin") return adminNav;
  if (role === "provider") return providerNav;
  return customerNav;
};

const getRoleLabel = (role: UserRole) => {
  if (role === "admin") return "Admin Panel";
  if (role === "provider") return "Provider Portal";
  return "Customer Portal";
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, getTotalUnread } = useAppState();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;

  const navItems = getNav(user.role);
  // Compute unread chat count for the current user role (admins don't have a chat inbox).
  const chatUnread =
    user.role === "customer" ? getTotalUnread("customer") :
    user.role === "provider" ? getTotalUnread("provider") : 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground z-50 transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn("flex items-center gap-3 p-4 border-b border-sidebar-border", collapsed && "justify-center")}>
          <div className="p-2 bg-sidebar-primary rounded-lg shrink-0">
            <Home className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-lg">HomeGenie</h1>
              <p className="text-xs text-sidebar-foreground/60">{getRoleLabel(user.role)}</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const showCartBadge = item.path === "/customer/cart" && cart.length > 0;
            const isChatItem = item.path === "/customer/chat" || item.path === "/provider/chat";
            const showChatBadge = isChatItem && chatUnread > 0;
            const badgeValue = showCartBadge ? cart.length : showChatBadge ? chatUnread : null;
            const badgeColor = showCartBadge
              ? "bg-primary text-primary-foreground"
              : "bg-destructive text-destructive-foreground";
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-lg"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <div className="relative">
                  {item.icon}
                  {badgeValue !== null && collapsed && (
                    <span className={cn(
                      "absolute -top-1.5 -right-1.5 min-w-[16px] h-4 px-1 rounded-full text-[10px] font-bold flex items-center justify-center",
                      badgeColor
                    )}>
                      {badgeValue > 9 ? "9+" : badgeValue}
                    </span>
                  )}
                </div>
                {!collapsed && (
                  <>
                    <span className="text-sm font-medium flex-1">{item.label}</span>
                    {badgeValue !== null && (
                      <span className={cn(
                        "ml-auto min-w-[20px] px-2 py-0.5 rounded-full text-[10px] font-bold text-center",
                        badgeColor
                      )}>
                        {badgeValue > 9 ? "9+" : badgeValue}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Collapse */}
        <div className="border-t border-sidebar-border p-3 space-y-2">
          {!collapsed && (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-bold">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/50 truncate">{user.email}</p>
              </div>
            </div>
          )}
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent justify-start"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4" />
              {!collapsed && <span className="ml-2 text-xs">Logout</span>}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className={cn("flex-1 transition-all duration-300", collapsed ? "lg:ml-[72px]" : "lg:ml-64")}>
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {navItems.find(n => n.path === location.pathname)?.label || "Dashboard"}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-[10px] flex items-center justify-center">3</span>
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 animate-fade-in">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
