import React from 'react';

const GlitchingButton = ({ aria, name, handleClick }) => {
  return (
    <div className="radio-wrapper">
      <button 
        className="btn" 
        id="value-1" 
        name="btn" 
        type="button" 
        onClick={handleClick} 
        aria-pressed={aria}
      >
        <span aria-hidden="">_</span>{name}
        <span className="btn__glitch" aria-hidden="">{name}</span>
        <label className="number">r1</label>
      </button>
    </div>
  );
};

export default GlitchingButton;
