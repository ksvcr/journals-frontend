import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import AuthorArticles from '~/containers/AuthorArticles';
import ArticlePublish from '~/containers/ArticlePublish';

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ AuthorArticles } />
      <Route path="/publish" component={ ArticlePublish } />
      <Route path="/edit/:articleId" component={ ArticlePublish } />
      <Route component={ AuthorArticles } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
