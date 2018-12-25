import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticlesForReviewList from '~/components/ArticlesForReviewList/ArticlesForReviewList';

import * as articlesActions from '~/store/articles/actions';
import * as reviewInvitesActions from '~/store/reviewInvites/actions';
import { getArticlesParams } from '~/store/articles/selector';

class ArticlesForReview extends Component {
  componentWillMount() {
    const { resetArticles } = this.props;
    resetArticles();
  }

  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    return Promise.all([
      this.handleRequest()
    ]);
  };

  handleRequest = (params={}) => {
    const { userId, articlesParams, fetchArticles, fetchReviewInvites } = this.props;
    return Promise.all([
      fetchArticles(null, { ...articlesParams, ...params, invited_reviewer: userId }),
      fetchReviewInvites({ reviewer: userId })
    ]);
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="page__title">Статьи на рецензию</h1>
        <ArticlesForReviewList onUpdateRequest={ this.handleRequest } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    articlesParams: getArticlesParams(state),
    userId: user.data.id
  };
}

const mapDispatchToProps = {
  fetchArticles: articlesActions.fetchArticles,
  resetArticles: articlesActions.resetArticles,
  fetchReviewInvites: reviewInvitesActions.fetchReviewInvites,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesForReview);
