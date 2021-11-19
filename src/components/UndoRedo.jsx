import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import Button from './Button.jsx';
import IconRedo from '../icons/redo.svg';
import IconUndo from '../icons/undo.svg';
import { getPast, getFuture } from '../store/colors';

const UndoRedo = () => {
  const dispatch = useDispatch();
  const canUndo = useSelector(getPast).length > 0;
  const canRedo = useSelector(getFuture).length > 0;
  const onUndo = () => {
    dispatch(ActionCreators.undo());
  };
  const onRedo = () => {
    dispatch(ActionCreators.redo());
  };
  return (
    <>
      <Button type="icon" onClick={onUndo} disabled={!canUndo}>
        <IconUndo />
        <span className="sr-only">Undo</span>
      </Button>
      <Button type="icon" onClick={onRedo} disabled={!canRedo}>
        <IconRedo />
        <span className="sr-only">Redo</span>
      </Button>
    </>
  );
};

export default UndoRedo;
