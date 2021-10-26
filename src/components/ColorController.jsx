import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import Swatch from './Swatch';
import trashIcon from '../icons/trash.svg';

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

  const [pickerColor, setPickerColor] = useState(color.hex);
  useEffect(() => {
    setPickerColor(color.hex);
  }, [color]);

  const handlePickerChange = (event) => {
    let newColorData = colorData;
    newColorData.hex = event;
    setColorData(newColorData);
    setPickerColor(event);
    handleColorDataChange();
  };

  const handleRemove = () => {
    onThemeColorRemove(colorData.id);
  };

  const [enableShade, setEnableShade] = useState(false);
  const handleShadeToggle = (event) => {
    setEnableShade(event.target.checked);
  };

  const [shadeAmount, setShadeAmount] = useState(9);
  const handleShadeAmountChange = (event) => {
    setShadeAmount(event.target.value);
  };

  const [hueAmount, setHueAmount] = useState(0);
  const handleHueChange = (event) => {
    setHueAmount(event.target.value);
  };

  const [saturationAmount, setSaturationAmount] = useState(0);
  const handleSaturationChange = (event) => {
    setSaturationAmount(event.target.value);
  };

  const [lightnessAmount, setLightnessAmount] = useState(5);
  const handleLightnessChange = (event) => {
    setLightnessAmount(event.target.value);
  };

  return (
    <div className="w-96">
      <Swatch colors={[colorData]} />
      <strong>{colorName ? colorName : 'Color Name'}</strong>
      <button role="button" onClick={handleRemove}>
        <img src={trashIcon} alt="Delete" />
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
        <div className="form-control">
          <label htmlFor={`shadeToggle-${colorData.id}`}>Enable Shades:</label>
          <input
            id={`shadeToggle-${colorData.id}`}
            type="checkbox"
            checked={enableShade}
            onChange={handleShadeToggle}
          />
        </div>
        <fieldset disabled={enableShade ? false : true}>
          <legend>Customize Shades:</legend>
          <div className="form-control">
            <label htmlFor={`shadeSlider-${colorData.id}`}>
              Number of Shades:
            </label>
            <input
              id={`shadeSlider-${colorData.id}`}
              type="range"
              value={shadeAmount}
              min="1"
              max="10"
              onChange={handleShadeAmountChange}
            />
            <input
              type="number"
              value={shadeAmount}
              min="1"
              max="10"
              onChange={handleShadeAmountChange}
            />
          </div>
          <fieldset>
            <legend>HSL Adjustment:</legend>
            <div className="form-control">
              <label htmlFor={`hueAdjust-${colorData.id}`}>Hue:</label>
              <input
                id={`hueAdjust-${colorData.id}`}
                type="number"
                value={hueAmount}
                min="0"
                max="100"
                onChange={handleHueChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor={`saturationAdjust-${colorData.id}`}>
                Saturation:
              </label>
              <input
                id={`saturationAdjust-${colorData.id}`}
                type="number"
                value={saturationAmount}
                min="0"
                max="100"
                onChange={handleSaturationChange}
              />
            </div>
            <div className="form-control">
              <label htmlFor={`lightnessAdjust-${colorData.id}`}>
                Lightness:
              </label>
              <input
                id={`lightnessAdjust-${colorData.id}`}
                type="number"
                value={lightnessAmount}
                min="0"
                max="100"
                onChange={handleLightnessChange}
              />
            </div>
          </fieldset>
        </fieldset>
      </div>
    </div>
  );
}

export default ColorController;
