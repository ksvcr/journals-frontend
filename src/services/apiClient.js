import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: process.env.REACT_APP_API_URL
});

const apiClient = {
  getSites: () => fetchInstance.request(`/sites/`),
  getLanguages: () => fetchInstance.request(`/languages/`),
  getCountries: (params) => fetchInstance.request(`/countries/`, { params }),
  getRubrics: (siteId) => fetchInstance.request(`/sites/${siteId}/rubrics/`),
  getCategories: (siteId) => fetchInstance.request(`/sites/${siteId}/category/`),

  login: (data) => fetchInstance.request(`/users/auth/login/`, { method: 'post', data }),
  getCurrentUser: () => fetchInstance.request(`/users/me/`),
  updateCurrentUser: (data) => fetchInstance.request(`/users/me/`, { method: 'put', data }),
  getUsers: (userId=null, params) => {
    const tail = userId !== null ? `${userId}/` : '';
    return fetchInstance.request(`/users/${tail}`, { params });
  },
  createUser: (data) => fetchInstance.request(`/users/auth/register/`, { method: 'post', data }),

  createUserTag: (userId, data) => {
    return fetchInstance.request(`/users/${userId}/tags/`, { method: 'post', data });
  },
  removeUserTag: (userId, id) => {
    return fetchInstance.request(`/users/${userId}/tags/${id}/`, { method: 'delete' });
  },

  createSources: (articleId, data) => fetchInstance.request(`/articles/${articleId}/sources/`, { method: 'post', data }),

  getArticles: (siteId=null, articleId=null, params) => {
    const sitePrefix = siteId !== null ? `sites/${siteId}` : '';
    const tail = articleId  !== null ? `${articleId}/` : '';
    return fetchInstance.request(`${sitePrefix}/articles/${tail}`, { params });
  },
  createArticle: (siteId, data) => {
    const sitePrefix = siteId ? `sites/${siteId}` : '';
    return fetchInstance.request(`${sitePrefix}/articles/`, { method: 'post', data });
  },
  editArticle: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/`, { method: 'put', data });
  },
  lockArticle: (articleId) => {
    return fetchInstance.request(`/articles/${articleId}/lock/`);
  },
  createArticleAttachment: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/attachments/`, { method: 'post', data });
  },

  createBlocks: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/blocks/`, { method: 'post', data });
  },
  editBlocks: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/blocks/`, { method: 'put', data });
  },

  createFinancingSources: (data) => fetchInstance.request(`/financing/`, { method: 'post', data }),
  getFinancingSource: (id) => {
    return fetchInstance.request(`/financing/${id}/`);
  },
  editFinancingSource: (id, data) => {
    return fetchInstance.request(`/financing/${id}/`, { method: 'put', data });
  },
  deleteFinancingSource: (id) => {
    return fetchInstance.request(`/financing/${id}/`, { method: 'delete' } );
  },
  getArticleTags: (articleId, params) => {
    return fetchInstance.request(`/articles/${articleId}/tags/`, { params });
  },
  createArticleTag: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/tags/`, { method: 'post', data });
  },
  removeArticleTag: (articleId, id) => {
    return fetchInstance.request(`/articles/${articleId}/tags/${id}/`, { method: 'delete' });
  },
  createInviteArticleReviewer: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/reviews/invite/`, { method: 'post', data });
  },

  getLawtypes: () => {
    return fetchInstance.request(`/lawtypes/`);
  },

  editInviteArticleReviewer: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/reviews/invite/`, { method: 'put', data });
  },
  getReviewInvites: (params) => {
    return fetchInstance.request(`/review/invites/`, { params });
  },
  createArticleTranslation: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/translations/`, { method: 'post', data });
  },
  getDiscountsInfo: (userId) => fetchInstance.request(`users/${userId}/balance`, { method: 'get' }),
  transferBonus: (data) => fetchInstance.request(`users/balance/transfer/`, { method: 'post', data }),

  createArticleReview: (articleId, data) => fetchInstance.request(`/articles/${articleId}/reviews/`, { method: 'post', data })
};

export default apiClient;
