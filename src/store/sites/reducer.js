import {FETCH_SITES, SET_CURRENT_SITE} from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  current: null,
  data: {},
  ids: []
};

function sites(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_SITES}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_SITES}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);

      if (!state.current) {
        entity.current = action.payload.results[0].id
      }

      return { ...state,
        isPending: false,
        isFulfilled: true,
        ...entity
      };

    case `${FETCH_SITES}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case SET_CURRENT_SITE:
      return { ...state,
        current: action.current
      };

    default:
      return state
  }
}

export default sites;
