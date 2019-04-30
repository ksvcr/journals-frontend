import React, { Component } from 'react';
import { connect } from 'react-redux';

import Collapse from '~/components/Collapse/Collapse';
import ReviewsDialog from '~/components/ReviewsDialog/ReviewsDialog';
import * as articlesActions from '~/store/articles/actions';

import './reviews-dialog-list.scss';

class ReviewsDialogList extends Component {
  renderList = () => {
    const { reviews } = this.props;

    return reviews.map((item, i) => (
      <Collapse key={ i } title={ i+1 + ' рецензент' }>
        <ReviewsDialog formName={ `reviews-dialog-${item.id}` }
                       onSubmit={ this.handleEditReview } item={ item } />
      </Collapse>
    ));
  };

  handleEditReview = (id, formData) => {
    const { articleId, createArticleReviewAnswer } = this.props;
    createArticleReviewAnswer(articleId, id, formData);
  };

  render() {
    return (
      <div className="reviews-dialog-list">
        { this.renderList() }
      </div>
    );
  }
}

const mapDispatchToProps = {
  createArticleReviewAnswer: articlesActions.createArticleReviewAnswer
};

export default connect(
  null,
  mapDispatchToProps
)(ReviewsDialogList);
