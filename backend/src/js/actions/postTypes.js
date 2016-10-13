import axios from 'axios';
import { buildApiUrl } from '../helpers';
import store from '../reducers/store';

// Only needed to fetch once
export const fetchPostTypes = () => { // eslint-disable-line import/prefer-default-export
  store.dispatch({
    type: 'START_LOADING_REQUIRED',
  });

  return (dispatch) => {
    axios
      .get(buildApiUrl('posts/post-types'))
      .then((response) => {
        dispatch({
          type: 'SET_POST_TYPES',
          postTypes: response.data.postTypes,
        });

        dispatch({
          type: 'STOP_LOADING_REQUIRED',
        });
      })
      .catch(() => {
        dispatch({
          type: 'SET_POST_TYPES',
          postTypes: [],
        });

        dispatch({
          type: 'STOP_LOADING_REQUIRED',
        });
      });
  };
};
