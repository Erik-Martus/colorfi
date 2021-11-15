import PropTypes from 'prop-types';
import IconMinus from '../icons/minus.svg';
import IconPlus from '../icons/plus.svg';

function InputNumber({
  id,
  label,
  value = 0,
  min = 0,
  max = 10,
  onChange,
  onStep,
}) {
  const elId = id ? id : label.toLowerCase().replace(' ', '-');
  return (
    <div className="form-control">
      <label htmlFor={elId} className="flex items-center justify-between">
        {label}
        <div className="input-number">
          <button
            role="button"
            onClick={() => onChange(value - 1 >= min ? value - 1 : min)}
          >
            <IconMinus />
          </button>
          <input
            type="number"
            id={elId}
            value={value}
            min={min}
            max={max}
            onChange={(e) => onChange(e.target.value)}
            onBlur={(e) =>
              onChange(
                e.target.value < min
                  ? min
                  : e.target.value > max
                  ? max
                  : e.target.value
              )
            }
          />
          <button
            role="button"
            onClick={() => onChange(value + 1 <= max ? value + 1 : max)}
          >
            <IconPlus />
          </button>
        </div>
      </label>
    </div>
  );
}

InputNumber.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onStep: PropTypes.func,
};

export default InputNumber;
