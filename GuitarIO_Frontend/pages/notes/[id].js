import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Note from "../../components/note";

const chordVariations = [
  { ext: "", label: "Major", group: "Core", hint: "The clean home-base sound." },
  { ext: "m", label: "Minor", group: "Core", hint: "Darker and softer color." },
  { ext: "dim", label: "Dim", group: "Tension", hint: "Nervous, unstable sound." },
  { ext: "aug", label: "Aug", group: "Tension", hint: "Bright, floating tension." },
  { ext: "maj7", label: "Maj7", group: "Color", hint: "Smooth and dreamy." },
  { ext: "7", label: "7", group: "Blues", hint: "Classic dominant pull." },
  { ext: "m7", label: "m7", group: "Color", hint: "Soft minor with extra depth." },
  { ext: "dim7", label: "Dim7", group: "Tension", hint: "Strong passing chord." },
  { ext: "m(maj7)", label: "mMaj7", group: "Color", hint: "Cinematic minor color." },
  { ext: "m7b5", label: "m7b5", group: "Jazz", hint: "Half-diminished flavor." },
  { ext: "sus2", label: "Sus2", group: "Open", hint: "Suspended and airy." },
  { ext: "sus4", label: "Sus4", group: "Open", hint: "Suspended with lift." },
  { ext: "6/9", label: "6/9", group: "Color", hint: "Warm extended chord." },
  { ext: "9", label: "9", group: "Extended", hint: "Funky dominant color." },
  { ext: "11", label: "11", group: "Extended", hint: "Wide and modern." },
  { ext: "13", label: "13", group: "Extended", hint: "Rich dominant sound." },
  { ext: "5", label: "Power", group: "Rock", hint: "Simple two-note power chord." },
];

const validNotes = ["a", "b", "c", "d", "e", "f", "g"];

export default function Notes({ name }) {
  const router = useRouter();
  const [selectedChord, setSelectedChord] = useState(chordVariations[0].ext);

  useEffect(() => {
    if (window.ScalesChordsAPI) {
      window.ScalesChordsAPI.scan();
    }
  }, [selectedChord, name]);

  const normalizedName = String(name || "").toLowerCase();
  const noteIndex = validNotes.indexOf(normalizedName);

  const selectedVariation = useMemo(
    () =>
      chordVariations.find((variation) => variation.ext === selectedChord) ||
      chordVariations[0],
    [selectedChord]
  );

  if (noteIndex === -1) {
    return (
      <main className="note-variations-page">
        <section className="container note-variations-hero">
          <span className="note-variations-eyebrow">Chord finder</span>
          <h1>Unknown note</h1>
          <p>Choose a note from A to G to explore chord variations.</p>
        </section>
      </main>
    );
  }

  const nextChar = validNotes[(noteIndex + 1) % validNotes.length];
  const prevChar = validNotes[(noteIndex - 1 + validNotes.length) % validNotes.length];
  const uppercaseId = normalizedName.toUpperCase();
  const chordName = `${uppercaseId}${selectedVariation.ext}`;

  return (
    <main className="note-variations-page">
      <section className="container note-variations-hero">
        <span className="note-variations-eyebrow">Variation lab</span>
        <h1>{chordName || uppercaseId}</h1>
        <p>
          Explore {uppercaseId} chord shapes from simple open sounds to richer colors and tension chords.
        </p>

        <div className="note-variations-nav" aria-label="Note navigation">
          <button type="button" onClick={() => router.push(`/notes/${prevChar}`)}>
            Previous {prevChar.toUpperCase()}
          </button>
          <button type="button" onClick={() => router.push(`/notes/${nextChar}`)}>
            Next {nextChar.toUpperCase()}
          </button>
        </div>
      </section>

      <section className="container note-variations-workspace">
        <div className="note-variations-preview">
          <div className="note-variations-preview__header">
            <span>Diagram</span>
            <small>{selectedVariation.group}</small>
          </div>

          <Note name={normalizedName} ext={selectedVariation.ext} />
        </div>

        <aside className="note-variations-picker">
          <div className="note-variations-picker__header">
            <span>Chord type</span>
            <p>{selectedVariation.hint}</p>
          </div>

          <div className="note-variations-grid">
            {chordVariations.map((variation) => {
              const isSelected = selectedChord === variation.ext;

              return (
                <button
                  key={variation.ext || "major"}
                  type="button"
                  className={`note-variation-card${isSelected ? " note-variation-card--selected" : ""}`}
                  onClick={() => setSelectedChord(variation.ext)}
                >
                  <span>{variation.group}</span>
                  <strong>{variation.label}</strong>
                  <small>{isSelected ? "Selected" : "Preview"}</small>
                </button>
              );
            })}
          </div>
        </aside>
      </section>
    </main>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { name: id || "default" },
  };
}
