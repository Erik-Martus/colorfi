import { useSelector, useDispatch } from 'react-redux';
import Swatch from './Swatch';
import SwatchLabel from './SwatchLabel';
import { getThemes, changeTheme } from '../store/colors';

function Themes() {
  const themes = useSelector(getThemes);
  const dispatch = useDispatch();
  function onChange(e) {
    dispatch(changeTheme(e.target.value));
  }
  const themeItems = Object.keys(themes).map((theme) => (
    <article key={themes[theme].name} className="">
      <input
        type="radio"
        id={themes[theme].name}
        className="peer sr-only"
        name="colorTheme"
        value={themes[theme].name}
        onChange={onChange}
      />
      <label
        htmlFor={themes[theme].name}
        className="flex flex-col gap-2 p-2 rounded-xl shadow-none hover:bg-gray-100 hover:shadow-xl transition cursor-pointer peer-checked:bg-gray-200 peer-checked:shadow-xl"
      >
        <Swatch colors={Object.values(themes[theme].colors)} />
        <SwatchLabel label={themes[theme].name} />
      </label>
    </article>
  ));

  return (
    <article>
      <div className="flex flex-col gap-6">{themeItems}</div>
    </article>
  );
}

export default Themes;
