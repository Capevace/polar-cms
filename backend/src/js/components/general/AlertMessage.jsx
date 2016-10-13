import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Button from './Button';

const AlertMessage = ({ message, type = 'info', onDismiss, className }) => (
  // <ReactCSSTransitionGroup
  //   transitionName="react-fade"
  //   transitionAppear
  //   transitionEnterTimeout={500}
  //   transitionLeaveTimeout={300}
  //   transitionAppearTimeout={500}
  // >
    <div className={`alert alert-${type} alert-message alert-dismissible ${className}`} role="alert" key={message}>
      <Button className="close" onClick={onDismiss}>
        <span aria-hidden="true">&times;</span>
      </Button>

      {message.split('\n').map((part, index) => <div key={index}>{part}</div>)}
    </div>
  // </ReactCSSTransitionGroup>
);

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onDismiss: PropTypes.func.isRequired,
};

export default AlertMessage;
