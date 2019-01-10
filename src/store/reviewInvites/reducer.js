import { FETCH_REVIEW_INVITES } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: []
};

function reviewInvites(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_REVIEW_INVITES}_PENDING`:
      return { ...state,
        isPending: true
      };

    case `${FETCH_REVIEW_INVITES}_FULFILLED`:
      const results = action.payload.results.map(item => ({ ...item, articleId: item.article.id }));
      const entity = entityNormalize.toObject(results, 'id', 'articleId');

      return { ...state,
        isPending: false,
        isFulfilled: true,
        ...entity
      };

    case `${FETCH_REVIEW_INVITES}_REJECTED`:
      return { ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    default:
      return state
  }
}

export default reviewInvites;
