import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import colorThemes from '../data/themes.json';

function Themes({ onActiveThemeChange }) {
  const themeItems = colorThemes.map((theme) => (
    <article key={`theme-${theme.name}`} className="w-96">
      <input
        type="radio"
        id={theme.name}
        name="colorTheme"
        value={theme.name}
        onChange={onActiveThemeChange}
      />
      <label htmlFor={theme.name}>
        <div className="flex">
          {theme.colors.map((color) => {
            return (
              <span
                key={color.name}
                className="flex-grow h-24"
                css={css`
                  background-color: ${color.hex};
                `}
              ></span>
            );
          })}
        </div>
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
