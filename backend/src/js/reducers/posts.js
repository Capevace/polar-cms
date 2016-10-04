// Actual Reducer implementation
import { START_FETCHING_POSTS, STOP_FETCHING_POSTS, CREATE_POST, CREATE_POST_SUCCESS } from '../actions/posts';

// INVALIDATE_POST_LIST (invalidates the current post list)
// FETCH_ALL_POSTS {postType}(with current type)
//  FETCH_ALL_POSTS_SUCCESS
//  FETCH_ALL_POSTS_FAILURE

const mock = {
  loading: 0,
  currentPostType: '',
  currentPostsList: [

  ]
}

function posts(state = { loading: 0, list: {} }, action){
  switch (action.type) {
    case START_FETCHING_POSTS:
      return {
        ...state,
        loading: state.loading + 1,
      };
    case STOP_FETCHING_POSTS:
      return {
        ...state,
        loading: state.loading - 1,
        list: {
          ...state.list,
          [action.postType]: action.posts
        }
      };

    case CREATE_POST:
      return {
        ...state,
        loading: state.loading + 1
      };
    case CREATE_POST_SUCCESS:
      // TODO: invalidate old posts
      return {
        ...state,
        loading: state.loading - 1
      };
    default:
      return state;
  }
}

export default posts;
