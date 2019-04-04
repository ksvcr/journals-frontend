import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const rubricsSelector = state => state.rubrics;

export const getRubricsArray = createSelector(
  rubricsSelector,
  rubrics => {
    return entityNormalize.toArray(rubrics.data, rubrics.ids);
  }
);

export const getRootRubricsArray = createSelector(
  rubricsSelector,
  rubrics => {
    return entityNormalize
      .toArray(rubrics.data, rubrics.ids)
      .filter(item => !item.parent);
  }
);
