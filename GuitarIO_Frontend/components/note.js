import React, { useMemo } from "react";

const Note = ({ chord, name, ext }) => {
  const chordData = useMemo(
    () =>
      chord || {
        chord: `${name || ""}${ext ?? ""}`,
        instrument: "guitar",
        outputs: {
          diagram: "image",
          sound: "sound",
        },
      },
    [chord, name, ext]
  );
  const {
    chord: chordLabel,
    instrument = "guitar",
    outputs = { diagram: "image", sound: "sound" },
  } = chordData;
  return (
    <div className="chord-note">
      <div className="chord-note__content">
        <div className="chord-note__diagram">
          <div className="chord-note__image">
            <ins
              key={`${chordLabel}-chart`}
              className="scales_chords_api"
              chord={chordLabel}
              instrument={instrument}
              output={outputs.diagram}
            ></ins>
          </div>
        </div>
        <p className="chord-note__label">Want to hear how it sounds?</p>
        <div className="chord-note__sound">
          <ins
            key={`${chordLabel}-sound`}
            className="scales_chords_api"
            chord={chordLabel}
            instrument={instrument}
            output={outputs.sound}
          ></ins>
        </div>
      </div>
    </div>
  );
};

export default Note;
