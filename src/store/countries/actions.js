import { FETCH_COUNTRIES } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchCountries(params={}) {
  return (dispatch, state) => {
    const { ids } = state().countries;
    if (ids.length) {
      return Promise.resolve();
    } else {
      const flatParams = getFlatParams(params);
      const payload = apiClient.getCountries(flatParams);
      return dispatch({
        type: FETCH_COUNTRIES,
        payload
      }).catch((error) => {
        console.log(error);
      });
    }
  }
}
