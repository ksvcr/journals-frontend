import { FETCH_REVIEW_INVITES } from './constants';
import apiClient from '~/services/apiClient';

export function fetchReviewInvites(params) {
  return (dispatch) => {
    const payload = apiClient.getReviewInvites(params);
    return dispatch({
      type: FETCH_REVIEW_INVITES,
      payload
    }).catch(error => console.error(error));
  }
}
