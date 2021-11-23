import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Swatch from './Swatch.jsx';
import SwatchLabel from './SwatchLabel.jsx';
import { changeTheme } from '../store/colors';
import themeLibrary from '../data/themes.json';

function Themes({ onChange }) {
  const themes = themeLibrary;
  const dispatch = useDispatch();
  function onThemeChange(e) {
    const colors = themes[e.target.value].colors;
    dispatch(changeTheme(colors));
    onChange();
  }
  const themeItems = Object.keys(themes).map((theme) => (
    <article key={themes[theme].name}>
      <input
        type="radio"
        id={themes[theme].name}
        className="peer sr-only"
        name="colorTheme"
        value={themes[theme].name}
        onChange={onThemeChange}
      />
      <label
        htmlFor={themes[theme].name}
        className="flex flex-col gap-2 p-2 bg-transparent rounded-xl shadow-none hover:bg-gray-100 hover:shadow-xl hover:scale-105 transition cursor-pointer peer-checked:bg-gray-200 peer-checked:shadow-xl"
      >
        <Swatch colors={Object.values(themes[theme].colors)} />
        <SwatchLabel label={themes[theme].name} />
      </label>
    </article>
  ));

  return (
    <article className="flex-auto overflow-y-scroll overflow-x-visible">
      <div className="grid grid-cols-auto-fill px-2">{themeItems}</div>
    </article>
  );
}

Themes.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Themes;
