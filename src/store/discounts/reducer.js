import { FETCH_DISCOUNTS } from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
  balance: 0,
  users_operations: []
};

function discounts(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_DISCOUNTS}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_DISCOUNTS}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_DISCOUNTS}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        ...action.payload
      };

    default:
      return state;
  }
}

export default discounts;
