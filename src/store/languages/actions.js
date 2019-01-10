import { FETCH_LANGUAGES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchLanguages() {
  return (dispatch, state) => {
    const { ids } = state().languages;
    if (ids.length) {
      return Promise.resolve();
    } else {
      const payload = apiClient.getLanguages();
      return dispatch({
        type: FETCH_LANGUAGES,
        payload
      }).catch(error => console.error(error));
    }
  }
}
