import { FETCH_USERS, FETCH_USER, SEARCH_USERS, CREATE_USER, INSERT_USER } from './constants';
import apiClient from '~/services/apiClient';

export function fetchUsers() {
  return (dispatch) => {
    const payload = apiClient.getUsers();
    return dispatch({
      type: FETCH_USERS,
      payload
    }).catch((error) => console.log(error));
  }
}

export function fetchUser(id) {
  return (dispatch) => {
    const payload = apiClient.getUsers(id);
    return dispatch({
      type: FETCH_USER,
      payload
    }).catch((error) => console.log(error));
  }
}

export function searchUsers(key, params={}) {
  return (dispatch) => {
    const payload = apiClient.getUsers(null, params);
    return dispatch({
      type: SEARCH_USERS,
      meta: { key },
      payload
    }).catch((error) => console.log(error));
  }
}

export function createUser(data) {
  return (dispatch) => {
    const payload = apiClient.createUser(data);
    return dispatch({
      type: CREATE_USER,
      payload
    }).catch((error) => console.log(error));
  }
}

export function insertUser(data) {
  return (dispatch, state) => {
    const { data:userData } = state().users;
    if (!userData[data.id]) {
      return dispatch({
        type: INSERT_USER,
        payload: data
      });
    }
  }
}