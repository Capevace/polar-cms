import axios from 'axios';
import { buildApiUrl } from '../helpers';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';

function refetchNeeded(postType, state) {
  return postType !== state.postList.postType || state.postList.invalidated;
}

export function fetchPostsIfNeeded(postType, page = 0, forceRefetch = false) {
  return (dispatch, getState) => {
    const currentState = getState();

    if (!refetchNeeded(postType, currentState) && !forceRefetch) {
      return false;
    }

    dispatch({
      type: FETCH_POSTS,
      postType,
      page,
    });

    axios
      .get(buildApiUrl(`posts/${postType}`))
      .then((response) => {
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          posts: response.data.posts,
        });
      })
      .catch(() => {
        dispatch({
          type: FETCH_POSTS_ERROR,
        });
      });
  };
}

export function invalidatePosts() {
  return {
    type: INVALIDATE_POSTS,
  };
}
