import { songsterrSearch } from 'songsterr-api-node';

export default async function handler(req, res) {
  const { query } = req;
  try {
    const results = await songsterrSearch(query.track || 'Enter Sandman');
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from Songsterr' });
  }
}