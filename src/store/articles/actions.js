import { CREATE_ARTICLES, FETCH_ARTICLES, FETCH_ARTICLE } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchArticles(params={}) {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    const flatParams = getFlatParams(params);
    const payload = apiClient.getArticles(siteId, null, flatParams);
    return dispatch({
      type: FETCH_ARTICLES,
      meta: params,
      payload
    }).catch((error) => console.log(error));
  }
}

export function fetchArticle(id) {
  return (dispatch, state) => {
    const { data } = state().articles;

    if (data[id]) {
      return Promise.resolve();
    } else {
      const payload = apiClient.getArticles(null, id);
      return dispatch({
        type: FETCH_ARTICLE,
        payload
      }).catch((error) => console.log(error));
    }
  }
}

export function createArticle(data) {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;

    const payload = apiClient.createArticle(siteId, data).then((response) => {
      const articleId = response.id;
      return apiClient.lockArticle(articleId).then(() => {
        const blockGroupPromises = data.blocks.map(item => apiClient.createBlockGroup(response.id, item));
        return Promise.all(blockGroupPromises);
      });
    });

    return dispatch({
      type: CREATE_ARTICLES,
      payload
    }).catch((error) => console.log(error));
  }
}

export function editArticle(id, data) {
  return (dispatch) => {
    const payload = apiClient.editArticle(id, data).then((response) => {
      const blockGroupPromises = data.blocks.map(item => apiClient.createBlockGroup(response.id, item));
      return Promise.all(blockGroupPromises);
    });
    return dispatch({
      type: CREATE_ARTICLES,
      payload
    }).catch((error) => console.log(error));
  }
}
