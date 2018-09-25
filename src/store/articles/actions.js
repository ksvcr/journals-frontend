import {FETCH_ARTICLES} from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchArticles(params={}) {
  return (dispatch, state) => {
    const { sites } = state();
    const siteId = sites.current;
    const flatParams = getFlatParams(params);

    const payload = apiClient.getArticles(siteId, flatParams);
    return dispatch({
      type: FETCH_ARTICLES,
      meta: params,
      payload
    }).catch((error) => console.log(error));
  }
}
