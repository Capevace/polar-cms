function changeLossProtector(state = { shouldProtect: 0 }, action) {
  switch (action.type) {
    case 'PROTECT_CHANGES':
      return {
        shouldProtect: state.shouldProtect + 1,
      };

    case 'UNPROTECT_CHANGES':
      return {
        shouldProtect: state.shouldProtect - 1,
      };
    default:
      return state;
  }
}

export default changeLossProtector;
