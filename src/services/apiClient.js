import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: process.env.REACT_APP_API_URL
});

const apiClient = {
  getSites: () => fetchInstance.request(`/sites/`),
  getLanguages: () => fetchInstance.request(`/languages/`),
  getRubrics: (siteId) => fetchInstance.request(`/sites/${siteId}/rubrics/`),
  getCategories: (siteId) => fetchInstance.request(`/sites/${siteId}/category/`),

  login: (data) => fetchInstance.request(`/users/auth/login/`, { method: 'post', data }),
  getCurrentUser: () => fetchInstance.request(`/users/me/`),
  getUsers: (params) => fetchInstance.request(`/users/`, { params }),
  createUser: (data) => fetchInstance.request(`/users/auth/register/`, { method: 'post', data }),

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
  createBlockGroup: (articleId, data) => {
    return fetchInstance.request(`/articles/${articleId}/block-group/`, { method: 'post', data });
  }
};

export default apiClient;
