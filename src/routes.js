import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import Articles from '~/containers/Articles';
import ArticlePublish from '~/containers/ArticlePublish';
import ArticlePreview from '~/containers/ArticlePreview';
import AuthorSettings from '~/containers/AuthorSettings';
import ArticlesForReview from '~/containers/ArticlesForReview';
import Error from '~/containers/Error';

const NotFound = () => <Error text="Страница не найдена" />;

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Articles } />
      <Route path="/publish" component={ ArticlePublish } />
      <Route path="/edit/:articleId" component={ ArticlePublish } />
      <Route path="/article/:articleId" component={ ArticlePreview } />
      <Route path="/settings" component={ AuthorSettings } />
      <Route path="/articles-for-review" component={ ArticlesForReview } />
      <Route component={ NotFound } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
