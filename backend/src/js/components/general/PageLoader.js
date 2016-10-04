import React from 'react';

const PageLoader = ({ loading, children }) => {
  if (!!loading) {
    return (
      <div className="page-loader">
        <div className="spinner-wrapper">
          <div className="spinner"></div>
        </div>
        {children}
      </div>
    )
  }

  return <div>{children}</div>;
};

export default PageLoader;
