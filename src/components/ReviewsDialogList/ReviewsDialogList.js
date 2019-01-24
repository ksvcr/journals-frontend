import React, {Component} from 'react';

import ToggleItem from '~/components/ToggleItem/ToggleItem';
import ReviewsDialog from '~/components/ReviewsDialog/ReviewsDialog';

import './reviews-dialog-list.scss';

class ReviewsDialogList extends Component {
  get reviewsArray() {
    const { reviews } = this.props;
    let newArray = [];

    this.reviewersIdsArray.forEach((id) => {
      const reviewsByAuthor = reviews.filter(review => review.reviewer === id);
      newArray.push(reviewsByAuthor);
    });

    return newArray;
  }

  get reviewersIdsArray() {
    const { reviews } = this.props;
    let reviewers = [];
    reviews.map(item => reviewers.push(item.reviewer));
    //get unique values
    reviewers = reviewers.filter((v, i, a) => a.indexOf(v) === i);
    return reviewers;
  }

  renderList = () => {
    const newArray = this.reviewsArray;

    return newArray.map((array, index) => {
      return array.map((item, i) => (
        <ToggleItem key={ i } title={ index+1 + ' рецензент' }>
          <ReviewsDialog formName={ `reviews-dialog-${item.id}` }
                         onSubmit={ this.handleEditReview } item={ item } />
        </ToggleItem>
      ));
    });
  };

  handleEditReview = (reviewId, formData) => {
    const { onSubmit } = this.props;
    onSubmit(reviewId, formData);
  };

  render() {
    return (
      <div className="reviews-dialog-list">
        { this.renderList() }
      </div>
    );
  }
}

export default ReviewsDialogList;
