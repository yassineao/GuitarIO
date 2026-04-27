const paths = [
  {
    image: "/Spaceman.png",
    title: "Spaceman",
    level: "Beginner",
    description: "Learn chords, rhythm, and your first riffs from scratch.",
    button: "Start Basics",
  },
  {
    image: "/Kid.png",
    title: "Street Kid",
    level: "Practice",
    description: "Train notes, tabs, memory drills, and daily guitar habits.",
    button: "Practice Notes",
  },
  {
    image: "/hacker.png",
    title: "Corpo",
    level: "Advanced",
    description: "Search your favorite songs and learn how to play them.",
    button: "Find Songs",
  },
];

const starImage =
  "https://cdn.pixabay.com/photo/2013/07/12/17/40/stars-152191_1280.png";

export default function LearningPaths() {
  return (
    <section className="category section">
      <div className="shape__small"></div>

      <h1 className="home__title">choose your way of learning</h1>
      <p className="category__subtitle">Pick your path and start leveling up.</p>

      <div className="category__container container grid">
        {paths.map((path) => (
          <article className="category__card" key={path.title}>
            <img src={path.image} alt={path.title} className="category__img" />

            <span className="category__level">{path.level}</span>

            <h3 className="category__title">{path.title}</h3>
            <p className="category__description">{path.description}</p>

            <button className="category__button">{path.button}</button>

            <img src={starImage} alt="" className="category__star" />
          </article>
        ))}
      </div>
    </section>
  );
}