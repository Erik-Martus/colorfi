import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ColorController from './ColorController';
import { getColors, addColor } from '../store/colors';

function ThemeBuilder({ onThemeColorChange }) {
  const colors = useSelector(getColors);
  const dispatch = useDispatch();
  function onAdd() {
    dispatch(addColor());
  }

  const colorItems = Object.keys(colors).map((color) => (
    <ColorController
      key={colors[color].id}
      color={colors[color]}
      onThemeColorChange={onThemeColorChange}
    />
  ));
  return (
    <article>
      <h2>Colors</h2>
      <div className="flex gap-6 flex-wrap">
        {colorItems}
        <button type="button" onClick={onAdd}>
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
