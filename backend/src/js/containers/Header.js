import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/general/NavBar';

const Header = ({ postTypes, children, page }) => {
  const items = [
    {
      title: 'Dashboard',
      type: 'default', // Not required
      path: '/'
    },
    {
      title: 'Posts',
      type: 'dropdown',
      items: Object.keys(postTypes).map(typeKey => {
        const type = postTypes[typeKey];
        return {
          title: type.name,
          path: 'posts/' + type.slug
        };
      })
    }
  ];

  return (
    <div className="header">
      <NavBar
        items={items}
        collapses={true}
        large={true}
        dark={true}
        bgColor="bg-primary-faded"
        brand="Polar CMS"
      />
      <div className="container">
        <h1>{page.pageTitle}</h1>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  return {
    postTypes: state.postTypes,
    page: state.page
  };
};

export default connect(mapStateToProps)(Header);
