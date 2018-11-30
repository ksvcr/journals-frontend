import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import AuthorArticles from '~/containers/AuthorArticles';
import ArticlePublish from '~/containers/ArticlePublish';
import ArticlePreview from '~/containers/ArticlePreview';
import Editor from '~/containers/Editor';

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ AuthorArticles } />
      <Route path="/publish" component={ ArticlePublish } />
      <Route path="/edit/:articleId" component={ ArticlePublish } />
      <Route path="/article/:articleId" component={ ArticlePreview } />
      <Route path="/editor" component={ Editor } />
      <Route component={ AuthorArticles } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
