import React, {Component} from 'react';

import Collapse from '~/components/Collapse/Collapse';
import ReviewsDialog from '~/components/ReviewsDialog/ReviewsDialog';

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
    const { onSubmit } = this.props;
    onSubmit(id, formData);
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
