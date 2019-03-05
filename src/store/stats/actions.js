import { FETCH_STATISTIC } from './constants';
import apiClient from '~/services/apiClient';

export function fetchStats(month) {
  return (dispatch, state) => {
    const { user } = state();
    const { id: userId } = user.data;

    const payload = apiClient.getUserStatistics(userId, { month });
    // const fakePayload = new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       count: 0,
    //       next: null,
    //       previous: null,
    //       results: [
    //         {
    //           id: 0,
    //           month: 'Январь'
    //         }
    //       ]
    //     });
    //   }, 300);
    // });

    return dispatch({
      type: FETCH_STATISTIC,
      payload, // TODO: Заменить на payload когда апи будет работать
    }).catch(error => console.log(error));
  };
}
