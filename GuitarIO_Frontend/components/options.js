import { useMemo, useState } from "react";
import { useRouter } from "next/router";

const learningOptions = [
  {
    id: "ai-teaching",
    label: "AI Teaching",
    href: "/teaching",
    eyebrow: "New",
    description: "Ask your guitar assistant for drills, rhythm help, and lesson-grounded answers.",
  },
  {
    id: "lessons",
    label: "Lessons",
    href: "/Chapters",
    eyebrow: "Path",
    description: "Move through structured GuitarIO chapters and keep building step by step.",
  },
  {
    id: "chords",
    label: "Learn Chords",
    href: "/majorNotes",
    eyebrow: "Shapes",
    description: "Practice core chord shapes and get comfortable with fretboard positions.",
  },
  {
    id: "song",
    label: "Play a Song",
    href: "/play-song",
    eyebrow: "Practice",
    description: "Put chords and rhythm together with a song-focused practice mode.",
  },
  {
    id: "search",
    label: "Search Chords",
    href: "/notes/a",
    eyebrow: "Lookup",
    description: "Find chords fast when you need a reference during practice.",
  },
];

const Options = () => {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(learningOptions[0].id);

  const selectedOption = useMemo(
    () => learningOptions.find((option) => option.id === selectedId),
    [selectedId]
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption?.href) {
      router.push(selectedOption.href);
    }
  };

  return (
    <form className="options-board" onSubmit={handleSubmit}>
      <div className="options-board__header">
        <span>Choose mode</span>
        <p>{selectedOption?.description}</p>
      </div>

      <div className="options-grid" role="radiogroup" aria-label="Learning options">
        {learningOptions.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <label
              className={`option-card${isSelected ? " option-card--selected" : ""}`}
              key={option.id}
              htmlFor={option.id}
            >
              <input
                type="radio"
                id={option.id}
                name="learning-option"
                value={option.id}
                checked={isSelected}
                onChange={() => setSelectedId(option.id)}
              />
              <span className="option-card__eyebrow">{option.eyebrow}</span>
              <strong>{option.label}</strong>
              <p>{option.description}</p>
              <span className="option-card__status">{isSelected ? "Selected" : "Choose"}</span>
            </label>
          );
        })}
      </div>

      <div className="options-board__actions">
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Options;
