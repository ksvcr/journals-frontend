import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import { hot } from 'react-hot-loader';

import Page from '~/containers/Page';
import RoleAccess from '~/containers/RoleAccess';
import NotFound from '~/containers/NotFound';

const Articles = lazy(() => import('~/containers/Articles'));
const ArticleTranslate = lazy(() => import('~/containers/ArticleTranslate'));
const AuthorSettings = lazy(() => import('~/containers/AuthorSettings'));
const ArticlesForReview = lazy(() => import('~/containers/ArticlesForReview'));
const ArticlePublish = lazy(() => import('~/containers/ArticlePublish'));
const ArticlePreview = lazy(() => import('~/containers/ArticlePreview'));
const ReviewPreview = lazy(() => import('~/containers/ReviewPreview'));
const Discounts = lazy(() => import('~/containers/Discounts'));
const RedactorUsers = lazy(() => import('~/containers/RedactorUsers'));
const ReviewCreate = lazy(() => import('~/containers/ReviewCreate'));

const ArticlePublishWithAccess = RoleAccess(ArticlePublish, ['AUTHOR', 'REVIEWER']);
const ArticleEditWithAccess = RoleAccess(ArticlePublish, ['AUTHOR', 'REVIEWER', 'REDACTOR']);
const ReviewCreateWithAccess = RoleAccess(ReviewCreate, ['REVIEWER', 'REDACTOR']);
const ArticlesForReviewWithAccess = RoleAccess(ArticlesForReview, ['REVIEWER', 'REDACTOR']);
const ArticleTranslateWithAccess = RoleAccess(ArticleTranslate, ['TRANSLATOR', 'REDACTOR']);
const ArticleCorrectWithAccess = RoleAccess(ArticlePublish, ['CORRECTOR']);
const RedactorUsersWithAccess = RoleAccess(RedactorUsers, ['REDACTOR']);
const AuthorSettingsWithAccess = RoleAccess(AuthorSettings, ['REDACTOR']);

const routes = () => (
  <Page>
    <Suspense fallback={ <div>Загрузка...</div> }>
      <Switch>
        <Route exact path="/" component={ props => <Articles { ...props } /> } />
        <Route exact path="/article" component={ ArticlePublishWithAccess } />
        <Route exact path="/article/:articleId" component={ props => <ArticlePreview { ...props } /> } />
        <Route path="/article/:articleId/edit" component={ ArticleEditWithAccess } />
        <Route exact path="/article/:articleId/review" component={ ReviewCreateWithAccess } />
        <Route path="/article/:articleId/review/:reviewId" component={ props => <ReviewPreview { ...props } /> } />
        <Route path="/article/:articleId/translate" component={ ArticleTranslateWithAccess } />
        <Route path="/article/:articleId/correct" component={ ArticleCorrectWithAccess }/>
        <Route path="/articles-for-review" component={ ArticlesForReviewWithAccess } />
        <Route path="/users" component={ RedactorUsersWithAccess } />
        <Route path="/settings/:userId" component={ AuthorSettingsWithAccess } />
        <Route path="/settings" component={ props => <AuthorSettings { ...props } /> } />
        <Route path="/discounts" component={ props => <Discounts { ...props } /> } />
        <Route component={ props => <NotFound { ...props } /> } />
      </Switch>
    </Suspense>
  </Page>
);

export default hot(module)(routes);
