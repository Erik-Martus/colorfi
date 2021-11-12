import React from 'react';
import PropTypes from 'prop-types';

function InputRadioGroup({ name, label, options, active, onChange }) {
  return (
    <fieldset className="form-control">
      <legend>{label || name}</legend>
      {options.map((option, index) => {
        return (
          <label
            htmlFor={`${name}-${option.toLowerCase().replaceAll(' ', '-')}`}
            key={index}
            className={`flex gap-2 mb-0 pt-2`}
          >
            <input
              type="radio"
              id={`${name}-${option.toLowerCase().replaceAll(' ', '-')}`}
              name={name}
              value={option}
              checked={
                active === option
                  ? true
                  : active === '' && index === 0
                  ? true
                  : false
              }
              onChange={onChange}
            />
            {option}
          </label>
        );
      })}
    </fieldset>
  );
}

InputRadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  active: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputRadioGroup;
