import PropTypes from 'prop-types';

function Button({ className, onClick, children }) {
  return (
    <button
      role="button"
      className={`mb-3 px-6 py-3 font-semibold text-white rounded-xl bg-indigo-600 hover:bg-indigo-800 transition-colors`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
