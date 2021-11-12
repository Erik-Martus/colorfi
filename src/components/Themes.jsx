import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Swatch from './Swatch';
import SwatchLabel from './SwatchLabel';
import { getThemes, changeTheme } from '../store/colors';

function Themes({ onChange }) {
  const themes = useSelector(getThemes);
  const dispatch = useDispatch();
  function onThemeChange(e) {
    dispatch(changeTheme(e.target.value));
    onChange();
  }
  const themeItems = Object.keys(themes).map((theme) => (
    <article key={themes[theme].name} className="">
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
    <article>
      <div className="grid grid-cols-auto-fit">{themeItems}</div>
    </article>
  );
}

Themes.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Themes;
