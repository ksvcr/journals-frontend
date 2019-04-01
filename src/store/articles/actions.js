import { CREATE_ARTICLE, FETCH_ARTICLES, INVITE_ARTICLE_REVIEWER, RESET_ARTICLES, ACCEPT_ARTICLE_REVIEW_INVITE,
         FETCH_ARTICLE, EDIT_ARTICLE, CREATE_ARTICLE_TAG, REMOVE_ARTICLE_TAG, CREATE_ARTICLE_REVIEW,
         EDIT_ARTICLE_REVIEW, CREATE_ARTICLE_TRANSLATION, FETCH_ARTICLE_REVIEW_INVITES,
         FETCH_ARTICLE_TRANSLATION, EDIT_ARTICLE_TRANSLATION } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

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
    const payload = apiClient.getArticles(null, id).then(articleData => {
      return apiClient.getPrinted(id).then(({ results=[] }) => ({ ...articleData, printed: results }))
    });
    return dispatch({
      type: FETCH_ARTICLE,
      payload
    }).catch(error => console.error(error));
  };
}

export function createArticle(siteId, data, cb) {
  return dispatch => {
    let { content_blocks, sources, financing_sources, file_atachments, printed, ...articleData } = data;

    const payload = apiClient
      .createArticle(siteId, articleData)
      .then(articleResponse => {
        const articleId = articleResponse.id;

        if (cb) {
          cb(articleResponse);
        }

        return apiClient.lockArticle(articleId).then(() => {
          const resourcePromises = [];

          // Источники финансирования
          if (financing_sources && financing_sources.length) {
            resourcePromises.push(
              apiClient.createFinancingSources(articleId, financing_sources)
            );
          }

          // Контент-блоки
          if (content_blocks && content_blocks.length) {
            content_blocks = content_blocks.map((item, index) => ({ ...item, ordered: index }));
            resourcePromises.push(apiClient.createBlocks(articleId, content_blocks));
          }

          // Список литературы
          if (sources && sources.length) {
            resourcePromises.push(
              apiClient.createSources(articleId, sources)
            );
          }

          // Вложения
          if (file_atachments && file_atachments.length) {
            resourcePromises.push(apiClient.createArticleAttachment(articleId, file_atachments));
          }

          // Печатная копия статьи
          if (printed && printed.length) {
            printed = printed.map(item => ({ ...item, article: articleId }));
            resourcePromises.push(
              apiClient.createArticlePrinted(articleId, printed)
            );
          }

          return Promise.all(resourcePromises);
        });
      });

    return dispatch({
      type: CREATE_ARTICLE,
      payload
    });
  };
}

export function editArticle(id, data) {
  return dispatch => {
    let { content_blocks, financing_sources, sources, file_atachments, printed, ...articleData } = data;


    const payload = apiClient.lockArticle(id).then(() => {
      let editPromises = [apiClient.editArticle(id, articleData)];

      // Источники финансирования
      if (financing_sources && financing_sources.length) {
        editPromises.push(
          apiClient.editFinancingSource(id, financing_sources)
        );
      }

      // Контент-блоки
      if (content_blocks && content_blocks.length) {
        content_blocks = content_blocks.map((item, index) => ({ ...item, ordered: index }));
        editPromises.push(apiClient.editBlocks(id, content_blocks));
      }

      // Список литературы
      if (sources && sources.length) {
        editPromises.push(apiClient.editSources(id, sources));
      }

      // Вложения
      if (file_atachments && file_atachments.length) {
        editPromises.push(apiClient.editArticleAttachment(id, file_atachments));
      }

      // Печатная копия статьи
      if (printed && printed.length) {
        printed = printed.map(item => ({ ...item, article: id }));
        editPromises.push(
          apiClient.editArticlePrinted(id, printed)
        );
      }

      return Promise.all(editPromises);
    });


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
          apiClient.editSources(id, item)
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
          apiClient.editSources(id, item)
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
