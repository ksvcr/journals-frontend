import apiClient from '~/services/apiClient';
import { LOGIN, FETCH_CURRENT_USER } from './constants';

export function login() {
  return (dispatch) => {
    const payload = apiClient.login({
      email: 'test@test.ru',
      password: 'qwer1234'
    });
    return dispatch({
      type: LOGIN,
      payload
    }).catch((error) => console.log(error));
  }
}

export function fetchCurrentUser() {
  return (dispatch) => {
    const payload = apiClient.getCurrentUser();
    return dispatch({
      type: FETCH_CURRENT_USER,
      payload
    }).catch((error) => console.log(error));
  }
}
