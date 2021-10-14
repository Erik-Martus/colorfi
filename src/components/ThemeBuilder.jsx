import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ColorController from './ColorController';

function ThemeBuilder({ themeColors, onThemeColorsAdd, onThemeColorsChange }) {
  const colorItems = themeColors.map((color, index) => (
    <ColorController
      key={`color-${index}`}
      color={color}
      colorIndex={index}
      onThemeColorsChange={onThemeColorsChange}
    />
  ));
  return (
    <article>
      <h2>Colors</h2>
      <div className="flex gap-6 flex-wrap">{colorItems}</div>
      <button type="button" onClick={onThemeColorsAdd}>
        Add
      </button>
    </article>
  );
}

ThemeBuilder.propTypes = {
  activeTheme: PropTypes.string,
};

export default ThemeBuilder;
