import { FETCH_REVIEW } from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: []
};

function reviews(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_REVIEW}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_REVIEW}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        data: { ...state.data,
          [ action.payload.id ]: action.payload
        },
        ids: [ ...state.ids, action.payload.id ]
      };

    case `${FETCH_REVIEW}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default reviews;
