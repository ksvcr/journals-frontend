import orderBy from 'lodash/orderBy';

import * as formatDate from '~/services/formatDate';
import getArticleStatusTitle from '~/services/getArticleStatusTitle';

export function slice(array, current, size) {
  const start = (current-1) * size;
  const end = start + size;

  return array.slice(start, end);
}

export function sort(array, sortParams) {
  const { field, type, order } = sortParams;

  return orderBy(array, (item) => {
    switch (type) {
      case 'date':
        return formatDate.toUnix(item[field]);

      case 'status':
        return getArticleStatusTitle(item[field]);

      default:
        return item[field];
    }

  }, order);
}
