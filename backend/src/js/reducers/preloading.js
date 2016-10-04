function preloading(state = 0, action) {
  switch (action.type) {
    case 'START_LOADING_REQUIRED':
      return state + 1;
    case 'FAIL_LOADING_REQUIRED':
        return state - 1000;
    case 'STOP_LOADING_REQUIRED':
      return state - 1;
    default:
      return state;
  }
}

export default preloading;
