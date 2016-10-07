import axios from 'axios';
import { apiUrl } from '../api';

export const SETUP_POST_CREATE = 'SETUP_POST_CREATE';

export function prepareCreateIfNeeded(postTypeSlug, mode, force) {
  return (dispatch, getState) => {
    const editorState = getState().postEditor;
    if (
      editorState.postType === postTypeSlug
      && editorState.mode === mode
      && !force) {
      return null;
    }

    dispatch({
      type: SETUP_POST_CREATE,
      postType: postTypeSlug
    });
  };
}


export const SETUP_POST_EDIT = 'SETUP_POST_EDIT';
export const SETUP_POST_EDIT_SUCCESS = 'SETUP_POST_EDIT_SUCCESS';
export const SETUP_POST_EDIT_ERROR = 'SETUP_POST_EDIT_ERROR';

export function prepareEditIfNeeded(postTypeSlug, postSlug, mode, force) {
  return (dispatch, getState) => {
    const editorState = getState().postEditor;

    if (
      editorState.postType === postTypeSlug
      && editorState.post.slug === postSlug
      && editorState.mode === mode
      && !editorState.invalidated
      && !force
    ) {
      return null;
    }

    dispatch({
      type: SETUP_POST_EDIT,
      postType: postTypeSlug,
    });

    axios
      .get(apiUrl(`posts/${postTypeSlug}/${postSlug}`))
      .then((response) => {
        console.info('Fetched post for edit:', response.data);

        dispatch({
          type: SETUP_POST_EDIT_SUCCESS,
          post: response.data,
        });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

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
      .post(apiUrl(`posts/${postTypeSlug}`), {
        post
      })
      .then((response) => {
        dispatch({
          type: CREATE_POST_SUCCESS,
        });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

        dispatch({
          type: CREATE_POST_ERROR,
        });
      });
  };
}


export const UPDATE_POST = 'UPDATE_POST';
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS';
export const UPDATE_POST_ERROR = 'UPDATE_POST_ERROR';
