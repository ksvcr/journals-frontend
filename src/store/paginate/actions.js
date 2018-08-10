import { SET_SIZE, SET_CURRENT } from './constants';

export function setSize(size) {
  return {
    type: SET_SIZE,
    size
  }
}

export function setCurrent(current) {
  return {
    type: SET_CURRENT,
    current
  }
}
