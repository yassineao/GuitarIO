const chordVariations = [
  { id: "major", ext: "", label: "Major", group: "Core", hint: "The clean home-base sound." },
  { id: "minor", ext: "m", label: "Minor", group: "Core", hint: "Darker and softer color." },
  { id: "dim", ext: "dim", label: "Dim", group: "Tension", hint: "Nervous, unstable sound." },
  { id: "aug", ext: "aug", label: "Aug", group: "Tension", hint: "Bright, floating tension." },
  { id: "maj7", ext: "maj7", label: "Maj7", group: "Color", hint: "Smooth and dreamy." },
  { id: "7", ext: "7", label: "7", group: "Blues", hint: "Classic dominant pull." },
  { id: "m7", ext: "m7", label: "m7", group: "Color", hint: "Soft minor with extra depth." },
  { id: "dim7", ext: "dim7", label: "Dim7", group: "Tension", hint: "Strong passing chord." },
  { id: "mmaj7", ext: "m(maj7)", label: "mMaj7", group: "Color", hint: "Cinematic minor color." },
  { id: "m7b5", ext: "m7b5", label: "m7b5", group: "Jazz", hint: "Half-diminished flavor." },
  { id: "sus2", ext: "sus2", label: "Sus2", group: "Open", hint: "Suspended and airy." },
  { id: "sus4", ext: "sus4", label: "Sus4", group: "Open", hint: "Suspended with lift." },
  { id: "6-9", ext: "6/9", label: "6/9", group: "Color", hint: "Warm extended chord." },
  { id: "9", ext: "9", label: "9", group: "Extended", hint: "Funky dominant color." },
  { id: "11", ext: "11", label: "11", group: "Extended", hint: "Wide and modern." },
  { id: "13", ext: "13", label: "13", group: "Extended", hint: "Rich dominant sound." },
  { id: "5", ext: "5", label: "Power", group: "Rock", hint: "Simple two-note power chord." },
];

const validNotes = new Set(["a", "b", "c", "d", "e", "f", "g"]);

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ message: "Method not allowed" });
  }

  const note = String(req.query.note || "").toLowerCase();

  if (!validNotes.has(note)) {
    return res.status(400).json({ message: "The note must be between A and G." });
  }

  const root = note.toUpperCase();
  const chords = chordVariations.map((variation) => ({
    ...variation,
    chord: `${root}${variation.ext}`,
    instrument: "guitar",
    outputs: {
      diagram: "image",
      sound: "sound",
    },
  }));

  return res.status(200).json({ note: root, chords });
}
