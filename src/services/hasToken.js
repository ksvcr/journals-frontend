import getCookies from "./getCookies";

export default function hasToken() {
  const cookies = getCookies();
  return cookies.hasOwnProperty('csrftoken');
}
