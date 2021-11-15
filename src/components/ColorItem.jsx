import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from './Button';
import ColorController from './ColorController';
import Modal from './Modal';
import Swatch from './Swatch';
import SwatchLabel from './SwatchLabel';
import IconEdit from '../icons/pencil.svg';
import IconTrash from '../icons/trash.svg';
import IconLocked from '../icons/padlock.svg';
import IconUnlocked from '../icons/padlock-open.svg';
import { deleteColor, updateColor } from '../store/colors';

function ColorItem({ color }) {
  const dispatch = useDispatch();
  const [hiddenState, setHiddenState] = useState(true);
  const [locked, setLocked] = useState(false);

  const handleEdit = () => setHiddenState(false);
  const handleDelete = (e) => dispatch(deleteColor(color.id));
  const handleHidden = () => setHiddenState((state) => !state);
  const handleLock = (e) => {
    setLocked(e.target.checked);
    dispatch(updateColor(color.id, { locked: e.target.checked }));
  };

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
            <div className="form-control">
              <label
                htmlFor={`lock-${color.id}`}
                className={`btn icon mb-0 ${
                  locked ? 'bg-gray-800 hover:bg-gray-700 text-white' : ''
                }`}
              >
                <span className="sr-only">
                  {locked ? 'Unlock color' : 'Lock color'}
                </span>
                <span className="relative">
                  <input
                    id={`lock-${color.id}`}
                    type="checkbox"
                    checked={locked}
                    onChange={handleLock}
                    className="sr-only peer"
                  />
                  {locked ? <IconLocked /> : <IconUnlocked />}
                </span>
              </label>
            </div>
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
