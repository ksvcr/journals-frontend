import { FETCH_ROLES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchRoles(siteId) {
  return (dispatch) => {
    const payload = apiClient.getAvailableRoles(siteId);

    return dispatch({
      type: FETCH_ROLES,
      payload
    }).catch(error => console.error(error));
  }
}
