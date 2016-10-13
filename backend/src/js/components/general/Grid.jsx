import React, { PropTypes } from 'react';

export const Row = ({ children }) => (
  <div>
    <div className="row m-y-1">{children}</div>
  </div>
);

Row.propTypes = {
  children: PropTypes.any,
};

export const Col = ({ children, width, className }) => {
  let columnWidthString;

  if (Array.isArray(width)) {
    columnWidthString = width.reduce((columnWidth, currentWidth) => `${columnWidth} col-${currentWidth}`, '');
  } else {
    columnWidthString = `col-${width}`;
  }

  return (
    <div className={`${columnWidthString} ${className}`}>
      {children}
    </div>
  );
};

Col.propTypes = {
  children: PropTypes.any,
  width: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]).isRequired,
  className: PropTypes.string,
};
