import React from 'react';
import PropTypes from 'prop-types';

function InputToggle({ id, label, checked = false, onChange }) {
  const elId = id ? id : label.toLowerCase().replace(' ', '-');
  return (
    <div className="form-control">
      <label
        htmlFor={elId}
        className="flex items-center justify-between cursor-pointer"
      >
        <span>{label}</span>
        <span className="relative">
          <input
            id={elId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
          />
          <span className="block bg-gray-200 peer-checked:bg-indigo-600 w-14 h-8 rounded-full transition-colors hocus:bg-gray-300 peer-checked:hover:bg-indigo-800 peer-checked:focus:bg-indigo-800 peer-focus:ring-2 peer-focus:ring-indigo-600 peer-focus:ring-opacity-50" />
          <span className="absolute bg-white left-1 top-1 w-6 h-6 rounded-full transition-transform peer-checked:translate-x-full" />
        </span>
      </label>
    </div>
  );
}

InputToggle.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default InputToggle;
