import { FETCH_RUBRICS } from './constants';
import apiClient from '~/services/apiClient';

export function fetchRubrics(siteId=null) {
  return (dispatch) => {
    const payload = apiClient.getRubrics(siteId);
    return dispatch({
      type: FETCH_RUBRICS,
      payload
    }).catch((error) => console.log(error));
  }
}
