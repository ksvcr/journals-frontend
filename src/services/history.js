import { createBrowserHistory } from 'history';

const historyConfig = {};

if (process.env.PUBLIC_URL) {
  historyConfig.basename = process.env.PUBLIC_URL;
}

export default createBrowserHistory(historyConfig);
