import { useEffect, useMemo, useState } from "react";
import WavyGuitarStrings from "../components/loader";
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
  const [widgetsReady, setWidgetsReady] = useState(false);
  const [widgetError, setWidgetError] = useState("");

  const selectedChordInfo = useMemo(
    () => basicGuitarChords.find((chord) => chord.name === selectedChord) || basicGuitarChords[0],
    [selectedChord]
  );

  useEffect(() => {
    setWidgetsReady(false);
    setWidgetError("");

    let cancelled = false;
    let verificationTimer;
    const scripts = [];

    const diagramsAreReady = () => {
      const containers = Array.from(
        document.querySelectorAll("[data-major-chord-diagram]")
      );

      return (
        containers.length === basicGuitarChords.length &&
        containers.every((container) => {
          const widget = container.querySelector(".scales_chords_api");
          return Boolean(
            container.querySelector("img, svg, canvas") ||
              (widget && widget.childNodes.length > 0)
          );
        })
      );
    };

    const verifyWidgets = (attempt) => {
      const startedAt = Date.now();

      const check = () => {
        if (cancelled) {
          return;
        }

        if (diagramsAreReady()) {
          setWidgetsReady(true);
          setWidgetError("");
          return;
        }

        if (Date.now() - startedAt < 6000) {
          verificationTimer = window.setTimeout(check, 250);
          return;
        }

        if (attempt === 1) {
          loadWidgetScript(2);
          return;
        }

        setWidgetError(
          "Some chord diagrams did not load. Please refresh the page and try again."
        );
      };

      check();
    };

    const loadWidgetScript = (attempt) => {
      const script = document.createElement("script");
      script.src = `https://www.scales-chords.com/api/scales-chords-api.js?major=1&attempt=${attempt}&time=${Date.now()}`;
      script.async = true;
      script.onload = () => verifyWidgets(attempt);
      script.onerror = () => {
        if (attempt === 1) {
          loadWidgetScript(2);
        } else {
          setWidgetError(
            "The chord diagram service could not be loaded. Please refresh the page."
          );
        }
      };
      scripts.push(script);
      document.body.appendChild(script);
    };

    loadWidgetScript(1);

    return () => {
      cancelled = true;
      window.clearTimeout(verificationTimer);
      scripts.forEach((script) => {
        script.onload = null;
        script.onerror = null;
        script.remove();
      });
    };
  }, []);

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

          {!widgetsReady && !widgetError && (
            <WavyGuitarStrings compact label="Loading chord diagrams" />
          )}

          {widgetError && (
            <div className="chord-note__error" role="alert">
              <p>{widgetError}</p>
              <button type="button" onClick={() => window.location.reload()}>
                Refresh page
              </button>
            </div>
          )}

          <div className="major-notes-cache">
            {basicGuitarChords.map((chord) => {
              const isSelected = selectedChord === chord.name;

              return (
                <div
                  key={chord.name}
                  data-major-chord-diagram={chord.name}
                  hidden={!widgetsReady || !isSelected}
                  aria-hidden={!widgetsReady || !isSelected}
                >
                  <Note name={chord.name} ext="" />
                </div>
              );
            })}
          </div>
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
                  disabled={!widgetsReady}
                >
                  <span>{chord.family}</span>
                  <strong>{chord.name}</strong>
                  <small>
                    {!widgetsReady
                      ? "Loading"
                      : isSelected
                        ? "Selected"
                        : "Show diagram"}
                  </small>
                </button>
              );
            })}
          </div>
        </aside>
      </section>
    </main>
  );
}
