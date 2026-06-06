import { useEffect, useMemo, useState } from "react";
import Note from "../../components/note";
import WavyGuitarStrings from "../../components/loader";

const validNotes = ["a", "b", "c", "d", "e", "f", "g"];

export default function Notes({ name }) {
  const [chordMap, setChordMap] = useState(() => new Map());
  const [selectedChordId, setSelectedChordId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [widgetError, setWidgetError] = useState("");
  const [widgetsReady, setWidgetsReady] = useState(false);

  const normalizedName = String(name || "").toLowerCase();
  const noteIndex = validNotes.indexOf(normalizedName);

  useEffect(() => {
    if (noteIndex === -1) {
      return;
    }

    const controller = new AbortController();

    async function loadChords() {
      setIsLoading(true);
      setLoadError("");
      setSelectedChordId(null);

      try {
        const response = await fetch(`/api/chord?note=${encodeURIComponent(normalizedName)}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load chord variations.");
        }

        setChordMap(new Map(data.chords.map((chord) => [chord.id, chord])));
      } catch (error) {
        if (error.name !== "AbortError") {
          setChordMap(new Map());
          setLoadError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    loadChords();

    return () => controller.abort();
  }, [normalizedName, noteIndex]);

  const chordVariations = useMemo(() => Array.from(chordMap.values()), [chordMap]);
  const selectedVariation = selectedChordId
    ? chordMap.get(selectedChordId)
    : null;

  useEffect(() => {
    if (isLoading || loadError || chordMap.size === 0) {
      return;
    }

    setWidgetError("");
    setWidgetsReady(false);

    let cancelled = false;
    let verificationTimer;
    const scripts = [];

    const diagramsAreReady = () => {
      const containers = Array.from(
        document.querySelectorAll("[data-chord-diagram]")
      );

      return (
        containers.length === chordMap.size &&
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
      script.src = `https://www.scales-chords.com/api/scales-chords-api.js?note=${encodeURIComponent(
        normalizedName
      )}&attempt=${attempt}&time=${Date.now()}`;
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
  }, [chordMap, isLoading, loadError, normalizedName]);

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
  const chordName = selectedVariation?.chord || uppercaseId;
  const navigateToNote = (note) => {
    window.location.assign(`/notes/${note}`);
  };

  return (
    <main className="note-variations-page">
      <section className="container note-variations-hero">
        <span className="note-variations-eyebrow">Variation lab</span>
        <h1>{chordName || uppercaseId}</h1>
        <p>
          Explore {uppercaseId} chord shapes from simple open sounds to richer colors and tension chords.
        </p>

        {/* <div className="note-variations-nav" aria-label="Note navigation">
          <button type="button" onClick={() => navigateToNote(prevChar)}>
            Previous {prevChar.toUpperCase()}
          </button>
          <button type="button" onClick={() => navigateToNote(nextChar)}>
            Next {nextChar.toUpperCase()}
          </button>
        </div> */}

        <div className="note-variations-note-list" aria-label="Choose a note">
          {validNotes.map((note) => {
            const isCurrent = note === normalizedName;

            return (
              <button
                key={note}
                type="button"
                className={isCurrent ? "note-variations-note-list__active" : ""}
                onClick={() => navigateToNote(note)}
                disabled={isCurrent}
                aria-current={isCurrent ? "page" : undefined}
              >
                {note.toUpperCase()}
              </button>
            );
          })}
        </div>
      </section>

      <section className="container note-variations-workspace">
        <div className="note-variations-preview">
          <div className="note-variations-preview__header">
            <span>Diagram</span>
            <small>{selectedVariation?.group || "Choose a variation"}</small>
          </div>

          {isLoading ? (
            <WavyGuitarStrings compact label="Loading chord variations" />
          ) : loadError ? (
            <div className="note-variations-placeholder" role="alert">
              <strong>Could not load chords</strong>
              <p>{loadError}</p>
            </div>
          ) : (
            <>
              {widgetError && (
                <div className="chord-note__error" role="alert">
                  <p>{widgetError}</p>
                  <button type="button" onClick={() => window.location.reload()}>
                    Refresh page
                  </button>
                </div>
              )}

              {!widgetsReady && !widgetError && (
                <WavyGuitarStrings compact label="Loading chord diagrams" />
              )}

              {!selectedVariation && widgetsReady && (
                <div className="note-variations-placeholder">
                  <strong>Select a chord type</strong>
                  <p>All chord diagrams are loaded and ready to display.</p>
                </div>
              )}

              <div className="note-variations-cache">
                {chordVariations.map((variation) => {
                  const isSelected = selectedChordId === variation.id;

                  return (
                    <div
                      key={variation.id}
                      className="note-variations-cache__item"
                      hidden={!isSelected}
                      aria-hidden={!isSelected}
                    >
                      <div data-chord-diagram={variation.id}>
                        <Note chord={variation} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <aside className="note-variations-picker">
          <div className="note-variations-picker__header">
            <span>Chord type</span>
            <p>
              {selectedVariation?.hint ||
                "Choose a variation to load its chord diagram."}
            </p>
          </div>

          <div className="note-variations-grid">
            {chordVariations.map((variation) => {
              const isSelected = selectedChordId === variation.id;

              return (
                <button
                  key={variation.id}
                  type="button"
                  className={`note-variation-card${isSelected ? " note-variation-card--selected" : ""}`}
                  onClick={() => setSelectedChordId(variation.id)}
                  aria-pressed={isSelected}
                  disabled={!widgetsReady}
                >
                  <span>{variation.group}</span>
                  <strong>{variation.label}</strong>
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

export async function getServerSideProps(context) {
  const { id } = context.params;
  return {
    props: { name: id || "default" },
  };
}
