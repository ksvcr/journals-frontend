import { FETCH_CATEGORIES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchCategories(siteId=null) {
  return (dispatch) => {
    const payload = apiClient.getCategories(siteId);
    return dispatch({
      type: FETCH_CATEGORIES,
      payload
    }).catch(error => console.error(error));
  }
}
