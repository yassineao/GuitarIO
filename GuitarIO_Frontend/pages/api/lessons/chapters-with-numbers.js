export default async function handler(req, res) {
  try {
    // Forward auth if needed (from browser request)
    const auth = req.headers.authorization || "";

    const backendRes = await fetch(
      "http://localhost:8080/lessons/chapters-with-numbers",
      {
        method: "GET",
        headers: auth ? { Authorization: auth } : {},
      }
    );

    const text = await backendRes.text();
    let payload;

    try {
      payload = text ? JSON.parse(text) : null;
    } catch {
      payload = text;
    }

    if (!backendRes.ok) {
      return res
        .status(backendRes.status)
        .json({ error: payload?.message || "Request failed" });
    }

    // Cache at the edge (Vercel/CDN)
    res.setHeader(
      "Cache-Control",
      "s-maxage=600, stale-while-revalidate=86400"
    );

    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
