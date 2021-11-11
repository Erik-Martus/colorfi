import React, { useState } from 'react';
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

  const handleEdit = () => setHiddenState(false);
  const handleDelete = (e) => dispatch(deleteColor(color.id));
  const handleHidden = () => setHiddenState((state) => !state);

  return (
    <div className="w-96">
      <div className="flex flex-col gap-2">
        <Swatch colors={color.shades ? color.shades : [color]} />
        <div className="flex items-center justify-between">
          <SwatchLabel label={color.name ? color.name : 'Color Name'} />
          <div className="flex gap-2">
            <Button type="icon" className="mb-0" onClick={handleEdit}>
              <EditIcon />
            </Button>
            <Button type="icon" className="mb-0" onClick={handleDelete}>
              <TrashIcon />
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Color Editor"
        id={`controller-${color.id}`}
        hidden={hiddenState}
        handleHidden={handleHidden}
      >
        <ColorController color={color} />
      </Modal>
    </div>
  );
}

export default ColorItem;
