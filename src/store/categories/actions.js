import { FETCH_CATEGORIES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchCategories() {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    const payload = apiClient.getCategories(siteId);
    return dispatch({
      type: FETCH_CATEGORIES,
      payload
    }).catch((error) => console.log(error));
  }
}
