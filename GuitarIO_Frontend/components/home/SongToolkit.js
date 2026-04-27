const tools = [
  "Chord memory",
  "Note finder",
  "Song search",
  "Practice flow",
];

export default function SongToolkit() {
  return (
    <section className="song-toolkit section" id="song-toolkit">
      <div className="song-toolkit__container container">
        <div className="song-toolkit__visual" aria-hidden="true">
          <div className="song-toolkit__screen">
            <span className="song-toolkit__bar"></span>
            <span className="song-toolkit__bar song-toolkit__bar--short"></span>
            <div className="song-toolkit__strings">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

        <div className="song-toolkit__content">
          <p className="song-toolkit__eyebrow">play smarter</p>
          <h2 className="song-toolkit__title">Tools for the songs you actually want to learn</h2>
          <p className="song-toolkit__description">
            Jump between notes, chords, lessons, and song lookup without losing your place. GuitarIO keeps the next action obvious, even on a small screen.
          </p>

          <div className="song-toolkit__chips">
            {tools.map((tool) => (
              <span key={tool}>{tool}</span>
            ))}
          </div>

          <a className="song-toolkit__button" href="/notes">
            Search notes
          </a>
        </div>
      </div>
    </section>
  );
}
