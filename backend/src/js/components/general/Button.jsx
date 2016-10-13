import React, { PropTypes } from 'react';
// import { navigate } from './Navigate.js';


const Button = ({ onClick, path, children, className, type = 'button', title }) => {
  let clickHandler = () => {};

  if (onClick) {
    clickHandler = onClick;
  } else if (path) {
    clickHandler = () => {
      // navigate(path);
    };
  }

  return (
    <button
      type={type}
      className={`btn ${className}`}
      onClick={clickHandler}
    >
      {children || title}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  path: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
};

export default Button;
