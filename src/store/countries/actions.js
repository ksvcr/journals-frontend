import { FETCH_COUNTRIES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchCountries() {
  return (dispatch, state) => {
    const { ids } = state().countries;
    if (ids.length) {
      return Promise.resolve();
    } else {
      const payload = apiClient.getCountries({ limit: 500 });
      return dispatch({
        type: FETCH_COUNTRIES,
        payload
      }).catch(error => console.error(error));
    }
  }
}
