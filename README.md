# colorfi

[![Netlify Status](https://api.netlify.com/api/v1/badges/4fd51bfe-c5ab-43e5-ac34-3b5f173ebcee/deploy-status)](https://app.netlify.com/sites/colorfi/deploys)

## About

Colorfi is a color theme generation tool that outputs colors directly to variables for use in code.

The live version of this project may be accessed at [colorfi.emartus.dev](https://colorfi.emartus.dev).

## Use Locally

Clone repository

```sh
git clone https://github.com/Erik-Martus/colorfi.git
```

Install dependencies

```sh
npm install
```

Start application

```sh
npm start
```

---

## Usage

1. Choose from the available preselected themes by clicking on the "Choose a Theme" button at the top of the page, or customize the color swatches below.
2. To edit a color click on the color swatch to open its editor panel.
   1. Use the color picker or hex input to select a desired color. Alternatively clicking the die icon will randomly select a color.
   2. Use the "Enable Shades" toggle to enable the shade customization options.
      1. "Number of Shades" - Configurable between 1 and 9 shades.
      2. "Base Color Position" - Set the position of the base color relative to its generated shades. The base color is indicated by the white dot in the shade swatches.
      3. "HSL Adjustment" - Configure how the shades are computed using the HSL color space.
3. Add additional colors to the theme using the plus button at the end of the color swatches.
4. Remove any color by clicking the trash icon located beneath its swatch.
5. To randomize all colors click the die icon located above the color swatches.
   1. To prevent a specific color from being randomized by this function, toggle the lock beneath that particular swatch.
6. Select the desired output language for the color variables from either `CSS`, `SCSS`, `SASS`, `LESS`, or `Tailwind` and select the preferred way to format the text case of the variables in either snake (`primary-color`) or camel (`primaryColor`).
