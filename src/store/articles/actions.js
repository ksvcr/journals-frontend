import {FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';

export function fetchArticles(siteId) {
  return (dispatch) => {
    const payload = apiClient.getArticles(siteId);
    return dispatch({
      type: FETCH_ARTICLES,
      payload
    }).catch((error) => console.log(error));
  }
}
