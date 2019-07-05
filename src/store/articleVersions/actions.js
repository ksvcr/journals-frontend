import apiClient from '~/services/apiClient';
import { FETCH_ARTICLE_VERSION } from './constants';

export function fetchArticleVersion(article, version) {
  return dispatch => {
    const payload = apiClient.getArticleVersion(article, version);
    return dispatch({
      type: FETCH_ARTICLE_VERSION,
      meta: { article, version },
      payload
    }).catch(error => console.error(error));
  };
}
