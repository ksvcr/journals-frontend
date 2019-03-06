import { CREATE_ARTICLE, FETCH_ARTICLES, INVITE_ARTICLE_REVIEWER, RESET_ARTICLES, ACCEPT_ARTICLE_REVIEW_INVITE,
         FETCH_ARTICLE, EDIT_ARTICLE, CREATE_ARTICLE_TAG, REMOVE_ARTICLE_TAG, CREATE_ARTICLE_REVIEW,
         EDIT_ARTICLE_REVIEW, CREATE_ARTICLE_TRANSLATION, FETCH_ARTICLE_REVIEW_INVITES, FETCH_ARTICLE_PRINTED,
         FETCH_ARTICLE_TRANSLATION, EDIT_ARTICLE_TRANSLATION } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

import differenceBy from 'lodash/differenceBy';

export function fetchArticles(siteId, params = {}) {
  return dispatch => {
    const flatParams = getFlatParams(params);
    const payload = apiClient.getArticles(siteId, null, flatParams);
    return dispatch({
      type: FETCH_ARTICLES,
      meta: params,
      payload
    }).catch(error => console.error(error));
  };
}

export function fetchArticle(id) {
  return dispatch => {
    const payload = apiClient.getArticles(null, id);
    return dispatch({
      type: FETCH_ARTICLE,
      payload
    }).catch(error => console.error(error));
  };
}

export function createArticle(siteId, data, cb) {
  return dispatch => {
    let { content_blocks, sources, financing_sources, file_atachments, printed, ...articleData } = data;
    // Источники финансирования
    const financingPromise = financing_sources ? apiClient.createFinancingSources(financing_sources) : Promise.resolve();

    const payload = financingPromise.then((financingResponse = []) => {
      if (financingResponse.length) {
        articleData.financing_sources = financingResponse.map(item => item.id);
      }

      // Статья
      return apiClient
        .createArticle(siteId, articleData)
        .then(articleResponse => {
          const articleId = articleResponse.id;

          if (cb) {
            cb(articleResponse);
          }

          return apiClient.lockArticle(articleId).then(() => {
            const resourcePromises = [];

            // Контент-блоки
            if (content_blocks) {
              content_blocks = content_blocks.map((item, index) => ({ ...item, ordered: index }));
              resourcePromises.push(apiClient.createBlocks(articleId, content_blocks));
            }

            // Список литературы
            if (sources) {
              resourcePromises.push(
                apiClient.createSources(articleId, sources)
              );
            }

            // Вложения
            if (file_atachments) {
              file_atachments.forEach(attachment => {
                resourcePromises.push(apiClient.createArticleAttachment(articleId, attachment));
              });
            }

            //Печатная копия статьи
            if (printed) {
              printed.forEach((item) => {
                resourcePromises.push(
                  apiClient.createArticlePrinted(articleId, { ...item, user: data.author.user, article: articleId })
                );
              });
            }

            return Promise.all(resourcePromises);
          });
        });
    });

    return dispatch({
      type: CREATE_ARTICLE,
      payload
    });
  };
}

export function editArticle(id, data) {
  return (dispatch, state) => {
    const prevArticleData = state().articles.data[id] || {};
    let { content_blocks, financing_sources, sources, file_atachments, printed, ...articleData } = data;

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
      ([createFinancingResponse = [], ...editFinancingResponse]) => {
        const financingResponse = [
          ...createFinancingResponse,
          ...editFinancingResponse
        ];
        if (financingResponse.length) {
          articleData.financing_sources = financingResponse.map(item => item.id);
        }

        return apiClient.lockArticle(id).then(() => {
          let editPromises = [apiClient.editArticle(id, articleData)];
          // Контент-блоки
          if (content_blocks) {
            content_blocks = content_blocks.map((item, index) => ({ ...item, ordered: index }));
            editPromises.push(apiClient.editBlocks(id, content_blocks));
          }

          // Список литературы
          if (sources) {
            const createSourcesArray = sources.filter(item => item.id === undefined);
            const editSourcesArray = sources.filter(item => item.id !== undefined);
            const hasRemoved = prevArticleData.sources && prevArticleData.sources.length > editSourcesArray.length;
            const removedSourcesArray = hasRemoved ? differenceBy(prevArticleData.sources, editSourcesArray, 'id') : [];
            const createSourcesPromise = apiClient.createSources(id, createSourcesArray);
            const editSourcesPromises = editSourcesArray.map(item => apiClient.editSource(id, item));
            const removeSourcesPromises = removedSourcesArray.map(item => apiClient.removeSource(id, item.id));
            editPromises = [ ...editPromises, createSourcesPromise, ...editSourcesPromises, ...removeSourcesPromises];
          }

          // Вложения
          if (file_atachments) {
            const createAttachmentsArray = file_atachments.filter(item => item.id === undefined);
            const editAttachmentsArray = file_atachments.filter(item => item.id !== undefined);
            const hasRemoved = prevArticleData.file_atachments &&
                               prevArticleData.file_atachments.length > editAttachmentsArray.length;
            const removedAttachmentsArray = hasRemoved ?
              differenceBy(prevArticleData.file_atachments, editAttachmentsArray, 'id') : [];
            const createAttachmentsPromises = createAttachmentsArray.map(item => apiClient.createArticleAttachment(id, item));
            const editAttachmentsPromises = editAttachmentsArray.map(item => apiClient.editArticleAttachment(item.id, item));
            const removeAttachmentsPromises = removedAttachmentsArray.map(item => apiClient.removeArticleAttachment(item.id));
            editPromises = [ ...editPromises, ...createAttachmentsPromises,
              ...editAttachmentsPromises, ...removeAttachmentsPromises ];
          }

          // Печатная копия статьи
          if (printed) {
            const createPrintedArray = printed.filter(item => item.id === undefined);
            const editPrintedArray = printed.filter(item => item.id !== undefined);
            const hasRemoved = prevArticleData.printed &&
                  prevArticleData.printed.length > editPrintedArray.length;
            const removedPrintedArray = hasRemoved ?
              differenceBy(prevArticleData.printed, editPrintedArray, 'id') : [];
            const createPrintedPromises = createPrintedArray.map((item) => {
              return apiClient.createArticlePrinted(id, { ...item });
            });
            const editPrintedPromises = editPrintedArray.map((item) => {
              return apiClient.editArticlePrinted(id, item.id, item);
            });
            const removePrintedPromises = removedPrintedArray.map(item => apiClient.removeArticlePrinted(id, item.id));
            editPromises = [...editPrintedPromises, ...createPrintedPromises, ...removePrintedPromises];
          }

          return Promise.all(editPromises);
        });
      }
    );

    return dispatch({
      type: EDIT_ARTICLE,
      meta: { articleId: id, data: articleData },
      payload
    });
  };
}

