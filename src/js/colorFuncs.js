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
    colors[id] = {
      id: id,
      name: name,
      hex: genHex(),
      shades: false,
    };
  }
  return colors;
};

export const genShades = (hex, amount, pos, h, s, l) => {
  const baseIndex = pos - 1;
  const shades = Array(amount);
  shades[baseIndex] = { name: `${pos * 100}`, hex: hex };

  const baseShade = chroma(hex).hsl();

  const leftAmount = pos - 1;
  const rightAmount = amount - pos;

  for (let i = 1; i <= leftAmount; i++) {
    let hue = baseShade[0] === NaN ? 0 - h * i : baseShade[0] - h * i;
    let saturation = baseShade[1] - (s / 100) * i;
    let lightness = baseShade[2] - (l / 100) * i;
    let shade = chroma
      .hsl(
        hue < 0 ? hue + 360 : hue,
        saturation < 0 ? 0 : saturation,
        lightness < 0 ? 0 : lightness
      )
      .hex();
    shades[baseIndex - i] = {
      name: `${(pos - i) * 100}`,
      hex: shade.toUpperCase(),
    };
  }

  for (let i = 1; i <= rightAmount; i++) {
    let hue = baseShade[0] === NaN ? 0 + h * i : baseShade[0] + h * i;
    let saturation = baseShade[1] + (s / 100) * i;
    let lightness = baseShade[2] + (l / 100) * i;
    let shade = chroma
      .hsl(
        hue > 360 ? hue - 360 : hue,
        saturation > 1 ? 1 : saturation,
        lightness > 1 ? 1 : lightness
      )
      .hex();
    shades[baseIndex + i] = {
      name: `${(pos + i) * 100}`,
      hex: shade.toUpperCase(),
    };
  }

  return shades;
};
