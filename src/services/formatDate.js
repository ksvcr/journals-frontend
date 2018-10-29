import moment from 'moment';

const DEFAULT_FORMAT = moment.HTML5_FMT.DATETIME_LOCAL_MS;

export function toString(date) {
  const parsedDate = moment(date, DEFAULT_FORMAT);
  return parsedDate.format('DD.MM.YYYY');
}

export function toUnix(date) {
  return moment(date, DEFAULT_FORMAT).unix();
}
