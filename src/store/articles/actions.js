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
  return (dispatch) => {
    const payload = apiClient.getArticles(null, id).then(({ financing_sources, ...articleData }) => {
      if (financing_sources) {
        const financingPromises = financing_sources.map(id => apiClient.getFinancingSource(id));
        return Promise.all(financingPromises).then(financing_sources => {
          return { ...articleData, financing_sources };
        });
      }
    });
    return dispatch({
      type: FETCH_ARTICLE,
      payload
    }).catch((error) => console.log(error));
  }
}

export function createArticle(data) {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    let { content_blocks, sources, financing_sources, ...articleData } = data;
    const financingPromise = financing_sources ? apiClient.createFinancingSources(financing_sources) : Promise.resolve();
    const payload = financingPromise.then((financingResponse=[]) => {
      if (financingResponse.length) {
        articleData.financing_sources = financingResponse.map(item => item.id);
      }
      return apiClient.createArticle(siteId, articleData).then((articleResponse) => {
        const articleId = articleResponse.id;
        return apiClient.lockArticle(articleId).then(() => {
          const resourcePromises = [];
          if (content_blocks) {
            content_blocks = content_blocks.map((item, index) => ({ ...item, ordered: index }));
            resourcePromises.push(apiClient.createBlocks(articleId, content_blocks));
          }

          if (sources) {
            resourcePromises.push(apiClient.createSources(articleId, sources));
          }

          return Promise.all(resourcePromises);
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
    let { content_blocks, financing_sources, ...articleData } = data;
    let financingPromises = [Promise.resolve()];

    if (financing_sources) {
      const newFinancingArray = financing_sources.filter(item => item.id === undefined);
      const oldFinancingArray = financing_sources.filter(item => item.id !== undefined);

      const createFinancingPromise = apiClient.createFinancingSources(newFinancingArray);
      const editFinancingPromises = oldFinancingArray.map(item => apiClient.editFinancingSource(item.id, item));
      financingPromises = [createFinancingPromise, ...editFinancingPromises];
    }

    const payload = Promise.all(financingPromises).then(([ createFinancingResponse, ...editFinancingResponse ]) => {
      const financingResponse = [ ...createFinancingResponse, ...editFinancingResponse ];
      if (financingResponse.length) {
        articleData.financing_sources = financingResponse.map(item => item.id);
      }
      return apiClient.lockArticle(id).then(() => {
        const editPromises = [apiClient.editArticle(id, articleData), apiClient.editBlocks(id, content_blocks)];
        return Promise.all(editPromises);
      })
    });
    return dispatch({
      type: EDIT_ARTICLE,
      payload
    }).catch((error) => console.log(error));
  }
}
