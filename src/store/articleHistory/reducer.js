import {
  FETCH_ARTICLE_HISTORY
} from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {}
};

function articleHistory(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ARTICLE_HISTORY}_PENDING`:
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };

    case `${FETCH_ARTICLE_HISTORY}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        isFulfilled: false,
        error: action.payload
      };

    case `${FETCH_ARTICLE_HISTORY}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        data: {
          ...state.data,
          [action.meta.article]: action.payload.results
        }
      };

    default:
      return state;
  }
}

export default articleHistory;
