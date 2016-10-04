import React, { Children, Component, PropTypes } from 'react';
import withSideEffect from 'react-side-effect';
import store from '../../reducers/store';

class PageTitle extends Component {
  render() {
    if (this.props.children) {
      return Children.only(this.props.children);
    } else {
      return null;
    }
  }
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired
};

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

function handleStateChangeOnClient(title) {
  store.dispatch({
    type: 'CHANGE_PAGE_TITLE',
    pageTitle: title
  });
}

export default withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(PageTitle);
