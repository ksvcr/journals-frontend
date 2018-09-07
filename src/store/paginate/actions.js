import { SET_PAGE_SIZE, SET_CURRENT_PAGE } from './constants';

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
