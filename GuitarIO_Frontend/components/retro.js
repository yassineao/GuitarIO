import React from 'react';

const Retro = ({  name, n}) => {
  return (
    <li className="item"style={{ backgroundImage: "url('https://i.redd.it/tc0aqpv92pn21.jpg')" }}>
    <div className="overlay">
      <h2 className="class-name">Class: {name}</h2>
    </div>
    <div className="content">
      <div className="description">
        <ins className="scales_chords_api" chord={name}></ins> {/* Initially set to 'A' */}
        <strong>Sample:</strong>
      </div>
      <div></div>
      <div>
        <strong>Class:</strong>
      </div>
      <button>Listen to how it's played</button>
      <button>Try playing</button>
    </div>
  </li>

  );
};

export default Retro;
