import React, {Component} from 'react';

import ToggleItem from '~/components/ToggleItem/ToggleItem';

class ReviewsDialog extends Component {
  renderList = () => {
    const newArray = this.reviewsArray;

    return newArray.map((array, index) => {
      return array.map((item, i) => (
        <ToggleItem key={ i } title={ index+1 + ' рецензент' }>
          { item.comment_for_author }
        </ToggleItem>
      ));
    });
  };

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

  render() {
    return (
      <div className="reviews-dialog">
        { this.renderList() }
      </div>
    );
  }
}

export default ReviewsDialog;
