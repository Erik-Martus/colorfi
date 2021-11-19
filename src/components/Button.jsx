import React from 'react';
import PropTypes from 'prop-types';

function Button({ type = '', className = '', onClick, disabled, children }) {
  return (
    <button
      role="button"
      className={`btn ${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Button;
