import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

export type BookingStatus = "awaiting-acceptance" | "accepted" | "pending-payment" | "declined" | "in-progress" | "completed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "refunded";
export type JobStage = "" | "en-route" | "arrived" | "started" | "completed";

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  service: string;
  category: string;
  date: string;
  time: string;
  amount: number;
  notes?: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  stage: JobStage;
  beforeImage?: string;
  afterImage?: string;
  createdAt: string;
  paidAt?: string;
  completedAt?: string;
}

export interface WalletTransaction {
  id: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  balanceAfter: number;
  date: string;
  bookingId?: string;
}

export interface ChatMessage {
  id: string;
  bookingId: string;
  senderRole: "customer" | "provider";
  senderName: string;
  message: string;
  timestamp: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  serviceName: string;
  categoryId: string;
  categoryName: string;
  price: number;
  duration: string;
  providerId: string;
  providerName: string;
  providerPhone: string;
  date: string;
  time: string;
  address: string;
  notes?: string;
}

interface AppStateContextType {
  bookings: Booking[];
  walletBalance: number;
  walletTransactions: WalletTransaction[];
  chatMessages: ChatMessage[];
  activeChatBookingId: string | null;
  setActiveChatBookingId: (id: string | null) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id">) => void;
  updateCartItem: (id: string, patch: Partial<CartItem>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  checkoutCart: (customerId: string, customerName: string, customerPhone: string) => Booking[];
  createBooking: (data: Omit<Booking, "id" | "status" | "paymentStatus" | "stage" | "createdAt">) => Booking;
  payForBooking: (bookingId: string) => { success: boolean; reason?: "insufficient" };
  addMoneyToWallet: (amount: number, method: string) => void;
  acceptBooking: (bookingId: string) => void;
  declineBooking: (bookingId: string) => void;
  updateJobStage: (bookingId: string, stage: JobStage) => void;
  uploadJobImage: (bookingId: string, kind: "before" | "after", dataUrl: string) => void;
  completeJob: (bookingId: string) => void;
  sendChatMessage: (bookingId: string, senderRole: "customer" | "provider", senderName: string, message: string) => void;
  getBookingChat: (bookingId: string) => ChatMessage[];
  getUnreadCount: (bookingId: string, viewerRole: "customer" | "provider") => number;
  getTotalUnread: (viewerRole: "customer" | "provider") => number;
  markChatRead: (bookingId: string, viewerRole: "customer" | "provider") => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

const now = () => new Date().toLocaleString();

// Seed: an existing booking from provider's view (for demo only — provider can see one job pending acceptance)
const seedBookings: Booking[] = [];

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [bookings, setBookings] = useState<Booking[]>(seedBookings);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [activeChatBookingId, setActiveChatBookingId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart: AppStateContextType["addToCart"] = useCallback((item) => {
    setCart((prev) => [...prev, { ...item, id: `c${Date.now()}${Math.random().toString(36).slice(2, 6)}` }]);
  }, []);

  const updateCartItem: AppStateContextType["updateCartItem"] = useCallback((id, patch) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  }, []);

  const removeFromCart: AppStateContextType["removeFromCart"] = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart: AppStateContextType["clearCart"] = useCallback(() => {
    setCart([]);
  }, []);

  const createBooking: AppStateContextType["createBooking"] = useCallback((data) => {
    const booking: Booking = {
      ...data,
      id: `b${Date.now()}`,
      status: "pending-payment",
      paymentStatus: "unpaid",
      stage: "",
      createdAt: now(),
    };
    setBookings((prev) => [booking, ...prev]);
    return booking;
  }, []);

  const checkoutCart: AppStateContextType["checkoutCart"] = useCallback((customerId, customerName, customerPhone) => {
    const created: Booking[] = cart.map((c, idx) => ({
      id: `b${Date.now()}${idx}`,
      customerId,
      customerName,
      customerPhone,
      customerAddress: c.address,
      providerId: c.providerId,
      providerName: c.providerName,
      providerPhone: c.providerPhone,
      service: c.serviceName,
      category: c.categoryName,
      date: c.date,
      time: c.time,
      amount: c.price,
      notes: c.notes,
      status: "pending-payment",
      paymentStatus: "unpaid",
      stage: "",
      createdAt: now(),
    }));
    setBookings((prev) => [...created, ...prev]);
    setCart([]);
    return created;
  }, [cart]);

  const addMoneyToWallet: AppStateContextType["addMoneyToWallet"] = useCallback((amount, method) => {
    setWalletBalance((prev) => {
      const next = prev + amount;
      setWalletTransactions((tx) => [
        { id: `w${Date.now()}`, type: "credit", description: `Added money via ${method}`, amount, balanceAfter: next, date: now() },
        ...tx,
      ]);
      return next;
    });
  }, []);

  const payForBooking: AppStateContextType["payForBooking"] = useCallback((bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return { success: false };
    if (walletBalance < booking.amount) return { success: false, reason: "insufficient" };
    const newBalance = walletBalance - booking.amount;
    setWalletBalance(newBalance);
    setWalletTransactions((tx) => [
      { id: `w${Date.now()}`, type: "debit", description: `Payment for ${booking.service} — ${booking.providerName}`, amount: booking.amount, balanceAfter: newBalance, date: now(), bookingId },
      ...tx,
    ]);
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, paymentStatus: "paid", status: "awaiting-acceptance", paidAt: now() } : b))
    );
    return { success: true };
  }, [bookings, walletBalance]);

  const acceptBooking: AppStateContextType["acceptBooking"] = useCallback((bookingId) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "accepted", stage: "en-route" } : b)));
  }, []);

  const declineBooking: AppStateContextType["declineBooking"] = useCallback((bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;
    // Refund
    setWalletBalance((prev) => {
      const next = prev + booking.amount;
      setWalletTransactions((tx) => [
        { id: `w${Date.now()}`, type: "credit", description: `Refund — ${booking.service} declined by ${booking.providerName}`, amount: booking.amount, balanceAfter: next, date: now(), bookingId },
        ...tx,
      ]);
      return next;
    });
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, status: "declined", paymentStatus: "refunded" } : b)));
  }, [bookings]);

  const updateJobStage: AppStateContextType["updateJobStage"] = useCallback((bookingId, stage) => {
    setBookings((prev) => prev.map((b) => (b.id === bookingId ? { ...b, stage, status: stage === "started" ? "in-progress" : b.status } : b)));
  }, []);

  const uploadJobImage: AppStateContextType["uploadJobImage"] = useCallback((bookingId, kind, dataUrl) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, [kind === "before" ? "beforeImage" : "afterImage"]: dataUrl } : b
      )
    );
  }, []);

  const completeJob: AppStateContextType["completeJob"] = useCallback((bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: "completed", stage: "completed", completedAt: now() } : b))
    );
  }, []);

  const sendChatMessage: AppStateContextType["sendChatMessage"] = useCallback((bookingId, senderRole, senderName, message) => {
    setChatMessages((prev) => [
      ...prev,
      { id: `m${Date.now()}`, bookingId, senderRole, senderName, message, timestamp: now() },
    ]);
  }, []);

  const getBookingChat = useCallback(
    (bookingId: string) => chatMessages.filter((m) => m.bookingId === bookingId),
    [chatMessages]
  );

  return (
    <AppStateContext.Provider
      value={{
        bookings,
        walletBalance,
        walletTransactions,
        chatMessages,
        activeChatBookingId,
        setActiveChatBookingId,
        cart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        checkoutCart,
        createBooking,
        payForBooking,
        addMoneyToWallet,
        acceptBooking,
        declineBooking,
        updateJobStage,
        uploadJobImage,
        completeJob,
        sendChatMessage,
        getBookingChat,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used within AppStateProvider");
  return ctx;
};
