import moment from 'moment';

export default function formatDate(date) {
  const parsedDate = moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS);
  return parsedDate.format('DD.MM.YYYY');
}
