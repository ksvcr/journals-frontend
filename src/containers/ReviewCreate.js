import React, { Component } from 'react'
import { connect } from 'react-redux';

import ReviewCreateForm from '~/components/ReviewCreateForm/ReviewCreateForm';

import * as articlesActions from '~/store/articles/actions';

class ReviewCreate extends Component {
  componentDidMount() {
    this.handleInitialRequest();
  }

  handleInitialRequest = () => {
    const { articleId, fetchArticle } = this.props;

    return Promise.all([
      fetchArticle(articleId)
    ]);
  };

  handleSubmit = (formData) => {
    const { articleId, currentUserId, createArticleReview } = this.props;
    const data = { ...formData,
      article: articleId,
      reviewer: currentUserId
    };
    createArticleReview(articleId, data);
  }

  render() {
    const { articleId } = this.props;
    return (
      <React.Fragment>
        <h1 className="page__title">
          Новая рецензия
        </h1>

        <ReviewCreateForm id={ articleId } onSubmit={ this.handleSubmit } />
      </React.Fragment>
    )
  }
}

function mapStateToProps(state, props) {
  const { match } = props;
  const { user } = state;
  let { articleId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;
  return {
    articleId,
    currentUserId: user.data.id,
  };
}

const mapDispatchToProps = {
  fetchArticle: articlesActions.fetchArticle,
  createArticleReview: articlesActions.createArticleReview
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewCreate);
