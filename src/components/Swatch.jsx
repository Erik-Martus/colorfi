import React from 'react';
import PropTypes from 'prop-types';

function Swatch({ colors }) {
  return (
    <div className="flex">
      {colors.map((color) => {
        return (
          <span
            key={color.id}
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
