import React, { PropTypes } from 'react';

const PageLoader = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="page-loader">
        <div className="spinner-wrapper">
          <div className="spinner" />
        </div>
        {children}
      </div>
    );
  }

  return <div>{children}</div>;
};

PageLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default PageLoader;
