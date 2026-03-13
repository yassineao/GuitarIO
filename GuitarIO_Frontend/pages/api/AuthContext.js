// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // decoded JWT
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load token on first render
  useEffect(() => {
    if (typeof window === "undefined") {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("accessToken");
    console.log("AuthProvider init, token:", token);
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp && decoded.exp < now) {
        // expired
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        setConnected(false);
      } else {
        setUser(decoded);
        setConnected(true);
      }
    } catch (e) {
      console.error("Invalid token on init", e);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setUser(null);
      setConnected(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Call this after successful login
  const login = (accessToken, refreshToken) => {

    console.log("AuthContext login, accessToken:", accessToken);
    if (!accessToken) return;

    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
    }

    try {
      const decoded = jwtDecode(accessToken);

          console.log("AuthContext lowwwwwgin, accessToken:", accessToken);
      setUser(decoded);
      setConnected(true);
    } catch (e) {
      console.error("Failed to decode access token on login", e);
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
    setUser(null);
    setConnected(false);
  };

  return (
    <AuthContext.Provider value={{ user, connected, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return ctx;
}
