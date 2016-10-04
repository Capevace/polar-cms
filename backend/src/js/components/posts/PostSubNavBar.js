import React from 'react';
import NavBar from '../general/NavBar';

// TODO: Better active algorithm

const PostSubNavBar = ({ postType, active }) => {
  const items = [
    {
      title: 'List',
      path: 'posts/' + postType,
      name: 'list'
    },
    {
      title: 'Create',
      path: 'posts/' + postType + '/create',
      name: 'create'
    },
    {
      title: 'Settings',
      path: 'posts/' + postType + '/settings',
      name: 'settings'
    }
  ].map(item => {
    if (item.name === active) {
      return {
        ...item,
        active: true
      };
    }

    return {
      ...item,
      active: false
    };
  });

  return (
    <div>
      <NavBar
        items={items}
        collapses={false}
      />
    </div>
  );
};

PostSubNavBar.propTypes = {
  postType: React.PropTypes.string.isRequired
};

export default PostSubNavBar;
