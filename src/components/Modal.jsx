import PropTypes from 'prop-types';
import CloseIcon from '../icons/close.svg';

function Modal({ name, hiddenState, handleHiddenState, children }) {
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
