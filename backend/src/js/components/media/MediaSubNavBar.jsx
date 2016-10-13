import React, { PropTypes } from 'react';
import SubNavBar from '../general/SubNavBar';

const MediaSubNavBar = ({ active }) => {
  const items = [
    {
      title: 'List',
      path: 'media/',
      name: 'list',
    },
    {
      title: 'Upload',
      path: 'media/upload',
      name: 'upload',
    },
  ];

  return (
    <div>
      <SubNavBar
        items={items}
        active={active}
        collapses={false}
      />
    </div>
  );
};

MediaSubNavBar.propTypes = {
  active: PropTypes.string,
};

export default MediaSubNavBar;
