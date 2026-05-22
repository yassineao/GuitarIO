import { buildServerApiUrl } from "../../../lib/api-url";

export default async function handler(req, res) {
  try {
    const cookie = req.headers.cookie || "";

    const backendRes = await fetch(buildServerApiUrl("/lessons/chapters-with-numbers"), {
      method: "GET",
      headers: cookie ? { Cookie: cookie } : {},
    });

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
