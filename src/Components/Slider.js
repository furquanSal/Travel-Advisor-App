import React from 'react';

const Slider = ({ value, onChange }) => {
  return (
    <input
      type="range"
      min={1}
      max={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Slider;