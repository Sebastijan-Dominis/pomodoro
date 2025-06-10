// src/contexts/AuthProvider.tsx
import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser, getCurrentUser } from "../api";

type User = {
  username: string;
  id: number;
};

type AuthContextType = {
  token: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  error: string | null;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (err) {
          console.error("Failed to load user", err);
        }
      }
    };
    loadUser();
  }, [token]);

  const login = async (email: string, password: string) => {
    try {
      clearError();
      const { access_token } = await loginUser({ email, password });
      setToken(access_token);
      localStorage.setItem("token", access_token);
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      clearError();
      await registerUser({ username, email, password });
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, register, logout, error, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
