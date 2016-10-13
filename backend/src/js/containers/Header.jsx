import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { buildWebUrl } from '../helpers';

import NavBar from '../components/general/NavBar';

const Header = ({ postTypes, pageTitle }) => {
  const items = [
    {
      title: 'Dashboard',
      type: 'default', // Not required
      path: '/',
    },
    {
      title: 'Posts',
      type: 'dropdown',
      items: Object.keys(postTypes).map((typeKey) => {
        const type = postTypes[typeKey];
        return {
          title: type.name,
          path: `posts/${type.slug}`,
        };
      }),
    },
    {
      title: 'Media',
      type: 'default',
      path: '/media',
    },
  ];

  return (
    <div
      className="header"
      style={{
        backgroundImage: `url(${buildWebUrl('/static/background_blur.jpg')})`,
      }}
    >
      <NavBar
        items={items}
        collapses
        large
        dark
        bgColor="bg-primary-faded"
        brand="Polar CMS"
      />
      <div className="container">
        <h1>{pageTitle}</h1>
      </div>
    </div>
  );
};

Header.propTypes = {
  postTypes: PropTypes.object,
  pageTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  postTypes: state.postTypes,
  pageTitle: state.page.pageTitle,
});

export default connect(mapStateToProps)(Header);
