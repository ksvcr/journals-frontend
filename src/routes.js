import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import Articles from '~/containers/Articles';
import ArticlePublish from '~/containers/ArticlePublish';
import ArticlePreview from '~/containers/ArticlePreview';
import AuthorSettings from '~/containers/AuthorSettings';
import ArticlesForReview from '~/containers/ArticlesForReview';
import ReviewCreate from '~/containers/ReviewCreate';
import Discounts from '~/containers/Discounts';
import Error from '~/containers/Error';

const NotFound = () => <Error text="Страница не найдена" />;

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Articles } />
      <Route exact path="/article" component={ ArticlePublish } />
      <Route exact path="/article/:articleId" component={ ArticlePreview } />
      <Route path="/article/:articleId/edit" component={ ArticlePublish } />
      <Route path="/article/:articleId/review" component={ ReviewCreate } />
      <Route path="/articles-for-review" component={ ArticlesForReview } />
      <Route path="/settings" component={ AuthorSettings } />
      <Route path="/discounts" component={ Discounts } />
      <Route component={ NotFound } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
