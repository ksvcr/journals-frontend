import apiClient from '~/services/apiClient';
import { LOGIN, FETCH_CURRENT_USER, UPDATE_CURRENT_USER } from './constants';

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
