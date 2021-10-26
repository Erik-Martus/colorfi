import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';

function ColorController({ color, onThemeColorChange, onThemeColorRemove }) {
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
    newColorData.safeName = event.target.value.toLowerCase().replace(' ', '-');
    setColorData(newColorData);
    setColorName(event.target.value);
    handleColorDataChange();
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
    handleColorDataChange();
  };

  const handleRemove = () => {
    onThemeColorRemove(colorData.id);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="w-96" onSubmit={handleSubmit}>
      <div className="h-24" style={{ backgroundColor: pickerColor }}></div>
      <strong>{colorName ? colorName : 'Color Name'}</strong>
      <button role="button" onClick={handleRemove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-3 -2 24 24"
          width="24"
          fill="currentColor"
        >
          <path d="M6 2V1a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1h4a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-.133l-.68 10.2a3 3 0 0 1-2.993 2.8H5.826a3 3 0 0 1-2.993-2.796L2.137 7H2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4zm10 2H2v1h14V4zM4.141 7l.687 10.068a1 1 0 0 0 .998.932h6.368a1 1 0 0 0 .998-.934L13.862 7h-9.72zM7 8a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm4 0a1 1 0 0 1 1 1v7a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1z"></path>
        </svg>
      </button>
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
