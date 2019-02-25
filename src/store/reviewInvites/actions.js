import { EDIT_REVIEW_INVITE, FETCH_REVIEW_INVITES, REMOVE_REVIEW_INVITE } from './constants';
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

export function removeReviewInvite(id, article) {
  return (dispatch) => {
    const payload = apiClient.removeReviewInvite(id);
    return dispatch({
      type: REMOVE_REVIEW_INVITE,
      meta: { id, article },
      payload
    }).catch(error => console.error(error));
  }
}

export function editReviewInvite(id, data) {
  return (dispatch) => {
    const payload = apiClient.editReviewInvite(id, data);
    return dispatch({
      type: EDIT_REVIEW_INVITE,
      payload
    }).catch(error => console.error(error));
  }
}
