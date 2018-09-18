import {FETCH_ARTICLES} from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  total: 0,
  data: {},
  ids: []
};

function articles(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ARTICLES}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_ARTICLES}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);
      return { ...state,
        isPending: false,
        isFulfilled: true,
        total: action.payload.count,
        ...entity
      };

    case `${FETCH_ARTICLES}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default articles;
