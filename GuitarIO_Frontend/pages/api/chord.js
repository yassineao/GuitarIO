// pages/api/chord.js
export default function handler(req, res) {
    // Define your chord data here. You might fetch this from a database or other sources.
    const chord = 'D#m(maj9)'; // Example chord, you can make this dynamic based on your needs
  
    res.status(200).json({ chord });
  }
  