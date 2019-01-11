import {
  CREATE_ARTICLE, FETCH_ARTICLES, INVITE_ARTICLE_REVIEWER, RESET_ARTICLES, ACCEPT_ARTICLE_REVIEW_INVITE,
  FETCH_ARTICLE, EDIT_ARTICLE, CREATE_ARTICLE_TAG, REMOVE_ARTICLE_TAG, CREATE_ARTICLE_REVIEW
} from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchArticles(siteId, params={}) {
  return (dispatch) => {
    const flatParams = getFlatParams(params);
    const payload = apiClient.getArticles(siteId, null, flatParams);
    return dispatch({
      type: FETCH_ARTICLES,
      meta: params,
      payload
    }).catch(error => console.error(error));
  }
}

export function fetchArticle(id) {
  return (dispatch) => {
    const payload = apiClient.getArticles(null, id);
    return dispatch({
      type: FETCH_ARTICLE,
      payload
    }).catch(error => console.error(error));
  }
}

export function createArticle(siteId, data) {
  return (dispatch) => {
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

          return Promise.all(resourcePromises).then(() => {
            // Создаем вложения
            const attachmentsPromises = data.attachments.map((attachment) => {
              return apiClient.createArticleAttachment(articleId, attachment);
            });

            return Promise.all(attachmentsPromises);
          });
        });


      });
    });

    return dispatch({
      type: CREATE_ARTICLE,
      payload
    }).catch(error => console.error(error));
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

    const payload = Promise.all(financingPromises).then(([ createFinancingResponse=[], ...editFinancingResponse ]) => {
      const financingResponse = [ ...createFinancingResponse, ...editFinancingResponse ];
      if (financingResponse.length) {
        articleData.financing_sources = financingResponse.map(item => item.id);
      }
      return apiClient.lockArticle(id).then(() => {
        const editPromises = [apiClient.editArticle(id, articleData)];
        if (content_blocks) {
          editPromises.push(apiClient.editBlocks(id, content_blocks));
        }
        return Promise.all(editPromises);
      })
    });
    return dispatch({
      type: EDIT_ARTICLE,
      meta: { articleId: id, data: articleData },
      payload
    }).catch(error => console.error(error));
  }
}

export function createArticleTag(articleId, data) {
  return (dispatch) => {
    const payload = apiClient.createArticleTag(articleId, data);
    return dispatch({
      type: CREATE_ARTICLE_TAG,
      payload
    }).catch(error => console.error(error));
  };
}

export function removeArticleTag(articleId, id) {
  return (dispatch) => {
    const payload = apiClient.removeArticleTag(articleId, id);
    return dispatch({
      type: REMOVE_ARTICLE_TAG,
      meta: { articleId, id },
      payload
    }).catch(error => console.error(error));
  };
}

export function inviteArticleReviewer(articleId, data) {
  return (dispatch) => {
    const payload = apiClient.createInviteArticleReviewer(articleId, data);
    return dispatch({
      type: INVITE_ARTICLE_REVIEWER,
      meta: { articleId, data },
      payload
    }).catch(error => console.error(error));
  };
}

export function createArticleReview(articleId, data) {
  return (dispatch) => {
    const payload = apiClient.createArticleReview(articleId, data);;
    return dispatch({
      type: CREATE_ARTICLE_REVIEW,
      payload
    }).catch(error => console.error(error));
  };
}

export function acceptArticleReviewInvite(articleId) {
  return (dispatch) => {
    const payload = apiClient.editInviteArticleReviewer(articleId, { is_agree: true });
    return dispatch({
      type: ACCEPT_ARTICLE_REVIEW_INVITE,
      meta: { articleId },
      payload
    }).catch(error => console.error(error));
  }
}

export function resetArticles() {
  return {
    type: RESET_ARTICLES
  };
}
