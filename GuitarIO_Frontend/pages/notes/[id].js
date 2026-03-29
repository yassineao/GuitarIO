import { useState, useEffect } from 'react';
import Note from '../../components/note';

const chordss = [
  "", "m", "dim", "aug", "maj7", "7", "m7", "dim7",
  "m(maj7)", "m7b5", "sus2", "sus4", "6/9", "9", "11", "13", "5"
];

export default function Notes({ name }) {
  const [selectedChord, setSelectedChord] = useState(chordss[0]);

  // Trigger ScalesChordsAPI re-scan whenever the selected chord changes
  useEffect(() => {
    if (window.ScalesChordsAPI) {
      window.ScalesChordsAPI.scan();
    }
  }, [selectedChord, name]);

  if (name === 'default' || !name) {
    return <div>This is the default content.</div>;
  }

  // Previous / next note navigation (a → b → … → g → a)
  const charCode = name.charCodeAt(0);
  const nextChar = String.fromCharCode(charCode >= 'g'.charCodeAt(0) ? 'a'.charCodeAt(0) : charCode + 1);
  const prevChar = String.fromCharCode(charCode <= 'a'.charCodeAt(0) ? 'g'.charCodeAt(0) : charCode - 1);

  const uppercaseId = String(name).toUpperCase();

  return (
    <div className="major-notes-cyber">

      {/* ── Title + note navigation ── */}
      <div className="major-notes-title">
        <button onClick={() => window.location.href = `/notes/${prevChar}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h1>
          Note: {uppercaseId}
        
        </h1>

        <button onClick={() => window.location.href = `/notes/${nextChar}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Chord display ── */}
      <div className="major-notes-chord">
        <div>
          {chordss.map((chord) => (
            <div
              key={chord}
              style={{ display: selectedChord === chord ? 'block' : 'none' }}
            >
              <Note name={name} ext={chord} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Chord selector buttons ── */}
      <div className="major-notes-buttons">
        {chordss.map((chord) => (
          <button
            key={chord}
            onClick={() => setSelectedChord(chord)}
          >
            {chord === "" ? "Major" : chord}
          </button>
        ))}
      </div>

    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { name: id || 'default' },
  };
}