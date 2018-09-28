import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: process.env.REACT_APP_API_URL
});

const apiClient = {
  login: (data) => fetchInstance.request(`/users/auth/login/`, { method: 'post', data }),
  getLanguages: () => fetchInstance.request(`/languages/`),
  getCurrentUser: () => fetchInstance.request(`/users/me/`),
  getSites: () => fetchInstance.request(`/sites/`),
  getArticles: (siteId, params) => {
    const sitePrefix = siteId ? `sites/${siteId}` : '';
    return fetchInstance.request(`${sitePrefix}/articles/`, { params });
  },
};

export default apiClient;
