import { FETCH_COUNTRIES } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchCountries(params={}) {
  return (dispatch) => {
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
