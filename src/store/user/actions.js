import apiClient from '~/services/apiClient';
import { LOGIN } from './constants';

export function login() {
  return (dispatch, state) => {
    const { id:siteId } = state().sites.data[0];
    const payload = apiClient.login(siteId, {
      email: 'kuklin@jetstyle.ru',
      password: 'q1w2e3r4'
    });
    return dispatch({
      type: LOGIN,
      payload: payload
    }).catch((error) => console.log(error));
  }
}
