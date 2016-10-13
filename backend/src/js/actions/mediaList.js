import axios from 'axios';
import { buildApiUrl } from '../helpers';

export const FETCH_MEDIA = 'FETCH_MEDIA';
export const FETCH_MEDIA_SUCCESS = 'FETCH_MEDIA_SUCCESS';
export const FETCH_MEDIA_ERROR = 'FETCH_MEDIA_ERROR';
export const SET_MEDIA_FILTER = 'SET_MEDIA_FILTER';

export function fetchMediaList() {
  return (dispatch) => {
    dispatch({
      type: FETCH_MEDIA,
    });

    axios
      .get(buildApiUrl('media/all'))
      .then((response) => {
        const mediaItems = response.data.items;
        dispatch({
          type: FETCH_MEDIA_SUCCESS,
          items: mediaItems,
        });
      })
      .catch(() => {
        dispatch({
          type: FETCH_MEDIA_ERROR,
        });
      });
  };
}
