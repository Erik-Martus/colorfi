import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ColorController from './ColorController';

function ThemeBuilder({
  themeColors,
  onThemeColorAdd,
  onThemeColorRemove,
  onThemeColorChange,
}) {
  const colorItems = themeColors.map((color) => (
    <ColorController
      key={color.id}
      color={color}
      onThemeColorChange={onThemeColorChange}
      onThemeColorRemove={onThemeColorRemove}
    />
  ));
  return (
    <article>
      <h2>Colors</h2>
      <div className="flex gap-6 flex-wrap">
        {colorItems}
        <button type="button" onClick={onThemeColorAdd}>
          Add
        </button>
      </div>
    </article>
  );
}

ThemeBuilder.propTypes = {
  activeTheme: PropTypes.string,
};

export default ThemeBuilder;
