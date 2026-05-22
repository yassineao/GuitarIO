import { useMemo } from "react";
import useSWR from "swr";
import ProtectedRoute from "../components/protectedContent";
import ChaptersLessons from "../components/lessons/chapterList";
import WavyGuitarStrings from "../components/loader";
import { buildPublicApiUrl } from "../lib/api-url";
import { useAuth } from "./api/AuthContext";

const fetcher = async (url) => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export default function ChaptersListPage() {
  const { connected, loading: authLoading } = useAuth();
  const swrKey = useMemo(() => {
    if (typeof window === "undefined") return null;
    if (authLoading || !connected) return null;
    return buildPublicApiUrl("/lessons/chapters-with-numbers");
  }, [authLoading, connected]);

  const { data, error, isLoading } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10 * 60 * 1000,
  });

  return (
    <ProtectedRoute>
      {(authLoading || isLoading) && <WavyGuitarStrings />}
      {error && <p>Error: {error.message}</p>}
      {data && <ChaptersLessons chapterss={Object.keys(data)} />}
    </ProtectedRoute>
  );
}
