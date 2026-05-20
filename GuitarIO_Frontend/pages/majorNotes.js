import { useMemo, useState } from "react";
import Note from "../components/note";

const basicGuitarChords = [
  { name: "C", family: "Major", hint: "Bright open chord for beginner songs." },
  { name: "G", family: "Major", hint: "Big ringing shape used everywhere." },
  { name: "D", family: "Major", hint: "Compact shape with a clear top-string sound." },
  { name: "A", family: "Major", hint: "Tight three-finger chord for rock and pop." },
  { name: "E", family: "Major", hint: "Full open chord with a strong low root." },
  { name: "Am", family: "Minor", hint: "Soft minor color with an easy open shape." },
  { name: "Em", family: "Minor", hint: "Two-finger chord, perfect for first progressions." },
  { name: "Dm", family: "Minor", hint: "Small shape that builds finger independence." },
  { name: "G7", family: "Seventh", hint: "A classic tension chord that wants to resolve." },
  { name: "E7", family: "Seventh", hint: "Bluesy open chord with a lot of movement." },
];

export default function MajorNotes() {
  const [selectedChord, setSelectedChord] = useState(basicGuitarChords[0].name);

  const selectedChordInfo = useMemo(
    () => basicGuitarChords.find((chord) => chord.name === selectedChord) || basicGuitarChords[0],
    [selectedChord]
  );

  return (
    <main className="major-notes-page">
      <section className="container major-notes-hero">
        <span className="major-notes-eyebrow">Chord lab</span>
        <h1>{selectedChord} chord</h1>
        <p>{selectedChordInfo.hint}</p>
      </section>

      <section className="container major-notes-workspace">
        <div className="major-notes-preview">
          <div className="major-notes-preview__header">
            <span>Diagram</span>
            <small>{selectedChordInfo.family}</small>
          </div>
          <Note name={selectedChord} ext="" />
        </div>

        <aside className="major-notes-picker">
          <div className="major-notes-picker__header">
            <span>Choose chord</span>
            <p>Tap a card to update the diagram and sound preview.</p>
          </div>

          <div className="major-notes-grid">
            {basicGuitarChords.map((chord) => {
              const isSelected = selectedChord === chord.name;

              return (
                <button
                  key={chord.name}
                  type="button"
                  className={`major-note-card${isSelected ? " major-note-card--selected" : ""}`}
                  onClick={() => setSelectedChord(chord.name)}
                >
                  <span>{chord.family}</span>
                  <strong>{chord.name}</strong>
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
