import React, { useEffect, useMemo, useRef, useState } from "react";
import TPB from "./testPlayingButton";

const Note = ({ name, ext }) => {
  const chordLabel = useMemo(() => `${name}${ext ?? ""}`, [name, ext]);

  const chartRef = useRef(null);
  const soundRef = useRef(null);

  return (
    <li
      className="item"
      style={{
        backgroundImage:
          "url('https://r4.wallpaperflare.com/wallpaper/23/920/850/the-sun-music-palm-trees-background-wallpaper-c9f0384d517a6ddbe617b8af7051962d.jpg')",
      }}
    >
      <div className="overlay">
        <h2 className="class-name">Note: {chordLabel}</h2>
      </div>

      <div className="content">
        <div className="description">
          <div className="ima">
            <ins
              ref={chartRef}
              className="scales_chords_api"
              chord={chordLabel}
              instrument="guitar"
            ></ins>
          </div>
        </div>

        <ins
          ref={soundRef}
          className="scales_chords_api"
          chord={chordLabel}
          output="sound"
        ></ins>

        <TPB name={name} />
      </div>
    </li>
  );
};

export default Note;