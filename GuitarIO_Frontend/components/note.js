import React, { useEffect, useMemo, useRef, useState } from "react";
import TPB from "./testPlayingButton";

const Note = ({ name, ext }) => {
  const chordLabel = useMemo(() => `${name}${ext ?? ""}`, [name, ext]);

  const chartRef = useRef(null);
  const soundRef = useRef(null);

  // Force refresh by changing key when chordLabel changes
  const chordKey = useMemo(() => chordLabel, [chordLabel]);

  useEffect(() => {
    // Try both 'chord' and 'data-chord' for compatibility
    if (chartRef.current) {
      chartRef.current.setAttribute('data-chord', chordLabel);
      chartRef.current.setAttribute('chord', chordLabel);
    }
    if (soundRef.current) {
      soundRef.current.setAttribute('data-chord', chordLabel);
      soundRef.current.setAttribute('chord', chordLabel);
    }
    if (window.ScalesChordsAPI && window.ScalesChordsAPI.render) {
      window.ScalesChordsAPI.render(chartRef.current);
      window.ScalesChordsAPI.render(soundRef.current);
    }
  }, [chordLabel]);

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
            key={chordKey + '-sound'}
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
