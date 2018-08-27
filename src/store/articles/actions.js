import {FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';

export function fetchArticles() {
  return (dispatch, state) => {
    const { ids } = state().articles;

    if (ids.length) {
      return Promise.resolve();
    } else {
      const payload = apiClient.getArticles();
      return dispatch({
        type: FETCH_ARTICLES,
        payload
      }).catch((error) => console.log(error));
    }
  }
}
