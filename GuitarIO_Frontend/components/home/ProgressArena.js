const stats = [
  { value: "15m", label: "daily focus" },
  { value: "3x", label: "repeat loops" },
  { value: "7", label: "day streak" },
];

export default function ProgressArena() {
  return (
    <section className="progress-arena section" id="progress-arena">
      <div className="progress-arena__container container">
        <div className="progress-arena__copy">
          <p className="progress-arena__eyebrow">keep the streak alive</p>
          <h2 className="progress-arena__title">Small wins stack into real guitar confidence</h2>
          <p className="progress-arena__text">
            Practice feels better when the page gives you a rhythm: warm up, repeat the hard bit, then finish with something that sounds like music.
          </p>
        </div>

        <div className="progress-arena__stats">
          {stats.map((stat) => (
            <article className="progress-arena__stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
