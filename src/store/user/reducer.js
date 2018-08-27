import {FETCH_CURRENT_USER, LOGIN} from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {}
};

function user(state = initialState, action) {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
    case `${FETCH_CURRENT_USER}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${LOGIN}_FULFILLED`:
    case `${FETCH_CURRENT_USER}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        data: action.payload
      };

    case `${LOGIN}_REJECTED`:
    case `${FETCH_CURRENT_USER}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default user;
