import React, { PropTypes } from 'react';
import SubNavBar from '../general/SubNavBar';

// TODO: Better active algorithm

const PostSubNavBar = ({ postType, active }) => {
  const items = [
    {
      title: 'List',
      path: `posts/${postType}`,
      name: 'list',
    },
    {
      title: 'Create',
      path: `posts/${postType}/create`,
      name: 'create',
    },
    {
      title: 'Settings',
      path: `posts/${postType}/settings`,
      name: 'settings',
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

PostSubNavBar.propTypes = {
  postType: PropTypes.string.isRequired,
  active: PropTypes.string,
};

export default PostSubNavBar;
