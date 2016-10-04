import React from 'react';

export const Row = ({ children }) => {
  return (
    <div>
      <div className='row m-y-1'>{children}</div>
    </div>
  );
};

export const Col =  ({ children, width}) => {
  return (
    <div className={'col-' + width}>{children}</div>
  );
};
