import { FETCH_USERS, SEARCH_USERS } from './constants';
import apiClient from '~/services/apiClient';

export function fetchUsers() {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    const payload = apiClient.getUsers(siteId);
    return dispatch({
      type: FETCH_USERS,
      payload
    }).catch((error) => console.log(error));
  }
}

export function searchUsers(key, params={}) {
  return (dispatch, state) => {
    const { current:siteId } = state().sites;
    const payload = apiClient.getUsers(siteId, params);
    return dispatch({
      type: SEARCH_USERS,
      meta: { key },
      payload
    }).catch((error) => console.log(error));
  }
}
