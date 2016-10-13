import {
  SETUP_POST_CREATE,
  SETUP_POST_EDIT,
  SETUP_POST_EDIT_SUCCESS,
  SETUP_POST_EDIT_ERROR,

  CREATE_POST,
  CREATE_POST_SUCCESS,
  CREATE_POST_ERROR,

  UPDATE_POST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_ERROR,
} from '../actions/postEditor';

const defaultPost = {
  slug: '',
  postType: '',
  title: '',
  content: [],
  meta: {},
};

const initialState = {
  mode: '',
  postType: '',
  post: defaultPost,
  isNewPost: true,
  loading: 0,
  invalidated: false,
};

function postEditor(state = initialState, action) {
  switch (action.type) {

    case SETUP_POST_CREATE:
      return {
        ...state,
        mode: 'create',
        postType: action.postType,
        post: defaultPost,
        isNewPost: true,
        loading: 0,
        invalidated: false,
      };

    case SETUP_POST_EDIT:
      return {
        ...state,
        mode: 'edit',
        postType: action.postType,
        post: defaultPost,
        isNewPost: false,
        loading: state.loading + 1,
        invalidated: false,
      };

    case SETUP_POST_EDIT_SUCCESS:
      return {
        ...state,
        post: action.post,
        loading: state.loading - 1,
      };

    case SETUP_POST_EDIT_ERROR:
      return {
        ...state,
        post: defaultPost,
        isNewPost: false,
        loading: 0,
        invalidated: true,
      };

    case CREATE_POST:
      return {
        ...state,
        loading: state.loading + 1,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: state.loading - 1,
      };

    case CREATE_POST_ERROR:
      return {
        ...state,
        loading: state.loading - 1,
      };

    case UPDATE_POST:
      return {
        ...state,
        loading: state.loading + 1,
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: state.loading - 1,
        post: action.post,
      };

    case UPDATE_POST_ERROR:
      return {
        ...state,
        loading: state.loading - 1,
        post: {
          ...action.post,
          _id: action.id,
        },
      };

    default:
      return state;
  }
}

export default postEditor;
