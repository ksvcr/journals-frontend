import {FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';

// import fetchService from '~/utils/fetchService';
// const fetchInstance = new fetchService();
// fetchInstance.request(`https://next.json-generator.com/api/json/get/NkgYgGD_S`);

export function fetchArticles(params={}) {
  return (dispatch, state) => {
    // const payload = fetchInstance.request(`https://next.json-generator.com/api/json/get/NkgYgGD_S`);
    const { sites } = state();
    const siteId = sites.current;
    const flatParams = Object.keys(params).reduce((result, key) => {
      return { ...result, ...params[key] };
    }, {});

    const payload = apiClient.getArticles(siteId, flatParams);
    return dispatch({
      type: FETCH_ARTICLES,
      meta: params,
      payload
    }).catch((error) => console.log(error));
  }
}
