import React, { useEffect, useMemo, useRef, useState } from "react";
import TPB from "./testPlayingButton";

const Note = ({ name, ext }) => {
  const chordLabel = useMemo(() => `${name}${ext ?? ""}`, [name, ext]);

  const chartRef = useRef(null);
  const soundRef = useRef(null);

  return (
  <section className="py-20"  style={{ all: "initial" }}>
  <div className="container mx-auto">
    
    {/* Main Grid */}
    <div className="grid grid-cols-3 ">
      
      {/* LEFT SIDE (bigger column) */}
      <div className="col-span-2 grid grid-rows-3 ">
        
        {/* Top Bigger */}
        <div className="row-span-2  bg-zinc-200 p-10">
          <h2 className="text-2xl font-bold">Big Top Left</h2>
          <p>More content here</p>
        </div>

        {/* Bottom Smaller */}
        <div className="row-span-1  bg-zinc-300 p-10">
          <h2 className="text-xl font-semibold">Small Bottom Left</h2>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-1  bg-zinc-400 p-10">
        <h2 className="text-xl font-semibold">Right Column</h2>
      </div>

    </div>

  </div>
</section>
  );
};

export default Note;