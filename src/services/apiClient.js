const apiRequest = require('~/services/api-request');

const apiClient = {
  getSites: () => apiRequest(`/sites`),
  getArticles: () => apiRequest(`/about`),
};

module.exports = apiClient;
