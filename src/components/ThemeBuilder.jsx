import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ColorItem from './ColorItem';
import { getColors, addColor } from '../store/colors';

function ThemeBuilder() {
  const colors = useSelector(getColors);
  const dispatch = useDispatch();
  function onAdd() {
    dispatch(addColor());
  }

  const colorItems = Object.keys(colors).map((color) => (
    <ColorItem key={colors[color].id} color={colors[color]} />
  ));
  return (
    <article id="colors" className="pt-3">
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
