import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const languagesSelector = state => state.languages;

export const getLanguagesArray = createSelector(
  languagesSelector,
  languages => {
    return entityNormalize.toArray(languages.data, languages.ids);
  }
);
