import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const countriesSelector = state => state.countries;

export const getCountriesArray = createSelector(
  countriesSelector,
  countries => {
    return entityNormalize.toArray(countries.data, countries.ids);
  }
);
