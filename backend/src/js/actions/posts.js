import * as api from '../api';

export const START_FETCHING_POSTS = 'START_FETCHING_POSTS';
export const STOP_FETCHING_POSTS = 'STOP_FETCHING_POSTS';

export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

const needsRefetch = (postType, state) => !state.posts.list[postType];

// Only needed to fetch once
export const fetchPostsIfNeeded = (postType) => {
  return (dispatch, getState) => {
    if (!needsRefetch(postType, getState())) return;

    dispatch({
      type: START_FETCHING_POSTS
    });

    api
      .fetchPosts(postType)
      .then(posts => {
        dispatch({
          type: STOP_FETCHING_POSTS,
          posts,
          postType
        });
      });
  };
};

export const createNewPost = (post, postType) => {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_POST
    });

    api
      .createNewPost(post, postType)
      .then(response => {
        console.info('1 res', response);
        dispatch({
          type: CREATE_POST_SUCCESS
        });
      }, err => {
        console.info('2 res', err);
      });

  };
};
