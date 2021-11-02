import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '../icons/close.svg';

function Modal({ name, hiddenState, handleHiddenState, children }) {
  const [scrollPos, setScrollPos] = useState(0);
  useEffect(() => {
    setScrollPos(document.body.style.top);
  }, [hiddenState]);

  if (hiddenState) {
    const scrollY = scrollPos;
    document.body.classList.remove('noScroll');
    document.body.style.position = 'relative';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  } else if (!hiddenState) {
    document.body.classList.add('noScroll');
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  }
  return (
    <article
      id={`modal-${name}`}
      className={`container flex items-center justify-center py-8 absolute top-0 left-0 z-50 w-screen h-screen bg-gray-800 bg-opacity-75 ${
        hiddenState ? ' hidden' : ''
      }`}
      hidden={hiddenState}
    >
      <div className="relative w-full max-h-full p-4 bg-white rounded-xl shadow-xl">
        <button
          role="button"
          className="w-12 absolute top-4 right-4 text-gray-900 hover:text-gray-700 transition-colors"
          onClick={handleHiddenState}
        >
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
