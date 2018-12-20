import { FETCH_ARTICLES, FETCH_ARTICLE, CREATE_ARTICLE_TAG, REMOVE_ARTICLE_TAG } from './constants';
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
        isRejected: false,
        ...action.meta
      };

    case `${FETCH_ARTICLES}_REJECTED`:
    case `${FETCH_ARTICLE}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        isFulfilled: false,
        error: action.payload
      };

    case `${FETCH_ARTICLES}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);
      return { ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        total: action.payload.count,
        ...entity
      };

    case `${FETCH_ARTICLE}_FULFILLED`:
      return { ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        data: { ...state.data,
          [ action.payload.id ]: action.payload
        },
        ids: [ ...state.ids, action.payload.id ]
      };

    case `${CREATE_ARTICLE_TAG}_FULFILLED`:
      const oldTags = state.data[action.payload.article].tags || [];
      return { ...state,
        data: { ...state.data,
          [ action.payload.article ]: {
            ...state.data[action.payload.article],
            tags: [ ...oldTags, action.payload]
          }
        }
      };

    case `${REMOVE_ARTICLE_TAG}_PENDING`:
      return { ...state,
        data: { ...state.data,
          [ action.meta.articleId ]: {
            ...state.data[action.meta.articleId],
            tags: state.data[action.meta.articleId].tags.filter((item) => item.id !== action.meta.id)
          }
        }
      };

    default:
      return state
  }
}

export default articles;
