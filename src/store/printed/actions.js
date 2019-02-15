import { FETCH_PRINTED } from './constants';
import apiClient from '~/services/apiClient';

export function fetchPrinted(articleId, printedId=null) {
  return (dispatch) => {
    const payload = apiClient.getPrinted(articleId, printedId);
    return dispatch({
      type: FETCH_PRINTED,
      payload
    });
  }
}

