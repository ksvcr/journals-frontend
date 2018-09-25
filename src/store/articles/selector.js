import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';

const articlesSelector = state => state.articles;
const paginateSelector = state => state.paginate;

export const getArticlesArray = createSelector(
  articlesSelector,
  articles => {
    return entityNormalize.toArray(articles.data, articles.ids);
  }
);

export const getArticlesParams = createSelector(
  articlesSelector, paginateSelector,
  articles => {
    const { paginate, filter, search, ordering } = articles;
    return { paginate, filter, search, ordering };
  }
);
