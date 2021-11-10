import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import ColorController from './ColorController';
import Modal from './Modal';
import Swatch from './Swatch';
import SwatchLabel from './SwatchLabel';
import TrashIcon from '../icons/trash.svg';
import EditIcon from '../icons/pencil.svg';
import { deleteColor } from '../store/colors';

function ColorItem({ color }) {
  const dispatch = useDispatch();
  const [hiddenState, setHiddenState] = useState(true);

  return (
    <div className="w-96">
      <div className="flex flex-col gap-2">
        <Swatch
          colors={
            color.shades.enabled && color.shades.amount !== ''
              ? color.shades.colors
              : [color]
          }
        />
        <div className="flex items-center justify-between">
          <SwatchLabel label={color.name ? color.name : 'Color Name'} />
          <div className="flex gap-2">
            <Button
              type="icon"
              className="mb-0"
              onClick={() => setHiddenState(false)}
            >
              <EditIcon />
            </Button>
            <Button
              type="icon"
              className="mb-0"
              onClick={(e) => dispatch(deleteColor(color.id))}
            >
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Color Editor"
        id={`controller-${color.id}`}
        hidden={hiddenState}
        handleHidden={() => setHiddenState((state) => !state)}
        headerChildren={
          <Swatch
            colors={
              color.shades.enabled && color.shades.amount !== ''
                ? color.shades.colors
                : [color]
            }
          />
        }
      >
        <ColorController color={color} />
      </Modal>
    </div>
  );
}

export default ColorItem;
