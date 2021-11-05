import PropTypes from 'prop-types';
import Button from './Button';
import CloseIcon from '../icons/close.svg';

function Modal({ title, id, hidden, handleHidden, children, headerChildren }) {
  return (
    <article
      id={id ? `modal-${id}` : `modal-${title.toLowerCase().replace(' ', '-')}`}
      className={`flex items-center justify-center px-2 py-8 fixed top-0 left-0 z-40 w-screen h-screen bg-gray-800 bg-opacity-75 ${
        hidden ? ' hidden' : ''
      }`}
      hidden={hidden}
      onClick={handleHidden}
    >
      <div
        className="container relative flex flex-col w-full max-h-full p-4 bg-white rounded-xl shadow-xl ring-4 ring-white ring-inset z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-initial mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3>{title}</h3>
            <Button type="close" onClick={handleHidden}>
              <CloseIcon />
            </Button>
          </div>
          {headerChildren}
        </div>
        {children}
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
