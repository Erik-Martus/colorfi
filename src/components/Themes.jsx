import React, { useState } from 'react';
import { css } from '@emotion/react';
import colorThemes from '../data/themes.json';

function Themes() {
  const [activeTheme, setActiveTheme] = useState('');
  const handleChange = (event) => setActiveTheme(event.target.value);
  const themeItems = colorThemes.map((theme) => (
    <article key={`theme-${theme.name}`}>
      <input
        type="radio"
        id={`theme-${theme.name}`}
        name="colorTheme"
        value={`theme-${theme.name}`}
        onChange={handleChange}
      />
      <label htmlFor={`theme-${theme.name}`}>
        <div className="flex w-96">
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
      <p>Active theme is {activeTheme}</p>
    </article>
  );
}

export default Themes;
