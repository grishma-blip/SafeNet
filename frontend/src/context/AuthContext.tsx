import React, { createContext, useState, useEffect, useContext } from "react";
import { authAPI } from "../services/api";

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "moderator" | "admin";
}

interface AuthContextType {
  token: string | null;
  user: IUserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: IUserProfile) => void;
  logout: () => void;
  syncProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("safenet_token"));
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const login = (newToken: string, newUser: IUserProfile) => {
    localStorage.setItem("safenet_token", newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem("safenet_token");
    setToken(null);
    setUser(null);
  };

  const syncProfile = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const data = await authAPI.profile();
      setUser(data.user);
    } catch (err) {
      console.error("Auth profile sync failed, logging out:", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    syncProfile();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        syncProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthContext;
