import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { getFormValues } from 'redux-form';

import Content from '~/components/Content/Content';

import * as articlesActions from '~/store/articles/actions';
import ArticleTopTools from '~/components/ArticleTopTools/ArticleTopTools';
import CancelLink from '~/components/CancelLink/CancelLink';

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
    const { fetchArticle, articleId } = this.props;
    return fetchArticle(articleId);
  };

  render() {
    const { articleId, articleData } = this.props;
    return articleData ? (
      <article className="page__content">
        { articleId &&
          <ArticleTopTools>
            <CancelLink href="/publish"/>
          </ArticleTopTools>
        }

        { articleData &&
          <React.Fragment>
            <h1 className="page__title">
              { articleData.title }
            </h1>
            <Content data={ articleData } />
          </React.Fragment>
        }
      </article>
    ) : null;
  }
}

function mapStateToProps(state, props) {
  const formValues = getFormValues('article-publish')(state);
  const { match } = props;
  const { articles } = state;
  let { articleId } = match.params;

  let articleData;

  if (articleId === 'new') {
    articleData = formValues;
  } else {
    articleData = articles.data[articleId]
  }
  return {
    articleId,
    isRejected: articles.isRejected,
    isFulfilled: articles.isFulfilled,
    articleData
  };
}

const mapDispatchToProps = {
  push,
  fetchArticle: articlesActions.fetchArticle
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePreview);
