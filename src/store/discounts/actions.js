import { FETCH_DISCOUNTS } from './constants';
import apiClient from '~/services/apiClient';

export function fetchDiscounts() {
  return (dispatch, state) => {
    const { user } = state();
    const { id:userId } = user.data;
    const payload = apiClient.getDiscountsInfo(userId);
    return dispatch({
      type: FETCH_DISCOUNTS,
      payload
    }).catch(error => console.log(error));
  }
}
