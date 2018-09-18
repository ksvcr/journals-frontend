import {FETCH_SITES, SET_CURRENT_SITE} from './constants';
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

export function setCurrent(current) {
  return {
    type: SET_CURRENT_SITE,
    current
  }
}
