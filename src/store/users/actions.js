import { FETCH_USERS, FETCH_USER, SEARCH_USERS,
         CREATE_USER, INSERT_USER, CREATE_USER_TAG, REMOVE_USER_TAG } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchUsers(params) {
  return (dispatch) => {
    const flatParams = getFlatParams(params);
    const payload = apiClient.getUsers(null, flatParams);
    return dispatch({
      type: FETCH_USERS,
      payload,
      meta: params
    }).catch(error => console.error(error));
  }
}

export function fetchUser(id) {
  return (dispatch) => {
    const payload = apiClient.getUsers(id);
    return dispatch({
      type: FETCH_USER,
      payload
    }).catch(error => console.error(error));
  }
}

export function searchUsers(key, params={}) {
  return (dispatch) => {
    const payload = apiClient.getUsers(null, params);
    return dispatch({
      type: SEARCH_USERS,
      meta: { key },
      payload
    }).catch(error => console.error(error));
  }
}

export function createUser(data) {
  return (dispatch) => {
    const payload = apiClient.createUser(data);
    return dispatch({
      type: CREATE_USER,
      payload
    }).catch(error => console.error(error));
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

export function createUserTag(userId, data) {
  return (dispatch) => {
    const payload = apiClient.createUserTag(userId, data);
    return dispatch({
      type: CREATE_USER_TAG,
      payload
    }).catch(error => console.error(error));
  };
}

export function removeUserTag(userId, id) {
  return (dispatch) => {
    const payload = apiClient.removeUserTag(userId, id);
    return dispatch({
      type: REMOVE_USER_TAG,
      meta: { userId, id },
      payload
    }).catch(error => console.error(error));
  };
}
