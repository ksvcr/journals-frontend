import { FETCH_USERS, FETCH_USER, SEARCH_USERS,
        CREATE_USER, INSERT_USER, CREATE_USER_TAG, REMOVE_USER_TAG } from './constants';
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
    case `${FETCH_USER}_PENDING`:   
      return { ...state,
        isPending: true
      };

    case `${FETCH_USERS}_REJECTED`:
    case `${SEARCH_USERS}_REJECTED`:
    case `${CREATE_USER}_REJECTED`:
    case `${FETCH_USER}_REJECTED`:
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

    case `${FETCH_USER}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        data: { ...state.data,
          [ action.payload.id ]: action.payload
        },
        ids: [ ...state.ids, action.payload.id ]
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

    case INSERT_USER:
      return { ...state,
        data: {
          ...state.data,
          [ action.payload.id ]: action.payload
        },
        ids: [ ...state.ids, action.payload.id ]
      };

    case `${CREATE_USER_TAG}_FULFILLED`:
      const oldTags = state.data[action.payload.user].tags || [];
      return { ...state,
        data: { ...state.data,
          [ action.payload.user ]: {
            ...state.data[action.payload.user],
            tags: [ ...oldTags, action.payload]
          }
        }
      };

    case `${REMOVE_USER_TAG}_PENDING`:
      return { ...state,
        data: { ...state.data,
          [ action.meta.userId ]: {
            ...state.data[action.meta.userId],
            tags: state.data[action.meta.userId].tags.filter((item) => item.id !== action.meta.id)
          }
        }
      };

    default:
      return state
  }
}

export default users;
