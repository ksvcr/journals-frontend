import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import Articles from '~/containers/Articles';
import ArticlePublish from '~/containers/ArticlePublish';
import ArticlePreview from '~/containers/ArticlePreview';
import Editor from '~/containers/Editor';
import AuthorSettings from '~/containers/AuthorSettings';

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Articles } />
      <Route path="/publish" component={ ArticlePublish } />
      <Route path="/edit/:articleId" component={ ArticlePublish } />
      <Route path="/article/:articleId" component={ ArticlePreview } />
      <Route path="/editor" component={ Editor } />
      <Route path="/settings" component={ AuthorSettings } />
      <Route component={ Articles } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
