import React from 'react';

function SwatchLabel({ label }) {
  return (
    <p className="inline-block px-4 py-1 text-center text-lg truncate font-semibold text-white bg-gray-900 rounded-2xl">
      {label}
    </p>
  );
}

export default SwatchLabel;
