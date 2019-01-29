import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';

const usersSelector = state => state.users;

export const getUsersArray = createSelector(
  usersSelector,
  users => {
    return entityNormalize.toArray(users.data, users.ids);
  }
);

export const getUsersParams = createSelector(
  usersSelector,
  users => {
    const { paginate, filter, search, ordering } = users;
    return { paginate, filter, search, ordering };
  }
);
