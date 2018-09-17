import {FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';
// import fetchService from '~/utils/fetchService';

// const fetchInstance = new fetchService();
// fetchInstance.request(`https://next.json-generator.com/api/json/get/NkgYgGD_S`);

export function fetchArticles(siteId) {
  return (dispatch) => {
    // const payload = fetchInstance.request(`https://next.json-generator.com/api/json/get/NkgYgGD_S`);
    const payload = apiClient.getArticles(siteId);
    return dispatch({
      type: FETCH_ARTICLES,
      payload
    }).catch((error) => console.log(error));
  }
}
