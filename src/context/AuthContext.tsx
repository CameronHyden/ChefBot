// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";



type AuthContextType = {
  user: string | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Later: decode JWT to get user info
      setUser("dummy-user"); 
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser("dummy-user"); // or decode token
  };
 
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
