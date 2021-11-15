import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import ColorController from './ColorController';
import Modal from './Modal';
import Swatch from './Swatch';
import SwatchLabel from './SwatchLabel';
import IconTrash from '../icons/trash.svg';
import IconEdit from '../icons/pencil.svg';
import { deleteColor } from '../store/colors';

function ColorItem({ color }) {
  const dispatch = useDispatch();
  const [hiddenState, setHiddenState] = useState(true);

  const handleEdit = () => setHiddenState(false);
  const handleDelete = (e) => dispatch(deleteColor(color.id));
  const handleHidden = () => setHiddenState((state) => !state);

  return (
    <div className="">
      <div className="flex flex-col gap-2 p-2">
        <div
          className="group relative cursor-pointer hover:scale-105 transition-transform"
          onClick={handleEdit}
        >
          <Swatch colors={color.shades ? color.shades : [color]} />
          <div className="grid place-content-center w-full h-24 absolute top-0 left-0 bg-gray-800 bg-opacity-50 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 text-white">
              <IconEdit />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <SwatchLabel label={color.name ? color.name : 'Color Name'} />
          <div className="flex gap-2">
            <Button type="icon" className="mb-0" onClick={handleEdit}>
              <IconEdit />
              <span className="sr-only">Edit color {color.name}</span>
            </Button>
            <Button type="icon" className="mb-0" onClick={handleDelete}>
              <IconTrash />
              <span className="sr-only">Delete color {color.name}</span>
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
