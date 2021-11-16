import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import UndoRedo from './UndoRedo';
import ColorItem from './ColorItem';
import IconDice from '../icons/dice.svg';
import IconPlusCircle from '../icons/plus-circle.svg';
import { getColors, addColor, randomizeColors } from '../store/colors';

function ThemeBuilder() {
  const colors = useSelector(getColors);
  console.log(Object.values(colors).map((color) => color.hex));
  const dispatch = useDispatch();
  const onAdd = () => {
    dispatch(addColor());
  };
  const onRandomize = () => {
    dispatch(randomizeColors());
  };

  const colorItems = Object.keys(colors).map((color) => (
    <ColorItem key={colors[color].id} color={colors[color]} />
  ));
  return (
    <section id="colors" className="mb-8 pt-3">
      <h2>Colors</h2>
      <div className="flex justify-end gap-2">
        <UndoRedo />
        <Button type="icon" onClick={onRandomize}>
          <IconDice />
        </Button>
      </div>
      <div className="grid grid-cols-auto-fill">
        {colorItems}
        <div className="p-2">
          <Button type="icon" className="!w-full h-24" onClick={onAdd}>
            <IconPlusCircle />
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
