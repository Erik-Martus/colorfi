import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import ColorItem from './ColorItem';
import PlusCircle from '../icons/plus-circle.svg';
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
    <section id="colors" className="mb-8 pt-3">
      <h2>Colors</h2>
      <div className="grid grid-cols-auto-fill">
        {colorItems}
        <div className="p-2">
          <Button type="icon" className="!w-full h-24" onClick={onAdd}>
            <PlusCircle />
            <span className="sr-only">Add color</span>
          </Button>
        </div>
      </div>
    </section>
  );
}

ThemeBuilder.propTypes = {
  activeTheme: PropTypes.string,
};

export default ThemeBuilder;
