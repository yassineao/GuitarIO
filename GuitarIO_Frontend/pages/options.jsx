import Options from "@/components/options";

export default function OptionsPage() {
  return (
    <main className="options-page">
      <section className="container options-hero">
        <span className="options-hero__eyebrow">Practice menu</span>
        <h1>Choose your option</h1>
        <p>Pick the next thing you want to work on: guided lessons, chord reference, songs, or AI teaching.</p>
      </section>

      <section className="container opt">
        <Options />
      </section>
    </main>
  );
}
