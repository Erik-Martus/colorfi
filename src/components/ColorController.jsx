import { useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebouncy from 'use-debouncy/lib/effect';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import Swatch from './Swatch';
import {
  toggleColorShades,
  updateColorHex,
  updateColorName,
  updateColorShades,
} from '../store/colors';

function ColorController({ color }) {
  const dispatch = useDispatch();

  const formId = {
    name: `${color.id}-name`,
    picker: `${color.id}-hexPicker`,
    hex: `${color.id}-hex`,
    enableShades: `${color.id}-enableShades`,
    amountSlider: `${color.id}-shadeAmount`,
    positionSlider: `${color.id}-basePosition`,
    hue: `${color.id}-hue`,
    saturation: `${color.id}-saturation`,
    lightness: `${color.id}-lightness`,
  };

  function onNameChange(e) {
    dispatch(updateColorName(color.id, e.target.value));
  }

  const [hex, setHex] = useState(color.hex);
  function onHexChange(e) {
    setHex(e.toUpperCase());
  }
  useDebouncy(() => dispatch(updateColorHex(color.id, hex)), 200, [hex]);

  function onToggleShades(e) {
    dispatch(toggleColorShades(color.id, e.target.checked));
  }

  function onAmountChange(e) {
    let amount = parseInt(e.target.value);
    dispatch(
      updateColorShades(color.id, {
        amount: amount,
        baseIndex: Math.round(amount / 2) - 1,
      })
    );
  }

  function onIndexChange(e) {
    dispatch(
      updateColorShades(color.id, { baseIndex: parseInt(e.target.value) - 1 })
    );
  }

  function onHueChange(e) {
    dispatch(updateColorShades(color.id, { hue: parseInt(e.target.value) }));
  }

  function onSatChange(e) {
    dispatch(
      updateColorShades(color.id, { saturation: parseInt(e.target.value) })
    );
  }

  function onLightChange(e) {
    dispatch(
      updateColorShades(color.id, { lightness: parseInt(e.target.value) })
    );
  }

  return (
    <>
      <div className="flex-auto overflow-y-scroll p-1">
        <div className="form-control">
          <label htmlFor={formId.name}>Color Name:</label>
          <input
            type="text"
            id={formId.name}
            value={color.name}
            onChange={onNameChange}
          />
        </div>
        <div className="form-control">
          <HexColorPicker
            id={formId.picker}
            className="color-picker"
            color={hex}
            onChange={onHexChange}
          />
          <HexColorInput
            id={formId.hex}
            type="text"
            color={hex}
            onChange={onHexChange}
            prefixed={true}
          />
        </div>
        <div className="form-control">
          <label
            htmlFor={formId.enableShades}
            className="flex items-center justify-between cursor-pointer"
          >
            <span>Enable Shades:</span>
            <span className="relative">
              <input
                id={formId.enableShades}
                type="checkbox"
                checked={color.shades.enabled}
                onChange={onToggleShades}
                className="sr-only peer"
              />
              <span className="block bg-gray-200 peer-checked:bg-indigo-600 w-14 h-8 rounded-full transition-colors hocus:bg-gray-300 peer-checked:hover:bg-indigo-800 peer-checked:focus:bg-indigo-800 peer-focus:ring-2 peer-focus:ring-indigo-600 peer-focus:ring-opacity-50" />
              <span className="absolute bg-white left-1 top-1 w-6 h-6 rounded-full transition-transform peer-checked:translate-x-full" />
            </span>
          </label>
        </div>
        <div className="">
          <fieldset
            disabled={!color.shades.enabled}
            className="overflow-y-hidden disabled:h-0"
          >
            <legend className="">Customize Shades:</legend>
            <fieldset className="form-control">
              <legend htmlFor={formId.amountSlider}>Number of Shades:</legend>
              <input
                id={formId.amountSlider}
                type="range"
                value={color.shades.amount}
                min="1"
                max="9"
                onChange={onAmountChange}
              />
              <input
                type="number"
                value={color.shades.amount}
                min="1"
                max="9"
                onChange={onAmountChange}
              />
            </fieldset>
            <fieldset className="form-control">
              <legend htmlFor={formId.positionSlider}>
                Base Color Position:
              </legend>
              <input
                id={formId.positionSlider}
                type="range"
                value={color.shades.baseIndex + 1}
                min="1"
                max={color.shades.amount}
                onChange={onIndexChange}
              />
              <input
                type="number"
                value={color.shades.baseIndex + 1}
                min="1"
                max={color.shades.amount}
                onChange={onIndexChange}
              />
            </fieldset>
            <fieldset>
              <legend>HSL Adjustment:</legend>
              <div className="form-control">
                <label htmlFor={formId.hue}>Hue:</label>
                <input
                  id={formId.hue}
                  type="number"
                  value={color.shades.hue}
                  min="0"
                  max="360"
                  onChange={onHueChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor={formId.saturation}>Saturation:</label>
                <input
                  id={formId.saturation}
                  type="number"
                  value={color.shades.saturation}
                  min="0"
                  max="100"
                  onChange={onSatChange}
                />
              </div>
              <div className="form-control">
                <label htmlFor={formId.lightness}>Lightness:</label>
                <input
                  id={formId.lightness}
                  type="number"
                  value={color.shades.lightness}
                  min="0"
                  max="100"
                  onChange={onLightChange}
                />
              </div>
            </fieldset>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default ColorController;