export function createArticleTag(articleId, data) {
  return dispatch => {
    const payload = apiClient.createArticleTag(articleId, data);
    return dispatch({
      type: CREATE_ARTICLE_TAG,
      payload
    }).catch(error => console.error(error));
  };
}

export function removeArticleTag(articleId, id) {
  return dispatch => {
    const payload = apiClient.removeArticleTag(articleId, id);
    return dispatch({
      type: REMOVE_ARTICLE_TAG,
      meta: { articleId, id },
      payload
    }).catch(error => console.error(error));
  };
}

export function inviteArticleReviewer(articleId, data) {
  return dispatch => {
    const payload = apiClient.createInviteArticleReviewer(articleId, data);
    return dispatch({
      type: INVITE_ARTICLE_REVIEWER,
      meta: { articleId, data },
      payload
    }).catch(error => console.error(error));
  };
}

export function createArticleReview(articleId, data) {
  return dispatch => {
    const payload = apiClient.createArticleReview(articleId, data);
    return dispatch({
      type: CREATE_ARTICLE_REVIEW,
      payload
    }).catch(error => console.error(error));
  };
}

export function editArticleReview(articleId, reviewId, data) {
  return dispatch => {
    const payload = apiClient.editArticleReview(articleId, reviewId, data);
    return dispatch({
      type: EDIT_ARTICLE_REVIEW,
      payload
    }).catch(error => console.error(error));
  };
}

export function acceptArticleReviewInvite(articleId) {
  return dispatch => {
    const payload = apiClient.editInviteArticleReviewer(articleId, {
      is_agree: true
    });
    return dispatch({
      type: ACCEPT_ARTICLE_REVIEW_INVITE,
      meta: { articleId },
      payload
    }).catch(error => console.error(error));
  };
}

export function createArticleTranslation(id, data) {
  return dispatch => {
    const payload = apiClient.lockArticle(id).then(() => {
      let editSourcePromises = [];

      if (data.sources) {
        editSourcePromises = data.sources.map(item =>
          apiClient.editSource(id, item)
        );
      }

      delete data.sources;

      const createTranslationPromise = apiClient.createArticleTranslation(
        id,
        data
      );
      const editArticlePromise = apiClient.editArticle(id, {
        state_article: 'AWAIT_PUBLICATION'
      });
      return Promise.all([
        ...editSourcePromises,
        createTranslationPromise,
        editArticlePromise
      ]);
    });

    return dispatch({
      type: CREATE_ARTICLE_TRANSLATION,
      payload
    }).catch(error => console.error(error));
  };
}

export function editArticleTranslation(id, data) {
  return dispatch => {
    const payload = apiClient.lockArticle(id).then(() => {
      let editSourcePromises = [];

      if (data.sources) {
        editSourcePromises = data.sources.map(item =>
          apiClient.editSource(id, item)
        );
      }

      delete data.sources;

      const editTranslationPromise = apiClient.editArticleTranslation(id, data.language_code, data);
      const editArticlePromise = apiClient.editArticle(id, {
        state_article: 'AWAIT_PUBLICATION'
      });
      return Promise.all([
        ...editSourcePromises,
        editTranslationPromise,
        editArticlePromise
      ]);
    });

    return dispatch({
      type: EDIT_ARTICLE_TRANSLATION,
      payload
    }).catch(error => console.error(error));
  };
}

export function fetchArticleTranslation(id, languageCode = null) {
  return dispatch => {
    const payload = apiClient.getArticleTranslation(id, languageCode);

    return dispatch({
      type: FETCH_ARTICLE_TRANSLATION,
      meta: { article: id },
      payload
    }).catch(error => console.error(error));
  };
}

export function fetchArticleReviewInvites(params) {
  return dispatch => {
    const payload = apiClient.getReviewInvites(params);
    return dispatch({
      type: FETCH_ARTICLE_REVIEW_INVITES,
      meta: params,
      payload
    }).catch(error => console.error(error));
  };
}

export function resetArticles() {
  return {
    type: RESET_ARTICLES
  };
}

export function fetchArticlePrinted(id, printedId=null) {
  return (dispatch) => {
    const payload = apiClient.getPrinted(id, printedId);
    return dispatch({
      type: FETCH_ARTICLE_PRINTED,
      meta: { article: id },
      payload
    });
  }
}
