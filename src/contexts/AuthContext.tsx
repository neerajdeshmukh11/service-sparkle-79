import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "provider" | "customer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  register: (name: string, email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  { id: "1", name: "Admin User", email: "admin@homegenie.com", role: "admin", avatar: "" },
  { id: "2", name: "John Provider", email: "provider@homegenie.com", role: "provider", avatar: "" },
  { id: "3", name: "Jane Customer", email: "customer@homegenie.com", role: "customer", avatar: "" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, _password: string, role: UserRole): boolean => {
    const found = mockUsers.find((u) => u.role === role);
    if (found) {
      setUser({ ...found, email });
      return true;
    }
    // For demo, allow any login
    setUser({ id: Date.now().toString(), name: email.split("@")[0], email, role, avatar: "" });
    return true;
  };

  const register = (name: string, email: string, _password: string, role: UserRole): boolean => {
    setUser({ id: Date.now().toString(), name, email, role, avatar: "" });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
