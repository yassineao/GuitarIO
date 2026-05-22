import { buildServerApiUrl } from "../../../../lib/api-url";

export default async function handler(req, res) {
  const { chapter, lesson } = req.query;

  const cookie = req.headers.cookie || "";

  const backendUrl = buildServerApiUrl(
    `/lessons/${encodeURIComponent(chapter)}/${encodeURIComponent(lesson)}`
  );

  const r = await fetch(backendUrl, {
    headers: cookie ? { Cookie: cookie } : {},
  });

  const text = await r.text();

  // Edge/CDN cache (works well on Vercel; locally it won't behave like CDN)
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=86400");
  res.status(r.status);

  try {
    res.json(text ? JSON.parse(text) : null);
  } catch {
    res.send(text);
  }
}
