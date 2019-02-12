import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getFormValues } from 'redux-form';

import Content from '~/components/Content/Content';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import CancelLink from '~/components/CancelLink/CancelLink';

import * as articlesActions from '~/store/articles/actions';
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
    const { fetchArticle, fetchUser, articleId } = this.props;
    return fetchArticle(articleId).then((res) => {
      const { author, reviews } = res.value;
      let userIds = [author.user];
      if (reviews.length > 0) {
        reviews.forEach((item) => {
          if (userIds.indexOf(item.reviewer) < 0) {
            userIds.push(item.reviewer);
          }
        });
      }
      return userIds.map(id => fetchUser(id));
    });
  };

  render() {
    const { articleId, articleData, author } = this.props;

    return articleData ? (
      <React.Fragment>
        { articleId === 'new' &&
          <ArticleTopTools>
            <CancelLink href="/article"/>
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
  const { articles, users } = state;
  let { articleId } = match.params;
  let author;
  let articleData;

  if (articleId === 'new') {
    articleData = formValues;
  } else {
    articleData = articles.data[articleId];
    author = articleData && users.data[articleData.author.user];
  }
  return {
    articleId,
    isRejected: articles.isRejected,
    isFulfilled: articles.isFulfilled,
    articleData,
    author,
  };
}

const mapDispatchToProps = {
  push,
  fetchArticle: articlesActions.fetchArticle,
  fetchUser: usersActions.fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePreview);
