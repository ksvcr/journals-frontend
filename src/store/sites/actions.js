import { FETCH_SITES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchSites() {
  return (dispatch) => {
    const payload = apiClient.getSites();
    return dispatch({
      type: FETCH_SITES,
      payload: payload
    }).catch((error) => console.log(error));
  }
}
