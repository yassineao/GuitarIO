import { useMemo } from "react";
import useSWR from "swr";
import ProtectedRoute from "../components/protectedContent";
import ChaptersLessons from "../components/lessons/chapterList";
import WavyGuitarStrings from "../components/loader";
import { buildPublicApiUrl } from "../lib/api-url";

const fetcher = async (url) => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export default function ChaptersListPage() {
  const swrKey = useMemo(() => {
    if (typeof window === "undefined") return null;
    return buildPublicApiUrl("/lessons/chapters-with-numbers");
  }, []);

  const { data, error, isLoading } = useSWR(swrKey, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 10 * 60 * 1000,
  });

  return (
    <ProtectedRoute>
      {isLoading && <WavyGuitarStrings />}
      {error && <p>Error: {error.message}</p>}
      {data && <ChaptersLessons chapterss={Object.keys(data)} />}
    </ProtectedRoute>
  );
}
