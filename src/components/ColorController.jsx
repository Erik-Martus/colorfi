import React, { useState } from 'react';
import { css } from '@emotion/react';

function ColorController({ color, colorIndex, onThemeColorsChange }) {
  return (
    <article className="w-96">
      <div
        className="h-24"
        css={css`
          background-color: ${color.hex};
        `}
      ></div>
      <strong>{color.name}</strong>
      <div>
        <div className="form-control">
          <label htmlFor={`color-${colorIndex}`}>Color Name:</label>
          <input
            type="text"
            id={`color-${colorIndex}`}
            value={color.name}
            onChange={onThemeColorsChange}
          ></input>
        </div>
      </div>
    </article>
  );
}

export default ColorController;
