import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import * as actions from '../actions/postTypes';

import PreLoader from './PreLoader';
import Header from './Header';
import AlertContainer from './AlertContainer';


class App extends React.Component {
  componentWillMount() {
    this.props.fetchPostTypesIfNeeded(this.props.postTypes);
  }

  render() {
    return (
      <div>
        <Helmet title={`${this.props.pageTitle ? `${this.props.pageTitle} - ` : ''} Polar CMS`} />
        <PreLoader>
          <Header />
          {this.props.children}
        </PreLoader>
        <AlertContainer />
      </div>
    );
  }
}

App.propTypes = {
  postTypes: PropTypes.object,
  pageTitle: PropTypes.string,
  children: PropTypes.any,

  fetchPostTypesIfNeeded: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  postTypes: state.postTypes,
  pageTitle: state.page.pageTitle,
  // shouldProtectChanges: state.changeLossProtector.shouldProtect > 0,
});

const mapDispatchToProps = dispatch => ({
  fetchPostTypesIfNeeded: (postTypes) => {
    if (Object.keys(postTypes).length === 0) {
      dispatch(actions.fetchPostTypes());
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
