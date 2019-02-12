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
import RedactorUsers from '~/containers/RedactorUsers';
import ReviewPreview from '~/containers/ReviewPreview';

const ArticlePublishWithAccess = RoleAccess(ArticlePublish, ['AUTHOR', 'REVIEWER']);
const ArticleEditWithAccess = RoleAccess(ArticlePublish, ['AUTHOR', 'REVIEWER', 'REDACTOR']);
const ReviewCreateWithAccess = RoleAccess(ReviewCreate, ['REVIEWER', 'REDACTOR']);
const ArticlesForReviewWithAccess = RoleAccess(ArticlesForReview, ['REVIEWER', 'REDACTOR']);
const ArticleTranslateWithAccess = RoleAccess(ArticleTranslate, ['TRANSLATOR']);
const ArticleCorrectWithAccess = RoleAccess(ArticlePublish, ['CORRECTOR']);
const RedactorUsersWithAccess = RoleAccess(RedactorUsers, ['REDACTOR']);
const AuthorSettingsWithAccess = RoleAccess(AuthorSettings, ['REDACTOR']);

const routes = () => (
  <Page>
    <Switch>
      <Route exact path="/" component={ Articles } />
      <Route exact path="/article" component={ ArticlePublishWithAccess } />
      <Route exact path="/article/:articleId" component={ ArticlePreview } />
      <Route path="/article/:articleId/edit" component={ ArticleEditWithAccess } />
      <Route exact path="/article/:articleId/review" component={ ReviewCreateWithAccess } />
      <Route path="/article/:articleId/review/:reviewId" component={ ReviewPreview } />
      <Route path="/article/:articleId/translate" component={ ArticleTranslateWithAccess } />
      <Route path="/article/:articleId/correct" component={ ArticleCorrectWithAccess }/>
      <Route path="/articles-for-review" component={ ArticlesForReviewWithAccess } />
      <Route path="/users" component={ RedactorUsersWithAccess } />
      <Route path="/settings/:userId" component={ AuthorSettingsWithAccess } />
      <Route path="/settings" component={ AuthorSettings } />
      <Route path="/discounts" component={ Discounts } />
      <Route component={ NotFound } />
    </Switch>
  </Page>
);

export default hot(module)(routes);
