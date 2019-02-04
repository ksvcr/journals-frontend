import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';

const lawtypesSelector = state => state.lawtypes;

export const getLawtypesArray = createSelector(
  lawtypesSelector,
  lawtypes => {
    return entityNormalize.toArray(lawtypes.data, lawtypes.ids);
  }
);
