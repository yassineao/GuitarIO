// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { buildPublicApiUrl } from "@/lib/api-url";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadSession() {
      try {
        const res = await fetch(buildPublicApiUrl("/auth/me"), {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Not authenticated");
        }

        const profile = await res.json();
        if (!cancelled) {
          setUser(profile);
          setConnected(true);
        }
      } catch {
        if (!cancelled) {
          setUser(null);
          setConnected(false);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = (profile) => {
    if (!profile) return;
    setUser(profile);
    setConnected(true);
  };

  const logout = async () => {
    try {
      await fetch(buildPublicApiUrl("/auth/logout"), {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      console.error("Logout request failed", e);
    } finally {
      setUser(null);
      setConnected(false);
    }
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
