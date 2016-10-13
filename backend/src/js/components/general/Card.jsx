import React, { PropTypes } from 'react';

const Card = ({ children }) => (
  <div className="card">
    <div className="card-block">
      {children}
    </div>
  </div>
);

Card.propTypes = {
  children: PropTypes.any,
};

export default Card;
