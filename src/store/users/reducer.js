import { FETCH_USERS, SEARCH_USERS, CREATE_USER } from './constants';
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
    case `${CREATE_USER}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_USERS}_REJECTED`:
    case `${SEARCH_USERS}_REJECTED`:
    case `${CREATE_USER}_REJECTED`:
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

    case `${CREATE_USER}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        data: {
          ...state.data,
          [ action.payload.id ]: action.payload
        },
        ids: [ ...state.ids, action.payload.id ]
      };

    default:
      return state
  }
}

export default users;
