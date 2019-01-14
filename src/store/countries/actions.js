import { FETCH_COUNTRIES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchCountries() {
  return (dispatch) => {
    const COUNTRIES_LIMIT = 200;
    const payload = apiClient.getCountries({ limit: COUNTRIES_LIMIT });
    return dispatch({
      type: FETCH_COUNTRIES,
      payload
    }).catch(error => console.error(error));
  }
}
