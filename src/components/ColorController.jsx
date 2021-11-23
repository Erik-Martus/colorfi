import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import useDebouncy from 'use-debouncy/lib/effect';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import Button from './Button.jsx';
import InputNumber from './InputNumber.jsx';
import InputToggle from './InputToggle.jsx';
import Swatch from './Swatch.jsx';
import IconDice from '../icons/dice.svg';
import { updateColor } from '../store/colors';
import { genHex, genShades } from '../js/colorFuncs';

function ColorController({ color }) {
  const dispatch = useDispatch();
  const [hex, setHex] = useState(color.hex);
  const [enableShades, setEnableShades] = useState(false);
  const [shadeAmount, setShadeAmount] = useState(9);
  const [basePos, setBasePos] = useState(5);
  const [hue, setHue] = useState(0);
  const [sat, setSat] = useState(0);
  const [light, setLight] = useState(5);
  const [shades, setShades] = useState(false);

  const formId = {
    name: `${color.id}-name`,
    picker: `${color.id}-hexPicker`,
    hex: `${color.id}-hex`,
    enableShades: `${color.id}-enableShades`,
    amount: `${color.id}-shadeAmount`,
    position: `${color.id}-basePosition`,
    hue: `${color.id}-hue`,
    saturation: `${color.id}-saturation`,
    lightness: `${color.id}-lightness`,
  };

  const updateShades = (shades) => {
    setShades(shades);
    dispatch(updateColor(color.id, { shades }));
  };

  const handleNameChange = (e) => {
    dispatch(updateColor(color.id, { name: e.target.value }));
  };

  const handleHexChange = (e) => {
    setHex(e.toUpperCase());
    if (enableShades) {
      setShades(
        genShades(e.toUpperCase(), shadeAmount, basePos, hue, sat, light)
      );
    }
  };
  const handleRandomHex = () => {
    const randHex = genHex();
    setHex(randHex);
    if (enableShades) {
      setShades(genShades(randHex, shadeAmount, basePos, hue, sat, light));
    }
  };
  useDebouncy(() => dispatch(updateColor(color.id, { hex, shades })), 100, [
    hex,
  ]);

  const handleToggleShades = (e) => {
    setEnableShades(e.target.checked);
    updateShades(
      e.target.checked
        ? genShades(hex, shadeAmount, basePos, hue, sat, light)
        : false
    );
  };

  const handleAmountChange = (value) => {
    const amount = parseInt(value);
    const pos = isNaN(amount) ? 1 : amount === 1 ? 1 : Math.round(amount / 2);
    setShadeAmount(amount);
    setBasePos(pos);
    updateShades(
      genShades(hex, isNaN(amount) ? 1 : amount, pos, hue, sat, light)
    );
  };

  const handlePosChange = (value) => {
    const pos = parseInt(value);
    setBasePos(pos);
    updateShades(
      genShades(hex, shadeAmount, isNaN(pos) ? 1 : pos, hue, sat, light)
    );
  };

  const handleHueChange = (value) => {
    const h = parseInt(value);
    setHue(h);
    updateShades(
      genShades(hex, shadeAmount, basePos, isNaN(h) ? 0 : h, sat, light)
    );
  };

  const handleSatChange = (value) => {
    const s = parseInt(value);
    setSat(s);
    updateShades(
      genShades(hex, shadeAmount, basePos, hue, isNaN(s) ? 0 : s, light)
    );
  };

  const handleLightChange = (value) => {
    const l = parseInt(value);
    setLight(l);
    updateShades(
      genShades(hex, shadeAmount, basePos, hue, sat, isNaN(l) ? 0 : l)
    );
  };

  return (
    <>
      <div className="flex-auto overflow-y-scroll px-1">
        <div className="sticky top-0 z-50 bg-gradient-to-b from-white">
          <Swatch
            colors={shades ? shades : [{ hex }]}
            className="ring-8 ring-white"
            context
          />
        </div>
        <div className="form-control">
          <label htmlFor={formId.name}>Color Name:</label>
          <input
            type="text"
            id={formId.name}
            value={color.name}
            onChange={handleNameChange}
          />
        </div>
        <div className="form-control">
          <HexColorPicker
            id={formId.picker}
            className="color-picker"
            color={hex}
            onChange={handleHexChange}
          />
          <div className="flex gap-4">
            <HexColorInput
              id={formId.hex}
              type="text"
              color={hex}
              onChange={handleHexChange}
              prefixed={true}
            />
            <Button type="icon" className="mb-0" onClick={handleRandomHex}>
              <IconDice />
              <span className="sr-only">Random color</span>
            </Button>
          </div>
        </div>
        <InputToggle
          id={formId.enableShades}
          label="Enable shades:"
          checked={enableShades}
          onChange={handleToggleShades}
        />
        <fieldset
          disabled={!enableShades}
          className="overflow-y-hidden disabled:h-0"
        >
          <legend>Customize Shades:</legend>
          <InputNumber
            id={formId.amount}
            label="Number of Shades:"
            value={shadeAmount}
            min={1}
            max={9}
            onChange={handleAmountChange}
          />
          <InputNumber
            id={formId.position}
            label="Base Color Position:"
            value={basePos}
            min={1}
            max={shadeAmount}
            onChange={handlePosChange}
          />
          <fieldset>
            <legend>HSL Adjustment:</legend>
            <InputNumber
              id={formId.hue}
              label="Hue:"
              value={hue}
              min={-360}
              max={360}
              onChange={handleHueChange}
            />
            <InputNumber
              id={formId.saturation}
              label="Saturation:"
              value={sat}
              min={-100}
              max={100}
              onChange={handleSatChange}
            />
            <InputNumber
              id={formId.lightness}
              label="Lightness:"
              value={light}
              min={-100}
              max={100}
              onChange={handleLightChange}
            />
          </fieldset>
        </fieldset>
      </div>
    </>
  );
}

export default ColorController;
