import React from 'react';
import PropTypes from 'prop-types';

function Swatch({ colors, className = '', context }) {
  return (
    <div className={`flex w-full rounded-xl overflow-visible ${className}`}>
      {colors.map((color, index) => {
        return (
          <span
            key={`color-${index}`}
            className="group flex-grow h-24 relative overflow-visible first:rounded-l-xl last:rounded-r-xl"
            style={{ backgroundColor: color.hex }}
          >
            {color.base ? (
              <>
                <span className="inline-block w-2 h-2 absolute-center bg-white rounded-full" />
                {context ? (
                  <div className="px-2 py-1 absolute-center text-xs text-center bg-white shadow-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <strong>Base Color</strong>
                  </div>
                ) : (
                  ''
                )}
              </>
            ) : color.error ? (
              <>
                <span className="inline-block w-2 h-2 absolute-center bg-red-600 rounded-full"></span>
                {context ? (
                  <div className="px-2 py-1 absolute-center text-xs text-center bg-white shadow-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <strong>{color.error}</strong>
                  </div>
                ) : (
                  ''
                )}
              </>
            ) : (
              ''
            )}
          </span>
        );
      })}
    </div>
  );
}

Swatch.propTypes = {
  colors: PropTypes.array.isRequired,
  className: PropTypes.string,
  context: PropTypes.bool,
};

export default Swatch;
