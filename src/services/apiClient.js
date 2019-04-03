import Cookies from 'js-cookie';
import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: process.env.REACT_APP_API_URL
});

const apiClient = {
  getSites: () => fetchInstance.request('/sites/'),
  getLanguages: () => fetchInstance.request('/languages/'),
  getCountries: params => fetchInstance.request('/countries/', { params }),
  getRubrics: siteId => fetchInstance.request(`/sites/${siteId}/rubrics/`),
  getCategories: siteId => fetchInstance.request(`/sites/${siteId}/category/`),

  login: (data) => fetchInstance.request('/users/auth/login/', { method: 'post', data }),
  logout: () => fetchInstance.request('/users/auth/logout'),
  getCurrentUser: () => fetchInstance.request('/users/me/'),
  updateCurrentUser: (data) => fetchInstance.request('/users/me/', { method: 'put', data }),
  getUsers: (userId = null, params) => {
    const tail = userId !== null ? `${userId}/` : '';
    return fetchInstance.request(`/users/${tail}`, { params });
  },
  updateUser: (userId, data) =>
    fetchInstance.request(`/users/${userId}/`, { method: 'put', data }),
  createUser: data =>
    fetchInstance.request('/users/auth/register/', { method: 'post', data }),
  lockUser: data =>
    fetchInstance.request('/users/lock/', { method: 'post', data }),

  getUserStatistics: (params) =>
    fetchInstance.request('/users/me/statistic/', { params }),
  getUserStatisticsCounter: () =>
    fetchInstance.request('/users/me/statistic/agg'),

  createUserTag: data =>
    fetchInstance.request('/users/tags/', { method: 'post', data }),
  removeUserTag: id =>
    fetchInstance.request(`/users/tags/${id}/`, { method: 'delete' }),

  createSources: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/sources/`, { method: 'post', data }),
  editSources: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/sources/`, { method: 'put', data }),

  getArticles: (siteId = null, articleId = null, params) => {
    const sitePrefix = siteId !== null ? `sites/${siteId}` : '';
    const tail = articleId !== null ? `${articleId}/` : '';
    return fetchInstance.request(`${sitePrefix}/articles/${tail}`, { params });
  },
  createArticle: (siteId, data) => {
    const sitePrefix = siteId ? `sites/${siteId}` : '';
    return fetchInstance.request(`${sitePrefix}/articles/`, { method: 'post', data });
  },
  editArticle: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/`, { method: 'put', data });
  },
  lockArticle: articleId => fetchInstance.request(`/articles/${articleId}/lock/`),
  getArticleHistory: articleId => fetchInstance.request(`/articles/${articleId}/states`),
  createArticleAttachment: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/attachments/`, { method: 'post', data }),
  editArticleAttachment: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/attachments/`, { method: 'put', data }),
  createBlocks: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/blocks/`, { method: 'post', data }),
  editBlocks: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/blocks/`, { method: 'put', data }),
  getFinancingSources: (articleId, params) =>
    fetchInstance.request(`/articles/${articleId}/financing/`, { params }),
  createFinancingSources: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/financing/`, { method: 'post', data }),
  editFinancingSources: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/financing/`, { method: 'put', data });
  },
  editFinancingSource: (id, data) => {
    return fetchInstance.request(`/financing/${id}/`, { method: 'put', data });
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

  getLawtypes: () => fetchInstance.request('/lawtypes/'),

  editInviteArticleReviewer: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/reviews/invite/`, {
      method: 'put',
      data
    });
  },
  getReviewInvites: params => {
    return fetchInstance.request('/reviews/invites/', { params });
  },
  editReviewInvite: (id, data) => fetchInstance.request(`/reviews/invites/${id}/`, { method: 'put', data }),
  removeReviewInvite: id => fetchInstance.request(`/reviews/invites/${id}/`, { method: 'delete' }),
  createArticleTranslation: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/translations/${data.language_code}/`, {
      method: 'post',
      data
    });
  },
  getArticleTranslation: (articleId, languageCode = null) => {
    const tail = languageCode !== null ? `${languageCode}/` : '';
    return fetchInstance.request(`/articles/${articleId}/translations/${tail}`);
  },
  editArticleTranslation: (articleId, data) => {
    return fetchInstance.request(
      `/articles/${articleId}/translations/${data.language_code}/`,
      { method: 'put', data }
    );
  },
  commitArticleTranslation: (articleId, languageCode) => {
    return fetchInstance.request(`/articles/${articleId}/translations/${languageCode}/commit/`, { method: 'post' });
  },
  getDiscountsInfo: userId =>
    fetchInstance.request(`users/${userId}/balance`),
  transferBonus: data =>
    fetchInstance.request('users/balance/transfer/', { method: 'post', data }),

  createArticleReview: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/reviews/`, {
      method: 'post',
      data
    }),
  editArticleReview: (articleId, reviewId, data) => {
    return fetchInstance.request(
      `/articles/${articleId}/reviews/${reviewId}/`,
      { method: 'put', data }
    );
  },
  getArticleTags: (params) => fetchInstance.request('articles/tags/', { params }),
  getUserTags: (params) => fetchInstance.request('users/tags/', { params }),

  getReviews: (articleId = null, reviewId = null, params) => {
    const tail = reviewId !== null ? `reviews/${reviewId}/` : '';
    return fetchInstance.request(`/articles/${articleId}/${tail}`, { params });
  },
  getAvailableRoles: (siteId) => fetchInstance.request(`sites/${siteId}/author-roles/`),
  createArticlePrinted: (articleId, data) => fetchInstance.request(`/articles/${articleId}/printed/`, { method: 'post', data }),
  editArticlePrinted: (articleId, data) => {
    return fetchInstance.request(`articles/${articleId}/printed/`, { method: 'put', data })
  },
  getPrinted: (articleId, printedId=null) => {
    const tail = printedId !== null ? `${printedId}/` : '';
    return fetchInstance.request(`/articles/${articleId}/printed/${tail}`);
  },
};

fetchInstance.instance.interceptors.response.use(null, error => {
  if (error.config && error.response && error.response.status === 403) {
    if (process.env.NODE_ENV === 'production') {
      Cookies.remove('csrftoken');
      Cookies.remove('sessionid');
      window.location.replace('/');
    }
  }
  return Promise.reject(error);
});

export default apiClient;
