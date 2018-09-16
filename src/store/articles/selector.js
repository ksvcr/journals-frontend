import { createSelector } from 'reselect';

import * as entityNormalize from '~/utils/entityNormalize';
import * as formatDataArray from '~/services/formatDataArray';

const articlesSelector = state => state.articles;
const paginateSelector = state => state.paginate;

export const getFilteredArticlesArray = createSelector(
  articlesSelector, paginateSelector,
  (articles, paginate) => {
    let dataArray = entityNormalize.toArray(articles.data, articles.ids);
    const { current, size, sort } = paginate;

    if (sort) {
      dataArray= formatDataArray.sort(dataArray, sort);
    }

    dataArray = formatDataArray.slice(dataArray, current, size);

    console.log({
      current,
      size,
      array: dataArray,
    });
    return dataArray;
  }
);
