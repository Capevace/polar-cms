import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import PageLoader from '../components/general/PageLoader';

const PreLoader = ({ loading, children }) => {
  if (loading) {
    return (
      <div className="global-loader">
        <PageLoader loading />
      </div>
    );
  }

  return (
    <div>{children}</div>
  );
};

PreLoader.propTypes = {
  loading: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

const mapStateToProps = state => ({
  loading: state.preloading >= 1,
});

export default connect(mapStateToProps)(PreLoader);
