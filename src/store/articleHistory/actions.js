import apiClient from '~/services/apiClient';
import { FETCH_ARTICLE_HISTORY } from './constants';

export function fetchArticleHistory(article) {
  return dispatch => {
    const payload = apiClient.getArticleHistory(article);
    return dispatch({
      type: FETCH_ARTICLE_HISTORY,
      meta: { article },
      payload
    }).catch(error => console.error(error));
  };
}
