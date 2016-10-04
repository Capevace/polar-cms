import React from 'react';
import NavBar from './NavBar';

const SubNavBar = (items) => {
  const Bar = ({ postType }) => {
    return (
      <div>
        <NavBar
          items={items}
          collapses={false}
        />
      </div>
    );
  };

  return Bar;
};

PostPageWrapper.propTypes = {
  postType: React.PostTypes.string.isRequired
};

export default PostPageWrapper;
