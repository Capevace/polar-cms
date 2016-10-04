// Actual Reducer implementation

function postTypes(state = {}, action) {
  switch (action.type) {
    case 'SET_POST_TYPES':
      return {
        ...state,
        ...action.postTypes
      };
    default:
      return state;
  }
}

export default postTypes;
