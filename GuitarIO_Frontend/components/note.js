import React, { useEffect, useMemo, useRef, useState } from "react";

const Note = ({ name, ext }) => {
  const chordLabel = useMemo(() => `${name}${ext ?? ""}`, [name, ext]);
  const [renderKey, setRenderKey] = useState(0);

  const chartRef = useRef(null);
  const soundRef = useRef(null);
  const retryRef = useRef(null);

  // Force refresh by changing key when chordLabel changes
  const chordKey = useMemo(() => `${chordLabel}-${renderKey}`, [chordLabel, renderKey]);

  useEffect(() => {
    setRenderKey((currentKey) => currentKey + 1);
  }, [chordLabel]);

  useEffect(() => {
    const applyAttributes = () => {
      // Try both 'chord' and 'data-chord' for compatibility.
      if (chartRef.current) {
        chartRef.current.setAttribute("data-chord", chordLabel);
        chartRef.current.setAttribute("chord", chordLabel);
      }
      if (soundRef.current) {
        soundRef.current.setAttribute("data-chord", chordLabel);
        soundRef.current.setAttribute("chord", chordLabel);
      }
    };

    const renderChord = () => {
      applyAttributes();

      const api = window.ScalesChordsAPI;
      if (!api) {
        return false;
      }

      if (typeof api.render === "function") {
        api.render(chartRef.current);
        api.render(soundRef.current);
      } else if (typeof api.scan === "function") {
        api.scan();
      }

      return true;
    };

    const scheduleRender = () => {
      window.requestAnimationFrame(() => {
        if (renderChord()) {
          return;
        }

        retryRef.current = window.setTimeout(renderChord, 250);
      });
    };

    scheduleRender();
    window.addEventListener("scaleschords:ready", scheduleRender);

    return () => {
      window.removeEventListener("scaleschords:ready", scheduleRender);
      if (retryRef.current) {
        window.clearTimeout(retryRef.current);
      }
    };
  }, [chordLabel, renderKey]);

  return (
    <div className="chord-note">
      <div className="chord-note__content">
        <div className="chord-note__diagram">
          <div className="chord-note__image">
            <ins
              key={chordKey}
              ref={chartRef}
              className="scales_chords_api"
              data-chord={chordLabel}
              chord={chordLabel}
              instrument="guitar"
            ></ins>
          </div>
        </div>
        <p className="chord-note__label">Want to hear how it sounds?</p>
        <div className="chord-note__sound">
          <ins
            key={`${chordKey}-sound`}
            ref={soundRef}
            className="scales_chords_api"
            data-chord={chordLabel}
            chord={chordLabel}
            output="sound"
          ></ins>
        </div>
      </div>
    </div>
  );
};

export default Note;
