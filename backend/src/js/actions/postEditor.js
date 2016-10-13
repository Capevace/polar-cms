import axios from 'axios';

import { buildApiUrl, parseError, logError } from '../helpers';
import { invalidatePosts } from './postList';
import { dispatchNewAlert } from './alertList';

export const SETUP_POST_CREATE = 'SETUP_POST_CREATE';

export function prepareCreateIfNeeded(postTypeSlug, mode, force) {
  return (dispatch, getState) => {
    const editorState = getState().postEditor;
    if (
      editorState.postType === postTypeSlug
      && editorState.mode === mode
      && !force) {
      return;
    }

    dispatch({
      type: SETUP_POST_CREATE,
      postType: postTypeSlug,
    });
  };
}


export const SETUP_POST_EDIT = 'SETUP_POST_EDIT';
export const SETUP_POST_EDIT_SUCCESS = 'SETUP_POST_EDIT_SUCCESS';
export const SETUP_POST_EDIT_ERROR = 'SETUP_POST_EDIT_ERROR';

export function prepareEditIfNeeded(postTypeSlug, postId, mode, force) {
  return (dispatch, getState) => {
    const editorState = getState().postEditor;

    if (
      (editorState.postType === postTypeSlug
      && editorState.post._id === postId
      && editorState.mode === mode
      && !editorState.invalidated
      && !force)
      || editorState.loading
    ) {
      return;
    }

    dispatch({
      type: SETUP_POST_EDIT,
      postType: postTypeSlug,
    });

    axios
      .get(buildApiUrl(`posts/${postTypeSlug}/${postId}`))
      .then((response) => {
        dispatch({
          type: SETUP_POST_EDIT_SUCCESS,
          post: response.data.post,
        });
      })
      .catch(() => {
        dispatch({
          type: SETUP_POST_EDIT_ERROR,
        });
      });
  };
}


export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_ERROR = 'CREATE_POST_ERROR';

export function createPost(postTypeSlug, post) {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_POST,
      postType: postTypeSlug,
    });

    axios
      .post(buildApiUrl(`posts/${postTypeSlug}`), {
        post,
      })
      .then(() => {
        dispatch({
          type: CREATE_POST_SUCCESS,
        });

        dispatch(invalidatePosts());

        dispatchNewAlert({
          alertType: 'success',
          message: `The ${getState().postTypes[postTypeSlug].name} was successfully created.`,
        });
      })
      .catch((error) => {
        dispatchNewAlert(parseError(error.response));
        logError('Error during createPost', error, error.response);

        dispatch({
          type: CREATE_POST_ERROR,
        });
      });
  };
}


export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';

export function savePost(postTypeSlug, post) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_POST,
      postType: postTypeSlug,
    });

    axios
      .put(buildApiUrl(`posts/${postTypeSlug}/${post._id}`), {
        post,
      })
      .then(() => {
        dispatch({
          type: UPDATE_POST_SUCCESS,
          post,
        });

        dispatch(invalidatePosts());

        dispatchNewAlert({
          alertType: 'success',
          message: `The ${getState().postTypes[postTypeSlug].name} was successfully saved.`,
        });
      })
      .catch((error) => {
        dispatchNewAlert(parseError(error.response));
        logError('Error during savePost', error, error.response);

        dispatch({
          type: UPDATE_POST_ERROR,
          post,
          id: post._id,
        });
      });
  };
}
