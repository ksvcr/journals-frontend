import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: process.env.REACT_APP_API_URL
});

const apiClient = {
  login: (data) => fetchInstance.request(`/users/auth/login/`, { method: 'post', data }),
  getSites: () => fetchInstance.request(`/sites/`),
  getLanguages: () => fetchInstance.request(`/languages/`),
  getRubrics: (siteId) => fetchInstance.request(`/sites/${siteId}/rubrics/`),
  getCategories: (siteId) => fetchInstance.request(`/sites/${siteId}/category/`),
  getCurrentUser: () => fetchInstance.request(`/users/me/`),
  getUsers: (params) => fetchInstance.request(`/users/`, { params }),
  createUser: (data) => fetchInstance.request(`/users/auth/register/`, { method: 'post', data }),
  getArticles: (siteId, params) => {
    const sitePrefix = siteId ? `sites/${siteId}` : '';
    return fetchInstance.request(`${sitePrefix}/articles/`, { params });
  },
  createArticle: (siteId, data) => {
    const sitePrefix = siteId ? `sites/${siteId}` : '';
    return fetchInstance.request(`${sitePrefix}/articles/`, { method: 'post', data });
  }
};

export default apiClient;
