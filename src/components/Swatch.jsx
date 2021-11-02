import React from 'react';
import PropTypes from 'prop-types';

function Swatch({ colors }) {
  return (
    <div className="flex w-full rounded-xl overflow-hidden">
      {colors.map((color, index) => {
        return (
          <span
            key={`color-${index}`}
            className="flex-grow h-24"
            style={{ backgroundColor: color.hex }}
          ></span>
        );
      })}
    </div>
  );
}

Swatch.propTypes = {
  colors: PropTypes.array.isRequired,
};

export default Swatch;
