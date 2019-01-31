import apiClient from '~/services/apiClient';
import { FETCH_REVIEW } from './constants';

export function fetchReview(articleId, reviewId) {
  return (dispatch) => {
    const payload = apiClient.getReviews(articleId, reviewId);
    return dispatch({
      type: FETCH_REVIEW,
      payload
    }).catch(error => console.error(error));
  }
}
