"use client";

import Script from "next/script";
import { useMemo, useState } from "react";

type Props = {
  chord: string;                       // z.B. "D#m maj9"
  instrument?: "guitar" | "piano";     // default: guitar
  output?: "image" | "sound";          // default: image
  width?: number;                      // px
  height?: number;                     // px
  nolink?: boolean;                    // default: false
  className?: string;
};

export default function ChordChart({
  chord,
  instrument = "guitar",
  output = "image",
  width,
  height,
  nolink,
  className,
}: Props) {
  const [ready, setReady] = useState(false);

  // Trick: wenn Props wechseln, bekommt <ins> einen neuen key → Script kann neu “scannen”
  const key = useMemo(
    () => JSON.stringify({ chord, instrument, output, width, height, nolink }),
    [chord, instrument, output, width, height, nolink]
  );

  return (
    <>
      <Script
        src="https://www.scales-chords.com/api/scales-chords-api.js"
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />

      {/* Optional: bis Script da ist, rendern wir trotzdem den <ins> */}
     <ins
        className="scales_chords_api"
        data-chord={chord}
        data-instrument={instrument}
        data-output={output}
        data-nolink={nolink ? "true" : "false"}
        />
    </>
  );
}