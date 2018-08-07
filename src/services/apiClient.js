import fetchService from '~/utils/fetchService';

const fetchInstance = new fetchService({
  baseURL: '/api'
});

const apiClient = {
  getSites: () => fetchInstance.request(`/sites`),
  login: (siteId, data) => fetchInstance.request(`sites/${siteId}/users/auth/login/`, { method: 'post', data })
};

export default apiClient;
