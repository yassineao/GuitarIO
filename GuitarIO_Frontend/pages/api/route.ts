import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  // choose one of Songsterr's public endpoints:
  const url = `https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(q)}`;

  const r = await fetch(url, { headers: { "Accept": "application/json" } });
  if (!r.ok) return NextResponse.json({ error: "Upstream error" }, { status: 502 });

  const data = await r.json();
  // same-origin response -> no CORS issue for your frontend
  return NextResponse.json(data, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400"
    }
  });
}
