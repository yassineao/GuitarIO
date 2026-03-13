import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Note from '../components/note';
import Link from 'next/link';

export default function MajorNotes() {
  const [documents, setDocuments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const chords = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const basicGuitarChords = [
    "C",
    "G",
    "D",
    "A",
    "E",
    "Am",
    "Em",
    "Dm",
    "G7",
    "E7"
];

  const updateChord = (index) => {
    const chordElement = document.querySelector('.scales_chords_api');
    if (chordElement) {
      const chord = chords[index % chords.length];
      chordElement.setAttribute('chord', chord);
    }
  };

  useEffect(() => {
    const activate = (e) => {
      const slider = document.querySelector("#unique-slider .slider");
      const items = slider.querySelectorAll(".item");
      let newIndex = currentIndex;

      if (e.target.closest(".next")) {
        slider.append(items[0]);
        newIndex = (currentIndex + 1) % items.length;
      } else if (e.target.closest(".prev")) {
        slider.prepend(items[items.length - 1]);
        newIndex = (currentIndex - 1 + items.length) % items.length;
      }

      setCurrentIndex(newIndex);
      updateChord(newIndex);
    };

    document.addEventListener("click", activate);

    // Initialize the chord for the first item
    updateChord(currentIndex);

    return () => {
      document.removeEventListener("click", activate);
    };
  }, [currentIndex]);

  useEffect(() => {
    // Trigger an update on chord when `id` changes
    updateChord(currentIndex);
  }, [ currentIndex]);

  return (
    <div>
      <section>
       
      </section>

      <section id="unique-slider">
        <ul className="slider">
          {basicGuitarChords.map((chord, index) => (
             
            <Note key={index} url={true} name={chord} ext={""}  />
          ))}
        </ul>
        <nav className="nav">
          <button className="btn prev">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 19L8 12L15 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button className="btn next">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 5L16 12L9 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </nav>
      </section>
    </div>
  );
}

