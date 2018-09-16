import {
  SET_PAGE_SIZE, SET_CURRENT_PAGE, SET_SORT
} from './constants';

const initialState = {
  size: 5,
  current: 1,
  sort: null
};

function paginate(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_SIZE:
      return { ...state,
        size: action.size };

    case SET_CURRENT_PAGE:
      return { ...state,
        current: action.current };

    case SET_SORT:
      return { ...state,
        sort: action.sort };

    default:
      return state
  }
}

export default paginate;
