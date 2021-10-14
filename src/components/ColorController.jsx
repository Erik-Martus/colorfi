import React, { useState } from 'react';
import { css } from '@emotion/react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

function ColorController({ color, colorIndex, onThemeColorsChange }) {
  const [pickerColor, setPickerColor] = useState(color.hex);
  const handlePickerChange = (event) => {
    console.log(event);
    setPickerColor(event);
  };
  return (
    <article className="w-96">
      <div className="h-24" style={{ backgroundColor: pickerColor }}></div>
      <strong>{color.name}</strong>
      <div>
        <div className="form-control">
          <label htmlFor={`colorName-${colorIndex}`}>Color Name:</label>
          <input
            type="text"
            id={`colorName-${colorIndex}`}
            value={color.name}
            onChange={onThemeColorsChange}
          ></input>
        </div>
        <div className="form-control">
          <HexColorPicker
            color={pickerColor}
            id={`colorPicker-${colorIndex}`}
            onChange={handlePickerChange}
          />
          <HexColorInput
            color={pickerColor}
            id={`colorInput-${colorIndex}`}
            onChange={handlePickerChange}
          />
        </div>
      </div>
    </article>
  );
}

export default ColorController;
