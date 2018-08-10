import {
  SET_SIZE, SET_CURRENT
} from './constants';

const initialState = {
  size: 5,
  current: 1
};

function paginate(state = initialState, action) {
  switch (action.type) {
    case SET_SIZE:
      return { ...state,
        size: action.size };

    case SET_CURRENT:
      return { ...state,
        current: action.current };

    default:
      return state
  }
}

export default paginate;
