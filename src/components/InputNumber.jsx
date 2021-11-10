import Minus from '../icons/minus.svg';
import Plus from '../icons/plus.svg';
function InputNumber({ id, label, value, min, max, onChange }) {
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
            <Minus />
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
            <Plus />
          </button>
        </div>
      </label>
    </div>
  );
}

export default InputNumber;
