import React, { PropTypes } from 'react';
import NavBar from './NavBar';

const SubNavBar = ({ items = [], collapses = false, active }) => {
  const parsedItems = items.map((item) => {
    if (item.name === active) {
      return {
        ...item,
        active: true,
      };
    }

    return {
      ...item,
      active: false,
    };
  });

  return (
    <div>
      <NavBar
        items={parsedItems}
        collapses={collapses}
      />
    </div>
  );
};

SubNavBar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  collapses: PropTypes.bool,
  active: PropTypes.string,
};

export default SubNavBar;
