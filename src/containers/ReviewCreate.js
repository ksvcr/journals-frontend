import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import ReviewCreateForm from '~/components/ReviewCreateForm/ReviewCreateForm';

import * as articlesActions from '~/store/articles/actions';
import * as usersActions from '~/store/users/actions';

class ReviewCreate extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { articleId, fetchArticle, fetchUser } = this.props;

    const promises = [];

    if (articleId !== undefined) {
      promises.push(
        fetchArticle(articleId).then(({ value: articleData }) => {
          const authorId = articleData.author.user.id;
          return fetchUser(authorId);
        })
      );
    }

    return Promise.all(promises);
  };

  handleSubmit = formData => {
    const {
      articleId,
      currentUserId,
      createArticleReview,
      push,
      reviewsFromCurrentUser
    } = this.props;
    const review_round = reviewsFromCurrentUser.length + 1;

    const data = {
      ...formData,
      article: articleId,
      reviewer: currentUserId,
      review_round
    };

    createArticleReview(articleId, data).then(() => {
      push('/');
    });
  };

  render() {
    const { articleId, reviewsFromCurrentUser } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">Новая рецензия</h1>

        <ReviewCreateForm
          id={ articleId }
          onSubmit={ this.handleSubmit }
          reviews={ reviewsFromCurrentUser }
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { user, articles } = state;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;
  const currentUserId = user.data.id;
  const reviews = articles.data[articleId]
    ? articles.data[articleId].reviews
    : [];
  const reviewsFromCurrentUser = reviews.filter(
    item => item.reviewer === currentUserId
  );
  return {
    articleId,
    currentUserId,
    reviewsFromCurrentUser
  };
}

const mapDispatchToProps = {
  push,
  fetchArticle: articlesActions.fetchArticle,
  createArticleReview: articlesActions.createArticleReview,
  fetchUser: usersActions.fetchUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewCreate);
