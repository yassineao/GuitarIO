export const teachingDocuments = [
  {
    id: "guitar-basics",
    title: "Guitar Basics",
    body: `
Guitar basics start with holding the instrument correctly, tuning, and understanding the layout of the fretboard. The left hand forms chords by pressing strings against the fretboard while the right hand strums or picks. Common starter chords are E minor, G major, C major, and D major.
Practice switching slowly between chords to build finger strength and muscle memory.
`,
  },
  {
    id: "strumming-and-rhythm",
    title: "Strumming and Rhythm",
    body: `
Good rhythm is essential for playing songs. Start with simple down strokes and then add up strokes once you feel comfortable. A basic 4/4 strumming pattern is down, down-up, up-down-up.
Count the beats out loud as you play: 1-and-2-and-3-and-4-and. Use a metronome to keep a steady tempo and gradually increase speed.
`,
  },
  {
    id: "chord-reading",
    title: "Chord Reading",
    body: `
A chord chart shows the guitar neck as a grid. Vertical lines are strings and horizontal lines are frets. Dots indicate where to place your fingers, and numbers below the grid show finger placement: 1 for index, 2 for middle, 3 for ring.
Open strings are marked with an O and muted strings with an X. Read the chart from left to right for the strings E-A-D-G-B-e.
`,
  },
  {
    id: "practice-tips",
    title: "Practice Tips",
    body: `
Short, focused practice sessions are better than long, unfocused ones. Warm up with finger exercises and chord changes. Work on one skill at a time: chords, strumming, scales, or song sections.
Keep a practice log so you can track progress and return to difficult sections regularly. Rest when your fingers feel tired.
`,
  },
  {
    id: "song-learning",
    title: "Learning Songs",
    body: `
Choose songs with a small number of chords and a slow tempo when you are starting. Break the song into sections: intro, verse, chorus, bridge. Practice each section slowly before combining them.
Focus on smooth transitions and keep the rhythm steady. When the song feels more comfortable, play along with the recording.
`,
  },
];

export function rankTeachingContent(query, topN = 3) {
  const normalizedQuery = query
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

  return teachingDocuments
    .map((doc) => {
      const normalizedBody = doc.body.toLowerCase();
      const overlap = normalizedQuery.filter((term) => normalizedBody.includes(term));
      const score = new Set(overlap).size;
      return {
        ...doc,
        score,
      };
    })
    .filter((doc) => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
