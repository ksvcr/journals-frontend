import Cookies from 'js-cookie';

export default function hasToken() {
  return Cookies.get('csrftoken');
}
