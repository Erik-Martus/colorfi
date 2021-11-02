import chroma from 'chroma-js';

export const genColorId = () =>
  `color-${Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)}`;

export const genHex = () => chroma.random().hex().toUpperCase();

export const initColors = (size) => {
  let colors = Object();
  for (let i = 0; i < size; i++) {
    const id = genColorId();
    const name =
      i === 0
        ? 'Primary'
        : i === 1
        ? 'Secondary'
        : i === 2
        ? 'Tertiary'
        : i === 3
        ? 'Quaternary'
        : i === 4
        ? 'Quinary'
        : `Color${i++}`;
    const hex = genHex();
    const amount = 9;
    const baseIndex = 4;
    const hue = 0;
    const sat = 0;
    const light = 5;
    const shades = calcShades({
      hex: hex,
      shades: {
        amount: amount,
        baseIndex: baseIndex,
        hue: hue,
        saturation: sat,
        lightness: light,
      },
    });
    colors[id] = {
      id: id,
      name: name,
      hex: hex,
      shades: {
        enabled: false,
        amount: amount,
        baseIndex: baseIndex,
        hue: hue,
        saturation: sat,
        lightness: light,
        colors: shades,
      },
    };
  }
  return colors;
};

export const calcShades = (color) => {
  const pos = color.shades.baseIndex + 1;
  const shades = Array(color.shades.amount);
  shades[color.shades.baseIndex] = { name: `${pos * 100}`, hex: color.hex };

  const baseShade = chroma(color.hex).hsl();

  const leftAmount = pos - 1;
  const rightAmount = color.shades.amount - pos;

  const hueAdjust = color.shades.hue;
  const saturationAdjust = color.shades.saturation;
  const lightnessAdjust = color.shades.lightness;

  for (let i = 1; i <= leftAmount; i++) {
    let hue =
      baseShade[0] === NaN ? 0 - hueAdjust * i : baseShade[0] - hueAdjust * i;
    let saturation = baseShade[1] - (saturationAdjust / 100) * i;
    let lightness = baseShade[2] - (lightnessAdjust / 100) * i;
    let shade = chroma
      .hsl(
        hue < 0 ? hue + 360 : hue,
        saturation < 0 ? 0 : saturation,
        lightness < 0 ? 0 : lightness
      )
      .hex();
    shades[color.shades.baseIndex - i] = {
      name: `${(pos - i) * 100}`,
      hex: shade.toUpperCase(),
    };
  }

  for (let i = 1; i <= rightAmount; i++) {
    let hue =
      baseShade[0] === NaN ? 0 + hueAdjust * i : baseShade[0] + hueAdjust * i;
    let saturation = baseShade[1] + (saturationAdjust / 100) * i;
    let lightness = baseShade[2] + (lightnessAdjust / 100) * i;
    let shade = chroma
      .hsl(
        hue > 360 ? hue - 360 : hue,
        saturation > 1 ? 1 : saturation,
        lightness > 1 ? 1 : lightness
      )
      .hex();
    shades[color.shades.baseIndex + i] = {
      name: `${(pos + i) * 100}`,
      hex: shade.toUpperCase(),
    };
  }

  return shades;
};

export default calcShades;
