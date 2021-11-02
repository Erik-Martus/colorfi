import { useSelector, useDispatch } from 'react-redux';
import Swatch from './Swatch';
import { getThemes, changeTheme } from '../store/colors';

function Themes() {
  const themes = useSelector(getThemes);
  const dispatch = useDispatch();
  function onChange(e) {
    dispatch(changeTheme(e.target.value));
  }
  const themeItems = Object.keys(themes).map((theme) => (
    <article key={themes[theme].name} className="w-96">
      <input
        type="radio"
        id={themes[theme].name}
        name="colorTheme"
        value={themes[theme].name}
        onChange={onChange}
      />
      <label htmlFor={themes[theme].name}>
        <Swatch colors={Object.values(themes[theme].colors)} />
        <strong>{themes[theme].name}</strong>
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

export default Themes;
