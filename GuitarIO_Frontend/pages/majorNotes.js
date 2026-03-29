import { useState } from 'react';
import Note from '../components/note';

const basicGuitarChords = [
  "C", "G", "D", "A", "E", "Am", "Em", "Dm", "G7", "E7"
];

export default function MajorNotes() {
  const [selectedChord, setSelectedChord] = useState(basicGuitarChords[0]);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr',
        gridTemplateAreas: `
  "top top"
  "left right"
`,
        gap: '2rem',
        minHeight: '80vh',
        alignItems: 'center',
        background: '#0a0a14',
        padding: '2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 0 40px #00f0ff44',
      }}
    >

      <div style={{ gridArea: 'top', marginTop: '5rem', textAlign: 'center' }}>
        <h1>{selectedChord}</h1>
      </div>

      {/* Right: stored notes */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '1.5rem',
          padding: '2rem',
          maxWidth: '80%',
          minHeight: '400px',
          gridArea: 'left'
        }}
      >


        <div style={{ width: '100%' }}>
          {basicGuitarChords.map((chord) => (
            <div
              key={chord}
              style={{
                display: selectedChord === chord ? 'block' : 'none',
              }}
            >
              <Note name={chord} ext="" />
            </div>
          ))}
        </div>
      </div>

      {/* Left: buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1.2rem',
          justifyItems: 'center',
          gridArea: 'right'
        }}
      >
        {basicGuitarChords.map((chord) => (
          <button
            key={chord}
            onClick={() => setSelectedChord(chord)}
          >
            {chord}
          </button>
        ))}
      </div>
    </div>
  );
}