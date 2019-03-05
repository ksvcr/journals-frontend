import { FETCH_STATISTIC } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
  data: {},
  ids: [],
  total: 0,
};

function stats(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_STATISTIC}_PENDING`:
      return {
        ...state,
        isPending: true
      };

    case `${FETCH_STATISTIC}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_STATISTIC}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        total: action.payload.count,
        ...entity
      };

    default:
      return state;
  }
}

export default stats;
