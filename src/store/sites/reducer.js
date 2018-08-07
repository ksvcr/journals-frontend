import {FETCH_SITES} from '~/store/sites/constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {}
};

function page(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_SITES}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_SITES}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        data: action.payload.results
      };

    case `${FETCH_SITES}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default page;
