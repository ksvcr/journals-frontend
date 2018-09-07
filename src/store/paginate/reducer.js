import {
  SET_PAGE_SIZE, SET_CURRENT_PAGE
} from './constants';

const initialState = {
  size: 5,
  current: 1
};

function paginate(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_SIZE:
      return { ...state,
        size: action.size };

    case SET_CURRENT_PAGE:
      return { ...state,
        current: action.current };

    default:
      return state
  }
}

export default paginate;
