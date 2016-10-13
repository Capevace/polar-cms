import store from '../reducers/store';

let alertIdCounter = 0;

export function dismissAlert(idToRemove) {
  return {
    type: 'DISMISS_ALERT',
    idToRemove,
  };
}

export function newAlert(alertType, message) {
  alertIdCounter += 1;
  const id = alertIdCounter;

  const timeout = setTimeout(() => {
    store.dispatch(dismissAlert(id));
  }, 3000);

  return {
    type: 'ADD_NEW_ALERT',
    alertType,
    message,
    id,
    timeoutId: timeout,
  };
}

export function dispatchNewAlert(alert) {
  store.dispatch(newAlert(alert.alertType, alert.message));
}
