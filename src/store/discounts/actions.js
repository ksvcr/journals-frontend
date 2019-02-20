import { FETCH_DISCOUNTS, TRANSFER_BONUS } from "./constants";
import apiClient from "~/services/apiClient";

export function fetchDiscounts() {
  return (dispatch, state) => {
    const { user } = state();
    const { id: userId } = user.data;
    const payload = apiClient.getDiscountsInfo(userId);
    return dispatch({
      type: FETCH_DISCOUNTS,
      payload
    }).catch(error => console.log(error));
  };
}

export function transfer(data) {
  return dispatch => {
    const payload = apiClient.transferBonus(data);
    return dispatch({
      type: TRANSFER_BONUS,
      payload
    })
      .then(() => dispatch(fetchDiscounts()))
      .catch(error => console.log(error));
  };
}
