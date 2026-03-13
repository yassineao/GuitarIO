import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Note from '../../components/note';

import Link from 'next/link';
export default function Notes({ name }) {
  const router = useRouter();

  
  const id = name;
  const [documents, setDocuments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Display default content if name is 'default' or empty
  if (name === 'default' || !name) {
    return <div>This is the default content.</div>;
  }

  // Get the ASCII value of the character
  let charCode = name.charCodeAt(0);
  let charCode1 = name.charCodeAt(0);
  // Add 1 to the ASCII value
  charCode++;
  charCode1--;
  // Check if the new character goes beyond 'g'
  if (charCode > 'g'.charCodeAt(0)) {
      charCode = 'a'.charCodeAt(0); // Wrap around to 'a'
  }
  if (charCode1 < 'a'.charCodeAt(0)) {
    charCode1 = 'g'.charCodeAt(0); // Wrap around to 'a'
}
  // Convert back to a character
  let newCharacter = String.fromCharCode(charCode);
  let newCharacter1 = String.fromCharCode(charCode1);
  const handleRedirect = () => {
    window.location.href = `/notes/${newCharacter}`; // Replace with the desired URL
};const handleRedirect1 = () => {
  window.location.href = `/notes/${newCharacter1}`; // Replace with the desired URL
};
  
  const uppercaseId = id ? String(id).toUpperCase() : "";
  const chords = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  const chordss = [
    "",
    "m",
    "dim",
    "aug",
    "maj7",
    "7",
    "m7",
    "dim7",
    "m(maj7)",
    "m7b5",
    "sus2",
    "sus4",
    "6/9",
    "9",
    "11",
    "13",
    "5"
  ];

  const updateChord = (index) => {
  const chord = chords[index % chords.length];
  document.querySelectorAll('.scales_chords_api[chord]').forEach((el) => {
    el.setAttribute('chord', chord);
  });

  if (window.ScalesChordsAPI) {
    window.ScalesChordsAPI.scan();
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

  const chordsWithId = chordss.map(chord => `${uppercaseId}${chord}`);

  useEffect(() => {
    // Trigger an update on chord when `id` changes
    updateChord(currentIndex);
  }, [id, currentIndex]);

  
  return (
    <div >
      <section id='titel'>
      <div className="nav" id='1'>
          <button  onClick={handleRedirect1}>
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
          <h1 className="home__title1">
          <div data-gliitch={uppercaseId} className="gliitch">
            {uppercaseId}
          </div>
        </h1>
        <button  onClick={handleRedirect}>
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
        </div>
      
      </section>

      <section id="unique-slider">
        <ul className="slider">
          {chordss.map((chord, index) => (
            <Note key={index} name={name} ext={chord} />
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

export async function getServerSideProps(context) {
  const { id } = context.params; // Extract the id from the route parameters
  const name = id || 'default'; // Ensure a default value if id is not present

  return {
    props: {
      name,
    },
  };
}
