import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';

const printedSelector = state => state.printed;

export const getPrintedArray = createSelector(
  printedSelector,
  printed => {
    return entityNormalize.toArray(printed.data, printed.ids);
  }
);
