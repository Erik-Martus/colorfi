import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

function ThemeBuilder({ themeColors, onThemeColorsChange }) {
  console.log(themeColors);
  const colorItems = themeColors.map((color) => (
    <article key={color.name} className="w-96">
      <div
        className="h-24"
        css={css`
          background-color: ${color.hex};
        `}
      ></div>
      <strong>{color.name}</strong>
    </article>
  ));
  return (
    <article>
      <h2>Colors</h2>
      <div className="flex gap-6">{colorItems}</div>
      <button type="button" onClick={onThemeColorsChange}>
        Add
      </button>
    </article>
  );
}

ThemeBuilder.propTypes = {
  activeTheme: PropTypes.string,
};

export default ThemeBuilder;
