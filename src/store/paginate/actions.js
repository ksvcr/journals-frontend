import { SET_PAGE_LIMIT, SET_PAGE_OFFSET, SET_SORT } from './constants';

export function setLimit(limit) {
  return {
    type: SET_PAGE_LIMIT,
    limit
  }
}

export function setOffset(offset) {
  return {
    type: SET_PAGE_OFFSET,
    offset
  }
}

export function setSort(sort) {
  return {
    type: SET_SORT,
    sort
  }
}
