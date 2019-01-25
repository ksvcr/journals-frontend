import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';

const reviewInvitesSelector = state => state.reviewInvites;

export const getReviewInvitesArray = createSelector(
  reviewInvitesSelector,
  reviewInvites => {
    return entityNormalize.toArray(reviewInvites.data, reviewInvites.ids);
  }
);
