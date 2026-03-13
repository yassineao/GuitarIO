export default async function handler(req, res) {
  const { chapter, lesson } = req.query;

  // If you still use localStorage tokens, the server can't read them.
  // So we forward Authorization from the browser request if present.
  const auth = req.headers.authorization || "";

  const backendUrl = `http://localhost:8080/lessons/lesson/${encodeURIComponent(
    chapter
  )}/${encodeURIComponent(lesson)}`;

  const r = await fetch(backendUrl, {
    headers: auth ? { Authorization: auth } : {},
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
