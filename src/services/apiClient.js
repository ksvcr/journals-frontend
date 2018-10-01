import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: process.env.REACT_APP_API_URL
});

const apiClient = {
  login: (data) => fetchInstance.request(`/users/auth/login/`, { method: 'post', data }),
  getSites: () => fetchInstance.request(`/sites/`),
  getLanguages: () => fetchInstance.request(`/languages/`),
  getRubrics: (siteId) => fetchInstance.request(`/sites/${siteId}/rubrics/`),
  getCurrentUser: () => fetchInstance.request(`/users/me/`),
  getArticles: (siteId, params) => {
    const sitePrefix = siteId ? `sites/${siteId}` : '';
    return fetchInstance.request(`${sitePrefix}/articles/`, { params });
  },
};

export default apiClient;
