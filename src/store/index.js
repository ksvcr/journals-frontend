import { createStore, applyMiddleware, compose } from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router'
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import rootReducer from './rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default (history) => createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      promiseMiddleware(),
    )
  )
);
