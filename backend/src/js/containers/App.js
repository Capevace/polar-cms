import React from 'react';
import { connect } from 'react-redux';
import { fetchPostTypes } from '../actions/postTypes';

import Helmet from 'react-helmet';
import PreLoader from './PreLoader';
import Header from './Header';


class App extends React.Component {
  componentWillMount() {
    this.props.fetchPostTypesIfNeeded(this.props.postTypes);
  }

  render() {
    return (
      <div>
        <Helmet title={(this.props.pageTitle ? this.props.pageTitle + ' - ' : '') + ' Polar CMS'} />
        <PreLoader>
          <Header />
          {this.props.children}
        </PreLoader>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  postTypes: state.postTypes,
  pageTitle: state.page.pageTitle,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPostTypesIfNeeded: (postTypes) => {
    if (Object.keys(postTypes).length === 0) {
      dispatch(fetchPostTypes());
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
