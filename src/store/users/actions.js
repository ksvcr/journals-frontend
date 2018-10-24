import { FETCH_USERS, SEARCH_USERS } from './constants';
import apiClient from '~/services/apiClient';

export function fetchUsers() {
  return (dispatch, state) => {
    const { ids } = state().users;
    if (ids.length) {
      return Promise.resolve();
    } else {
      const payload = apiClient.getUsers();
      return dispatch({
        type: FETCH_USERS,
        payload
      }).catch((error) => console.log(error));
    }
  }
}

export function searchUsers(key, params={}) {
  return (dispatch) => {
    const payload = apiClient.getUsers(params);
    return dispatch({
      type: SEARCH_USERS,
      meta: { key },
      payload
    }).catch((error) => console.log(error));
  }
}
