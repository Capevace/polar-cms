import axios from 'axios';
import { apiUrl } from '../api';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
export const INVALIDATE_POSTS = 'INVALIDATE_POSTS';

function refetchNeeded(postType, state) {
  return postType !== state.postList.postType;
}

export function fetchPostsIfNeeded(postType, page = 0, forceRefetch = false) {
  return (dispatch, getState) => {
    const currentState = getState();

    if (!refetchNeeded(postType, currentState) && !forceRefetch) {
      return false;
    }

    console.info('Something');

    dispatch({
      type: FETCH_POSTS,
      postType,
      page
    });

    // alert('ATTENTION: You need to change the API server, to support "response.posts"!!');

    axios
      .get(apiUrl(`posts/${postType}`))
      .then((response) => {
        console.info(response);
        dispatch({
          type: FETCH_POSTS_SUCCESS,
          posts: response.data,
        });
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

        dispatch({
          type: FETCH_POSTS_ERROR,
        });
      });
  };
}

export function invalidatePosts() {
  return {
    type: INVALIDATE_POSTS
  };
}
