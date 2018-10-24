import { FETCH_USERS, SEARCH_USERS } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: [],
  searchData: {}
};

function users(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_USERS}_PENDING`:
    case `${SEARCH_USERS}_PENDING`:
      return { ...state,
        isPending: true
      };


    case `${FETCH_USERS}_REJECTED`:
    case `${SEARCH_USERS}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_USERS}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);

      return { ...state,
        isPending: false,
        isFulfilled: true,
        ...entity
      };

    case `${SEARCH_USERS}_FULFILLED`:
      const { key } = action.meta;
      return { ...state,
        isPending: false,
        isFulfilled: true,
        searchData: {
          ...state.searchData,
          [ key ]: action.payload.results
        }
      };

    default:
      return state
  }
}

export default users;
