import { createSelector } from 'reselect';
import * as entityNormalize from '~/utils/entityNormalize';

const articlesSelector = state => state.articles;
const paginateSelector = state => state.paginate;

export const getFilteredArticlesArray = createSelector(
  articlesSelector, paginateSelector,
  (articles, paginate) => {
    const { current, size } = paginate;
    const start = (current-1) * size;
    const end = start + size;
    const ids = articles.ids.slice(start, end);
    console.log({
      current,
      size,
      array: ids,
    });
    return entityNormalize.toArray(articles.data, ids);
  }
);
