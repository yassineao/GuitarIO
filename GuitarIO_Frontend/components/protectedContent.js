import { useAuth } from "../pages/api/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { connected, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !connected) {
      router.replace("/login");
    }
  }, [loading, connected, router]);

  if (loading || !connected) return null;

  return children;
}
