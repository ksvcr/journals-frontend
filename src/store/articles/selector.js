import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const articlesSelector = state => state.articles;

export const getArticlesArray = createSelector(
  articlesSelector,
  articles => {
    return entityNormalize.toArray(articles.data, articles.ids);
  }
);
