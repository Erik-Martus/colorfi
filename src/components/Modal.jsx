import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../icons/close.svg';

function Modal({ name, hiddenState, handleHiddenState, children }) {
  return (
    <article
      id={`modal-${name}`}
      className={`flex items-center justify-center absolute top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-75${
        hiddenState ? ' hidden' : ''
      }`}
      hidden={hiddenState}
    >
      <div className="container bg-white pt-6 px-4 pb-8 rounded-xl border-2 border-gray-900">
        <button role="button" onClick={handleHiddenState}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </article>
  );
}

Modal.propTypes = {
  name: PropTypes.string.isRequired,
  hiddenState: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
