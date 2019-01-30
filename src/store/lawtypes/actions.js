import { FETCH_LAWTYPES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchLawtypes() {
  return (dispatch) => {
    const payload = apiClient.getLawtypes();
    return dispatch({
      type: FETCH_LAWTYPES,
      payload
    }).catch(error => console.error(error));
  }
}
