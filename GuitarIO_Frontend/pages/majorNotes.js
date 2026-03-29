import { useState } from 'react';
import Note from '../components/note';

const basicGuitarChords = [
  "C", "G", "D", "A", "E", "Am", "Em", "Dm", "G7", "E7"
];

export default function MajorNotes() {
  const [selectedChord, setSelectedChord] = useState(basicGuitarChords[0]);

  return (
   <div className="major-notes-cyber">
      <div className="major-notes-title">
        <h1>Major Note: {selectedChord}</h1>
      </div>
      {/* Right: stored notes */}
      <div className="major-notes-chord">
        <div>
          {basicGuitarChords.map((chord) => (
            <div
              key={chord}
              style={{ display: selectedChord === chord ? 'block' : 'none' }}
            >
              <Note name={chord} ext="" />
            </div>
          ))}
        </div>
      </div>
      {/* Left: buttons */}
      <div className="major-notes-buttons">
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