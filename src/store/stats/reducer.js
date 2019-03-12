import { FETCH_STATISTIC, FETCH_STATISTIC_COUNTER } from './constants';
import * as entityNormalize from '~/utils/entityNormalize';

const initialState = {
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  error: null,
  data: {},
  counter: 0
};

function stats(state = initialState, action) {
  switch (action.type) {
    case `${FETCH_STATISTIC}_PENDING`:
      return {
        ...state,
        isPending: true
      };

    case `${FETCH_STATISTIC}_REJECTED`:
      return {
        ...state,
        isRejected: true,
        isPending: false,
        error: action.payload
      };

    case `${FETCH_STATISTIC}_FULFILLED`:
      const { month, year } = action.meta;
      const entity = entityNormalize.toObject(action.payload.results);

      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        data: {
          ...state.data,
          [year]: {
            ...state.data[year],
            [month]: {
              count: action.payload.count,
              ...entity
            },
          },
        },
      };

    case `${FETCH_STATISTIC_COUNTER}_FULFILLED`:
      const counter = action.payload.monthes.reduce((sum, v) => {
        return sum + v.characters_count;
      }, 0);

      return {
        ...state,
        counter
      }

    default:
      return state;
  }
}

export default stats;
