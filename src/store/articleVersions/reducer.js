import { FETCH_ARTICLE_VERSION } from './constants';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {}
};

function articleVersions(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ARTICLE_VERSION}_PENDING`:
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false
      };

    case `${FETCH_ARTICLE_VERSION}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        isFulfilled: false,
        error: action.payload
      };

    case `${FETCH_ARTICLE_VERSION}_FULFILLED`:
      const { article, version } = action.meta;
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        data: {
          ...state.data,
          [`${article}-${version}`]: action.payload.data
        }
      };

    default:
      return state;
  }
}

export default articleVersions;
