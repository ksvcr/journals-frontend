export default function getFlatParams(params) {
  return Object.keys(params).reduce((result, key) => {
    if (typeof params[key] === 'object') {
      return { ...result, ...params[key] };
    } else {
      return { ...result, [key]: params[key] };
    }
  }, {});
}
