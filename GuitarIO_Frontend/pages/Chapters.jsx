import { useMemo } from "react";
import useSWR from "swr";
import ProtectedRoute from "../components/protectedContent";
import ChaptersLessons from "../components/lessons/chapterList";
import WavyGuitarStrings from "../components/loader";
const fetcher = async (url) => {
  const token = localStorage.getItem("accessToken");
  if (!token) throw new Error("NO_TOKEN");

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export default function ChaptersListPage() {
  // client-only: compute key so SWR doesn't run without token
  const swrKey = useMemo(() => {
    if (typeof window === "undefined") return null;
    const token = localStorage.getItem("accessToken");
    return token ? "/api/lessons/chapters-with-numbers" : null;
  }, []);

  const { data, error, isLoading } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10 * 60 * 1000,
  });

  return (
    <ProtectedRoute>
      {isLoading && <WavyGuitarStrings />}
      {error && error.message !== "NO_TOKEN" && <p>Error: {error.message}</p>}
      {data && <ChaptersLessons chapterss={Object.keys(data)} />}
    </ProtectedRoute>
  );
}
