export default function IntroSection() {
  return (
    <section className="party section" id="party">
      <div className="party__container container grid">
        <div className="party__data">
          <h2 className="section__title"></h2>
          <p className="party__description">
            your step-by-step guide to learning guitar! Whether you are picking up a guitar for the very first time or looking to sharpen your skills, we have got you covered with easy lessons, song tutorials, practice tips, and tools to keep you motivated. Learn at your own pace and start playing the music you love today.
          </p>
          <a href="/options" className="retro-pixel-button">
            Start learning
          </a>
        </div>

        <div className="party__images">
          <img src="/80.png" alt="" className="party__img" />
        </div>
      </div>
    </section>
  );
}
