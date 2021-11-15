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
        ? 'primary'
        : i === 1
        ? 'secondary'
        : i === 2
        ? 'tertiary'
        : i === 3
        ? 'quaternary'
        : i === 4
        ? 'quinary'
        : `color${i++}`;
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
  shades[baseIndex] = { name: `${pos * 100}`, hex: hex, base: true };

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

  const hexArr = shades.map((shade) => shade.hex);
  const duplicateHex = hexArr.filter((item, index) => {
    return hexArr.indexOf(item) !== index;
  });

  let dupes = {};
  shades.forEach((shade, index) => {
    dupes[shade.hex] = dupes[shade.hex] || [];
    dupes[shade.hex].push(index);
  });
  for (hex in dupes) {
    if (dupes[hex].length > 1) {
      dupes[hex].forEach((item) => {
        shades[item].error = 'Duplicate shade';
      });
    }
  }

  return shades;
};
