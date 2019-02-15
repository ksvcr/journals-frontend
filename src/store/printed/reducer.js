import { FETCH_PRINTED } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: [],
};

function printed(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_PRINTED}_FULFILLED`:
      const newEntity = entityNormalize.toObject(action.payload.results);
      return { ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        ...newEntity
      };

    case `${FETCH_PRINTED}_PENDING`:
      return { ...state,
        isPending: true,
        isFulfilled: false,
        isRejected: false,
        ...action.meta
      };

    case `${FETCH_PRINTED}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        isFulfilled: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default printed;
