import chroma from 'chroma-js';

function calcShades(
  hex,
  shadeAmount,
  pos,
  hueAdjust,
  saturationAdjust,
  lightnessAdjust
) {
  const shadeIndex = pos - 1;
  const shades = Array(shadeAmount);
  shades[shadeIndex] = { id: `${pos * 100}`, hex: hex };

  const baseShade = chroma(hex).hsl();

  const leftAmount = pos - 1;
  const rightAmount = shadeAmount - pos;

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
    shades[shadeIndex - i] = { id: `${(pos - i) * 100}`, hex: shade };
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
    shades[shadeIndex + i] = { id: `${(pos + i) * 100}`, hex: shade };
  }

  console.log(shades);
  return shades;
}

export default calcShades;
