import React, { useEffect, useRef } from 'react';

const WavyGuitarStrings = () => {
  const stringsRef = useRef(null);

  // Styles as a stylesheet object
  const styles = {
    container: {
      background: '#222',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      overflow: 'hidden',
      position: 'relative',
    },
    guitarContainer: {
      position: 'relative',
    },
    guitarLoader: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    string: {
      width: '300px',
      height: '4px',
      background: '#fff',
      borderRadius: '2px',
      transformOrigin: 'left center',
    },
    // Keyframes cannot be directly used in inline styles; they are in CSS
  };

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
      @keyframes waveOverlap1 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-3px) rotate(0.3deg); }
        50% { transform: translateY(0) rotate(-0.3deg); }
        75% { transform: translateY(3px) rotate(0.3deg); }
      }
      @keyframes waveOverlap2 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(2px) rotate(0.2deg); }
        50% { transform: translateY(0) rotate(-0.2deg); }
        75% { transform: translateY(-2px) rotate(0.2deg); }
      }
      @keyframes waveOverlap3 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-1.5px) rotate(0.1deg); }
        50% { transform: translateY(0) rotate(0); }
        75% { transform: translateY(1.5px) rotate(-0.1deg); }
      }
      @keyframes waveOverlap4 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(3.5px) rotate(0.4deg); }
        50% { transform: translateY(0) rotate(-0.4deg); }
        75% { transform: translateY(-3.5px) rotate(0.4deg); }
      }
      @keyframes waveOverlap5 {
        0%,100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-2.5px) rotate(0.25deg); }
        50% { transform: translateY(0) rotate(0); }
        75% { transform: translateY(2.5px) rotate(-0.25deg); }
      }
      /* Assign animations for overlapping wave effect */
      .string:nth-child(1) {
        animation: waveOverlap1 2s infinite ease-in-out;
      }
      .string:nth-child(2) {
        animation: waveOverlap2 2.2s infinite ease-in-out;
      }
      .string:nth-child(3) {
        animation: waveOverlap3 2.4s infinite ease-in-out;
      }
      .string:nth-child(4) {
        animation: waveOverlap4 2.6s infinite ease-in-out;
      }
      .string:nth-child(5) {
        animation: waveOverlap5 2.8s infinite ease-in-out;
      }

      /* Style for musical note symbols */
      .note {
        position: absolute;
        font-size: 24px;
        font-family: Arial, sans-serif;
        color: yellow;
        opacity: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        pointer-events: none;
        animation: floatNote 2s forwards;
      }

      @keyframes floatNote {
        0% {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1);
        }
        50% {
          opacity: 1;
          transform: translateY(-80px) translateX(100px) scale(1.2);
        }
        100% {
          opacity: 0;
          transform: translateY(-120px) translateX(150px) scale(0.8);
        }
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Function to create musical symbol notes
  const createNoteFromString = (stringElement) => {
    const rect = stringElement.getBoundingClientRect();
    const note = document.createElement('div');
    note.className = 'note';

    // Choose a musical symbol
    const symbols = ['🎵', '🎶', '♩', '♪', '♫'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    note.textContent = symbol;

    // Position the note at the start of the string
    note.style.left = rect.left + rect.width + 'px';
    note.style.bottom = window.innerHeight - rect.top - rect.height / 2 + 'px';

    document.body.appendChild(note);

    // Animate the note
    setTimeout(() => {
      note.style.transform = 'translateY(-120px) translateX(150px)';
      note.style.opacity = '0';
    }, 10);

    // Remove after animation
    note.addEventListener('animationend', () => {
      note.remove();
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stringsRef.current) {
        const children = Array.from(stringsRef.current.children);
        const stringIndex = Math.floor(Math.random() * children.length);
        createNoteFromString(children[stringIndex]);
      }
    }, 300);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.guitarContainer}>
        <div style={styles.guitarLoader} ref={stringsRef} id="strings">
          <div className="string" style={styles.string}></div>
          <div className="string" style={styles.string}></div>
          <div className="string" style={styles.string}></div>
          <div className="string" style={styles.string}></div>
          <div className="string" style={styles.string}></div>
        </div>
      </div>
    </div>
  );
};

export default WavyGuitarStrings;