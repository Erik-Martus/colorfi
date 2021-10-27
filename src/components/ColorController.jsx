import React, { useState, useEffect } from 'react';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import Swatch from './Swatch';
import calcShades from '../js/calcShades';
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
    if (event.target.checked === true) {
      setShades(
        calcShades(
          colorData.hex,
          shadeAmount,
          shadePosition,
          hueAmount,
          saturationAmount,
          lightnessAmount
        )
      );
    }
  };

  const [shadeAmount, setShadeAmount] = useState(9);
  const handleShadeAmountChange = (event) => {
    setShadeAmount(event.target.value);
    setShadePosition(Math.round(event.target.value / 2));
  };

  const [shadePosition, setShadePosition] = useState(5);
  const handleShadePositionChange = (event) => {
    setShadePosition(event.target.value);
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

  const [shades, setShades] = useState([]);
  useEffect(() => {
    if (enableShade === true) {
      setShades(
        calcShades(
          pickerColor,
          shadeAmount,
          shadePosition,
          hueAmount,
          saturationAmount,
          lightnessAmount
        )
      );
    }
  }, [
    pickerColor,
    shadeAmount,
    shadePosition,
    hueAmount,
    saturationAmount,
    lightnessAmount,
  ]);

  return (
    <div className="w-96">
      <Swatch colors={enableShade ? shades : [colorData]} />
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
          />
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
              max="9"
              onChange={handleShadeAmountChange}
            />
            <input
              type="number"
              value={shadeAmount}
              min="1"
              max="9"
              onChange={handleShadeAmountChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor={`shadePos-${colorData.id}`}>
              Base Color Position:
            </label>
            <input
              id={`shadePos-${colorData.id}`}
              type="range"
              value={shadePosition}
              min="1"
              max={shadeAmount}
              onChange={handleShadePositionChange}
            />
            <input
              type="number"
              value={shadePosition}
              min="1"
              max={shadeAmount}
              onChange={handleShadePositionChange}
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
                max="360"
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
