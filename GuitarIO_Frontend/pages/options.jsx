import Options from '../components/options';

export default function Notes() {
  return (
    <main className="options-page">
      <h1 className="home__titlee">
        <div data-gliitch={"Choose your option"} className="gliitch">
          Choose your option
        </div>
      </h1>

      <section className="opt">
        <Options />
      </section>
    </main>
  );
}
