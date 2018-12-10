import { CREATE_ARTICLE, FETCH_ARTICLES,
         FETCH_ARTICLE, EDIT_ARTICLE } from './constants';
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
      return Promise.resolve({ value: data[id] });
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
    const financingPromises = data.financing_sources.map(item => apiClient.createFinancing(item))
    const payload = Promise.all(financingPromises).then(() => {
      return apiClient.createArticle(siteId, data).then((response) => {
        const articleId = response.id;
        return apiClient.lockArticle(articleId).then(() => {
          const blockGroupPromises = data.blocks.map(item => apiClient.createBlockGroup(articleId, item));
          return Promise.all(blockGroupPromises);
        });
      });
    });
 
    return dispatch({
      type: CREATE_ARTICLE,
      payload
    }).catch((error) => console.log(error));
  }
}

export function editArticle(id, data) {
  return (dispatch) => {
    const payload = apiClient.lockArticle(id).then(() => {
      return apiClient.editArticle(id, data).then(() => {
        const blockGroupPromises = data.blocks.map(item => apiClient.createBlockGroup(id, item));
        return Promise.all(blockGroupPromises);
      })
    });
    return dispatch({
      type: EDIT_ARTICLE,
      payload
    }).catch((error) => console.log(error));
  }
}
