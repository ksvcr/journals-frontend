import React, { Component } from 'react';
import { connect } from 'react-redux';

import ArticleInfo from '~/components/ArticleInfo/ArticleInfo';
import ReviewContent from '~/components/ReviewContent/ReviewContent';

import * as reviewsActions from '~/store/reviews/actions';
import * as articlesActions from '~/store/articles/actions';
import * as rubricsActions from '~/store/rubrics/actions';

import isShowDecision from '~/services/isShowDecision';

class ReviewPreview extends Component {
  componentDidMount() {
    this.handleRequest();
  }

  handleRequest = () => {
    const { fetchReview, fetchArticle, fetchRubrics, articleId, reviewId } = this.props;
    return Promise.all([
      fetchReview(articleId, reviewId),
      fetchArticle(articleId).then(({ value:articleData }) => {
        return fetchRubrics(articleData.site);
      })
    ]);
  };

  render() {
    const { isFulfilled, articleId, reviewData, articleData } = this.props;

    return isFulfilled && (
      <React.Fragment>
        <h1 className="page__title">Рецензия</h1>

        <ArticleInfo id={ articleId } />

        <hr className="page__divider" />

        <ReviewContent data={ reviewData }
                       isShowDecision={ isShowDecision(articleData.state_article) } />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, props) {
  const { rubrics, reviews, articles } = state;
  const { match } = props;
  let { articleId, reviewId } = match.params;
  articleId = articleId ? parseInt(articleId, 10) : articleId;

  return {
    isFulfilled: rubrics.isFulfilled && reviews.isFulfilled && articles.isFulfilled,
    reviewData: reviews.data[reviewId],
    articleData: articles.data[articleId],
    articleId,
    reviewId
  };
}

const mapDispatchToProps = {
  fetchReview: reviewsActions.fetchReview,
  fetchArticle: articlesActions.fetchArticle,
  fetchRubrics: rubricsActions.fetchRubrics,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewPreview);
