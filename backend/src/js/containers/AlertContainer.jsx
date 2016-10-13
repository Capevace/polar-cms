/* eslint-disable react/no-unused-prop-types */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as actions from '../actions/alertList';

import AlertMessage from '../components/general/AlertMessage';


const AlertContainer = ({ alerts = [], dismissAlert }) => (
  <div className="alert-container">
    <ReactCSSTransitionGroup
      transitionName="react-fade"
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      {alerts.map(alert =>
        <AlertMessage
          type={alert.type}
          message={alert.message}
          onDismiss={dismissAlert(alert.id)}
          key={alert.id}
        />
      )}
    </ReactCSSTransitionGroup>
  </div>
);

AlertContainer.propTypes = {
  alerts: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    message: PropTypes.string,
  })).isRequired,
  dismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alertList,
});

const mapDispatchToProps = dispatch => ({
  dismissAlert: idToRemove =>
    () => {
      dispatch(actions.dismissAlert(idToRemove));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);
