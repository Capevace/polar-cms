const initialState = {
  typeFilter: '',
  loading: 0,
  items: [],
};

// const defaultItem = {
//   mediaData: 'server-data-here', // can be null (when uploaded for example)
//   uploading: false,
// }

function mediaList(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_MEDIA':
      return {
        ...state,
        loading: state.loading + 1,
      };

    case 'FETCH_MEDIA_SUCCESS':
      return {
        ...state,
        items: action.items.map(item => ({
          mediaData: item,
          uploading: false,
        })),
        loading: state.loading - 1,
      };

    case 'FETCH_MEDIA_ERROR':
      return {
        ...state,
        items: [],
        loading: state.loading - 1,
      };

    case 'SET_FILTER':
      return {
        ...state,
        typeFilter: action.typeFilter,
      };
    default:
      return state;
  }
}

export default mediaList;
