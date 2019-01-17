import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

import store from './store/index';
import Routes from './routes';

const historyConfig = {};

if (process.env.PUBLIC_URL) {
  historyConfig.basename = process.env.PUBLIC_URL;
}

const history = createBrowserHistory(historyConfig);

render(
  <Provider store={ store(history) }>
    <ConnectedRouter history={ history }>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
