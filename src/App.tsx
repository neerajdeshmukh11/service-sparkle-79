import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppStateProvider } from "@/contexts/AppStateContext";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AuthPage from "@/pages/AuthPage";

// Admin
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminProviders from "@/pages/admin/AdminProviders";
import AdminCategories from "@/pages/admin/AdminCategories";
import AdminBookings from "@/pages/admin/AdminBookings";
import AdminTransactions from "@/pages/admin/AdminTransactions";
import AdminComplaints from "@/pages/admin/AdminComplaints";
import AdminNotifications from "@/pages/admin/AdminNotifications";
import AdminReports from "@/pages/admin/AdminReports";
import AdminEarnings from "@/pages/admin/AdminEarnings";
import AdminPromotions from "@/pages/admin/AdminPromotions";
import AdminCoupons from "@/pages/admin/AdminCoupons";

// Provider
import ProviderDashboard from "@/pages/provider/ProviderDashboard";
import ProviderProfile from "@/pages/provider/ProviderProfile";
import ProviderJobs from "@/pages/provider/ProviderJobs";
import ProviderHistory from "@/pages/provider/ProviderHistory";
import ProviderWallet from "@/pages/provider/ProviderWallet";
import ProviderRatings from "@/pages/provider/ProviderRatings";
import ProviderServices from "@/pages/provider/ProviderServices";
import ProviderChat from "@/pages/provider/ProviderChat";
import ProviderComplaints from "@/pages/provider/ProviderComplaints";

// Customer
import { CustomerHome, CustomerServices, CustomerBookings, CustomerInvoices, CustomerChat, CustomerSupport, CustomerProfile } from "@/pages/customer/CustomerPages";
import CustomerWallet from "@/pages/customer/CustomerWallet";
import CustomerCart from "@/pages/customer/CustomerCart";

import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode; role?: string }) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <HomePage />} />
      <Route path="/auth" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <AuthPage />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsers /></ProtectedRoute>} />
      <Route path="/admin/providers" element={<ProtectedRoute role="admin"><AdminProviders /></ProtectedRoute>} />
      <Route path="/admin/categories" element={<ProtectedRoute role="admin"><AdminCategories /></ProtectedRoute>} />
      <Route path="/admin/bookings" element={<ProtectedRoute role="admin"><AdminBookings /></ProtectedRoute>} />
      <Route path="/admin/transactions" element={<ProtectedRoute role="admin"><AdminTransactions /></ProtectedRoute>} />
      <Route path="/admin/complaints" element={<ProtectedRoute role="admin"><AdminComplaints /></ProtectedRoute>} />
      <Route path="/admin/notifications" element={<ProtectedRoute role="admin"><AdminNotifications /></ProtectedRoute>} />
      <Route path="/admin/reports" element={<ProtectedRoute role="admin"><AdminReports /></ProtectedRoute>} />
      <Route path="/admin/earnings" element={<ProtectedRoute role="admin"><AdminEarnings /></ProtectedRoute>} />
      <Route path="/admin/promotions" element={<ProtectedRoute role="admin"><AdminPromotions /></ProtectedRoute>} />
      <Route path="/admin/coupons" element={<ProtectedRoute role="admin"><AdminCoupons /></ProtectedRoute>} />

      {/* Provider Routes */}
      <Route path="/provider" element={<ProtectedRoute role="provider"><ProviderDashboard /></ProtectedRoute>} />
      <Route path="/provider/profile" element={<ProtectedRoute role="provider"><ProviderProfile /></ProtectedRoute>} />
      <Route path="/provider/jobs" element={<ProtectedRoute role="provider"><ProviderJobs /></ProtectedRoute>} />
      <Route path="/provider/history" element={<ProtectedRoute role="provider"><ProviderHistory /></ProtectedRoute>} />
      <Route path="/provider/wallet" element={<ProtectedRoute role="provider"><ProviderWallet /></ProtectedRoute>} />
      <Route path="/provider/ratings" element={<ProtectedRoute role="provider"><ProviderRatings /></ProtectedRoute>} />
      <Route path="/provider/services" element={<ProtectedRoute role="provider"><ProviderServices /></ProtectedRoute>} />
      <Route path="/provider/chat" element={<ProtectedRoute role="provider"><ProviderChat /></ProtectedRoute>} />
      <Route path="/provider/complaints" element={<ProtectedRoute role="provider"><ProviderComplaints /></ProtectedRoute>} />

      {/* Customer Routes */}
      <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerHome /></ProtectedRoute>} />
      <Route path="/customer/services" element={<ProtectedRoute role="customer"><CustomerServices /></ProtectedRoute>} />
      <Route path="/customer/cart" element={<ProtectedRoute role="customer"><CustomerCart /></ProtectedRoute>} />
      <Route path="/customer/bookings" element={<ProtectedRoute role="customer"><CustomerBookings /></ProtectedRoute>} />
      <Route path="/customer/invoices" element={<ProtectedRoute role="customer"><CustomerInvoices /></ProtectedRoute>} />
      <Route path="/customer/chat" element={<ProtectedRoute role="customer"><CustomerChat /></ProtectedRoute>} />
      <Route path="/customer/support" element={<ProtectedRoute role="customer"><CustomerSupport /></ProtectedRoute>} />
      <Route path="/customer/wallet" element={<ProtectedRoute role="customer"><CustomerWallet /></ProtectedRoute>} />
      <Route path="/customer/profile" element={<ProtectedRoute role="customer"><CustomerProfile /></ProtectedRoute>} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <AppStateProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AppStateProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
