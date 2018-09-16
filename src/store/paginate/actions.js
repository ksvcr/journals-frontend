import { SET_PAGE_SIZE, SET_CURRENT_PAGE, SET_SORT } from './constants';

export function setSize(size) {
  return {
    type: SET_PAGE_SIZE,
    size
  }
}

export function setCurrent(current) {
  return {
    type: SET_CURRENT_PAGE,
    current
  }
}

export function setSort(sort) {
  return {
    type: SET_SORT,
    sort
  }
}
