import qs from 'qs';

export default function hasToken() {
  const parsedCookies = qs.parse(document.cookie);
  return parsedCookies.hasOwnProperty('csrftoken');
}
