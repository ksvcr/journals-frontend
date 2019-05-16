import { FETCH_CONTROLLED_USER, FETCH_CURRENT_USER, LOGIN,
         SET_CONTROLLED_USER, UPDATE_CURRENT_USER, RESET_CONTROLLED_USER } from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  controlledUser: localStorage.getItem('controlledUser') || null,
  controlledData: null
};

function user(state = initialState, action) {
  switch (action.type) {
    case `${LOGIN}_PENDING`:
    case `${FETCH_CURRENT_USER}_PENDING`:
    case `${UPDATE_CURRENT_USER}_PENDING`:
    case `${FETCH_CONTROLLED_USER}_PENDING`:
      return {
        ...state,
        isPending: true
      };

    case `${LOGIN}_FULFILLED`:
    case `${FETCH_CURRENT_USER}_FULFILLED`:
    case `${UPDATE_CURRENT_USER}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        data: action.payload
      };

    case `${LOGIN}_REJECTED`:
    case `${FETCH_CURRENT_USER}_REJECTED`:
    case `${UPDATE_CURRENT_USER}_REJECTED`:
    case `${FETCH_CONTROLLED_USER}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_CONTROLLED_USER}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        controlledData: action.payload
      };

    case SET_CONTROLLED_USER:
      return {
        ...state,
        controlledUser: action.id
      };

    case RESET_CONTROLLED_USER:
      return {
        ...state,
        controlledUser: null,
        controlledData: null
      };

    default:
      return state;
  }
}

export default user;
