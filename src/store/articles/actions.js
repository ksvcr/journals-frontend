import {CREATE_ARTICLES, FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchArticles(params={}) {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    const flatParams = getFlatParams(params);
    const payload = apiClient.getArticles(siteId, flatParams);
    return dispatch({
      type: FETCH_ARTICLES,
      meta: params,
      payload
    }).catch((error) => console.log(error));
  }
}

export function createArticle(data) {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    const payload = apiClient.createArticle(siteId, data);
    return dispatch({
      type: CREATE_ARTICLES,
      payload
    }).catch((error) => console.log(error));
  }
}
