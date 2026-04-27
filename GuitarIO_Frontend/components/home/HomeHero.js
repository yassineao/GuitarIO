export default function HomeHero({ userName }) {
  return (
    <section className="home section" id="home">
      <div className="shape__small"></div>
      <div className="shape__big"></div>

      <div id="guitar-title" className="home__container">
        <div className="header">
          <div className="title-wrapper">
            <span className="top-title">
              {userName ? `Welcome back ${userName}!` : "Learn Guitar"}
            </span>

            <h1 className="sweet-title">
              <span data-text="GuitarIO">GuitarIO</span>
              <span data-text="Platform">Platform</span>
            </h1>

            <span className="bottom-title">The Easy Way</span>

            <a href="/options" className="button">
              Explore Now!!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
