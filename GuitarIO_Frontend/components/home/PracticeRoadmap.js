const steps = [
  {
    number: "01",
    title: "Tune In",
    text: "Warm up with clean finger placement, simple rhythm checks, and the notes you need for the session.",
  },
  {
    number: "02",
    title: "Build Chords",
    text: "Move from basic shapes into smooth changes with short drills that keep your hands moving.",
  },
  {
    number: "03",
    title: "Play Songs",
    text: "Search songs, follow tabs, and turn practice into music before the motivation fades.",
  },
];

export default function PracticeRoadmap() {
  return (
    <section className="practice-roadmap section" id="practice-roadmap">
      <div className="shape__small practice-roadmap__glow"></div>

      <div className="practice-roadmap__container container">
        <div className="practice-roadmap__header">
          <p className="practice-roadmap__eyebrow">training route</p>
          <h2 className="practice-roadmap__title">From first note to full riff</h2>
        </div>

        <div className="practice-roadmap__grid">
          {steps.map((step) => (
            <article className="practice-roadmap__card" key={step.number}>
              <span className="practice-roadmap__number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
