import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Swatch from './Swatch';
import colorThemes from '../data/themes.json';

function Themes({ onActiveThemeChange }) {
  const themeItems = colorThemes.map((theme) => (
    <article key={theme.name} className="w-96">
      <input
        type="radio"
        id={theme.name}
        name="colorTheme"
        value={theme.name}
        onChange={onActiveThemeChange}
      />
      <label htmlFor={theme.name}>
        <Swatch colors={theme.colors} />
        <strong>{theme.name}</strong>
      </label>
    </article>
  ));

  return (
    <article>
      <h2>Themes</h2>
      <div className="flex gap-6">{themeItems}</div>
    </article>
  );
}

Themes.propTypes = {
  activeTheme: PropTypes.string,
  onActiveThemeChange: PropTypes.func,
};

export default Themes;
