import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const statsSelector = state => state.stats;

export const getStatsByDate = (year, month) => createSelector(
  statsSelector,
  stats => {
    try {
      const res = stats.data[year][month];

      return entityNormalize.toArray(res.data, res.ids);
    } catch (err) {
      return false;
    }
  }
);

export const getCountInMonth = (year, month) => createSelector(
  statsSelector,
  stats => {
    try {
      return stats.data[year][month].count;
    } catch (e) {
      return 0;
    }
  }
);
