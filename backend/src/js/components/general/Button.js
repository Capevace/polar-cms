import React from 'react';
import { navigate } from './Navigate.js';


const Button = ({ onClick, path, children, className }) => {
  let clickHandler = () => {};

  if (onClick) {
    clickHandler = onClick;
  } else if (path) {
    clickHandler = () => {
      navigate(path);
    }
  }

  return (
    <button
      type="button"
      className={`btn ${className}`}
      onClick={clickHandler}
    >
      {children}
    </button>
  );
};

export default Button;
