import { useState } from 'react';

const Options = () => {
  const [selectedValue, setSelectedValue] = useState(null);

  const handleChange = (event) => {
    setSelectedValue(event.target.value); // Set the selected value
  };

  const handleClick = () => {
    const link = getLink();
    if (link !== '#') {
      window.location.href = link;
    }
  };

  const getLink = () => {
    switch (selectedValue) {
      case 'valueIs-1':
        return '/majorNotes';
      case 'valueIs-2':
        return '/Chapters';
      case 'valueIs-3':
        return '/play-song';
      case 'valueIs-4':
        return '/notes/a';
      default:
        return '#';
    }
  };

  return (
    <div id="unique-neon-btn">
      <form action="" className="container">
        <input
          className="input-btn"
          type="radio"
          id="valueIs-1"
          name="valueIs-radio"
          value="valueIs-1"
          onChange={handleChange}
        />
        <label className="neon-btn" htmlFor="valueIs-1">
          <span className="span"></span>
          <span className="txt">Learn Chords</span>
        </label>

     

        <input
          className="input-btn"
          type="radio"
          id="valueIs-3"
          name="valueIs-radio"
          value="valueIs-3"
          onChange={handleChange}
        />
        <label className="neon-btn" htmlFor="valueIs-3">
          <span className="span"></span>
          <span className="txt">Try Playing a song</span>
        </label>

        <input
          className="input-btn"
          type="radio"
          id="valueIs-4"
          name="valueIs-radio"
          value="valueIs-4"
          onChange={handleChange}
        />
        <label className="neon-btn" htmlFor="valueIs-4">
          <span className="span"></span>
          <span className="txt">Search for chords</span>
        </label>
           <input
          className="input-btn"
          type="radio"
          id="valueIs-2"
          name="valueIs-radio"
          value="valueIs-2"
          onChange={handleChange}
        />
        <label className="neon-btn" htmlFor="valueIs-2">
          <span className="span"></span>
          <span className="txt">Lessons </span>
        </label>
      </form>

      <button
        id="glotch"
        disabled={!selectedValue}
        onClick={handleClick}
      >
        NEXT
      </button>
    </div>
  );
};

export default Options;
