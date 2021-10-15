import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

function ColorController({ color, onThemeColorChange }) {
  const [colorData, setColorData] = useState(color);
  useEffect(() => {
    setColorData(color);
  }, [color]);

  const handleColorDataChange = () => {
    onThemeColorChange(colorData);
  };

  const [colorName, setColorName] = useState(color.name);
  useEffect(() => {
    setColorName(color.name);
  }, [color]);

  const handleColorNameChange = (event) => {
    let newColorData = colorData;
    newColorData.name = event.target.value;
    setColorData(newColorData);
    setColorName(event.target.value);
  };

  const [pickerColor, setPickerColor] = useState(color.DEFAULT);
  useEffect(() => {
    setPickerColor(color.DEFAULT);
  }, [color]);

  const handlePickerChange = (event) => {
    let newColorData = colorData;
    newColorData.DEFAULT = event;
    setColorData(newColorData);
    setPickerColor(event);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="w-96" onSubmit={handleSubmit}>
      <div className="h-24" style={{ backgroundColor: pickerColor }}></div>
      <strong>{colorName ? colorName : 'Color Name'}</strong>
      <div>
        <div className="form-control">
          <label htmlFor={`colorName-${colorData.id}`}>Color Name:</label>
          <input
            id={`colorName-${colorData.id}`}
            type="text"
            value={colorName}
            onChange={handleColorNameChange}
          ></input>
        </div>
        <div className="form-control">
          <HexColorPicker
            id={`colorPicker-${colorData.id}`}
            color={pickerColor}
            onChange={handlePickerChange}
          />
          <HexColorInput
            id={`colorInput-${colorData.id}`}
            color={pickerColor}
            prefixed={true}
            onChange={handlePickerChange}
          />
        </div>
      </div>
    </form>
  );
}

export default ColorController;
