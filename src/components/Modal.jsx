import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import IconClose from '../icons/close.svg';

const noScroll = (hidden) => {
  if (hidden) {
    const scrollY = document.body.style.top;
    document.body.classList.remove('noScroll');
    document.body.style.position = 'relative';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  } else {
    document.body.classList.add('noScroll');
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.position = 'fixed';
  }
};

function Modal({ title, id, hidden, handleHidden, children, headerChildren }) {
  const modalId = id
    ? `modal-${id}`
    : `modal-${title.toLowerCase().replace(' ', '-')}`;

  useEffect(() => {
    noScroll(hidden);
  }, [hidden]);
  return (
    <article
      id={modalId}
      className={`flex items-center justify-center py-8 fixed top-0 left-0 z-40 w-screen h-screen bg-gray-800 bg-opacity-75 ${
        hidden ? ' hidden' : ''
      }`}
      hidden={hidden}
      onClick={handleHidden}
    >
      <div
        className="container lg:max-w-screen-md max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex flex-col p-4 bg-white rounded-xl shadow-xl ring-4 ring-white ring-inset z-50">
          <div className="flex-initial mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3>{title}</h3>
              <Button type="close" onClick={handleHidden}>
                <IconClose />
              </Button>
            </div>
            {headerChildren}
          </div>
          {children}
        </div>
      </div>
    </article>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  hidden: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired,
  headerChildren: PropTypes.element,
};

export default Modal;
