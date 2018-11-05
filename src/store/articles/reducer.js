import { FETCH_ARTICLES, FETCH_ARTICLE } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: [],
  total: 0,
  paginate: {
    limit: 5,
    offset: 0,
  }
};

function articles(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ARTICLES}_PENDING`:
    case `${FETCH_ARTICLE}_PENDING`:
      return { ...state,
        isPending: true,
        ...action.meta
      };

    case `${FETCH_ARTICLES}_REJECTED`:
    case `${FETCH_ARTICLE}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_ARTICLES}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);
      return { ...state,
        isPending: false,
        isFulfilled: true,
        total: action.payload.count,
        ...entity
      };

    case `${FETCH_ARTICLE}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        data: { ...state.data,
          [ action.payload.id ]: action.payload
        },
        ids: [ ...state.ids, action.payload.id ]
      };

    default:
      return state
  }
}

export default articles;
