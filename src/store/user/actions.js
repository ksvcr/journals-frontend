import apiClient from '~/services/apiClient';
import { LOGIN, LOGOUT, FETCH_CURRENT_USER, UPDATE_CURRENT_USER,
         SET_CONTROLLED_USER, FETCH_CONTROLLED_USER, RESET_CONTROLLED_USER } from './constants';

export function login() {
  return (dispatch) => {
    const payload = apiClient.login({
      email: prompt('Email', ''),
      password: prompt('Пароль', '')
    });
    return dispatch({
      type: LOGIN,
      payload
    }).catch(error => console.error(error));
  }
}

export function fetchCurrentUser() {
  return (dispatch) => {
    const payload = apiClient.getCurrentUser();
    return dispatch({
      type: FETCH_CURRENT_USER,
      payload
    }).catch(error => console.error(error));
  }
}

export function updateCurrentUser(data) {
  return (dispatch) => {
    const payload = apiClient.updateCurrentUser(data);
    return dispatch({
      type: UPDATE_CURRENT_USER,
      payload
    }).catch(error => console.error(error));
  }
}

export function logout() {
  return (dispatch) => {
    const payload = apiClient.logout();
    return dispatch({
      type: LOGOUT,
      payload
    }).catch(error => console.error(error));
  }
}

export function fetchControlledUser(id) {
  return dispatch => {
    const payload = apiClient.getUsers(null, id);
    return dispatch({
      type: FETCH_CONTROLLED_USER,
      payload
    }).catch(error => console.error(error));
  };
}

export function setControlledUser(id) {
  localStorage.setItem('controlledUser', id);
  return {
    type: SET_CONTROLLED_USER,
    id
  };
}

export function resetControlledUser() {
  localStorage.removeItem('controlledUser');
  return {
    type: RESET_CONTROLLED_USER
  };
}
