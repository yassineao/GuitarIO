import ChordSheetJS from "chordsheetjs";
import parse from "html-react-parser";

export default function ChordsPage({ defaultChordPro }) {
  const parser = new ChordSheetJS.ChordProParser();
  const song = parser.parse(defaultChordPro);

  const formatter = new ChordSheetJS.HtmlDivFormatter({
    preserveWhitespace: true
  });

  const html = formatter.format(song);

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>ChordPro demo with ChordSheetJS</h1>

      <h2 style={{ marginTop: 24 }}>Rendered</h2>

      <div
        className="chord-sheet"
        style={{
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
          lineHeight: 1.6
        }}
      >
        {parse(html)}
      </div>
    </main>
  );
}
