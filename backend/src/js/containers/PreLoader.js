import React from 'react';
import { connect } from 'react-redux';

const PreLoader = ({ loading, children }) => {
  if (loading) {
    return (
      <div className='global-loader'>
        Loading...
      </div>
    );
  }

  return (
    <div>{children}</div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.preloading >= 1
});

export default connect(mapStateToProps)(PreLoader);
