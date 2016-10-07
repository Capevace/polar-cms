const initialState = {
  postType: '',
  page: 0,
  posts: [],
  loading: false,
  invalidated: false,
  totalPostCount: 0,
};

function postList(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_POSTS':
      return {
        ...state,
        postType: action.postType,
        page: action.page,
        loading: true,
        invalidated: false,
      };

    case 'FETCH_POSTS_SUCCESS':
      return {
        ...state,
        posts: action.posts,
        loading: false,
      };

    case 'FETCH_POSTS_ERROR':
      return {
        ...state,
        posts: [],
        loading: 0,
        invalidated: true,
      };

    case 'INVALIDATE_POSTS':
      return {
        ...state,
        invalidated: true,
      };

    default:
      return state;
  }
}

export default postList;
