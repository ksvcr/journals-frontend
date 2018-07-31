import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from './containers/Page';
import Articles from './containers/Articles';
import ArticlePublish from './containers/ArticlePublish';

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Articles } />
      <Route path="/publish" component={ ArticlePublish } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
