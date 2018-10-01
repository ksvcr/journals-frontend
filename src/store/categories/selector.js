import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const categoriesSelector = state => state.categories;

export const getCategoriesArray = createSelector(
  categoriesSelector,
  categories => {
    return entityNormalize.toArray(categories.data, categories.ids);
  }
);

export const getRootCategoriesArray = createSelector(
  categoriesSelector,
  categories => {
    return entityNormalize
      .toArray(categories.data, categories.ids)
      .filter(item => !item.parent);
  }
);
