import React from 'react'
import { Route, Switch } from 'react-router'
import { hot } from 'react-hot-loader';

import Page from './containers/Page/Page';
import Main from './containers/Main';
import Second from './containers/Second';

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Main } />
      <Route exact path="/second" component={ Second } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
