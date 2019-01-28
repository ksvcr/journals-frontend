export default function getCookies() {
  return document.cookie.split(';').reduce((cookies, cookie) => {
    const [key, value] = cookie.trim().split('=', 2);
    return {
      ...cookies,
      [key]: value
    };
  }, {});
}
