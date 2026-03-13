export default async function handler(req, res) {
  const { q } = req.query;

  try {
    const apiRes = await fetch(
      `https://www.songsterr.com/a/ra/songs.json?pattern=${encodeURIComponent(q)}`
    );

    const data = await apiRes.json();

    if (!Array.isArray(data)) {
      return res.status(200).json([]);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json([]);
  }
}
