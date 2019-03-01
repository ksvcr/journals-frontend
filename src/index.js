import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';

import store from './store/index';
import history from './services/history';
import Routes from './routes';

import './services/i18n';

render(
  <Provider store={ store(history) }>
    <ConnectedRouter history={ history }>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
