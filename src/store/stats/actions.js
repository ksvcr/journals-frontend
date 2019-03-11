import { FETCH_STATISTIC } from './constants';
import apiClient from '~/services/apiClient';
import getFlatParams from '~/services/getFlatParams';

export function fetchStats(month, year, params) {
  return (dispatch, state) => {
    const flatParams = getFlatParams(params);
    const payload = apiClient.getUserStatistics(flatParams);

    return dispatch({
      type: FETCH_STATISTIC,
      payload,
      meta: { month, year }
    }).catch(error => console.log(error));
  };
}
