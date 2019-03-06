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
    fetchInstance.request('/users/me/statistic', { params }),

  createUserTag: data =>
    fetchInstance.request('/users/tags/', { method: 'post', data }),
  removeUserTag: id =>
    fetchInstance.request(`/users/tags/${id}/`, { method: 'delete' }),

  createSources: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/sources/`, { method: 'post', data }),
  editSource: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/sources/${data.id}/`, { method: 'put', data }),
  removeSource: (articleId, sourceId) =>
    fetchInstance.request(`/articles/${articleId}/sources/${sourceId}/`, { method: 'delete' }),

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
  createArticleAttachment: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/attachments/`, { method: 'post', data }),
  editArticleAttachment: (id, data) =>
    fetchInstance.request(`/articles/attachments/${id}/`, { method: 'put', data }),
  removeArticleAttachment: id =>
    fetchInstance.request(`/articles/attachments/${id}/`, { method: 'delete' }),
  createBlocks: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/blocks/`, { method: 'post', data }),
  editBlocks: (articleId, data) =>
    fetchInstance.request(`/articles/${articleId}/blocks/`, { method: 'put', data }),

  createFinancingSources: data => fetchInstance.request('/financing/', { method: 'post', data }),
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
    return fetchInstance.request(`/articles/${articleId}/translations/`, {
      method: 'post',
      data
    });
  },
  getArticleTranslation: (articleId, languageCode = null) => {
    const tail = languageCode !== null ? `${languageCode}/` : '';
    return fetchInstance.request(`/articles/${articleId}/translations/${tail}`);
  },
  editArticleTranslation: (articleId, languageCode, data) => {
    return fetchInstance.request(
      `/articles/${articleId}/translations/${languageCode}/`,
      { method: 'put', data }
    );
  },
  getDiscountsInfo: userId =>
    fetchInstance.request(`users/${userId}/balance`, { method: 'get' }),
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

  getReviews: (articleId = null, reviewId = null, params) => {
    const tail = reviewId !== null ? `reviews/${reviewId}/` : '';
    return fetchInstance.request(`/articles/${articleId}/${tail}`, { params });
  },
  createArticlePrinted: (articleId, data) => fetchInstance.request(`/articles/${articleId}/printed/`, { method: 'post', data }),
  editArticlePrinted: (articleId, printedId, data) => {
    return fetchInstance.request(`articles/${articleId}/printed/${printedId}/`, { method: 'put', data })
  },
  removeArticlePrinted: (articleId, printedId) => {
    return fetchInstance.request(`articles/${articleId}/printed/${printedId}/`, { method: 'delete' })
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
      window.location.replace('/');
    }
  }
  return Promise.reject(error);
});

export default apiClient;
