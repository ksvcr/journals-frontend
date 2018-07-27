import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'connected-react-router'

import store from './store/index';
import Routes from './routes';

const history = createBrowserHistory();

render(
  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
