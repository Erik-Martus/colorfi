import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import useDebouncy from 'use-debouncy/lib/effect';
import Swatch from './Swatch';
import TrashIcon from '../icons/trash.svg';
import {
  deleteColor,
  toggleColorShades,
  updateColorHex,
  updateColorName,
  updateColorShades,
} from '../store/colors';

function ColorController({ color }) {
  const dispatch = useDispatch();

  function onDelete() {
    dispatch(deleteColor(color.id));
  }

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

  return (
    <div className="w-96">
      <div className="relative group">
        <Swatch colors={color.shades.enabled ? color.shades.colors : [color]} />
        <p>
          <strong>{color.name ? color.name : 'Color'}</strong>
        </p>
        <button
          role="button"
          onClick={onDelete}
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100"
        >
          <TrashIcon />
        </button>
      </div>
      <div>
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
            color={hex}
            onChange={onHexChange}
          />
          <HexColorInput
            id={formId.hex}
            color={hex}
            onChange={onHexChange}
            prefixed={true}
          />
        </div>
        <div className="form-control">
          <label htmlFor={formId.enableShades}>Enable Shades:</label>
          <input
            type="checkbox"
            checked={color.shades.enabled}
            onChange={onToggleShades}
          />
        </div>
        <fieldset disabled={!color.shades.enabled}>
          <legend>Customize Shades:</legend>
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
  );
}

export default ColorController;
