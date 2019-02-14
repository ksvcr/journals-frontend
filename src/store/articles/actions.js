import {
  CREATE_ARTICLE, FETCH_ARTICLES, INVITE_ARTICLE_REVIEWER, RESET_ARTICLES, ACCEPT_ARTICLE_REVIEW_INVITE,
  FETCH_ARTICLE, EDIT_ARTICLE, CREATE_ARTICLE_TAG, REMOVE_ARTICLE_TAG, CREATE_ARTICLE_REVIEW, EDIT_ARTICLE_REVIEW,
  CREATE_ARTICLE_TRANSLATION, FETCH_ARTICLE_REVIEW_INVITES
} from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

import differenceBy from 'lodash/differenceBy';

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
    let { content_blocks, sources, financing_sources, addresses, ...articleData } = data;
    // Источники финансирования
    const financingPromise = financing_sources ? apiClient.createFinancingSources(financing_sources) : Promise.resolve();
    const payload = financingPromise.then((financingResponse=[]) => {
      if (financingResponse.length) {
        articleData.financing_sources = financingResponse.map(item => item.id);
      }
      // Статья
      return apiClient.createArticle(siteId, articleData).then((articleResponse) => {
        const articleId = articleResponse.id;
        return apiClient.lockArticle(articleId).then(() => {
          const resourcePromises = [];
          // Контент-блоки
          if (content_blocks) {
            content_blocks = content_blocks.map((item, index) => ({ ...item, ordered: index }));
            resourcePromises.push(apiClient.createBlocks(articleId, content_blocks));
          }
          // Список литературы
          if (sources) {
            resourcePromises.push(apiClient.createSources(articleId, sources));
          }

          //Печатная копия статьи
          if (addresses) {
            console.log(addresses);
            const printedPromises = addresses.map((item) => apiClient.createArticlePrinted(articleId, { ...item, user: data.author.user }));
            resourcePromises.push(...printedPromises);
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
  return (dispatch, state) => {
    const prevArticleData = state().articles.data[id];
    let { content_blocks, financing_sources, sources, ...articleData } = data;
    // Источники финансирования
    let financingPromises = [];

    if (financing_sources) {
      const createSourcesArray = financing_sources.filter(item => item.id === undefined);
      const editSourcesArray = financing_sources.filter(item => item.id !== undefined);

      const createFinancingPromise = apiClient.createFinancingSources(createSourcesArray);
      const editFinancingPromises = editSourcesArray.map(item => apiClient.editFinancingSource(item.id, item));
      financingPromises = [createFinancingPromise, ...editFinancingPromises];
    }

    const payload = Promise.all(financingPromises).then(
      ([ createFinancingResponse=[], ...editFinancingResponse ]) => {
      const financingResponse = [ ...createFinancingResponse, ...editFinancingResponse ];
      if (financingResponse.length) {
        articleData.financing_sources = financingResponse.map(item => item.id);
      }

      return apiClient.lockArticle(id).then(() => {
        let editPromises = [apiClient.editArticle(id, articleData)];
        // Контент-блоки
        if (content_blocks) {
          editPromises.push(apiClient.editBlocks(id, content_blocks));
        }

        // Список литературы
        if (sources) {
          const createSourcesArray = sources.filter(item => item.id === undefined);
          const editSourcesArray = sources.filter(item => item.id !== undefined);
          const hasRemoved = prevArticleData.sources.length > editSourcesArray.length;
          const removedSourcesArray = hasRemoved ? differenceBy(prevArticleData.sources, editSourcesArray, 'id') : [];
          const createSourcesPromise = apiClient.createSources(id, createSourcesArray);
          const editSourcesPromises = editSourcesArray.map(item => apiClient.editSource(id, item));
          const removeSourcesPromises = removedSourcesArray.map(item => apiClient.removeSource(id, item.id));
          editPromises = [ ...editPromises, createSourcesPromise, ...editSourcesPromises, ...removeSourcesPromises ]
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
    const payload = apiClient.createArticleReview(articleId, data);
    return dispatch({
      type: CREATE_ARTICLE_REVIEW,
      payload
    }).catch(error => console.error(error));
  };
}

export function editArticleReview(articleId, reviewId, data) {
  return (dispatch) => {
    const payload = apiClient.editArticleReview(articleId, reviewId, data);
    return dispatch({
      type: EDIT_ARTICLE_REVIEW,
      payload
    }).catch(error => console.error(error));
  }
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

export function createArticleTranslation(id, data) {
  return (dispatch) => {
    const payload = apiClient.lockArticle(id).then(() =>{
      let editSourcePromises = [];

      if (data.sources) {
        editSourcePromises = data.sources.map(item => apiClient.editSource(id, item));
      }

      delete data.sources;

      const createTranslationPromise = apiClient.createArticleTranslation(id, data);
      const editArticlePromise = apiClient.editArticle(id, { state_article: 'AWAIT_PUBLICATION' });
      return Promise.all([ ...editSourcePromises, createTranslationPromise, editArticlePromise ]);
    });

    return dispatch({
      type: CREATE_ARTICLE_TRANSLATION,
      payload
    }).catch(error => console.error(error));
  };
}

export function fetchArticleReviewInvites(params) {
  return (dispatch) => {
    const payload = apiClient.getReviewInvites(params);
    return dispatch({
      type: FETCH_ARTICLE_REVIEW_INVITES,
      meta: params,
      payload
    }).catch(error => console.error(error));
  }
}

export function resetArticles() {
  return {
    type: RESET_ARTICLES
  };
}
