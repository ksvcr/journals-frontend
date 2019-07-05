import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getFormValues } from 'redux-form';
import { withNamespaces } from 'react-i18next';

import Content from '~/components/Content/Content';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import CancelLink from '~/components/CancelLink/CancelLink';

import * as articlesActions from '~/store/articles/actions';
import * as articleVersionsActions from '~/store/articleVersions/actions';
import * as usersActions from '~/store/users/actions';

class ArticlePreview extends Component {
  componentDidMount() {
    const { articleId, articleData } = this.props;
    if (articleId !== 'new' && !articleData) {
      this.handleRequest();
    }
  }

  componentDidUpdate() {
    const { articleId, articleData, push, isFulfilled, isRejected } = this.props;
    const noDataForPreview = articleId === 'new' && !articleData;
    const noDataForArticle = articleId !== 'new' && !articleData;
    if (noDataForPreview || isRejected || (isFulfilled && noDataForArticle)) {
      push('/');
    }
  }

  handleRequest = () => {
    const { fetchArticle, fetchArticleVersion, fetchUser, articleId, version, push } = this.props;
    const isVersion = version !== undefined;
    const articleRequest = isVersion ? fetchArticleVersion(articleId, version) : fetchArticle(articleId);
    return articleRequest.then((res) => {
      const data = res.value.data || res.value;
      const { author, reviews } = data;
      let userIds = [author.user.id];
      if (reviews && reviews.length > 0) {
        reviews.forEach((item) => {
          if (userIds.indexOf(item.reviewer) < 0) {
            userIds.push(item.reviewer);
          }
        });
      }
      return userIds.map(id => fetchUser(id));
    }).catch(() => {
      push('/');
    });
  };

  render() {
    const { articleId, articleData, author, t } = this.props;

    return articleData ? (
      <React.Fragment>
        { articleId === 'new' &&
          <ArticleTopTools>
            <CancelLink href="/article" text={ t('cancel') } />
          </ArticleTopTools>
        }

        { articleData &&
          <React.Fragment>
            <h1 className="page__title">
              { articleData.title }
            </h1>
            <Content data={ articleData } author={ author } />
          </React.Fragment>
        }
      </React.Fragment>
    ) : null;
  }
}

function mapStateToProps(state, props) {
  const formValues = getFormValues('article-publish-new')(state);
  const { match } = props;
  const { articles, users, articleVersions } = state;
  let { articleId, version } = match.params;
  const isVersion = version !== undefined;
  let author;
  let articleData;

  if (articleId === 'new') {
    articleData = formValues;
  } else {
    articleData = isVersion ? articleVersions.data[`${articleId}-${version}`] : articles.data[articleId];
    author = articleData && users.data[articleData.author.user];
  }

  return {
    articleId,
    version,
    articleData,
    author,
    isRejected: isVersion ? articleVersions.isRejected : articles.isRejected,
    isFulfilled: isVersion ? articleVersions.isFulfilled : articles.isFulfilled
  };
}

const mapDispatchToProps = {
  push,
  fetchArticle: articlesActions.fetchArticle,
  fetchArticleVersion: articleVersionsActions.fetchArticleVersion,
  fetchUser: usersActions.fetchUser
};

ArticlePreview = withNamespaces()(ArticlePreview);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePreview);
