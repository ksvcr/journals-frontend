import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';
import * as formatDataArray from '~/services/formatDataArray';

const articlesSelector = state => state.articles;
const paginateSelector = state => state.paginate;

export const getArticlesArray = createSelector(
  articlesSelector,
  articles => {
    return entityNormalize.toArray(articles.data, articles.ids);
  }
);

export const getFilteredArticlesArray = createSelector(
  articlesSelector, paginateSelector,
  (articles, paginate) => {
    let dataArray = entityNormalize.toArray(articles.data, articles.ids);
    const { current, size, sort } = paginate;

    if (sort) {
      dataArray= formatDataArray.sort(dataArray, sort);
    }

    dataArray = formatDataArray.slice(dataArray, current, size);

    return dataArray;
  }
);
