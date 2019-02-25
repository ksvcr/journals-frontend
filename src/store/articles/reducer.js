import uniqBy from 'lodash/uniqBy';
import { FETCH_ARTICLES, FETCH_ARTICLE, CREATE_ARTICLE_TAG, FETCH_ARTICLE_REVIEW_INVITES,
         REMOVE_ARTICLE_TAG, INVITE_ARTICLE_REVIEWER, RESET_ARTICLES, ACCEPT_ARTICLE_REVIEW_INVITE,
         EDIT_ARTICLE, CREATE_ARTICLE, FETCH_ARTICLE_TRANSLATION } from './constants';
import { CREATE_USER_TAG, REMOVE_USER_TAG } from '~/store/users/constants';
import { REMOVE_REVIEW_INVITE } from '~/store/reviewInvites/constants';

import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  data: {},
  ids: [],
  total: 0,
  reviewers: {},
  paginate: {
    limit: 5,
    offset: 0
  }
};

function articles(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_ARTICLES}_PENDING`:
    case `${FETCH_ARTICLE}_PENDING`:
      return {
        ...state,
        isPending: true,
        isRejected: false,
        ...action.meta
      };

    case `${FETCH_ARTICLES}_REJECTED`:
    case `${FETCH_ARTICLE}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        isFulfilled: false,
        error: action.payload
      };

    case `${FETCH_ARTICLES}_FULFILLED`:
      const entity = entityNormalize.toObject(action.payload.results);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        total: action.payload.count,
        ...entity
      };

    case `${FETCH_ARTICLE}_FULFILLED`:
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        data: {
          ...state.data,
          [action.payload.id]: action.payload
        },
        ids: [...state.ids, action.payload.id]
      };

    case `${CREATE_ARTICLE_TAG}_FULFILLED`:
      const oldTags = state.data[action.payload.article].tags || [];
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.article]: {
            ...state.data[action.payload.article],
            tags: [...oldTags, action.payload]
          }
        }
      };

    case `${REMOVE_ARTICLE_TAG}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.articleId]: {
            ...state.data[action.meta.articleId],
            tags: state.data[action.meta.articleId].tags.filter(
              item => item.id !== action.meta.id
            )
          }
        }
      };

    case `${INVITE_ARTICLE_REVIEWER}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.articleId]: {
            ...state.data[action.meta.articleId],
            stage: 'REVISION',
            state_article: 'AWAIT_REVIEWER'
          }
        }
      };

    case `${ACCEPT_ARTICLE_REVIEW_INVITE}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.articleId]: {
            ...state.data[action.meta.articleId],
            stage: 'REVISION',
            state_article: 'AWAIT_REVIEW'
          }
        }
      };

    case `${EDIT_ARTICLE}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.articleId]: {
            ...state.data[action.meta.articleId],
            ...action.meta.data
          }
        }
      };

    case `${FETCH_ARTICLE_REVIEW_INVITES}_FULFILLED`:
      const invitedReviewers = uniqBy(action.payload.results, item => item.reviewer.id).map(item => item.reviewer);
      const invitedReviewersData = entityNormalize.toObject(invitedReviewers).data;
      return {
        ...state,
        reviewers: invitedReviewersData,
        data: {
          ...state.data,
          [ action.meta.article ]: {
            ...state.data[action.meta.article],
            reviewInvites: action.payload.results
          }
        }
      };

    case `${REMOVE_REVIEW_INVITE}_PENDING`:
      return {
        ...state,
        data: {
          ...state.data,
          [ action.meta.article ]: {
            ...state.data[action.meta.article],
            reviewInvites:
              state.data[action.meta.article].reviewInvites.filter(item => item.id !== action.meta.id)
          }
        }
      };

    case `${CREATE_USER_TAG}_FULFILLED`:
      const oldReviewerTags = (state.reviewers[action.meta.user] &&
                               state.reviewers[action.meta.user].tags) || [];
      return {
        ...state,
        reviewers: {
          ...state.reviewers,
          [action.meta.user]: {
            ...state.reviewers[action.meta.user],
            tags: [...oldReviewerTags, action.payload]
          }
        }
      };

    case `${REMOVE_USER_TAG}_PENDING`:
      return {
        ...state,
        reviewers: {
          ...state.reviewers,
          [action.meta.userId]: {
            ...state.reviewers[action.meta.userId],
            tags: state.reviewers[action.meta.userId].tags.filter(
              item => item.id !== action.meta.id
            )
          }
        }
      };

    case `${FETCH_ARTICLE_TRANSLATION}_FULFILLED`:
      return {
        ...state,
        data: {
          ...state.data,
          [action.meta.article]: {
            ...state.data[action.meta.article],
            translation: action.payload
          }
        }
      };

    case `${CREATE_ARTICLE}_FULFILLED`:
    case `${EDIT_ARTICLE}_FULFILLED`:
      return {
        ...state,
        isRejected: false,
        error: null
      };

    case `${CREATE_ARTICLE}_REJECTED`:
    case `${EDIT_ARTICLE}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        error: action.payload
      };

    case `${RESET_ARTICLES}`:
      return initialState;

    default:
      return state;
  }
}

export default articles;
