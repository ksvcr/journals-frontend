import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import RoleAccess from '~/containers/RoleAccess';
import Articles from '~/containers/Articles';
import ArticlePublish from '~/containers/ArticlePublish';
import ArticlePreview from '~/containers/ArticlePreview';
import ArticleTranslate from '~/containers/ArticleTranslate';
import AuthorSettings from '~/containers/AuthorSettings';
import ArticlesForReview from '~/containers/ArticlesForReview';
import ReviewCreate from '~/containers/ReviewCreate';
import Discounts from '~/containers/Discounts';
import NotFound from '~/containers/NotFound';

const ArticlePublishWithAccess = RoleAccess(ArticlePublish, ['AUTHOR', 'REVIEWER', 'REDACTOR']);
const ReviewCreateWithAccess = RoleAccess(ReviewCreate, ['REVIEWER']);
const ArticlesForReviewWithAccess = RoleAccess(ArticlesForReview, ['REVIEWER']);
const ArticleTranslateWithAccess = RoleAccess(ArticleTranslate, ['TRANSLATOR']);

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Articles } />
      <Route exact path="/article" component={ ArticlePublishWithAccess } />
      <Route exact path="/article/:articleId" component={ ArticlePreview } />
      <Route path="/article/:articleId/edit" component={ ArticlePublishWithAccess } />
      <Route path="/article/:articleId/review" component={ ReviewCreateWithAccess } />
      <Route path="/article/:articleId/translate" component={ ArticleTranslateWithAccess } />
      <Route path="/articles-for-review" component={ ArticlesForReviewWithAccess } />
      <Route path="/settings" component={ AuthorSettings } />
      <Route path="/discounts" component={ Discounts } />
      <Route component={ NotFound } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
