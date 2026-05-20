import Link from "next/link";

export default function HomeHero({ userName }) {
  return (
    <section className="home home-hero" id="home">
      <div className="home-hero__content container">
        <span className="home-hero__eyebrow">
          {userName ? `Welcome back ${userName}` : "Guitar practice, tuned for momentum"}
        </span>

        <h1>GuitarIO</h1>

        <p>
          Pick a path, learn the chord shapes, play songs, and ask the AI teacher when practice gets stuck.
        </p>

        <div className="home-hero__actions">
          <Link href="/options" className="home-hero__primary">
            Start practice
          </Link>
          <Link href="/teaching" className="home-hero__secondary">
            Ask AI teacher
          </Link>
        </div>
      </div>

      <div className="home-hero__rail" aria-label="GuitarIO practice modes">
        <span>Lessons</span>
        <span>Chord Lab</span>
        <span>Songs</span>
        <span>AI Teaching</span>
      </div>
    </section>
  );
}
