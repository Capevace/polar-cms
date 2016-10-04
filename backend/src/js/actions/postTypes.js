import * as api from '../api';
import store from '../reducers/store';

// Only needed to fetch once
export const fetchPostTypes = () => {
  store.dispatch({
    type: 'START_LOADING_REQUIRED'
  });

  return dispatch => {
    api
      .fetchPostTypes()
      .then(postTypes => {
        dispatch({
          type: 'SET_POST_TYPES',
          postTypes
        });

        dispatch({
          type: 'STOP_LOADING_REQUIRED'
        });
      });
  };
};
