import {FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';
// import fetchService from '~/utils/fetchService';

// const fetchInstance = new fetchService();
// fetchInstance.request(`https://next.json-generator.com/api/json/get/NkgYgGD_S`);

export function fetchArticles() {
  return (dispatch, state) => {
    // const payload = fetchInstance.request(`https://next.json-generator.com/api/json/get/NkgYgGD_S`);
    const { paginate, sites } = state();
    const siteId = sites.current;
    const payload = apiClient.getArticles(siteId, paginate);
    return dispatch({
      type: FETCH_ARTICLES,
      payload
    }).catch((error) => console.log(error));
  }
}
