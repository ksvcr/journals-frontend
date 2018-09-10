import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const sitesSelector = state => state.sites;

export const getSitesArray = createSelector(
  sitesSelector,
  sites => {
    return entityNormalize.toArray(sites.data, sites.ids);
  }
);
