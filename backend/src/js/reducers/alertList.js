function alertList(state = [], action) {
  switch (action.type) {
    case 'ADD_NEW_ALERT':
      return [
        ...state,
        {
          type: action.alertType,
          message: action.message,
          id: action.id,
          timeoutId: action.timeoutId,
        },
      ];
    case 'DISMISS_ALERT':
      return state.filter((alert) => {
        if (alert.id !== action.idToRemove) {
          clearTimeout(alert.timeoutId);
          return true;
        }

        return false;
      });
    default:
      return state;
  }
}

export default alertList;
