import {
  SET_PAGE_LIMIT, SET_PAGE_OFFSET, SET_SORT
} from './constants';

const initialState = {
  limit: 5,
  offset: 0,
  sort: null
};

function paginate(state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_LIMIT:
      return { ...state,
        limit: action.limit };

    case SET_PAGE_OFFSET:
      return { ...state,
        offset: action.offset };

    case SET_SORT:
      return { ...state,
        sort: action.sort };

    default:
      return state
  }
}

export default paginate;
