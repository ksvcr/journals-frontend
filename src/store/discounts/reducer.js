import { FETCH_DISCOUNTS, TRANSFER_BONUS } from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
  message: null,
  balance: 0,
  users_operations: []
};

function discounts(state = initialState, action) {
  switch (action.type) {
    case `${TRANSFER_BONUS}_PENDING`:
    case `${FETCH_DISCOUNTS}_PENDING`:
      return {
        ...state,
        isPending: true
      };

    case `${TRANSFER_BONUS}_REJECTED`:
    case `${FETCH_DISCOUNTS}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${TRANSFER_BONUS}_FULFILLED`:
    case `${FETCH_DISCOUNTS}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        ...action.payload
      };

    default:
      return state;
  }
}

export default discounts;
